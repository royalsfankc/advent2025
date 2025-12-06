import { describe, it, expect } from '@jest/globals';
import { isInvalidId, findInvalidIdsInRange, parseInput, solvePart1, isInvalidIdPart2, findInvalidIdsInRangePart2, solvePart2 } from './solution.js';
import { parseRange } from '../utils/ranges.js';

describe('Day 2 Solution', () => {
    describe('parseRange', () => {
        it('should parse a simple range correctly', () => {
            const result = parseRange('11-22');
            expect(result).toEqual({ start: 11, end: 22 });
        });

        it('should parse large numbers', () => {
            const result = parseRange('1188511880-1188511890');
            expect(result).toEqual({ start: 1188511880, end: 1188511890 });
        });

        it('should trim whitespace', () => {
            const result = parseRange('  11-22  ');
            expect(result).toEqual({ start: 11, end: 22 });
        });

        it('should throw error for invalid format', () => {
            expect(() => parseRange('11-22-33')).toThrow('Invalid range format');
        });

        it('should throw error for non-numeric values', () => {
            expect(() => parseRange('abc-def')).toThrow('Invalid numbers');
        });

        it('should throw error if start > end', () => {
            expect(() => parseRange('22-11')).toThrow('Start must be <= end');
        });
    });

    describe('isInvalidId', () => {
        it('should return true for single digit repeated twice', () => {
            expect(isInvalidId(11)).toBe(true);  // "11" = "1" + "1"
            expect(isInvalidId(22)).toBe(true);  // "22" = "2" + "2"
            expect(isInvalidId(55)).toBe(true);  // "55" = "5" + "5"
        });

        it('should return true for two digits repeated twice', () => {
            expect(isInvalidId(6464)).toBe(true);  // "6464" = "64" + "64"
        });

        it('should return true for three digits repeated twice', () => {
            expect(isInvalidId(123123)).toBe(true);  // "123123" = "123" + "123"
        });

        it('should return false for odd length numbers', () => {
            expect(isInvalidId(123)).toBe(false);
            expect(isInvalidId(12345)).toBe(false);
            expect(isInvalidId(1)).toBe(false);
        });

        it('should return false for numbers that are not repeated', () => {
            expect(isInvalidId(12)).toBe(false);  // "12" != "12" (but halves are "1" and "2")
            expect(isInvalidId(1234)).toBe(false);  // "1234" halves are "12" and "34"
            expect(isInvalidId(1010)).toBe(true);  // "1010" = "10" + "10"
        });

        it('should handle example invalid IDs from puzzle', () => {
            expect(isInvalidId(11)).toBe(true);
            expect(isInvalidId(22)).toBe(true);
            expect(isInvalidId(99)).toBe(true);
            expect(isInvalidId(1010)).toBe(true);
            expect(isInvalidId(1188511885)).toBe(true);
            expect(isInvalidId(222222)).toBe(true);
            expect(isInvalidId(446446)).toBe(true);
            expect(isInvalidId(38593859)).toBe(true);
        });

        it('should return false for valid IDs from example', () => {
            expect(isInvalidId(12)).toBe(false);
            expect(isInvalidId(95)).toBe(false);
            expect(isInvalidId(100)).toBe(false);
            expect(isInvalidId(998)).toBe(false);
        });
    });

    describe('findInvalidIdsInRange', () => {
        it('should find invalid IDs in range 11-22', () => {
            const result = findInvalidIdsInRange(11, 22);
            expect(result).toEqual([11, 22]);
        });

        it('should find invalid IDs in range 95-115', () => {
            const result = findInvalidIdsInRange(95, 115);
            expect(result).toEqual([99]);
        });

        it('should find invalid IDs in range 998-1012', () => {
            const result = findInvalidIdsInRange(998, 1012);
            expect(result).toEqual([1010]);
        });

        it('should find invalid IDs in range 222220-222224', () => {
            const result = findInvalidIdsInRange(222220, 222224);
            expect(result).toEqual([222222]);
        });

        it('should return empty array for range with no invalid IDs', () => {
            const result = findInvalidIdsInRange(1698522, 1698528);
            expect(result).toEqual([]);
        });

        it('should handle single number range', () => {
            const result = findInvalidIdsInRange(11, 11);
            expect(result).toEqual([11]);
        });

        it('should handle range with no invalid IDs', () => {
            const result = findInvalidIdsInRange(12, 21);
            expect(result).toEqual([]);
        });
    });

    describe('parseInput', () => {
        it('should parse comma-separated ranges', () => {
            const input = '11-22,95-115';
            const result = parseInput(input);
            expect(result).toEqual([
                { start: 11, end: 22 },
                { start: 95, end: 115 }
            ]);
        });

        it('should handle whitespace', () => {
            const input = '11-22, 95-115 , 998-1012';
            const result = parseInput(input);
            expect(result).toEqual([
                { start: 11, end: 22 },
                { start: 95, end: 115 },
                { start: 998, end: 1012 }
            ]);
        });

        it('should filter empty strings', () => {
            const input = '11-22,,95-115';
            const result = parseInput(input);
            expect(result).toEqual([
                { start: 11, end: 22 },
                { start: 95, end: 115 }
            ]);
        });
    });

    describe('solvePart1', () => {
        it('should solve the example correctly', () => {
            const input = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';
            const result = solvePart1(input);
            expect(result).toBe(1227775554);
        });

        it('should handle single range', () => {
            const input = '11-22';
            const result = solvePart1(input);
            expect(result).toBe(33); // 11 + 22
        });

        it('should return 0 for ranges with no invalid IDs', () => {
            const input = '12-21,100-105';
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart1(input);
            expect(result).toBe(0);
        });
    });

    describe('isInvalidIdPart2', () => {
        it('should return true for single digit repeated twice', () => {
            expect(isInvalidIdPart2(11)).toBe(true);  // "11" = "1" + "1"
            expect(isInvalidIdPart2(22)).toBe(true);
        });

        it('should return true for single digit repeated multiple times', () => {
            expect(isInvalidIdPart2(111)).toBe(true);  // "111" = "1" + "1" + "1"
            expect(isInvalidIdPart2(1111)).toBe(true);  // "1111" = "1" repeated 4 times
            expect(isInvalidIdPart2(1111111)).toBe(true);  // "1111111" = "1" repeated 7 times
        });

        it('should return true for two digits repeated twice', () => {
            expect(isInvalidIdPart2(6464)).toBe(true);  // "6464" = "64" + "64"
        });

        it('should return true for two digits repeated multiple times', () => {
            expect(isInvalidIdPart2(1212121212)).toBe(true);  // "1212121212" = "12" repeated 5 times
        });

        it('should return true for three digits repeated twice', () => {
            expect(isInvalidIdPart2(123123)).toBe(true);  // "123123" = "123" + "123"
        });

        it('should return true for three digits repeated three times', () => {
            expect(isInvalidIdPart2(123123123)).toBe(true);  // "123123123" = "123" repeated 3 times
        });

        it('should return true for four digits repeated twice', () => {
            expect(isInvalidIdPart2(12341234)).toBe(true);  // "12341234" = "1234" + "1234"
        });

        it('should return false for numbers that are not repeated', () => {
            expect(isInvalidIdPart2(12)).toBe(false);
            expect(isInvalidIdPart2(123)).toBe(false);
            expect(isInvalidIdPart2(1234)).toBe(false);
            expect(isInvalidIdPart2(12345)).toBe(false);
        });

        it('should handle example invalid IDs from Part 2 puzzle', () => {
            expect(isInvalidIdPart2(11)).toBe(true);
            expect(isInvalidIdPart2(22)).toBe(true);
            expect(isInvalidIdPart2(99)).toBe(true);
            expect(isInvalidIdPart2(111)).toBe(true);  // New in Part 2
            expect(isInvalidIdPart2(999)).toBe(true);  // New in Part 2
            expect(isInvalidIdPart2(1010)).toBe(true);
            expect(isInvalidIdPart2(1188511885)).toBe(true);
            expect(isInvalidIdPart2(222222)).toBe(true);
            expect(isInvalidIdPart2(446446)).toBe(true);
            expect(isInvalidIdPart2(38593859)).toBe(true);
            expect(isInvalidIdPart2(565656)).toBe(true);  // New in Part 2
            expect(isInvalidIdPart2(824824824)).toBe(true);  // New in Part 2
            expect(isInvalidIdPart2(2121212121)).toBe(true);  // New in Part 2
        });

        it('should return false for single digit', () => {
            expect(isInvalidIdPart2(1)).toBe(false);
            expect(isInvalidIdPart2(5)).toBe(false);
        });
    });

    describe('findInvalidIdsInRangePart2', () => {
        it('should find invalid IDs in range 11-22', () => {
            const result = findInvalidIdsInRangePart2(11, 22);
            expect(result).toEqual([11, 22]);
        });

        it('should find invalid IDs in range 95-115', () => {
            const result = findInvalidIdsInRangePart2(95, 115);
            expect(result).toEqual([99, 111]);  // 99 and 111 (new in Part 2)
        });

        it('should find invalid IDs in range 998-1012', () => {
            const result = findInvalidIdsInRangePart2(998, 1012);
            expect(result).toEqual([999, 1010]);  // 999 (new) and 1010
        });

        it('should find invalid IDs in range 222220-222224', () => {
            const result = findInvalidIdsInRangePart2(222220, 222224);
            expect(result).toEqual([222222]);
        });

        it('should find invalid IDs in range 565653-565659', () => {
            const result = findInvalidIdsInRangePart2(565653, 565659);
            expect(result).toEqual([565656]);  // New in Part 2
        });

        it('should find invalid IDs in range 824824821-824824827', () => {
            const result = findInvalidIdsInRangePart2(824824821, 824824827);
            expect(result).toEqual([824824824]);  // New in Part 2
        });

        it('should find invalid IDs in range 2121212118-2121212124', () => {
            const result = findInvalidIdsInRangePart2(2121212118, 2121212124);
            expect(result).toEqual([2121212121]);  // New in Part 2
        });

        it('should return empty array for range with no invalid IDs', () => {
            const result = findInvalidIdsInRangePart2(1698522, 1698528);
            expect(result).toEqual([]);
        });
    });

    describe('solvePart2', () => {
        it('should solve the example correctly', () => {
            const input = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';
            const result = solvePart2(input);
            expect(result).toBe(4174379265);
        });

        it('should handle single range', () => {
            const input = '11-22';
            const result = solvePart2(input);
            expect(result).toBe(33); // 11 + 22
        });

        it('should handle range with multiple invalid IDs', () => {
            const input = '95-115';
            const result = solvePart2(input);
            expect(result).toBe(210); // 99 + 111
        });

        it('should return 0 for ranges with no invalid IDs', () => {
            const input = '12-21,100-105';
            const result = solvePart2(input);
            expect(result).toBe(0);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart2(input);
            expect(result).toBe(0);
        });
    });
});

