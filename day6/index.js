const fishes = require('./input/data')

function getNbFishesAfterXDays(days, fishes) {
    let giveBirthInXdays = new Array(9).fill(0);
    for (const fish of fishes) {
        giveBirthInXdays[fish]++;
    }
    for (let day=0; day < days; day++) {
        let babies = giveBirthInXdays[0];
        for (let i = 0; i < 8; i++) {
            giveBirthInXdays[i] = giveBirthInXdays[i+1];
        }
        giveBirthInXdays[6] += babies;
        giveBirthInXdays[8] = babies;
    }
    return giveBirthInXdays.reduce((acc, val) => acc + val);
}

// day 6 part 1
console.log(getNbFishesAfterXDays(80, fishes));

// day 6 part 2
console.log(getNbFishesAfterXDays(256, fishes));