let data = require('./input/data2')

data = data.split('\n').map(item => parseInt(item.trim()))
let total = 0

for (let index = 0; index < data.length - 3; index++) {
    const pre = data[index] + data[index + 1] + data[index + 2]
    const current = data[index + 1] + data[index + 2] + data[index + 3]
    if (current > pre) {
        total++
    }
}
console.log(total);