import { describe, it, expect } from '@jest/globals';
import { parseRange, parseRanges, isInRange, range } from './ranges.js';

describe('Ranges Utils', () => {
    describe('parseRange', () => {
        it('should parse a simple range correctly', () => {
            const result = parseRange('11-22');
            expect(result).toEqual({ start: 11, end: 22 });
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

    describe('parseRanges', () => {
        it('should parse comma-separated ranges', () => {
            const input = '11-22,95-115';
            const result = parseRanges(input);
            expect(result).toEqual([
                { start: 11, end: 22 },
                { start: 95, end: 115 }
            ]);
        });

        it('should handle whitespace', () => {
            const input = '11-22, 95-115 , 998-1012';
            const result = parseRanges(input);
            expect(result).toEqual([
                { start: 11, end: 22 },
                { start: 95, end: 115 },
                { start: 998, end: 1012 }
            ]);
        });

        it('should filter empty strings', () => {
            const input = '11-22,,95-115';
            const result = parseRanges(input);
            expect(result).toEqual([
                { start: 11, end: 22 },
                { start: 95, end: 115 }
            ]);
        });
    });

    describe('isInRange', () => {
        it('should return true for value in range', () => {
            expect(isInRange(15, 11, 22)).toBe(true);
        });

        it('should return true for value at start', () => {
            expect(isInRange(11, 11, 22)).toBe(true);
        });

        it('should return true for value at end', () => {
            expect(isInRange(22, 11, 22)).toBe(true);
        });

        it('should return false for value below range', () => {
            expect(isInRange(10, 11, 22)).toBe(false);
        });

        it('should return false for value above range', () => {
            expect(isInRange(23, 11, 22)).toBe(false);
        });
    });

    describe('range', () => {
        it('should generate all numbers in range', () => {
            expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
        });

        it('should handle single number range', () => {
            expect(range(5, 5)).toEqual([5]);
        });

        it('should handle empty range', () => {
            expect(range(5, 4)).toEqual([]);
        });
    });
});

