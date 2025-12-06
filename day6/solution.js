// Day 6 Solution - Trash Compactor

/**
 * Fetches the input file for Day 6
 * @returns {Promise<string>} The input file content
 */
async function fetchInput() {
    const response = await fetch('./day6/input.txt');
    if (!response.ok) {
        throw new Error('Failed to fetch input file');
    }
    return await response.text();
}

/**
 * Checks if a column is a separator (all spaces in all lines)
 * @param {number} col - Column index
 * @param {string[]} lines - All lines
 * @returns {boolean} True if column is all spaces
 */
function isSeparatorColumn(col, lines) {
    for (const line of lines) {
        if (col < line.length && line[col] !== ' ') {
            return false;
        }
    }
    return true;
}

/**
 * Parses the worksheet into columns (problems)
 * Each column represents a problem, separated by full columns of spaces
 * @param {string} input - The puzzle input
 * @returns {Array<{numbers: number[], operation: string}>} Array of problems
 */
export function parseWorksheet(input) {
    const lines = input.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) {
        return [];
    }
    
    // The last line contains the operations
    const operationLine = lines[lines.length - 1];
    const numberLines = lines.slice(0, -1);
    
    // Find the maximum width of all lines
    const maxWidth = Math.max(...lines.map(line => line.length));
    
    // Find all numbers in each line with their positions
    const lineNumbers = numberLines.map(line => {
        const numbers = [];
        const matches = line.matchAll(/\d+/g);
        for (const match of matches) {
            numbers.push({
                value: parseInt(match[0], 10),
                start: match.index,
                end: match.index + match[0].length - 1
            });
        }
        return numbers;
    });
    
    const problems = [];
    let col = 0;
    
    // Process columns, identifying problem columns (non-separator columns)
    while (col < maxWidth) {
        // Skip separator columns
        if (isSeparatorColumn(col, lines)) {
            col++;
            continue;
        }
        
        // This is the start of a problem column
        // Find the range of this problem (until next separator)
        let problemStart = col;
        let problemEnd = col;
        
        // Find the end of this problem column
        while (problemEnd < maxWidth && !isSeparatorColumn(problemEnd, lines)) {
            problemEnd++;
        }
        
        // Find the operation for this problem (in the operation line, within problem range)
        let operation = null;
        for (let i = problemStart; i < problemEnd && i < operationLine.length; i++) {
            const char = operationLine[i];
            if (char === '*' || char === '+') {
                operation = char;
                break;
            }
        }
        
        // Collect numbers from each line that overlap with this problem column range
        const problemNumbers = [];
        for (const lineNums of lineNumbers) {
            // Find the number in this line that overlaps with the problem column range
            for (const num of lineNums) {
                // Check if number overlaps with problem column range
                if (num.end >= problemStart && num.start < problemEnd) {
                    problemNumbers.push(num.value);
                    break; // Each line contributes at most one number per problem
                }
            }
        }
        
        if (problemNumbers.length > 0 && operation) {
            problems.push({ numbers: problemNumbers, operation });
        }
        
        col = problemEnd;
    }
    
    return problems;
}

/**
 * Solves a single problem by applying the operation to all numbers
 * @param {number[]} numbers - Array of numbers in the problem
 * @param {string} operation - The operation to apply ('*' or '+')
 * @returns {number} The result of the problem
 */
export function solveProblem(numbers, operation) {
    if (numbers.length === 0) {
        return 0;
    }
    
    if (operation === '*') {
        return numbers.reduce((acc, num) => acc * num, 1);
    } else if (operation === '+') {
        return numbers.reduce((acc, num) => acc + num, 0);
    } else {
        throw new Error(`Unknown operation: ${operation}`);
    }
}

/**
 * Reads a number from a column (top to bottom, most significant to least significant)
 * Stops at first non-digit or space
 * @param {number} col - Column index
 * @param {string[]} numberLines - Lines containing numbers (excluding operation line)
 * @returns {number|null} The number read from the column, or null if column is empty
 */
function readNumberFromColumn(col, numberLines) {
    let digits = '';
    for (const line of numberLines) {
        if (col < line.length) {
            const char = line[col];
            if (/\d/.test(char)) {
                digits += char;
            } else if (char !== ' ') {
                // Stop if we hit a non-digit, non-space character
                break;
            }
            // If it's a space, we continue (might be part of multi-line number)
        }
    }
    return digits.length > 0 ? parseInt(digits, 10) : null;
}

