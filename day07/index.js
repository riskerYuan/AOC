const crabs = require('./data').split(',')

const maxPos = Math.max(...crabs);

// day7 part 1
function fuelNeededForPositionPart1(pos, crabs) {
    let fuel = 0;
    for (const crab of crabs) {
        fuel += Math.abs(crab - pos);
    }
    return fuel;
}

// stupid brute force ( no median calculation |o/ )
let minFuel = Infinity;
for (let pos = 0; pos <= maxPos; pos++) {
    let fuel = fuelNeededForPositionPart1(pos, crabs)
    if (fuel < minFuel) minFuel = fuel;
}
console.log(minFuel);


// day7 part 2
function fuelNeededForPositionPart2(pos, crabs) {
    let fuel = 0;
    for (const crab of crabs) {
        let dist = Math.abs(crab - pos);
        fuel += dist * (dist + 1) / 2;
    }
    return fuel;
}
// stupid brute force ( no mean calculation |o/ )
minFuel = Infinity;
for (let pos = 0; pos <= maxPos; pos++) {
    let fuel = fuelNeededForPositionPart2(pos, crabs)
    if (fuel < minFuel) minFuel = fuel;
}
console.log(minFuel);