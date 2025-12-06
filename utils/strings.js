// Utility functions for string manipulation

/**
 * Checks if a string can be divided into equal parts that are all identical
 * @param {string} str - The string to check
 * @param {number} minParts - Minimum number of parts required (default: 2)
 * @returns {boolean} True if string can be divided into identical parts
 */
export function hasRepeatedPattern(str, minParts = 2) {
    const length = str.length;
    
    if (length < minParts) {
        return false;
    }
    
    // Check all possible ways to divide the string into equal parts
    for (let k = minParts; k <= length; k++) {
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
 * Checks if a string has even length and first half equals second half
 * @param {string} str - The string to check
 * @returns {boolean} True if string is made of two identical halves
 */
export function hasTwoIdenticalHalves(str) {
    if (str.length % 2 !== 0) {
        return false;
    }
    
    const halfLength = str.length / 2;
    const firstHalf = str.substring(0, halfLength);
    const secondHalf = str.substring(halfLength);
    
    return firstHalf === secondHalf;
}

