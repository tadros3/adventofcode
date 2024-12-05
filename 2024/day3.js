var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('day3.txt')
});

const lines = [];

lineReader.on('line', function (line) {
  lines.push(line);
});

lineReader.on('close', function () {
  console.log(part1());
  console.log(part2());
});

const part1 = () => {
  let sum = 0;
  lines.forEach(ln => {
      const muls = [...ln.matchAll(/mul\(\d+\,\d+\)/g)];
      muls.forEach(mul => {
          sum += multiply(mul.toString());
      });
  });
  return sum;
}

const part2 = () => {
  let sum = 0;
  let active = true;
  lines.forEach(ln => {
      const muls = [...ln.matchAll(/(mul\(\d+\,\d+\))|(do\(\))|(don\'t\(\))/g)];
      muls.forEach(mul => {
          const mulStr = mul[0];
          console.log(mulStr);
          if (active && mulStr.includes('mul')) {
              sum += multiply(mulStr);
          } else if (active && mulStr === "don't()") {
              active = false;
          } else if (!active && mulStr === 'do()') {
              active = true;
          }
      })
      console.log('EOL');
  });
  return sum;
}

const multiply = mul => {
  const commaIndex = mul.indexOf(',');
  const closeIndex = mul.indexOf(')');
  const firstNum = +mul.substring(4, commaIndex);
  const secondNum = +mul.substring(commaIndex + 1, closeIndex);
  console.log(firstNum, secondNum);
  return firstNum * secondNum;
};