// Utility functions for number manipulation

/**
 * Applies a circular rotation to a number within a range
 * @param {number} currentValue - Current value
 * @param {number} offset - Amount to add/subtract
 * @param {number} min - Minimum value (default: 0)
 * @param {number} max - Maximum value (default: 99)
 * @returns {number} New value after rotation (wraps around)
 */
export function applyCircularRotation(currentValue, offset, min = 0, max = 99) {
    const newValue = currentValue + offset;
    const range = max - min + 1;
    // Handle wrap-around using modulo arithmetic
    // Add range before modulo to handle negative numbers correctly
    return ((newValue % range) + range) % range;
}

/**
 * Counts how many times a value appears when moving through a circular range
 * @param {number} startValue - Starting value
 * @param {number} offset - Amount to move (positive or negative)
 * @param {number} targetValue - Value to count occurrences of
 * @param {number} min - Minimum value (default: 0)
 * @param {number} max - Maximum value (default: 99)
 * @returns {number} Number of times targetValue is encountered
 */
export function countValueInCircularMovement(startValue, offset, targetValue, min = 0, max = 99) {
    const range = max - min + 1;
    let count = 0;
    
    if (offset === 0) {
        return 0;
    }
    
    if (offset > 0) {
        // Moving forward: count how many times we cross targetValue
        // Positions we pass through: startValue+1, startValue+2, ..., startValue+offset
        // We're at targetValue when: (startValue + k) % range === targetValue for k in [1, offset]
        // This happens when startValue + k is a multiple of range plus targetValue
        const start = startValue + 1;
        const end = startValue + offset;
        
        // Count multiples of range in [start, end] that result in targetValue
        // We need: (startValue + k) % range === targetValue
        // Which means: startValue + k = targetValue + n*range for some n
        // So: k = targetValue - startValue + n*range
        
        // Find the first k that gives us targetValue
        let firstK = targetValue - startValue;
        // Adjust if negative (wrap around)
        while (firstK <= 0) {
            firstK += range;
        }
        
        if (firstK <= offset) {
            // We hit targetValue at least once
            const remaining = offset - firstK;
            count = 1 + Math.floor(remaining / range);
        }
    } else {
        // Moving backward: count how many times we cross targetValue
        const absOffset = Math.abs(offset);
        
        if (startValue > 0 && startValue <= absOffset) {
            // We cross targetValue at least once (when k = startValue, we're at 0)
            const remaining = absOffset - startValue;
            count = 1 + Math.floor(remaining / range);
        } else if (startValue === 0) {
            // Starting at 0, we don't count the starting position
            // We cross 0 again when we wrap around: after range, 2*range, etc. clicks
            count = Math.floor(absOffset / range);
        } else {
            // startValue > absOffset, we don't cross targetValue
            count = 0;
        }
    }
    
    return count;
}

