// Day 2 Solution - Invalid Product IDs

/**
 * Fetches the input file for Day 2
 * @returns {Promise<string>} The input file content
 */
async function fetchInput() {
    const response = await fetch('./day2/day2input.txt');
    if (!response.ok) {
        throw new Error('Failed to fetch input file');
    }
    return await response.text();
}

/**
 * Parses a range string into start and end numbers
 * @param {string} rangeString - Range string like "11-22"
 * @returns {{start: number, end: number}} Parsed range object
 */
export function parseRange(rangeString) {
    const parts = rangeString.trim().split('-');
    if (parts.length !== 2) {
        throw new Error(`Invalid range format: ${rangeString}`);
    }
    
    const start = parseInt(parts[0], 10);
    const end = parseInt(parts[1], 10);
    
    if (isNaN(start) || isNaN(end)) {
        throw new Error(`Invalid numbers in range: ${rangeString}`);
    }
    
    if (start > end) {
        throw new Error(`Start must be <= end: ${rangeString}`);
    }
    
    return { start, end };
}

/**
 * Checks if a number is invalid (made of digits repeated twice)
 * An invalid ID is one where the string representation is made of
 * the same sequence of digits repeated twice (e.g., 55, 6464, 123123)
 * @param {number} id - The product ID to check
 * @returns {boolean} True if the ID is invalid
 */
export function isInvalidId(id) {
    const str = id.toString();
    
    // Must have even length to be made of two equal parts
    if (str.length % 2 !== 0) {
        return false;
    }
    
    // Split into two halves
    const halfLength = str.length / 2;
    const firstHalf = str.substring(0, halfLength);
    const secondHalf = str.substring(halfLength);
    
    // Check if both halves are identical
    return firstHalf === secondHalf;
}

/**
 * Finds all invalid IDs in a given range
 * @param {number} start - Start of the range (inclusive)
 * @param {number} end - End of the range (inclusive)
 * @returns {number[]} Array of invalid IDs in the range
 */
export function findInvalidIdsInRange(start, end) {
    const invalidIds = [];
    
    for (let id = start; id <= end; id++) {
        if (isInvalidId(id)) {
            invalidIds.push(id);
        }
    }
    
    return invalidIds;
}

/**
 * Parses the input string into an array of ranges
 * @param {string} input - Input string with comma-separated ranges
 * @returns {{start: number, end: number}[]} Array of range objects
 */
export function parseInput(input) {
    const rangeStrings = input.trim().split(',').filter(s => s.trim());
    return rangeStrings.map(parseRange);
}

/**
 * Solves Part 1: Find all invalid IDs in the given ranges and sum them
 * @param {string} input - The puzzle input (comma-separated ranges)
 * @returns {number} Sum of all invalid IDs
 */
export function solvePart1(input) {
    const ranges = parseInput(input);
    let totalSum = 0;
    
    for (const range of ranges) {
        const invalidIds = findInvalidIdsInRange(range.start, range.end);
        totalSum += invalidIds.reduce((sum, id) => sum + id, 0);
    }
    
    return totalSum;
}

/**
 * Checks if a number is invalid for Part 2 (made of digits repeated at least twice)
 * An invalid ID is one where the string representation is made of
 * the same sequence of digits repeated at least twice (e.g., 111, 123123123, 1212121212)
 * @param {number} id - The product ID to check
 * @returns {boolean} True if the ID is invalid
 */
export function isInvalidIdPart2(id) {
    const str = id.toString();
    const length = str.length;
    
    // Need at least 2 characters to have a pattern repeated at least twice
    if (length < 2) {
        return false;
    }
    
    // Check all possible ways to divide the string into equal parts
    // We need at least 2 parts, so k can be from 2 to length
    for (let k = 2; k <= length; k++) {
        // Check if length is divisible by k
        if (length % k !== 0) {
            continue;
        }
        
        const partLength = length / k;
        const firstPart = str.substring(0, partLength);
        
        // Check if all k parts are identical
        let allPartsMatch = true;
        for (let i = 1; i < k; i++) {
            const part = str.substring(i * partLength, (i + 1) * partLength);
            if (part !== firstPart) {
                allPartsMatch = false;
                break;
            }
        }
        
        if (allPartsMatch) {
            return true;
        }
    }
    
    return false;
}

/**
 * Finds all invalid IDs in a given range using Part 2 rules
 * @param {number} start - Start of the range (inclusive)
 * @param {number} end - End of the range (inclusive)
 * @returns {number[]} Array of invalid IDs in the range
 */
export function findInvalidIdsInRangePart2(start, end) {
    const invalidIds = [];
    
    for (let id = start; id <= end; id++) {
        if (isInvalidIdPart2(id)) {
            invalidIds.push(id);
        }
    }
    
    return invalidIds;
}

/**
 * Solves Part 2: Find all invalid IDs using new rules (repeated at least twice)
 * @param {string} input - The puzzle input (comma-separated ranges)
 * @returns {number} Sum of all invalid IDs
 */
export function solvePart2(input) {
    const ranges = parseInput(input);
    let totalSum = 0;
    
    for (const range of ranges) {
        const invalidIds = findInvalidIdsInRangePart2(range.start, range.end);
        totalSum += invalidIds.reduce((sum, id) => sum + id, 0);
    }
    
    return totalSum;
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

