import run from 'aocrunner';

function parseInput(rawInput: string) {
  return rawInput
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let median = input[input.length / 2];
  if (median % 1 !== 0) {
    median = (input[median - 0.5] + input[median + 0.5]) / 2;
  }
  const cost = input.map((x) => Math.abs(x - median)).reduce((n, v) => n + v);

  return cost;
};

function calculateCostByDistance(distance: number): number {
  return distance * (0.5 * distance + 0.5);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let minFuelUsage = Infinity;

  for (let i = input[0]; i <= input[input.length - 1]; i++) {
    let fuelUsage = 0;

    for (const position of input) {
      const distance = Math.abs(position - i);
      fuelUsage += calculateCostByDistance(distance);
    }

    minFuelUsage = fuelUsage < minFuelUsage ? fuelUsage : minFuelUsage;
  }

  return minFuelUsage;
};

run({
  part1: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
});
