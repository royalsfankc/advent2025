import { describe, it, expect } from '@jest/globals';
import { parseRotation, applyRotation, solvePart1 } from './solution.js';

describe('Day 1 Solution', () => {
    describe('parseRotation', () => {
        it('should parse left rotation correctly', () => {
            const result = parseRotation('L68');
            expect(result).toEqual({ direction: 'L', distance: 68 });
        });

        it('should parse right rotation correctly', () => {
            const result = parseRotation('R48');
            expect(result).toEqual({ direction: 'R', distance: 48 });
        });

        it('should handle single digit distances', () => {
            const result = parseRotation('L5');
            expect(result).toEqual({ direction: 'L', distance: 5 });
        });

        it('should handle double digit distances', () => {
            const result = parseRotation('R99');
            expect(result).toEqual({ direction: 'R', distance: 99 });
        });

        it('should trim whitespace', () => {
            const result = parseRotation('  L10  ');
            expect(result).toEqual({ direction: 'L', distance: 10 });
        });

        it('should throw error for invalid direction', () => {
            expect(() => parseRotation('X10')).toThrow('Invalid direction');
        });

        it('should throw error for invalid distance', () => {
            expect(() => parseRotation('Labc')).toThrow('Invalid distance');
        });

        it('should throw error for empty string', () => {
            expect(() => parseRotation('')).toThrow('Empty rotation string');
        });
    });

    describe('applyRotation', () => {
        it('should rotate right correctly', () => {
            expect(applyRotation(11, { direction: 'R', distance: 8 })).toBe(19);
        });

        it('should rotate left correctly', () => {
            expect(applyRotation(19, { direction: 'L', distance: 19 })).toBe(0);
        });

        it('should wrap around when rotating left from 0', () => {
            expect(applyRotation(0, { direction: 'L', distance: 1 })).toBe(99);
        });

        it('should wrap around when rotating right from 99', () => {
            expect(applyRotation(99, { direction: 'R', distance: 1 })).toBe(0);
        });

        it('should handle large left rotation that wraps multiple times', () => {
            expect(applyRotation(5, { direction: 'L', distance: 10 })).toBe(95);
        });

        it('should handle large right rotation that wraps multiple times', () => {
            expect(applyRotation(95, { direction: 'R', distance: 5 })).toBe(0);
        });

        it('should handle rotation to exactly 0', () => {
            expect(applyRotation(50, { direction: 'L', distance: 50 })).toBe(0);
        });

        it('should handle rotation from 0 to 0', () => {
            expect(applyRotation(0, { direction: 'R', distance: 100 })).toBe(0);
        });
    });

    describe('solvePart1', () => {
        it('should solve the example correctly', () => {
            const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
            const result = solvePart1(input);
            expect(result).toBe(3);
        });

        it('should count when dial starts at 0 after first rotation', () => {
            const input = 'L50'; // From 50, L50 = 0
            const result = solvePart1(input);
            expect(result).toBe(1);
        });

        it('should return 0 if dial never points at 0', () => {
            const input = 'R1\nR1\nR1';
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle single rotation', () => {
            const input = 'L50';
            const result = solvePart1(input);
            expect(result).toBe(1);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle input with blank lines', () => {
            const input = 'L50\n\nR50';
            const result = solvePart1(input);
            expect(result).toBe(1); // Only L50 reaches 0
        });

        it('should track position correctly through multiple rotations', () => {
            // Start at 50, R48 = 98, L98 = 0 (count 1)
            const input = 'R48\nL98';
            const result = solvePart1(input);
            expect(result).toBe(1);
        });
    });
});
