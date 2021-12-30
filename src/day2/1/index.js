const inputdata=require('./input_data')
var dive = inputdata.split('\n').filter(x => x);

var diveForward = 0;
var diveDown = 0;
var diveUp = 0;

for(var i = 0; i < dive.length; ++i) {
    var [word, number] = dive[i].split(" ");
    number = parseInt(number)

    if (word === "forward") {
        diveForward += number;
        console.log(diveForward);
    } else if (word === "down") {
        diveDown += number;
        console.log(diveDown);
    } else if (word === "up") {
        diveUp += number;
        console.log(diveUp);
    };
};

console.log(diveForward);
console.log(diveDown);
console.log(diveUp);

var horizontalPos = diveForward;
var depthPos = diveUp - diveDown;
var multipliedPos = horizontalPos * depthPos;

console.log(multipliedPos);


