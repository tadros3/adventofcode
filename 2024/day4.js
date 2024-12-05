const readline = require('readline');
const fs = require('fs');

const rows = [];

const readInterface = readline.createInterface({
  input: fs.createReadStream('day4.txt'),
  console: false
});
readInterface.on('line', function(line) {
  rows.push(line);
});
readInterface.on('close', () => {
  part1();
  part2();
});

const part1conditions = [
  (x,y) => y < rows[0].length - 3 && rows[x][y] === 'X' && rows[x][y+1] === 'M' && rows[x][y+2] === 'A' && rows[x][y+3] === 'S',
  (x,y) => y < rows[0].length - 3 && x < rows.length - 3 && rows[x][y] === 'X' && rows[x+1][y+1] === 'M' && rows[x+2][y+2] === 'A' && rows[x+3][y+3] === 'S',
  (x,y) => x < rows.length - 3 && rows[x][y] === 'X' && rows[x+1][y] === 'M' && rows[x+2][y] === 'A' && rows[x+3][y] === 'S',
  (x,y) => y > 2 && x < rows.length - 3 && rows[x][y] === 'X' && rows[x+1][y-1] === 'M' && rows[x+2][y-2] === 'A' && rows[x+3][y-3] === 'S',
  (x,y) => y > 2 && rows[x][y] === 'X' && rows[x][y-1] === 'M' && rows[x][y-2] === 'A' && rows[x][y-3] === 'S',
  (x,y) => y > 2 && x > 2 && rows[x][y] === 'X' && rows[x-1][y-1] === 'M' && rows[x-2][y-2] === 'A' && rows[x-3][y-3] === 'S',
  (x,y) => x > 2 && rows[x][y] === 'X' && rows[x-1][y] === 'M' && rows[x-2][y] === 'A' && rows[x-3][y] === 'S',
  (x,y) => y < rows[0].length - 3 && x > 2 && rows[x][y] === 'X' && rows[x-1][y+1] === 'M' && rows[x-2][y+2] === 'A' && rows[x-3][y+3] === 'S',
];

const part2conditions = [
  (x,y) => rows[x-1][y-1] === 'M' && rows[x+1][y+1] === 'S' && rows[x-1][y+1] === 'M' && rows[x+1][y-1] === 'S',
  (x,y) => rows[x-1][y-1] === 'M' && rows[x+1][y+1] === 'S' && rows[x-1][y+1] === 'S' && rows[x+1][y-1] === 'M',
  (x,y) => rows[x-1][y-1] === 'S' && rows[x+1][y+1] === 'M' && rows[x-1][y+1] === 'M' && rows[x+1][y-1] === 'S',
  (x,y) => rows[x-1][y-1] === 'S' && rows[x+1][y+1] === 'M' && rows[x-1][y+1] === 'S' && rows[x+1][y-1] === 'M',
]

const part1 = () => {
  let count = 0;
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[0].length; y++) {
      part1conditions.forEach(c => {
        if (c(x, y)) {
          count++;
        }
      });
    }
  }
  console.log(count);
};

const part2 = () => {
  let count = 0;
  for (let x = 1; x < rows.length-1; x++) {
    for (let y = 1; y < rows[0].length-1; y++) {
      part2conditions.forEach(c => {
        if (rows[x][y] === 'A' && c(x, y)) {
          count++;
        }
      });
    }
  }
  console.log(count);
};