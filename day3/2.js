const reportsStr=require('./input_data')

const reports= reportsStr.split('\n')

// day 3 1
function getBinaryCounters(reports) {
    const counters = new Array(12).fill(0);
    for (const report of reports) {
        const bits = report.split('');
        for (let i = 0; i < bits.length; i++) {
            if (bits[i] === '1') counters[i]++;
        }
    }
    let binaryGamma = '';
    let binaryEpsilon = '';
    for (const counter of counters) {
        binaryGamma += counter >= reports.length/2 ? '1' : '0';
        binaryEpsilon += counter < reports.length/2 ? '1' : '0';
    }
    return {binaryGamma, binaryEpsilon};
}

const {binaryGamma, binaryEpsilon} = getBinaryCounters(reports);
console.log(parseInt(binaryGamma, 2) * parseInt(binaryEpsilon, 2));



let oxygens = [...reports];
let steps = 0;
while (oxygens.length != 1) {
    const {binaryGamma} = getBinaryCounters(oxygens);
    oxygens = oxygens.filter(o2 => o2[steps] === binaryGamma[steps]);
    steps++;
}

let co2 = [...reports];
steps = 0;
while (co2.length != 1) {
    const {binaryEpsilon} = getBinaryCounters(co2);
    co2 = co2.filter(co2 => co2[steps] === binaryEpsilon[steps]);
    steps++;
}

console.log(parseInt(oxygens[0], 2) * parseInt(co2[0], 2));