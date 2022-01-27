let data = require('./input/data2')
data = data.split('\n')

data = data.map(item => {
    const arr = item.split(' ')
    return {target: arr[0], index: arr[1]}
})

let forwardTotal = 0
let downTotal = 0
let deepTotal = 0

for (let i = 0; i < data.length; i++) {
    const target = data[i].target
    const index = parseInt(data[i].index)
    if (target === 'forward') {
        forwardTotal += index
        if (downTotal > 0) {
            deepTotal += index * downTotal
        }
    }
    if (target === 'down') {
        downTotal += index
    }
    if (target === 'up') {
        downTotal -= index
    }
}
console.log(forwardTotal * deepTotal)