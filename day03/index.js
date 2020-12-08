const fs = require('fs');

const countTrees = (matrix, horzSlope, vertSlope) => {
  let currentX = horzSlope;
  let treesEncountered = 0;
  // iterate over the input array (map)
  const lineLength = matrix[0].length;
  for (let y = vertSlope; y < matrix.length; y += vertSlope) {
    const nextSpot = matrix[y][currentX % lineLength];
    if (nextSpot === '#') {
      treesEncountered += 1;
    }
    currentX += horzSlope;
  }
  return treesEncountered;
};

fs.readFile(`${__dirname}/input.txt`, (err, file) => {
  if (err) {
    console.log('err:', err);
    throw err;
  }
  const fileString = file.toString();
  const linesArray = fileString.split('\n');
  const matrixMap = [];
  for (let i = 0; i < linesArray.length; i += 1) {
    const lineString = linesArray[i];
    matrixMap.push(lineString.split(''));
  }
  console.log('matrixMap:', matrixMap[matrixMap.length - 1]);
  console.log('trees with slope 1, 1', countTrees(matrixMap, 1, 1));
  console.log('trees with slope 3, 1', countTrees(matrixMap, 3, 1));
  console.log('trees with slope 5, 1', countTrees(matrixMap, 5, 1));
  console.log('trees with slope 7, 1', countTrees(matrixMap, 7, 1));
  console.log('trees with slope 1, 2', countTrees(matrixMap, 1, 2));
  const One = countTrees(matrixMap, 1, 1);
  const Two = countTrees(matrixMap, 3, 1);
  const Three = countTrees(matrixMap, 5, 1);
  const Four = countTrees(matrixMap, 7, 1);
  const Five = countTrees(matrixMap, 1, 2);
  const AnswerTwo = One * Two * Three * Four * Five;
  console.log('ANSWER', AnswerTwo);
});

// fs.readFile(`${__dirname}/test-input.txt`, (err, file) => {
//   if (err) {
//     console.log('err:', err);
//     throw err;
//   }
//   const fileString = file.toString();
//   const linesArray = fileString.split('\n');
//   const matrixMap = [];
//   for (let i = 0; i < linesArray.length; i += 1) {
//     const lineString = linesArray[i];
//     matrixMap.push(lineString.split(''));
//   }
//   const test1 = countTrees(matrixMap, 1, 1);
//   const test2 = countTrees(matrixMap, 3, 1);
//   const test3 = countTrees(matrixMap, 5, 1);
//   const test4 = countTrees(matrixMap, 7, 1);
//   const test5 = countTrees(matrixMap, 1, 2);
//   console.log('Tests trees with slope 1, 1', test1, ' === ', 2);
//   console.log('Tests trees with slope 3, 1', test2, ' === ', 7);
//   console.log('Tests trees with slope 5, 1', test3, ' === ', 3);
//   console.log('Tests trees with slope 7, 1', test4, ' === ', 4);
//   console.log('Tests trees with slope 1, 2', test5, ' === ', 2);
//   console.log('Product should equal 338: ', test1 * test2 * test3 * test4 * test5);
//   const testAnswer = test1 * test2 * test3 * test4 * test5;
//   console.log(testAnswer);
// });
