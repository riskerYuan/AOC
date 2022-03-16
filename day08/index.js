// 4 digit output value
const NB_OUTPUT_DIGITS = 4;
// Each of the ten digit segments
const DIGIT_SIZE = [
    6, // 0 has 6 segments
    2, // 1 has 2 segments
    5, // 2 has 5 segments
    5, // 3 has 5 segments
    4, // 4 has 4 segments
    5, // 5 has 5 segments
    6, // 6 has 6 segments
    3, // 7 has 3 segments
    7, // 8 has 7 segments
    6, // 9 has 6 segments
];

const input = require('./data.js')
function parseInput(input) {
    input = input.replace(/ \| /g, ' ').split(' ');
    const nbInputs = input.length / (10 + NB_OUTPUT_DIGITS);
    let i = 0;
    const entries = [];
    for (let inputNum = 0; inputNum < nbInputs; inputNum++) {
        const curentInput = {signals: [], outputs: []};
        for (let signal = 0; signal< 10; signal++) {
            curentInput.signals.push(input[i++]);
        }
        for (let digit = 0; digit< NB_OUTPUT_DIGITS; digit++) {
            curentInput.outputs.push(input[i++]);
        }
        entries.push(curentInput);
    }
    return entries;
}

const entries = parseInput(input);

// day09 8 part 1: In the output values, how many times do digits 1, 4, 7, or 8 appear?
const digitsSize = [1, 4, 7, 8].map(d => DIGIT_SIZE[d]);

let count = 0;
for (const entrie of entries) {
    const {outputs} = entrie;
    for (const digit of outputs) {
        if (digitsSize.includes(digit.length)) count++;
    }
}
console.log(count);

// day09 8 part 2
function countSimilarSeg(digitA, digitB) {
    let countSimSeg = 0;
    for (const seg of digitB.split('')) {
        if (digitA.includes(seg)) countSimSeg++;
    }
    return countSimSeg;
}

let sum = 0;
for (const entrie of entries) {
    const {signals, outputs} = entrie;
    const digitsSolution = new Array(10).fill('');

    // solve 1 4 7 8: the easy part !
    for (const signal of signals) {
        [1, 4, 7, 8].forEach(d => {
            if (signal.length == DIGIT_SIZE[d]) digitsSolution[d] = signal;
        });
    }

    //solve 3: must have the correct size AND include all the 3 segments of the 7 digit
    for (let signal of signals) {
        if (signal.length == DIGIT_SIZE[3]) {
            if (countSimilarSeg(signal, digitsSolution[7]) == 3) {
                digitsSolution[3] = signal;
            }
        }
    }

    // solve 2: must have the correct size AND not be the 3 solution AND have only 2 segments the same as the digit 4
    for (let signal of signals) {
        if (signal.length == DIGIT_SIZE[2] && signal != digitsSolution[3]) {
            if (countSimilarSeg(signal, digitsSolution[4]) == 2) {
                digitsSolution[2] = signal;
            }
        }
    }

    // solve 5: must have the correct size AND is not the 3 solution AND is not the 2 solution
    for (let signal of signals) {
        if (signal.length == DIGIT_SIZE[5] && signal != digitsSolution[3]  && signal != digitsSolution[2]) {
            digitsSolution[5] = signal;
        }
    }

    // solve 6: must have the correct size AND have only 1 segments the same as the digit 1
    for (let signal of signals) {
        if (signal.length == DIGIT_SIZE[6]) {
            if (countSimilarSeg(signal, digitsSolution[1]) == 1) {
                digitsSolution[6] = signal;
            }
        }
    }

    // solve 0: must have the correct size AND not be 6 solution AND have only 3 segments the same as the digit 4
    for (let signal of signals) {
        if (signal.length == DIGIT_SIZE[0] && signal != digitsSolution[6]) {
            if (countSimilarSeg(signal, digitsSolution[4]) == 3) {
                digitsSolution[0] = signal;
            }
        }
    }

    //solve 9: must have the correct size AND not be 6 solution AND not be the 0 solution
    for (let signal of signals) {
        if (signal.length == DIGIT_SIZE[9] && signal != digitsSolution[6]  && signal != digitsSolution[0]) {
            digitsSolution[9] = signal;
        }
    }

    // sort solutions and outputs digits with same orders
    for (let i = 0; i < 10; i++) {
        digitsSolution[i] = digitsSolution[i].split('').sort().join('');
    }
    for (let i = 0; i < NB_OUTPUT_DIGITS; i++) {
        outputs[i] = outputs[i].split('').sort().join('');
    }

    // We can finnaly calculate the output !
    let solution = '';
    for (const digit of outputs) {
        solution += digitsSolution.indexOf(digit);
    }

    sum += parseInt(solution);
}

console.log(sum);