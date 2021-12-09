import run from 'aocrunner';

function parseInput(rawInput: string) {
  return rawInput.split(',').map((x) => Number(x));
}

function calculateFishes(days: number, fishes: number[]): number[] {
  for (let day = 0; day < days; day++) {
    const totalFishes = fishes.length;
    for (let fishIndex = 0; fishIndex < totalFishes; fishIndex++) {
      fishes[fishIndex] = fishes[fishIndex] - 1;
      if (fishes[fishIndex] < 0) {
        fishes[fishIndex] = 6;
        fishes.push(8);
      }
    }
  }

  return fishes;
}

const part1 = (rawInput: string) => {
  const fishes: number[] = parseInput(rawInput);

  const days = 80;

  return calculateFishes(days, fishes).length;
};

const part2 = (rawInput: string) => {
  let fishes: number[] = parseInput(rawInput);
  /* const totalDays = 256;
  let days = 32;

  for (let i = 0; i < totalDays / days; i++) {
    console.log('iteration: ' + (i + 1) + ' / ' + totalDays / days);
    fishes = calculateFishes(days, fishes);
  } */

  const generations = Array.from(
    { length: 9 },
    (v, i) => fishes.filter((n) => n === i).length,
  );
  console.log(generations);

  for (let i = 0; i < 256; i++) {
    const zeroes = generations.shift();
    generations[6] += zeroes;
    generations.push(zeroes);
  }

  return generations.reduce((acc, v) => acc + v, 0);
};

run({
  part1: {
    tests: [{ input: `3,4,3,1,2`, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `3,4,3,1,2`, expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
});
