/* eslint-disable no-console */
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const inputParser = (stringToParse) => {
  const lines = stringToParse.split('\n');
  return lines.map((line) => {
    const min = line.split('-')[0];
    const max = line.split(':')[0].split(' ')[0].split('-')[1];
    const letter = line.split(':')[0].split(' ')[1];
    const password = line.split(':')[1].split([' '])[1];
    return {
      min: parseInt(min, 10),
      max: parseInt(max, 10),
      letter,
      password,
    };
  });
};

const filterValidPasswords = (passwords) => passwords.filter(({
  min, max, letter, password,
}) => {
  const letterCount = password.split('').filter((char) => char === letter).length;
  return (min <= letterCount && max >= letterCount);
});

const filterValidPasswordsV2 = (passwords) => passwords.filter(({
  min, max, letter, password,
}) => {
  // if first position of password is letter it is valid
  if (password[min - 1] === letter) {
    // else second letter is also letter
    if (password[max - 1] === letter) {
      return false;
    }
    return true;
  } if (password[max - 1] === letter) {
    // else second letter is also letter
    if (password[min - 1] === letter) {
      return false;
    }
    return true;
  }
  // else if letter is not in password it is not valid
  return false;
});

// Answer

const main = async () => {
  try {
    const fileString = (await readFileAsync(`${__dirname}/input.txt`)).toString();
    const validPasswords = filterValidPasswords(inputParser(fileString));
    const validPasswordsV2 = filterValidPasswordsV2(inputParser(fileString));
    console.log('Number of Valid Passwords (According to old system):', validPasswords.length);
    console.log('Number of Valid Passwords (According to actual system):', validPasswordsV2.length);
  } catch (error) {
    console.log('error:', error);
  }
};
main();

// Tests
const testString = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

const testArray = [
  {
    min: 1, max: 3, letter: 'a', password: 'abcde',
  },
  {
    min: 1, max: 3, letter: 'b', password: 'cdefg',
  },
  {
    min: 2, max: 9, letter: 'c', password: 'ccccccccc',
  },
];

console.log('Parser Test:');
console.log(JSON.stringify(inputParser(testString)));
console.log(JSON.stringify(testArray));
console.log(JSON.stringify(inputParser(testString)) === JSON.stringify(testArray) ? 'Passed :-)' : 'Failed (>^O^)>');

console.log('Password Checker Test:');
console.log(filterValidPasswords(testArray).length === 2 ? 'Passed :-)' : 'Failed (>^O^)>');

console.log('Password CheckerV2 Test:');
console.log(filterValidPasswordsV2(testArray).length === 1 ? 'Passed :-)' : 'Failed (>^O^)>');
