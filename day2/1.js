const inputdata = require('./input/data1')
let dive = inputdata.split('\n').filter(x => x);

let diveForward = 0;
let diveDown = 0;
let diveUp = 0;

for (let i = 0; i < dive.length; ++i) {
    let [word, number] = dive[i].split(" ");
    number = parseInt(number)

    if (word === "forward") {
        diveForward += number;
    } else if (word === "down") {
        diveDown += number;
    } else if (word === "up") {
        diveUp += number;
    }
    ;
}
;

console.log(diveForward);
console.log(diveDown);
console.log(diveUp);

let horizontalPos = diveForward;
let depthPos = diveUp - diveDown;
let multipliedPos = horizontalPos * depthPos;

console.log(multipliedPos);


