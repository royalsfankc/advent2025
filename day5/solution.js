// Day 5 Solution - Fresh Ingredients

import { parseRange, isInRange, range } from '../utils/ranges.js';

/**
 * Fetches the input file for Day 5
 * @returns {Promise<string>} The input file content
 */
async function fetchInput() {
    const response = await fetch('./day5/input.txt');
    if (!response.ok) {
        throw new Error('Failed to fetch input file');
    }
    return await response.text();
}

/**
 * Parses the input into fresh ranges and available ingredient IDs
 * Input format: ranges (one per line), blank line, ingredient IDs (one per line)
 * @param {string} input - The puzzle input
 * @returns {{ranges: Array<{start: number, end: number}>, ingredientIds: number[]}} Parsed data
 */
export function parseInput(input) {
    const lines = input.split('\n');
    const ranges = [];
    const ingredientIds = [];
    
    let foundBlankLine = false;
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed === '') {
            foundBlankLine = true;
            continue;
        }
        
        if (!foundBlankLine) {
            // Parse as range
            ranges.push(parseRange(trimmed));
        } else {
            // Parse as ingredient ID
            const id = parseInt(trimmed, 10);
            if (isNaN(id)) {
                throw new Error(`Invalid ingredient ID: ${trimmed}`);
            }
            ingredientIds.push(id);
        }
    }
    
    return { ranges, ingredientIds };
}

/**
 * Checks if an ingredient ID is fresh (falls into any of the given ranges)
 * @param {number} ingredientId - The ingredient ID to check
 * @param {Array<{start: number, end: number}>} ranges - Array of fresh ranges
 * @returns {boolean} True if the ingredient is fresh
 */
export function isIngredientFresh(ingredientId, ranges) {
    for (const range of ranges) {
        if (isInRange(ingredientId, range.start, range.end)) {
            return true;
        }
    }
    return false;
}

/**
 * Parses only the ranges from the input (ignores ingredient IDs section)
 * @param {string} input - The puzzle input
 * @returns {Array<{start: number, end: number}>} Array of ranges
 */
export function parseRangesOnly(input) {
    const lines = input.split('\n');
    const ranges = [];
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed === '') {
            // Stop at blank line (ingredient IDs section starts)
            break;
        }
        
        ranges.push(parseRange(trimmed));
    }
    
    return ranges;
}

/**
 * Gets all unique ingredient IDs that fall into any of the given ranges
 * @param {Array<{start: number, end: number}>} ranges - Array of fresh ranges
 * @returns {Set<number>} Set of all unique fresh ingredient IDs
 */
export function getAllFreshIngredientIds(ranges) {
    const freshIds = new Set();
    
    for (const rangeObj of ranges) {
        const idsInRange = range(rangeObj.start, rangeObj.end);
        for (const id of idsInRange) {
            freshIds.add(id);
        }
    }
    
    return freshIds;
}

/**
 * Solves Part 1: Count how many available ingredient IDs are fresh
 * An ingredient is fresh if it falls into any of the fresh ranges
 * @param {string} input - The puzzle input (ranges, blank line, ingredient IDs)
 * @returns {number} Number of fresh ingredient IDs
 */
export function solvePart1(input) {
    const { ranges, ingredientIds } = parseInput(input);
    
    let freshCount = 0;
    
    for (const id of ingredientIds) {
        if (isIngredientFresh(id, ranges)) {
            freshCount++;
        }
    }
    
    return freshCount;
}

/**
 * Solves Part 2: Count how many unique ingredient IDs are considered fresh by the ranges
 * An ingredient ID is fresh if it falls into any range (overlapping ranges are handled)
 * @param {string} input - The puzzle input (ranges, blank line, ingredient IDs - IDs are ignored)
 * @returns {number} Number of unique fresh ingredient IDs
 */
export function solvePart2(input) {
    const ranges = parseRangesOnly(input);
    const freshIds = getAllFreshIngredientIds(ranges);
    return freshIds.size;
}

/**
 * Puzzle metadata for Day 5
 */
export const puzzleInfo = {
    title: "Fresh Ingredients",
    description: "The database contains fresh ingredient ID ranges and available ingredient IDs. Determine which available ingredients are fresh.",
    part1Description: "Count how many of the available ingredient IDs are fresh (fall into any of the fresh ranges).",
    part2Description: "Count how many unique ingredient IDs are considered fresh by the ranges (ignoring the available ingredient IDs section).",
    approach: {
        part1: "Parse the input into ranges and ingredient IDs (separated by a blank line). For each ingredient ID, check if it falls into any of the fresh ranges. Count how many are fresh.",
        part2: "Parse only the ranges from the input (stop at the blank line). For each range, generate all ingredient IDs in that range. Use a Set to collect all unique IDs across all ranges. Return the size of the Set."
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

