const fs = require('fs');

// type passport = {
//   byr: string;
//   iyr: string;
//   eyr: string;
//   hgt: string;
//   hcl: string;
//   ecl: string;
//   pid: string;
//   cid?: string;
// }

const HexidecimalChars = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
];

const verifyHexidecimalString = (string) => {
  for (let i = 0; i < string.length; i += 1) {
    const char = string[i];
    if (!HexidecimalChars.includes(char)) {
      return false;
    }
  }
  return true;
};

const EyeColors = [
  'amb',
  'blu',
  'brn',
  'gry',
  'grn',
  'hzl',
  'oth',
];

const ArrayOfRequiredKeys = [
  {
    key: 'byr',
    isValid: (keyValue) => {
      const parsedValue = parseInt(keyValue, 10);
      if (parsedValue <= 2002 && parsedValue >= 1920) {
        return true;
      }
      return false;
    },
  },
  {
    key: 'iyr',
    isValid: (keyValue) => {
      const parsedValue = parseInt(keyValue, 10);
      if (parsedValue <= 2020 && parsedValue >= 2010) {
        return true;
      }
      return false;
    },
  },
  {
    key: 'eyr',
    isValid: (keyValue) => {
      const parsedValue = parseInt(keyValue, 10);
      if (parsedValue <= 2030 && parsedValue >= 2020) {
        return true;
      }
      return false;
    },
  },
  {
    key: 'hgt',
    isValid: (keyValue) => {
      const unit = keyValue.substring(keyValue.length - 2);
      const number = keyValue.substring(0, keyValue.length - 2);
      if (unit === 'cm') {
        const metricHeight = parseInt(number, 10);
        if (metricHeight <= 193 && metricHeight >= 150) {
          return true;
        }
      }
      if (unit === 'in') {
        const imperialHeight = parseInt(number, 10);
        if (imperialHeight <= 76 && imperialHeight >= 59) {
          return true;
        }
      }
      return false;
    },
  },
  {
    key: 'hcl',
    isValid: (keyValue) => {
      if (keyValue[0] === '#') {
        const code = keyValue.substring(1);
        if (verifyHexidecimalString(code)) {
          return true;
        }
      }
      return false;
    },
  },
  {
    key: 'ecl',
    isValid: (keyValue) => {
      if (EyeColors.includes(keyValue)) {
        return true;
      }
      return false;
    },
  },
  {
    key: 'pid',
    isValid: (keyValue) => {
      if (keyValue.length === 9 && parseInt(keyValue, 10)) {
        return true;
      }
      return false;
    },
  },
];
const validatePassport = (passport) => {
  for (let j = 0; j < ArrayOfRequiredKeys.length; j += 1) {
    const { isValid, key } = ArrayOfRequiredKeys[j];
    if (!passport[key]) {
      return false;
    }
    if (!isValid(passport[key])) {
      return false;
    }
  }
  return true;
};

const countValidPassports = (arrOfPassports) => {
  let validPassports = 0;
  for (let i = 0; i < arrOfPassports.length; i += 1) {
    const passport = arrOfPassports[i];
    if (validatePassport(passport)) {
      validPassports += 1;
    }
  }
  return validPassports;
};

const parser = (inputString) => {
  const passportRows = inputString.split('\n\n');
  // .map madness
  const passportKeyPairObjects = passportRows
    .map((passportRow) => passportRow.replace(/\n/g, ' '))
    .map((passportRow) => passportRow.split(' '))
    .map((passportRow) => passportRow.map((keyPairString) => keyPairString.split(':')))
    .map((passportRow) => {
      const passportObj = {};
      for (let i = 0; i < passportRow.length; i += 1) {
        const keyValuePairArray = passportRow[i];
        const key = keyValuePairArray[0];
        const value = keyValuePairArray[1];
        passportObj[key] = value;
      }
      return passportObj;
    });
  return passportKeyPairObjects;
};

fs.readFile(`${__dirname}/input.txt`, (err, file) => {
  if (err) {
    console.log('err:', err);
    throw err;
  }
  const parsedPassports = parser(file.toString());
  console.log(countValidPassports(parsedPassports));
});

const testInput = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const testObjectInput = [
  {
    ecl: 'gry',
    pid: '860033327',
    eyr: '2020',
    hcl: '#fffffd',
    byr: '1937',
    iyr: '2017',
    cid: '147',
    hgt: '183cm',
  },
  {
    iyr: '2013',
    ecl: 'amb',
    cid: '350',
    eyr: '2023',
    pid: '028048884',
    hcl: '#cfa07d',
    byr: '1929',
  },
  {
    hcl: '#ae17e1',
    iyr: '2013',
    eyr: '2024',
    ecl: 'brn',
    pid: '760753108',
    byr: '1931',
    hgt: '179cm',
  },
  {
    hcl: '#cfa07d',
    eyr: '2025',
    pid: '166559648',
    iyr: '2011',
    ecl: 'brn',
    hgt: '59in',
  },
];

console.log('Parsed File Correctly: ', JSON.stringify(parser(testInput)) === JSON.stringify(testObjectInput));
