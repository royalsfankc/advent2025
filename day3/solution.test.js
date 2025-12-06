import { describe, it, expect } from '@jest/globals';
import { findMaxJoltage, solvePart1 } from './solution.js';

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
});

