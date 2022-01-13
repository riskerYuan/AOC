function exe(data) {
    const arr = data.split('\n')
    console.log(arr.length);
    console.log(deep(arr));
}

function deep(arr) {
    let deepNumber = 0
    for (let i = 0; i < arr.length-1; i++) {
        console.log(typeof arr [i])
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

const input_data = require('./data1')
const test1 = require('./test1')

exe(input_data)
//exe(test1)