/**
 * Parses the worksheet for Part 2: numbers are written right-to-left in columns
 * Each number is in its own column, with most significant digit at top
 * @param {string} input - The puzzle input
 * @returns {Array<{numbers: number[], operation: string}>} Array of problems (right to left)
 */
export function parseWorksheetPart2(input) {
    const lines = input.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) {
        return [];
    }
    
    // The last line contains the operations
    const operationLine = lines[lines.length - 1];
    const numberLines = lines.slice(0, -1);
    
    // Find the maximum width of all lines
    const maxWidth = Math.max(...lines.map(line => line.length));
    
    const problems = [];
    let col = 0;
    
    // Process columns from left to right, but problems will be in right-to-left order
    while (col < maxWidth) {
        // Skip separator columns
        if (isSeparatorColumn(col, lines)) {
            col++;
            continue;
        }
        
        // This is the start of a problem
        // Find the range of this problem (until next separator)
        let problemStart = col;
        let problemEnd = col;
        
        // Find the end of this problem column range
        while (problemEnd < maxWidth && !isSeparatorColumn(problemEnd, lines)) {
            problemEnd++;
        }
        
        // Find the operation for this problem
        let operation = null;
        for (let i = problemStart; i < problemEnd && i < operationLine.length; i++) {
            const char = operationLine[i];
            if (char === '*' || char === '+') {
                operation = char;
                break;
            }
        }
        
        // Read numbers from each column in this problem (right to left within the problem)
        const problemNumbers = [];
        for (let c = problemEnd - 1; c >= problemStart; c--) {
            const num = readNumberFromColumn(c, numberLines);
            if (num !== null) {
                problemNumbers.push(num);
            }
        }
        
        if (problemNumbers.length > 0 && operation) {
            problems.push({ numbers: problemNumbers, operation });
        }
        
        col = problemEnd;
    }
    
    // Reverse to get right-to-left order
    return problems.reverse();
}

/**
 * Solves Part 1: Parse the worksheet and sum all problem answers
 * @param {string} input - The puzzle input (worksheet)
 * @returns {number} Grand total of all problem answers
 */
export function solvePart1(input) {
    const problems = parseWorksheet(input);
    
    let grandTotal = 0;
    
    for (const problem of problems) {
        const answer = solveProblem(problem.numbers, problem.operation);
        grandTotal += answer;
    }
    
    return grandTotal;
}

/**
 * Solves Part 2: Parse the worksheet with right-to-left column reading and sum all problem answers
 * @param {string} input - The puzzle input (worksheet)
 * @returns {number} Grand total of all problem answers
 */
export function solvePart2(input) {
    const problems = parseWorksheetPart2(input);
    
    let grandTotal = 0;
    
    for (const problem of problems) {
        const answer = solveProblem(problem.numbers, problem.operation);
        grandTotal += answer;
    }
    
    return grandTotal;
}

/**
 * Puzzle metadata for Day 6
 */
export const puzzleInfo = {
    title: "Trash Compactor",
    description: "Help a cephalopod with math homework. Problems are arranged vertically in columns, with operations at the bottom.",
    part1Description: "Parse the worksheet, solve each problem, and find the grand total of all answers.",
    part2Description: "Parse the worksheet with numbers written right-to-left in columns (each number in its own column, most significant digit at top). Solve each problem and find the grand total.",
    approach: {
        part1: "Parse the input by identifying columns (separated by full columns of spaces). For each column, extract numbers vertically and the operation from the bottom line. Solve each problem and sum all answers.",
        part2: "Parse columns as in Part 1, but read numbers from each column by reading digits top-to-bottom. Within each problem, read numbers right-to-left. Process problems right-to-left and sum all answers."
    }
};

/**
 * Main solve function that fetches input and solves both parts
 * @returns {Promise<Object>} Object with part1 and part2 answers
 */
export async function solve() {
    try {
        const input = await fetchInput();
        const part1 = solvePart1(input);
        const part2 = solvePart2(input);
        
        return {
            part1,
            part2,
            input,
            puzzleInfo
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}

