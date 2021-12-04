import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split('\n').map(Number);
  let increased = 0;

  for (let i = 1; i < inputArr.length; i++) {
    if (inputArr[i] > inputArr[i - 1]) {
      increased++;
    }
  }

  return increased;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split('\n').map(Number);
  let increased = 0;

  for (let i = 2; i < inputArr.length - 1; i++) {
    if (
      inputArr[i - 1] + inputArr[i] + inputArr[i + 1] >
      inputArr[i - 2] + inputArr[i - 1] + inputArr[i]
    ) {
      increased++;
    }
  }

  return increased;
};

run({
  part1: {
    tests: [
      {
        input: `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
