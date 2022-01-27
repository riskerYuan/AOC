const NB_GRIDS = 100;
const GRID_SIZE = 5;

const data = require('./input/input_data')
const numbers = data.num


const entries = data.data5.replace(/\n/gi, ' ')

function entriesToGrids(entries) {
    entries = entries.replace(/\s\s+/g, ' ').split(' ');
    let i = 0;
    const grids = [];
    for (let nb = 0; nb < NB_GRIDS; nb++) {
        grids[nb] = [];
        for (let row = 0; row < GRID_SIZE; row++) {
            grids[nb][row] = [];
            for (let col = 0; col < GRID_SIZE; col++) {
                grids[nb][row][col] = {
                    value: entries[i++],
                    checked: false
                }
            }
        }
    }
    return grids;
}

function checkNumberInGrid(number, grid) {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (grid[row][col].value == number) {
                grid[row][col].checked = true;
                return;
            }
        }
    }
}

function hasGridSolution(grid) {
    for (let row = 0; row < GRID_SIZE; row++) {
        let countRowChecked = 0;
        let countColChecked = 0;
        for (let col = 0; col < GRID_SIZE; col++) {
            if (grid[row][col].checked) countRowChecked++;
            if (grid[col][row].checked) countColChecked++;
        }
        if (countRowChecked == GRID_SIZE || countColChecked == GRID_SIZE) {
            return true;
        }
    }
    return false;
}

function getNumberAndGrid(numbers, grids) {
    for (const number of numbers) {
        for (const grid of grids) {
            checkNumberInGrid(number, grid);
            if (hasGridSolution(grid)) {
                return {grid, number};
            }
        }
    }
}

function getSumNotChecked(grid) {
    let sum = 0;
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (!grid[row][col].checked) {
                sum += +grid[row][col].value
            }
        }
    }
    return sum;
}

const grids = entriesToGrids(entries);

// day 4  1
const {grid, number} = getNumberAndGrid(numbers, grids);
console.log(getSumNotChecked(grid) * number);

// day 4  2
function getNumberAndLastWinningGrid(numbers, grids) {
    const winningGrids = [];
    for (const number of numbers) {
        const noWinningGrids = [];
        for (const grid of grids) {
            checkNumberInGrid(number, grid);
            if (hasGridSolution(grid)) {
                winningGrids.push([grid, number]);
            } else {
                noWinningGrids.push(grid);
            }
        }
        grids = noWinningGrids;
    }
    return winningGrids.pop();
}

const [lastWinnigGrid, lastNumber] = getNumberAndLastWinningGrid(numbers, grids);
console.log(getSumNotChecked(lastWinnigGrid) * lastNumber);