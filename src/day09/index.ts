import run from 'aocrunner';

function parseInput(rawInput: string) {
  let input: any[] = rawInput.split('\n');

  for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split('').map(Number);
  }
  return input;
}

const part1 = (rawInput: string) => {
  const input: number[][] = parseInput(rawInput);

  const lowPoints: number[] = [];

  for (let vertical = 0; vertical < input.length; vertical++) {
    for (
      let horizontal = 0;
      horizontal < input[vertical].length;
      horizontal++
    ) {
      const currentPoint = input[vertical][horizontal];

      const left =
        horizontal - 1 >= 0 ? input[vertical][horizontal - 1] : Infinity;
      const right =
        horizontal + 1 < input[vertical].length
          ? input[vertical][horizontal + 1]
          : Infinity;
      const up =
        vertical + 1 < input.length
          ? input[vertical + 1][horizontal]
          : Infinity;
      const down =
        vertical - 1 >= 0 ? input[vertical - 1][horizontal] : Infinity;

      if (
        left <= currentPoint ||
        right <= currentPoint ||
        up <= currentPoint ||
        down <= currentPoint
      ) {
        // at least one neighbour is lower or the same height
      } else {
        /* console.log(
          'vertical: ' + vertical,
          'horizontal :' + horizontal,
          'point: ' + input[vertical][horizontal],
        ); */
        lowPoints.push(currentPoint + 1);
      }
    }
  }

  return lowPoints.reduce((p, c) => p + c);
};

const part2 = (rawInput: string) => {
  const input: number[][] = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
      2199943210
      3987894921
      9856789892
      8767896789
      9899965678`,
        expected: 15,
      },
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
