const inputs = require('./data');

const LEGAL = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>']
]);

const SCORE_PART1 = new Map([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137]
]);

const SCORE_PART2 = new Map([
    [')', 1],
    [']', 2],
    ['}', 3],
    ['>', 4]
]);

let chunks = inputs.split('\n');

// day 10 part 1
function getFirstCorruptedChar(chunk) {
    const opensWith = [];
    for (const char of chunk) {
        if (LEGAL.has(char)) {
            opensWith.push(char);
        } else {
            const lastOpenChar = opensWith.pop();
            if (char != LEGAL.get(lastOpenChar)) {
                return char;
            }
        }
    }
    return false;
}

let sum = 0;
for (const chunk of chunks) {
    const corrupted = getFirstCorruptedChar(chunk);
    if (corrupted) sum += SCORE_PART1.get(corrupted);
}
console.log(sum);

// day 10 part 2
chunks = chunks.filter(chunk => !getFirstCorruptedChar(chunk));

function getGetMissingClosingTags(chunk) {
    const opensWith = [];
    for (const char of chunk) {
        if (LEGAL.has(char)) {
            opensWith.push(char);
        } else {
            opensWith.pop();
        }
    }
    return opensWith.map(char => LEGAL.get(char)).reverse();
}

function computeScore(closingTags) {
    let score = 0;
    for (const char of closingTags) {
        score *= 5;
        score += SCORE_PART2.get(char);
    }
    return score;
}

let scores = [];
for (const chunk of chunks) {
    const closingTags = getGetMissingClosingTags(chunk);
    scores.push(computeScore(closingTags));
}
scores.sort((a, b) => a - b);
console.log(scores[scores.length/2 - 0.5]);