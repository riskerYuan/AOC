const input = require("fs").readFileSync('./input/input.txt', "utf-8")

const MAX_VALUE = 1000;

function generateGrid() {
    const grid = [];
    for (let x = 0; x < MAX_VALUE; x++) {
        grid[x] = [];
        for (let y = 0; y < MAX_VALUE; y++) {
            grid[x][y] = 0;
        }
    }
    return grid;
}

function entriesToGrids(entries, withDiag) {
    entries = entries.replace(/ -> /g, ',').replace(/\s+/g, ',').split(',');
    const nbEntries = entries.length / 4;
    let i = 0;
    const grid = generateGrid();
    for (let iEntry = 0; iEntry < nbEntries; iEntry++) {
        const x1 = +entries[i++];
        const y1 = +entries[i++];
        const x2 = +entries[i++];
        const y2 = +entries[i++];
        if (x1 == x2 || y1 == y2) {
            let [xStart, xEnd] = x1 < x2 ? [x1, x2] : [x2, x1];
            let [yStart, yEnd] = y1 < y2 ? [y1, y2] : [y2, y1];
            for (let x = xStart; x <= xEnd; x++) {
                for (let y = yStart; y <= yEnd; y++) {
                    grid[x][y]++;
                }
            }
        } else if (withDiag) {
            const steps = Math.abs(x1 - x2) + 1;
            const signX = x1 < x2 ? 1 : -1;
            const signY = y1 < y2 ? 1 : -1;
            for (let step = 0; step < steps; step++) {
                grid[x1 + step * signX][y1 + step * signY]++;
            }
        }
    }
    return grid;
}

function countBiggerThan(grid, number) {
    let counter = 0;
    for (let x = 0; x < MAX_VALUE; x++) {
        for (let y = 0; y < MAX_VALUE; y++) {
            if (grid[x][y] > number) counter++;
        }
    }
    return counter;
}

// day 5  1
const grid = entriesToGrids(input, false);
console.log(countBiggerThan(grid, 1));

// day 5  2
const gridWithDiag = entriesToGrids(input, true);
console.log(countBiggerThan(gridWithDiag, 1));