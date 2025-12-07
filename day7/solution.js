// Day 7 Solution - Tachyon Manifold

/**
 * Fetches the input file for Day 7
 * @returns {Promise<string>} The input file content
 */
async function fetchInput() {
    const response = await fetch('./day7/input.txt');
    if (!response.ok) {
        throw new Error('Failed to fetch input file');
    }
    return await response.text();
}

/**
 * Finds the starting position (S) in the grid
 * @param {string[]} grid - 2D array of characters
 * @returns {{row: number, col: number}|null} Starting position or null if not found
 */
export function findStartPosition(grid) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 'S') {
                return { row, col };
            }
        }
    }
    return null;
}

/**
 * Simulates tachyon beam propagation and counts splits
 * Beams move downward, pass through empty space, and split at splitters (^)
 * @param {string[]} grid - 2D array of characters representing the manifold
 * @returns {number} Total number of times the beam is split
 */
export function simulateBeamPropagation(grid) {
    if (grid.length === 0) {
        return 0;
    }
    
    const startPos = findStartPosition(grid);
    if (!startPos) {
        return 0;
    }
    
    const rows = grid.length;
    const cols = grid[0].length;
    
    // Track active beams: Set of positions (row, col) that have active beams
    let activeBeams = new Set();
    activeBeams.add(`${startPos.row},${startPos.col}`);
    
    // Track which splitters have been hit (to avoid double-counting splits)
    const hitSplitters = new Set();
    
    let splitCount = 0;
    
    // Simulate step by step
    while (activeBeams.size > 0) {
        const nextBeams = new Set();
        
        // Process each active beam
        for (const beamKey of activeBeams) {
            const [row, col] = beamKey.split(',').map(Number);
            
            // Move beam downward
            const nextRow = row + 1;
            
            // Check if beam exits the grid
            if (nextRow >= rows) {
                continue; // Beam exits, don't add to nextBeams
            }
            
            // Check what's at the next position
            const nextChar = grid[nextRow][col];
            
            if (nextChar === '.') {
                // Empty space - beam continues
                nextBeams.add(`${nextRow},${col}`);
            } else if (nextChar === '^') {
                // Splitter - beam stops, two new beams emitted left and right
                const splitterKey = `${nextRow},${col}`;
                
                // Only count split if this splitter hasn't been hit yet
                if (!hitSplitters.has(splitterKey)) {
                    hitSplitters.add(splitterKey);
                    splitCount++;
                }
                
                // Emit beam to the left (at the same row as splitter, will move down next step)
                if (col > 0) {
                    nextBeams.add(`${nextRow},${col - 1}`);
                }
                
                // Emit beam to the right (at the same row as splitter, will move down next step)
                if (col < cols - 1) {
                    nextBeams.add(`${nextRow},${col + 1}`);
                }
            }
            // If nextChar is something else (like '|' or another beam), we ignore it
            // The problem says beams pass through empty space and stop at splitters
        }
        
        activeBeams = nextBeams;
    }
    
    return splitCount;
}

/**
 * Solves Part 1: Count how many times the tachyon beam is split
 * @param {string} input - The puzzle input (manifold diagram)
 * @returns {number} Number of times the beam is split
 */
export function solvePart1(input) {
    const lines = input.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) {
        return 0;
    }
    
    // Convert to 2D array
    const grid = lines.map(line => line.split(''));
    
    return simulateBeamPropagation(grid);
}

/**
 * Puzzle metadata for Day 7
 */
export const puzzleInfo = {
    title: "Tachyon Manifold",
    description: "A tachyon beam enters at S and moves downward. It passes through empty space (.) but splits at splitters (^), creating two new beams to the left and right.",
    part1Description: "Count how many times the beam is split as it propagates through the manifold.",
    part2Description: "Part 2 not yet implemented",
    approach: {
        part1: "Simulate beam propagation step by step. Start at S, move beams downward. When a beam hits a splitter (^), stop it and emit two new beams left and right. Track which splitters have been hit to count splits correctly. Continue until all beams exit the grid.",
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

