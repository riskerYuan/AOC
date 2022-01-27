function exe(data) {
    const arr = data.split('\n')
}

function deep(arr) {
    let deepNumber = 0
    for (let i = 0; i < arr.length - 1; i++) {
        if (parseInt(arr[i]) < parseInt(arr[i + 1])) {
            deepNumber++
        }
    }
    // arr.forEach((e, i) => {
    //    if(i>0&&parseInt(arr[i])>parseInt(arr[i-1])){
    //        deepNumber++
    //    }
    // });
    return deepNumber
}

const input_data = require('./input/data1')
const test1 = require('./test1')

exe(input_data)
//exe(test1)