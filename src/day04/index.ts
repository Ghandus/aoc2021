import run from 'aocrunner';

interface numbers {
  number: number;
  marked: boolean;
  boardId: number;
}

function parseInput(rawInput: string): [number[], numbers[][][]] {
  const input = [];

  for (let i = 1; i < rawInput.split('\n').length; i++) {
    const element = rawInput.split('\n')[i];

    if (element === '') {
      input.push([
        rawInput
          .split('\n')
          [i + 1].split(' ')
          .map((entry) =>
            entry !== ''
              ? { number: Number(entry), marked: false, boardId: i }
              : 'x',
          )
          .filter((x) => x !== 'x'),
        rawInput
          .split('\n')
          [i + 2].split(' ')
          .map((entry) =>
            entry !== ''
              ? { number: Number(entry), marked: false, boardId: i }
              : 'x',
          )
          .filter((x) => x !== 'x'),
        rawInput
          .split('\n')
          [i + 3].split(' ')
          .map((entry) =>
            entry !== ''
              ? { number: Number(entry), marked: false, boardId: i }
              : 'x',
          )
          .filter((x) => x !== 'x'),
        rawInput
          .split('\n')
          [i + 4].split(' ')
          .map((entry) =>
            entry !== ''
              ? { number: Number(entry), marked: false, boardId: i }
              : 'x',
          )
          .filter((x) => x !== 'x'),
        rawInput
          .split('\n')
          [i + 5].split(' ')
          .map((entry) =>
            entry !== ''
              ? { number: Number(entry), marked: false, boardId: i }
              : 'x',
          )
          .filter((x) => x !== 'x'),
      ]);

      i += 4;
    }
  }

  return [
    rawInput.split('\n')[0].split(',').map(Number) as number[],
    input as numbers[][][],
  ];
}

function bingoCheck(board: numbers[][]): boolean {
  // check for horizontal bingo
  for (const row of board) {
    let bingoCounter = 0;
    for (const col of row) {
      if (col.marked) {
        bingoCounter++;
      }
    }
    if (bingoCounter === row.length) {
      return true;
    }
  }

  // check for vertical bingo
  // loop over cols (all rows have same amount of numbers)
  for (let col = 0; col < board[0].length; col++) {
    let bingoCounter = 0;
    for (let row = 0; row < board.length; row++) {
      if (board[row][col].marked) {
        bingoCounter++;
      }
    }
    if (bingoCounter === board.length) {
      return true;
    }
  }

  return false;
}

function calculateFinalScore(
  winningBoard: numbers[][],
  lastDrawnNumber: number,
): number {
  let unmarked = 0;

  for (const row of winningBoard) {
    for (const number of row) {
      unmarked += !number.marked ? number.number : 0;
    }
  }
  return unmarked * lastDrawnNumber;
}

const part1 = (rawInput: string) => {
  const [drawnNumbers, arrayOfBoards] = parseInput(rawInput);
  let winningBoard: numbers[][] = [];
  let lastDrawnNumber = 0;

  outerLoop: for (const drawnNumber of drawnNumbers) {
    for (const board of arrayOfBoards) {
      if (winningBoard.length === 0)
        for (const row of board) {
          for (const column of row) {
            if (drawnNumber === column.number) {
              column.marked = true;
            }
          }
        }
      if (bingoCheck(board)) {
        winningBoard = [...board];
        lastDrawnNumber = drawnNumber;
        break outerLoop;
      }
    }
  }

  return calculateFinalScore(winningBoard, lastDrawnNumber);
};

const part2 = (rawInput: string) => {
  const [drawnNumbers, arrayOfBoards] = parseInput(rawInput);
  let losingBoard: numbers[][] = [];
  let lastDrawnNumber = 0;

  outerLoop: for (const drawnNumber of drawnNumbers) {
    for (let i = arrayOfBoards.length - 1; i >= 0; i--) {
      const board = arrayOfBoards[i];
      for (let j = 0; j < board.length; j++) {
        const row = board[j];
        for (let k = 0; k < row.length; k++) {
          const column = row[k];
          if (board[0][0].number === 3 && drawnNumber === 16) {
          }
          if (drawnNumber === column.number) {
            column.marked = true;
          }
        }
      }

      if (bingoCheck(board)) {
        const tempBoard = [...arrayOfBoards];
        arrayOfBoards.splice(i, 1);

        if (arrayOfBoards.length === 0) {
          losingBoard = tempBoard[0];
          lastDrawnNumber = drawnNumber;
          break outerLoop;
        }
      }
    }
  }

  return calculateFinalScore(losingBoard, lastDrawnNumber);
};

run({
  part1: {
    tests: [
      {
        input: `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
