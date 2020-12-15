const fs = require('fs');
const util = require('util');

const readFileAsync = (pathToFile) => new Promise((resolve, reject) => {
  fs.readFile(pathToFile, (err, file) => {
    if (err) {
      reject(err);
    }
    resolve(file);
  });
});

const sortSeats = (rowFinder) => {
  const rows = [0, 127];
  rowFinder.split('').forEach((char) => {
    switch (char) {
      case 'F':
        rows[1] = Math.floor(rows[1] - ((rows[1] - rows[0]) / 2));
        break;
      case 'B':
        rows[0] = Math.ceil(rows[0] + ((rows[1] - rows[0]) / 2));
        break;
    }
  });
  return rows[0];
};

const sortCol = (colFinder) => {
  const rows = [0, 7];
  colFinder.split('').forEach((char) => {
    switch (char) {
      case 'L':
        rows[1] = Math.floor(rows[1] - ((rows[1] - rows[0]) / 2));
        break;
      case 'R':
        rows[0] = Math.ceil(rows[0] + ((rows[1] - rows[0]) / 2));
        break;
    }
  });
  return rows[0];
};

const findSeatColRow = (boardingPassString) => {
  const row = sortSeats(boardingPassString.slice(0, 7));
  const col = sortCol(boardingPassString.slice(7));
  return {
    boardingPassString,
    seatId: (row * 8) + col,
    row,
    col,
  };
};

console.log(findSeatColRow('FBFBBFFRLR'));

// Callback Way
fs.readFile(`${__dirname}/input.txt`, (err, file) => {
  if (err) {
    console.log('err:', err);
    throw err;
  }
});

// Promise
// readFileAsync(`${__dirname}/input.txt`)
//   .then((file) => {
//     console.log('file:', file)
//   })
//   .catch((err) => {
//     console.log('err:', err)
//   })

const main = async () => {
  const file = await readFileAsync(`${__dirname}/input.txt`);
  const boardingPasses = file.toString().split('\n');
  let currentHighest = 0;
  for (let i = 0; i < boardingPasses.length; i++) {
    const boardingPass = boardingPasses[i];
    const { seatId } = findSeatColRow(boardingPass);
    if (seatId > currentHighest) {
      currentHighest = seatId;
    }
  }
  console.log('currentHighest:', currentHighest);
  const sortedPasses = boardingPasses
    .map((boardingPass) => findSeatColRow(boardingPass))
    .sort((a, b) => a.seatId - b.seatId);

  const seatMissingFront = sortedPasses
    .find((boardingPassObj, index, arr) => {
      const nextSeat = arr[index + 1];
      if (nextSeat.seatId - boardingPassObj.seatId > 1) {
        return true;
      }
      return false;
    });
  console.log('seatMissingId:', seatMissingFront.seatId + 1);
};

main();

// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.
