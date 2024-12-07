const readline = require('readline');
const fs = require('fs');

const map = [];

const readInterface = readline.createInterface({
  input: fs.createReadStream('day6.txt'),
  console: false
});
readInterface.on('line', function(line) {
  map.push(line.split(''));
});
readInterface.on('close', () => {
  // part1();
  part2();
});

const copyMap = () => {
  const newMap = [];
  map.forEach(m => {
    newMap.push([...m]);
  });
  return newMap;
}

const part1 = () => {
  const copy = copyMap();
  let [x, y] = [49,47];
  let guard = '^';
  let inRoom = true;
  while (inRoom) {
    copy[x][y] = 'X';
    if (guard === '^') {
      inRoom = x !== 0;
      if (inRoom) {
        guard = copy[x-1][y] === '#' ? '>' : '^';
        guard === '^' ? x-- : y++;
      }
    } else if (guard === '>') {
      inRoom = y !== copy[x].length - 1;
      if (inRoom) {
        guard = copy[x][y+1] === '#' ? 'v' : '>';
        guard === '>' ? y++ : x++;
      }
    } else if (guard === 'v') {
      inRoom = x !== copy.length - 1;
      if (inRoom) {
        guard = copy[x+1][y] === '#' ? '<' : 'v';
        guard === 'v' ? x++ : y--;
      }
    } else if (guard === '<') {
      inRoom = y !== 0;
      if (inRoom) {
        guard = copy[x][y-1] === '#' ? '^' : '<';
        guard === '<' ? y-- : x--;
      }
    } 
  }
  console.log(visitedSpaces(copy));
};

const visitedSpaces = m => {
  let sum = 0;
  m.forEach(r => {
    r.forEach(space => {
      if (space === 'X') sum++;
    });
  });
  return sum;
}

const coordsFound = (list, coords, dir) => {
  // console.log('searching...', list, dir, list[dir]);
  return list[dir].some(a => coords.every((v, i) => v === a[i]));
};

const part2 = () => {
  let sum = 0;
  map.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === '.') {
        const copy = copyMap();
        copy[i][j] = '#';
        // console.log('new obstacle', i, j);
        let [x, y] = [49,47];
        let guard = '^';
        let inRoom = true;
        const foundBarriers = {
          '^': [],
          '>': [],
          'v': [],
          '<': [],
        };
        let counter = 0;
        while (inRoom && counter++ < 130*130) {
          if (guard === '^') {
            inRoom = x !== 0;
            if (inRoom) {
              const barrierHit = copy[x-1][y] === '#';
              if (barrierHit) {
                // console.log('hit barrier up', foundBarriers);
                if (coordsFound(foundBarriers, [x-1, y], guard)) {
                  // sum++;
                  // break;
                } else {
                  foundBarriers[guard].push([x-1, y]);
                }
              }
              guard = barrierHit ? '>' : '^';
              guard === '^' ? x-- : y++;
            }
          } else if (guard === '>') {
            inRoom = y !== copy[x].length - 1;
            if (inRoom) {
              const barrierHit = copy[x][y+1] === '#';
              if (barrierHit) {
                // console.log('hit barrier right', foundBarriers);
                if (coordsFound(foundBarriers, [x,y+1], guard)) {
                  // sum++;
                  // break;
                } else {
                  foundBarriers[guard].push([x,y+1]);
                }
              }
              guard = barrierHit ? 'v' : '>';
              guard === '>' ? y++ : x++;
            }
          } else if (guard === 'v') {
            inRoom = x !== copy.length - 1;
            if (inRoom) {
              const barrierHit = copy[x+1][y] === '#';
              if (barrierHit) {
                // console.log('hit barrier down', foundBarriers);
                if (coordsFound(foundBarriers, [x+1,y], guard)) {
                  // sum++;
                  // break;
                } else {
                  foundBarriers[guard].push([x+1,y]);
                }
              }
              guard = barrierHit ? '<' : 'v';
              guard === 'v' ? x++ : y--;
            }
          } else if (guard === '<') {
            inRoom = y !== 0;
            if (inRoom) {
              const barrierHit = copy[x][y-1] === '#';
              if (barrierHit) {
                // console.log('hit barrier left', foundBarriers);
                if (coordsFound(foundBarriers, [x,y-1], guard)) {
                  // sum++;
                  // break;
                } else {
                  foundBarriers[guard].push([x,y-1]);
                }
              }
              guard = barrierHit ? '^' : '<';
              guard === '<' ? y-- : x--;
            }
          } 
        }
        if (inRoom) sum++;
        // console.log('current sum', sum);
      }
    })
  });
  console.log(sum);
};