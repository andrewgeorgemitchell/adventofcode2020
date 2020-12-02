/* eslint-disable no-console */
const fs = require('fs');

const findTwoEntriesThatEqualSum = (numArr, sum) => {
  let num = 0;
  for (let i = 0; i < numArr.length; i += 1) {
    const num1 = numArr[i];
    for (let j = 0; j < numArr.length; j += 1) {
      const num2 = numArr[j];
      if (num1 + num2 === sum) {
        num = num1 * num2;
      }
    }
  }
  return num;
};

const findThreeEntriesThatEqualSum = (numArr, sum) => {
  let num = 0;
  for (let i = 0; i < numArr.length; i += 1) {
    const num1 = numArr[i];
    for (let j = 0; j < numArr.length; j += 1) {
      const num2 = numArr[j];
      for (let k = 0; k < numArr.length; k += 1) {
        const num3 = numArr[k];
        if (num1 + num2 + num3 === sum) {
          num = num1 * num2 * num3;
        }
      }
    }
  }
  return num;
};

// Convert Input to usable array
fs.readFile(`${__dirname}/input.txt`, (err, file) => {
  if (err) {
    console.log('err:', err);
    throw err;
  }
  const stringify = file.toString();
  const inputArr = stringify.split('\n');
  const adventArray = [];
  for (let i = 0; i < inputArr.length; i += 1) {
    adventArray.push(parseInt(inputArr[i], 10));
  }

  const twoNumberAnswer = findTwoEntriesThatEqualSum(adventArray, 2020);
  console.log('The Product of two numbers:', twoNumberAnswer);
  const threeNumberAnswer = findThreeEntriesThatEqualSum(adventArray, 2020);
  console.log('The Product of three numbers:', threeNumberAnswer);
});

/// Testing
const testSum = 2020;
const testArr = [
  1721,
  979,
  366,
  299,
  675,
  1456,
];
const testAnswer = 514579;
const answerTwo = findTwoEntriesThatEqualSum(testArr, testSum);
console.log('Test Case 1 with 2 numbers: ', answerTwo === testAnswer ? 'Passed' : 'Failed');

const testAnswer2 = 241861950;
const answerThree = findThreeEntriesThatEqualSum(testArr, testSum);
console.log('Test Case 1 with 2 numbers: ', answerThree === testAnswer2 ? 'Passed' : 'Failed');
