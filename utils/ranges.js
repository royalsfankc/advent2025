// Utility functions for working with ranges

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
 * Parses comma-separated range strings into an array of ranges
 * @param {string} input - Input string with comma-separated ranges
 * @returns {{start: number, end: number}[]} Array of range objects
 */
export function parseRanges(input) {
    const rangeStrings = input.trim().split(',').filter(s => s.trim());
    return rangeStrings.map(parseRange);
}

/**
 * Checks if a number is within a range (inclusive)
 * @param {number} value - The value to check
 * @param {number} start - Start of range
 * @param {number} end - End of range
 * @returns {boolean} True if value is in range
 */
export function isInRange(value, start, end) {
    return value >= start && value <= end;
}

/**
 * Generates all numbers in a range (inclusive)
 * @param {number} start - Start of range
 * @param {number} end - End of range
 * @returns {number[]} Array of all numbers in the range
 */
export function range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

