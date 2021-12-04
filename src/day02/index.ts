import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split('\n');

  let forward = 0;
  let depth = 0;

  inputArr
    .filter((direction) => direction.startsWith('forward'))
    .map((forwards) => (forward += parseInt(forwards.slice(-1))));

  inputArr
    .filter((direction) => !direction.startsWith('forward'))
    .map((upDown) =>
      upDown.startsWith('up')
        ? (depth -= parseInt(upDown.slice(-1)))
        : (depth += parseInt(upDown.slice(-1))),
    );

  return forward * depth;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inputArr = input.split('\n');

  let horizontal = 0,
    depth = 0,
    aim = 0;

  for (const direction of inputArr) {
    const num = parseInt(direction.slice(-1));
    switch (direction.slice(0, 1)) {
      case 'd':
        aim += num;
        break;

      case 'u':
        aim -= num;
        break;

      case 'f':
        horizontal += num;
        depth += aim * num;
        break;

      default:
        break;
    }
  }

  return horizontal * depth;
};

run({
  part1: {
    tests: [
      {
        input: `
        forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2`,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2`,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
