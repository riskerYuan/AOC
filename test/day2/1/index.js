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
        // test log incoming to see if THIS HECKIN WORKS
        console.log(diveForward);
    } else if (word === "down") {
        diveDown += number;
        // test log incoming to see if THIS HECKIN WORKS
        console.log(diveDown);
    } else if (word === "up") {
        diveUp += number;
        // test log incoming to see if THIS HECKIN WORKS
        console.log(diveUp);
    };
};

// I'm sorry dear trees but more DOES THIS HECKIN WORK logs incoming
console.log(diveForward);
console.log(diveDown);
console.log(diveUp);

// Now the actual work
var horizontalPos = diveForward;
var depthPos = diveUp - diveDown;
var multipliedPos = horizontalPos * depthPos;

// GIMME ANSWER PLZ
console.log(multipliedPos);


