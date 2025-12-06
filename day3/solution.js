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
 * Solves Part 2 of Day 3
 * @param {string} input - The puzzle input
 * @returns {string|number} The answer for part 2
 */
export function solvePart2(input) {
    // Part 2 not available yet
    return 'Not implemented yet';
}

/**
 * Puzzle metadata for Day 3
 */
export const puzzleInfo = {
    title: "Battery Banks",
    description: "Batteries are arranged in banks. Each bank has batteries labeled 1-9. You need to turn on exactly two batteries per bank to produce joltage.",
    part1Description: "Find the maximum joltage possible from each bank (by selecting exactly 2 batteries) and sum them all.",
    part2Description: "Part 2 not available yet",
    approach: {
        part1: "For each bank, try all pairs of batteries (i, j) where i < j. The joltage is the two-digit number formed by digit[i] * 10 + digit[j]. Find the maximum joltage for each bank and sum them."
    },
    functions: {
        findMaxJoltage: "Finds the maximum two-digit joltage possible from a bank by trying all pairs of batteries.",
        solvePart1: "Processes all banks, finds max joltage for each, and sums them."
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

