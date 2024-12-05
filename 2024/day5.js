const readline = require('readline');
const fs = require('fs');

const rules = [];
const manuals = [];

const readInterface = readline.createInterface({
  input: fs.createReadStream('day5.txt'),
  console: false
});
readInterface.on('line', function(line) {
  if (line.includes('|')) {
    rules.push(line.split('|'));
  } else if (line.includes(',')) {
    manuals.push(line.split(','));
  }
});
readInterface.on('close', () => {
  part1();
  part2();
});

const buildMap = () => {
  const map = {};
  rules.forEach(rule => {
    if (!Object.keys(map).includes(rule[0])) {
      map[rule[0]] = {
        before: [],
        after: []
      };
    }
    if (!Object.keys(map).includes(rule[1])) {
      map[rule[1]] = {
        before: [],
        after: []
      };
    }
    map[rule[0]].after.push(rule[1]);
    map[rule[1]].before.push(rule[0]);
  });
  return map;
}

const isValid = (m, map) => {
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m.length - 1; j++) {
      if ((i < j && !map[m[i]].after.includes(m[j])) || (i > j && !map[m[i]].before.includes(m[j]))) {
        return 0;
      }
    }
  }
  return +m[Math.floor(m.length / 2)];
}

const part1 = () => {
  const map = buildMap();
  let sum = 0;
  manuals.forEach(m => {
    sum += isValid(m, map);
  });
  console.log(sum);
};

const swap = (m, i, j) => {
  const newArr = [...m];
  const temp = newArr[i];
  newArr[i] = newArr[j];
  newArr[j] = temp;
  return newArr;
}

const fixBroken = (m, map) => {
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m.length - 1; j++) {
      if ((i < j && !map[m[i]].after.includes(m[j])) || (i > j && !map[m[i]].before.includes(m[j]))) {
        return fixBroken(swap(m,i,j), map);
      }
    }
  }
  return +m[Math.floor(m.length / 2)];
}

const part2 = () => {
  const map = buildMap();
  let sum = 0;
  manuals.forEach(m => {
    if (!isValid(m, map)) {
      sum += fixBroken([...m], map);
    }
  });
  console.log(sum);
};