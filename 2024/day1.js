const readline = require('readline');
const fs = require('fs');

const left = [];
const right = [];

const readInterface = readline.createInterface({
  input: fs.createReadStream('day1.txt'),
  output: process.stdout,
  console: false
});
readInterface.on('line', function(line) {
  left.push(line.split(',')[0]);
  right.push(line.split(',')[1]);
});
readInterface.on('close', () => {
  part1();
  part2();
});

const part1 = () => {
  const sortFn = (a, b) => a - b;
  left.sort(sortFn);
  right.sort(sortFn);
  
  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(right[i] - left[i]);
  }
  
  console.log('part1', sum);
}

const part2 = () => {
  const rightFrequency = {};
  right.forEach(num => {
    if (Object.keys(rightFrequency).includes(num)) {
      rightFrequency[num]++;
    } else {
      rightFrequency[num] = 1;
    }
  });
  let similarity = 0;
  left.forEach(num => {
    if (Object.keys(rightFrequency).includes(num)) {
      similarity += num * rightFrequency[num];
    }
  });
  console.log('part2', similarity);
}