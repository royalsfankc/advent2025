// Day 3 Solution - Battery Banks

/**
 * Fetches the input file for Day 3
 * @returns {Promise<string>} The input file content
 */
async function fetchInput() {
    const response = await fetch('./day3/day3input.txt');
    if (!response.ok) {
        throw new Error('Failed to fetch input file');
    }
    return await response.text();
}

/**
 * Finds the maximum joltage possible from a bank by selecting exactly two batteries
 * The joltage is the two-digit number formed by the selected batteries in order
 * @param {string} bank - String of digits representing battery joltages
 * @returns {number} Maximum joltage possible from this bank
 */
export function findMaxJoltage(bank) {
    if (bank.length < 2) {
        return 0;
    }
    
    let maxJoltage = 0;
    
    // Try all pairs of batteries (i, j) where i < j
    // The joltage is digit[i] * 10 + digit[j]
    for (let i = 0; i < bank.length; i++) {
        for (let j = i + 1; j < bank.length; j++) {
            const firstDigit = parseInt(bank[i], 10);
            const secondDigit = parseInt(bank[j], 10);
            const joltage = firstDigit * 10 + secondDigit;
            
            if (joltage > maxJoltage) {
                maxJoltage = joltage;
            }
        }
    }
    
    return maxJoltage;
}

/**
 * Solves Part 1: Find maximum joltage from each bank and sum them
 * @param {string} input - The puzzle input (one bank per line)
 * @returns {number} Total output joltage (sum of max joltages from each bank)
 */
export function solvePart1(input) {
    const banks = input.trim().split('\n').filter(line => line.trim());
    let totalJoltage = 0;
    
    for (const bank of banks) {
        const maxJoltage = findMaxJoltage(bank.trim());
        totalJoltage += maxJoltage;
    }
    
    return totalJoltage;
}

/**
 * Finds the maximum joltage possible from a bank by selecting exactly 12 batteries
 * Uses a greedy approach: select the largest possible digits from left to right
 * while ensuring we can still select enough digits to reach exactly 12
 * @param {string} bank - String of digits representing battery joltages
 * @returns {number} Maximum joltage possible (as a number, but may be very large)
 */
export function findMaxJoltagePart2(bank) {
    const targetDigits = 12;
    const bankLength = bank.length;
    
    if (bankLength < targetDigits) {
        // Not enough batteries, return 0 or the number we can form
        return 0;
    }
    
    if (bankLength === targetDigits) {
        // Exactly 12 batteries, use all of them
        return parseInt(bank, 10);
    }
    
    // We need to select exactly 12 digits from the bank
    // Use greedy algorithm: for each position, pick the largest digit available
    // while ensuring we can still select enough remaining digits
    
    const selected = [];
    let startIndex = 0;
    let remainingToSelect = targetDigits;
    const remainingLength = bankLength;
    
    for (let pos = 0; pos < targetDigits; pos++) {
        // Calculate how many digits we still need after this position
        const digitsAfter = targetDigits - pos - 1;
        // Calculate the last index we can pick from (to ensure we have enough digits left)
        const lastPossibleIndex = bankLength - digitsAfter - 1;
        
        // Find the largest digit in the available range
        let maxDigit = -1;
        let maxIndex = -1;
        
        for (let i = startIndex; i <= lastPossibleIndex; i++) {
            const digit = parseInt(bank[i], 10);
            if (digit > maxDigit) {
                maxDigit = digit;
                maxIndex = i;
            }
        }
        
        // Select this digit and move the start index forward
        selected.push(maxDigit);
        startIndex = maxIndex + 1;
    }
    
    // Convert selected digits to a number
    // For very large numbers, we'll use BigInt or return as string
    // But for now, let's try parseInt - if it's too large, we'll need BigInt
    const resultString = selected.join('');
    
    // Check if the number is too large for regular JavaScript number
    if (resultString.length > 15) {
        // Use BigInt for very large numbers
        return BigInt(resultString);
    }
    
    return parseInt(resultString, 10);
}

/**
 * Solves Part 2: Find maximum joltage from each bank by selecting exactly 12 batteries
 * @param {string} input - The puzzle input (one bank per line)
 * @returns {number|string} Total output joltage (sum of max joltages from each bank)
 */
export function solvePart2(input) {
    const banks = input.trim().split('\n').filter(line => line.trim());
    let totalJoltage = BigInt(0);
    
    for (const bank of banks) {
        const maxJoltage = findMaxJoltagePart2(bank.trim());
        if (maxJoltage > 0) {
            totalJoltage += BigInt(maxJoltage.toString());
        }
    }
    
    // Return as string if it's too large for safe integer, otherwise as number
    if (totalJoltage > BigInt(Number.MAX_SAFE_INTEGER)) {
        return totalJoltage.toString();
    }
    
    return Number(totalJoltage);
}

/**
 * Puzzle metadata for Day 3
 */
export const puzzleInfo = {
    title: "Battery Banks",
    description: "Batteries are arranged in banks. Each bank has batteries labeled 1-9. You need to turn on exactly two batteries per bank to produce joltage.",
    part1Description: "Find the maximum joltage possible from each bank (by selecting exactly 2 batteries) and sum them all.",
    part2Description: "Find the maximum joltage possible from each bank (by selecting exactly 12 batteries) and sum them all.",
    approach: {
        part1: "For each bank, try all pairs of batteries (i, j) where i < j. The joltage is the two-digit number formed by digit[i] * 10 + digit[j]. Find the maximum joltage for each bank and sum them.",
        part2: "For each bank, use a greedy algorithm to select exactly 12 batteries. For each position from left to right, select the largest digit available while ensuring enough digits remain to complete the selection. This maximizes the resulting 12-digit number."
    },
    // functions field is optional - will be auto-extracted from JSDoc if not provided
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

