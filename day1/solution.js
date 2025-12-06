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
 * Counts how many times the dial passes through 0 during a rotation
 * This counts positions we pass through while moving, excluding the starting position
 * @param {number} startPosition - Starting dial position (0-99)
 * @param {{direction: string, distance: number}} rotation - Rotation to apply
 * @returns {number} Number of times dial passes through 0 during rotation (excluding start)
 */
export function countZeroCrossingsDuringRotation(startPosition, rotation) {
    if (rotation.distance === 0) {
        return 0;
    }
    
    let count = 0;
    
    if (rotation.direction === 'R') {
        // Rotating right: count how many times we cross from 99 to 0
        // Positions we pass through: startPos+1, startPos+2, ..., startPos+distance
        // We're at 0 when: (startPos + k) % 100 === 0 for k in [1, distance]
        // This happens when startPos + k is a multiple of 100
        // Number of multiples of 100 in range [startPos+1, startPos+distance]
        const start = startPosition + 1;
        const end = startPosition + rotation.distance;
        // Count multiples of 100 in [start, end]
        const firstMultiple = Math.ceil(start / 100) * 100;
        if (firstMultiple <= end) {
            count = Math.floor((end - firstMultiple) / 100) + 1;
        }
    } else {
        // Rotating left: count how many times we cross from 0 to 99
        // Positions we pass through: startPos-1, startPos-2, ..., startPos-distance
        // We're at 0 when: startPos - k = 0 (mod 100), for k in [1, distance]
        // This happens when k = startPos, or k = startPos + 100, etc.
        // But we exclude k=0 (starting position)
        if (startPosition > 0 && startPosition <= rotation.distance) {
            // We cross 0 at least once (when k = startPosition)
            const remaining = rotation.distance - startPosition;
            // After first crossing, every 100 more clicks we cross 0 again
            count = 1 + Math.floor(remaining / 100);
        } else if (startPosition === 0) {
            // Starting at 0, we don't count the starting position
            // We cross 0 again when we wrap around: after 100, 200, etc. clicks
            count = Math.floor(rotation.distance / 100);
        } else {
            // startPosition > distance, we don't cross 0
            count = 0;
        }
    }
    
    return count;
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
 * Solves Part 2: Count how many times the dial points at 0 during rotations AND at the end
 * @param {string} input - The puzzle input (one rotation per line)
 * @returns {number} The number of times the dial points at 0 (during + end)
 */
export function solvePart2(input) {
    const rotations = input.trim().split('\n').filter(line => line.trim());
    let position = 50; // Start at 50
    let count = 0;
    
    for (const rotationString of rotations) {
        const rotation = parseRotation(rotationString);
        
        // Count how many times we pass through 0 during this rotation
        // This counts positions from start+1 to start+distance (excluding start, including end)
        const duringCount = countZeroCrossingsDuringRotation(position, rotation);
        count += duringCount;
        
        // Apply the rotation
        const newPosition = applyRotation(position, rotation);
        
        // If we end at 0, check if we already counted it during the rotation
        // The ending position is counted during rotation if it's 0, so we don't count it again
        // UNLESS we didn't pass through 0 during the rotation at all
        if (newPosition === 0 && duringCount === 0) {
            // We end at 0 but didn't pass through it during, so count it
            count++;
        }
        // If duringCount > 0 and we end at 0, we already counted the ending 0 during the rotation
        
        position = newPosition;
    }
    
    return count;
}

/**
 * Puzzle metadata for Day 1
 */
export const puzzleInfo = {
    title: "Safe Dial Password",
    description: "A safe has a dial with numbers 0-99. You need to follow rotation instructions (L for left, R for right) and count how many times the dial points at 0.",
    part1Description: "Count how many times the dial points at 0 after any rotation completes.",
    part2Description: "Count how many times the dial points at 0 during rotations (as it passes through 0) plus at the end.",
    approach: {
        part1: "Start at position 50. For each rotation, apply it to the current position (handling wrap-around), then check if the new position is 0.",
        part2: "Similar to Part 1, but also count how many times we pass through 0 while rotating (not just at the end). For each rotation, calculate how many times we cross 0 during the movement."
    },
    functions: {
        parseRotation: "Parses rotation strings like 'L68' into direction and distance.",
        applyRotation: "Applies a rotation to the current dial position, handling circular wrap-around (0-99).",
        countZeroCrossingsDuringRotation: "Counts how many times the dial passes through 0 during a rotation by checking all intermediate positions.",
        solvePart1: "Processes all rotations, tracks position, and counts when dial ends at 0.",
        solvePart2: "Processes all rotations, counts zeros during rotation plus zeros at the end."
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
