import run from 'aocrunner';

function parseInput(rawInput: string) {
  const res = rawInput.split('\n');
  const result = [];
  for (const element of res) {
    const [firstCoord, secondCoord] = element.split(' -> ');
    result.push({
      x1: firstCoord.split(',')[0],
      y1: firstCoord.split(',')[1],
      x2: secondCoord.split(',')[0],
      y2: secondCoord.split(',')[1],
    });
  }
  return result;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(typeof input);
  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);

  return;
};

run({
  part1: {
    tests: [
      /* {
        input: `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 5,
      }, */
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
