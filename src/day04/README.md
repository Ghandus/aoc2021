# 🎄 Advent of Code 2021 - day 4 🎄

## Info

Task description: [link](https://adventofcode.com/2021/day/4)

## Notes
parseInput converts the input boards to the following structure:

Array containing all boards
[
    Each Array represents one board
    [
        Each Array represents the first row
        [
            Each Object represents one number in the row, together with the marked attribute
            {number: x, marked: false},
            Number 2 in Row 1
            {number: x, marked: false},
            Number 3 in Row 1
            {number: x, marked: false},
            Number 4 in Row 1
            {number: x, marked: false},
            Number 5 in Row 1
            {number: x, marked: false}
        ],
        Row 2
        [],
        Row 3
        [],
        Row 4
        []
    ],
    Board 2
    [],
    Board 3
    []
]
...