import run from 'aocrunner';

function parseInput(rawInput: string) {
  return rawInput.split('\n');
}

function getClosingChar(openChar: string): string {
  let char = '';
  switch (openChar) {
    case '(':
      char = ')';
      break;

    case '[':
      char = ']';
      break;

    case '{':
      char = '}';
      break;

    case '<':
      char = '>';
      break;
  }
  return char;
}

function isOpeningChar(char: string): boolean {
  return char === '(' || char === '[' || char === '{' || char === '<';
}

function getScoreForChar(char: string): number {
  return char === ')' ? 3 : char === ']' ? 57 : char === '}' ? 1197 : 25137;
}

function getScoreForCharPart2(char: string): number {
  return char === ')' ? 1 : char === ']' ? 2 : char === '}' ? 3 : 4;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const invalidChars = [];

  for (const line of input) {
    const chars = [];
    for (let i = 0; i < line.length; i++) {
      const char = line.charAt(i);

      // push char to array until closing character is found
      if (isOpeningChar(char)) {
        chars.push(char);
      } else {
        // valid closing character is the counterpart of the last pushed char
        const validClosingChar = getClosingChar(chars[chars.length - 1]);
        if (char !== validClosingChar) {
          // closing char is invalid -> line is corrupted
          invalidChars.push(char);
          break;
        } else {
          // char was closed properly, remove chunk form array
          chars.pop();
        }
      }
    }
  }

  let score = 0;
  invalidChars.forEach((char) => (score += getScoreForChar(char)));
  return score;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const missingClosingChars = [];

  for (const line of input) {
    const chars = [];
    let isCorruptedLine = false;
    for (let i = 0; i < line.length; i++) {
      const char = line.charAt(i);

      // push char to array until closing character is found
      if (isOpeningChar(char)) {
        chars.push(char);
      } else {
        // valid closing character is the counterpart of the last pushed char
        const validClosingChar = getClosingChar(chars[chars.length - 1]);
        if (char !== validClosingChar) {
          // closing char is invalid -> line is corrupted -> ignore line
          isCorruptedLine = true;
          break;
        } else {
          // char was closed properly, remove chunk form array
          chars.pop();
        }
      }
    }
    //only if line is not corrupted
    if (!isCorruptedLine) {
      // remaining opening characters are in chars array
      let closingString = '';
      for (let i = chars.length - 1; i >= 0; i--) {
        closingString += getClosingChar(chars[i]);
      }

      missingClosingChars.push(closingString);
    }
  }

  const scores = [];

  for (const closingString of missingClosingChars) {
    let score = 0;
    for (let i = 0; i < closingString.length; i++) {
      const char = closingString.charAt(i);
      score *= 5;
      score += getScoreForCharPart2(char);
    }
    scores.push(score);
  }

  scores.sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
};

run({
  part1: {
    tests: [
      {
        input: `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
