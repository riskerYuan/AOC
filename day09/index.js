const MAT_EDGE = 100; // the Matrix have 100 rows and 100 cols

const input = require('./data')
console.log(input);

function inputToMatrix(input) {
    input = input.replace(/\s+/g, '');
    const matrix = [];
    let i = 0;
    for (let row = 0; row < MAT_EDGE; row++) {
        matrix[row] = [];
        for (let col = 0; col < MAT_EDGE; col++) {
            matrix[row][col] = +input[i++];
        }
    }
    return matrix;
}

// day 9 part 1

function hasGreaterNeighborhs(matrix, row, col) {
    let cellValue = matrix[row][col];

    // Von Neuman Neighborhs
    const up = {row: row - 1, col};
    const down = {row: row + 1, col};
    const left = {row, col: col - 1};
    const right = {row, col: col + 1};
    const neighbors = [];
    if (up.row >= 0) neighbors.push(up);
    if (down.row < MAT_EDGE) neighbors.push(down);
    if (left.col >= 0) neighbors.push(left);
    if (right.col < MAT_EDGE) neighbors.push(right);

    let count = 0;
    for (const {row, col} of neighbors) {
        if (matrix[row][col] > cellValue) count++
    }

    return count === neighbors.length;
}

function getLowPoints(matrix) {
    const lowPoints = [];
    for (let row = 0; row < MAT_EDGE; row++) {
        for (let col = 0; col < MAT_EDGE; col++) {
            if (hasGreaterNeighborhs(matrix, row, col)) {
                lowPoints.push({row, col});
            }
        }
    }
    return lowPoints;
}

const matrix = inputToMatrix(input);
const lowPoints = getLowPoints(matrix);
let sum = 0;
for (const {row, col} of lowPoints) {
    sum += matrix[row][col] + 1;
}
console.log(sum);

// day 9 part 2
function getAllBasinsSize(matrix, lowPoints) {
    const sizes = [];
    for (const lowPoint of lowPoints) {
        // Use the classical breadth First Search for "flooding" the bassin
        const basins = breadthFirstSearch(matrix, lowPoint);
        sizes.push(basins.size);
    };
    return sizes;
}

// great Breadth First Search example here: https://www.redblobgames.com/pathfinding/tower-defense/
function breadthFirstSearch(matrix, coord) {
    const frontier = [];
    frontier.push(coord);
    const reached = new Set();
    reached.add(hashCoord(coord));
    while (frontier.length != 0) {
        const current = frontier.pop();
        for (const neighbor of getFloodableNeighborhs(matrix, current)) {
            if (!reached.has(hashCoord(neighbor))) {
                frontier.push(neighbor);
                reached.add(hashCoord(neighbor));
            }
        }
    }
    return reached;
}

// lazy row col hashing :)
function hashCoord({row, col}) {
    return `{${row},${col}}`;
}


function getFloodableNeighborhs(matrix, {row, col}) {
    let cellValue = matrix[row][col];

    // Von Neuman Neighborhs
    const up = {row: row - 1, col};
    const down = {row: row + 1, col};
    const left = {row, col: col - 1};
    const right = {row, col: col + 1};

    const neighbors = [];
    if (up.row >= 0 && isFloodable(matrix[up.row][up.col], cellValue)) {
        neighbors.push(up);
    }
    if (down.row < MAT_EDGE && isFloodable(matrix[down.row][down.col], cellValue)) {
        neighbors.push(down);
    }
    if (left.col >= 0 && isFloodable(matrix[left.row][left.col], cellValue)) {
        neighbors.push(left);
    }
    if (right.col < MAT_EDGE && isFloodable(matrix[right.row][right.col], cellValue)) {
        neighbors.push(right);
    }

    return neighbors;
}

// A cell is floodable if it is higer than the actual cell but not a 9
function isFloodable(cellValue, fromCellValue) {
    return cellValue > fromCellValue && cellValue != 9;
}

const sizes = getAllBasinsSize(matrix, lowPoints);
sizes.sort((a, b) => b - a);
console.log(sizes[0] * sizes[1] * sizes[2]);