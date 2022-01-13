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
        binaryGamma += counter >= reports.length / 2 ? '1' : '0';
        binaryEpsilon += counter < reports.length / 2 ? '1' : '0';
    }
    return {binaryGamma, binaryEpsilon};
}

const reports = require("./input_data")
const {binaryGamma, binaryEpsilon} = getBinaryCounters(reports.split('\n'));
console.log(parseInt(binaryGamma, 2) * parseInt(binaryEpsilon, 2));