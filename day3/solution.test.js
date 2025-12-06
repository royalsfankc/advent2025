import { describe, it, expect } from '@jest/globals';
import { findMaxJoltage, solvePart1, findMaxJoltagePart2, solvePart2 } from './solution.js';

describe('Day 3 Solution', () => {
    describe('findMaxJoltage', () => {
        it('should find max joltage from first two digits', () => {
            expect(findMaxJoltage('987654321111111')).toBe(98);
        });

        it('should find max joltage from last two digits', () => {
            expect(findMaxJoltage('234234234234278')).toBe(78);
        });

        it('should find max joltage from middle digits', () => {
            expect(findMaxJoltage('811111111111119')).toBe(89);
        });

        it('should find max joltage from complex example', () => {
            expect(findMaxJoltage('818181911112111')).toBe(92);
        });

        it('should handle two-digit bank', () => {
            expect(findMaxJoltage('45')).toBe(45);
        });

        it('should handle three-digit bank', () => {
            expect(findMaxJoltage('123')).toBe(23); // 12, 13, 23 -> max is 23
        });

        it('should handle bank with all same digits', () => {
            expect(findMaxJoltage('1111')).toBe(11);
        });

        it('should handle bank with descending digits', () => {
            expect(findMaxJoltage('9876')).toBe(98);
        });

        it('should handle bank with ascending digits', () => {
            expect(findMaxJoltage('1234')).toBe(34);
        });

        it('should return 0 for single digit', () => {
            expect(findMaxJoltage('5')).toBe(0);
        });

        it('should return 0 for empty string', () => {
            expect(findMaxJoltage('')).toBe(0);
        });

        it('should find max when first digit is not the largest', () => {
            // Bank: 12345, max should be 45 (not 12)
            expect(findMaxJoltage('12345')).toBe(45);
        });

        it('should handle bank with 9s', () => {
            expect(findMaxJoltage('1999')).toBe(99);
        });
    });

    describe('solvePart1', () => {
        it('should solve the example correctly', () => {
            const input = `987654321111111
811111111111119
234234234234278
818181911112111`;
            const result = solvePart1(input);
            expect(result).toBe(357); // 98 + 89 + 78 + 92
        });

        it('should handle single bank', () => {
            const input = '12345';
            const result = solvePart1(input);
            expect(result).toBe(45);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle input with blank lines', () => {
            const input = '12345\n\n67890';
            const result = solvePart1(input);
            expect(result).toBe(45 + 90); // 45 + 90
        });

        it('should handle banks with whitespace', () => {
            const input = '  12345  \n  67890  ';
            const result = solvePart1(input);
            expect(result).toBe(45 + 90);
        });
    });

    describe('findMaxJoltagePart2', () => {
        it('should find max joltage with exactly 12 digits', () => {
            // 987654321111111 -> 987654321111 (remove 3 ones at end)
            expect(findMaxJoltagePart2('987654321111111')).toBe(987654321111);
        });

        it('should handle example 2', () => {
            // 811111111111119 -> 811111111119 (remove 2 ones)
            expect(findMaxJoltagePart2('811111111111119')).toBe(811111111119);
        });

        it('should handle example 3', () => {
            // 234234234234278 -> 434234234278 (remove 2, 3, 2 at start)
            expect(findMaxJoltagePart2('234234234234278')).toBe(434234234278);
        });

        it('should handle example 4', () => {
            // 818181911112111 -> 888911112111 (remove 1s at front)
            expect(findMaxJoltagePart2('818181911112111')).toBe(888911112111);
        });

        it('should handle bank with exactly 12 digits', () => {
            expect(findMaxJoltagePart2('123456789012')).toBe(123456789012);
        });

        it('should handle bank with 13 digits', () => {
            // Should select the 12 largest digits
            expect(findMaxJoltagePart2('1234567890123')).toBe(234567890123);
        });

        it('should return 0 for bank with less than 12 digits', () => {
            expect(findMaxJoltagePart2('12345678901')).toBe(0);
        });

        it('should handle bank with all same digits', () => {
            expect(findMaxJoltagePart2('1111111111111111')).toBe(111111111111);
        });

        it('should prioritize larger digits from left to right', () => {
            // Bank: 123456789012345, need 12 digits
            // Greedy: pick largest first digit (4), then continue
            expect(findMaxJoltagePart2('123456789012345')).toBe(456789012345);
        });

        it('should handle descending digits', () => {
            // Bank: 9876543210987654, need 12 digits
            // Greedy: pick 9, 8, 7, 6, 5, 4, then continue with remaining
            expect(findMaxJoltagePart2('9876543210987654')).toBe(987654987654);
        });
    });

    describe('solvePart2', () => {
        it('should solve the example correctly', () => {
            const input = `987654321111111
811111111111119
234234234234278
818181911112111`;
            const result = solvePart2(input);
            // Result may be number or string depending on size
            const expected = 987654321111 + 811111111119 + 434234234278 + 888911112111;
            expect(Number(result)).toBe(expected);
        });

        it('should handle single bank', () => {
            const input = '123456789012345';
            const result = solvePart2(input);
            expect(result).toBe(456789012345);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart2(input);
            expect(result).toBe(0);
        });

        it('should handle banks with less than 12 digits', () => {
            const input = '12345678901\n123456789012';
            const result = solvePart2(input);
            expect(result).toBe(123456789012); // Only second bank counts
        });
    });
});

