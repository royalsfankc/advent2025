// Day 1 Solution - Safe Dial Password

/**
 * Fetches the input file for Day 1
 * @returns {Promise<string>} The input file content
 */
async function fetchInput() {
    const response = await fetch('./day1/day1input.txt');
    if (!response.ok) {
        throw new Error('Failed to fetch input file');
    }
    return await response.text();
}

/**
 * Parses a rotation string into direction and distance
 * @param {string} rotationString - Rotation string like "L68" or "R48"
 * @returns {{direction: string, distance: number}} Parsed rotation object
 */
export function parseRotation(rotationString) {
    const trimmed = rotationString.trim();
    if (!trimmed) {
        throw new Error('Empty rotation string');
    }
    
    const direction = trimmed[0];
    if (direction !== 'L' && direction !== 'R') {
        throw new Error(`Invalid direction: ${direction}`);
    }
    
    const distance = parseInt(trimmed.slice(1), 10);
    if (isNaN(distance)) {
        throw new Error(`Invalid distance: ${trimmed.slice(1)}`);
    }
    
    return { direction, distance };
}

/**
 * Applies a rotation to the current dial position
 * @param {number} currentPosition - Current dial position (0-99)
 * @param {{direction: string, distance: number}} rotation - Rotation to apply
 * @returns {number} New dial position (0-99)
 */
export function applyRotation(currentPosition, rotation) {
    let newPosition;
    
    if (rotation.direction === 'L') {
        // Left: subtract distance (wrap around if negative)
        newPosition = currentPosition - rotation.distance;
    } else {
        // Right: add distance (wrap around if >= 100)
        newPosition = currentPosition + rotation.distance;
    }
    
    // Handle wrap-around using modulo arithmetic
    // Add 100 before modulo to handle negative numbers correctly
    return ((newPosition % 100) + 100) % 100;
}

/**
 * Solves Part 1: Count how many times the dial points at 0 after any rotation
 * @param {string} input - The puzzle input (one rotation per line)
 * @returns {number} The number of times the dial points at 0
 */
export function solvePart1(input) {
    const rotations = input.trim().split('\n').filter(line => line.trim());
    let position = 50; // Start at 50
    let count = 0;
    
    for (const rotationString of rotations) {
        const rotation = parseRotation(rotationString);
        position = applyRotation(position, rotation);
        
        if (position === 0) {
            count++;
        }
    }
    
    return count;
}

/**
 * Solves Part 2 of Day 1
 * @param {string} input - The puzzle input
 * @returns {string|number} The answer for part 2
 */
export function solvePart2(input) {
    // Part 2 not available yet
    return 'Not implemented yet';
}

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
            part2
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
