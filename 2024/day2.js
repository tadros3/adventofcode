const readline = require('readline');
const fs = require('fs');

const reports = [];

const readInterface = readline.createInterface({
  input: fs.createReadStream('day2.txt'),
  output: process.stdout,
  console: false
});
readInterface.on('line', function(line) {
  reports.push(line);
});
readInterface.on('close', () => {
  part1();
  part2();
});

const scanReport = (r, dampener) => {
  const vals = r.split(' ');
  let isSafe = true;
  const asc = vals[1] - vals[0] > 0 ? 1 : -1;
  let badLevelFound = false;
  let index = -1;
  for (let i = 0; i < vals.length - 1; i++) {
    const diff = vals[i + 1] - vals[i];
    const isBadLevel = diff * asc <= 0 || Math.abs(diff) > 3;
    if (isBadLevel && dampener) {
      badLevelFound = true;
      index = i;
      console.log('bad pre-dampened', r);
      break;
    } else if (isBadLevel) {
      isSafe = false;
      console.log('bad', r);
      break;
    }
  }
  if (badLevelFound) {
    let retrySafe = 0;
    for (let i = 0; i < vals.length; i++) {
      const removed = vals.slice(0, i).concat(vals.slice(i + 1));
      retrySafe += scanReport(removed.join(' '), false);
    }
    return retrySafe > 0 ? 1 : 0;
  }
  return isSafe ? 1 : 0;
};

const part1 = () => {
  let safe = 0;
  reports.forEach(r => safe += scanReport(r, false));
  console.log('part1', safe);
};

const part2 = () => {
  let safe = 0;
  reports.forEach(r => safe += scanReport(r, true));
  console.log('part2', safe);
};