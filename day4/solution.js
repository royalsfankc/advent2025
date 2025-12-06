// Day 4 Solution - Paper Rolls

/**
 * Fetches the input file for Day 4
 * @returns {Promise<string>} The input file content
 */
async function fetchInput() {
    const response = await fetch('./day4/input.txt');
    if (!response.ok) {
        throw new Error('Failed to fetch input file');
    }
    return await response.text();
}

/**
 * Counts the number of paper rolls (@) in the 8 adjacent positions around a given cell
 * @param {string[]} grid - 2D array of characters representing the grid
 * @param {number} row - Row index of the cell
 * @param {number} col - Column index of the cell
 * @returns {number} Number of adjacent paper rolls (0-8)
 */
export function countAdjacentRolls(grid, row, col) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    // Check all 8 adjacent positions (up, down, left, right, and 4 diagonals)
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],  // top row
        [0, -1],           [0, 1],    // middle row (left and right)
        [1, -1],  [1, 0],  [1, 1]     // bottom row
    ];
    
    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        // Check if position is within bounds
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            if (grid[newRow][newCol] === '@') {
                count++;
            }
        }
    }
    
    return count;
}

/**
 * Checks if a paper roll at the given position can be accessed by a forklift
 * A roll can be accessed if there are fewer than 4 rolls in the 8 adjacent positions
 * @param {string[]} grid - 2D array of characters representing the grid
 * @param {number} row - Row index of the cell
 * @param {number} col - Column index of the cell
 * @returns {boolean} True if the roll can be accessed, false otherwise
 */
export function canAccessRoll(grid, row, col) {
    const adjacentCount = countAdjacentRolls(grid, row, col);
    return adjacentCount < 4;
}

/**
 * Solves Part 1: Count how many paper rolls can be accessed by forklifts
 * A roll can be accessed if there are fewer than 4 rolls in its 8 adjacent positions
 * @param {string} input - The puzzle input (grid of characters)
 * @returns {number} Number of accessible paper rolls
 */
export function solvePart1(input) {
    const lines = input.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) {
        return 0;
    }
    
    // Convert to 2D array
    const grid = lines.map(line => line.split(''));
    
    let accessibleCount = 0;
    
    // Check each cell in the grid
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            // Only check positions that have a paper roll (@)
            if (grid[row][col] === '@') {
                if (canAccessRoll(grid, row, col)) {
                    accessibleCount++;
                }
            }
        }
    }
    
    return accessibleCount;
}

/**
 * Puzzle metadata for Day 4
 */
export const puzzleInfo = {
    title: "Paper Rolls",
    description: "Rolls of paper (@) are arranged on a large grid. Forklifts can only access a roll if there are fewer than four rolls in the eight adjacent positions.",
    part1Description: "Count how many rolls of paper can be accessed by a forklift.",
    part2Description: "Part 2 not yet implemented",
    approach: {
        part1: "For each paper roll (@) in the grid, count the number of @ symbols in its 8 adjacent positions (including diagonals). If that count is less than 4, the roll is accessible. Sum up all accessible rolls.",
        part2: "Not yet implemented"
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
        const part2 = null; // Part 2 not yet implemented
        
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

