import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inpurArr = input.split('\n');

  const loopAmount = inpurArr[0].length;
  let gammaRate = '';
  let epsilonRate = '';

  for (let j = 0; j < loopAmount; j++) {
    let balance = 0;
    for (let i = 0; i < inpurArr.length; i++) {
      parseInt(inpurArr[i].charAt(j)) > 0 ? balance++ : balance--;
    }
    gammaRate += balance > 0 ? '1' : '0';
    epsilonRate += balance < 0 ? '1' : '0';
  }
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const inpurArr = input.split('\n');

  let binaryStringArray = [...inpurArr];
  let oxygenBinary = '';
  let co2Binary = '';
  const loopAmount = binaryStringArray[0].length;

  for (let i = 0; i < loopAmount; i++) {
    if (binaryStringArray.length === 1) {
      break;
    }
    const numberOfOnesArray = binaryStringArray.filter(
      (binaryString) => binaryString.charAt(i) === '1',
    );
    const numberOfZeroesArray = binaryStringArray.filter(
      (binaryString) => binaryString.charAt(i) === '0',
    );
    numberOfOnesArray.length >= numberOfZeroesArray.length
      ? (binaryStringArray = [...numberOfOnesArray])
      : (binaryStringArray = [...numberOfZeroesArray]);
  }

  oxygenBinary = binaryStringArray[0] || 'fail';

  binaryStringArray = [...inpurArr];
  for (let i = 0; i < loopAmount; i++) {
    if (binaryStringArray.length === 1) {
      break;
    }
    const numberOfOnesArray = binaryStringArray.filter(
      (binaryString) => binaryString.charAt(i) === '1',
    );
    const numberOfZeroesArray = binaryStringArray.filter(
      (binaryString) => binaryString.charAt(i) === '0',
    );
    numberOfOnesArray.length >= numberOfZeroesArray.length
      ? (binaryStringArray = [...numberOfZeroesArray])
      : (binaryStringArray = [...numberOfOnesArray]);
  }

  co2Binary = binaryStringArray[0] || 'fail';

  return parseInt(oxygenBinary, 2) * parseInt(co2Binary, 2);
};

run({
  part1: {
    tests: [
      {
        input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010`,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
