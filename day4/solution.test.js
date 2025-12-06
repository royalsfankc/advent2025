import { describe, it, expect } from '@jest/globals';
import { countAdjacentRolls, canAccessRoll, solvePart1 } from './solution.js';

describe('Day 4 Solution', () => {
    describe('countAdjacentRolls', () => {
        it('should count 0 adjacent rolls for isolated roll', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '.']
            ];
            expect(countAdjacentRolls(grid, 1, 1)).toBe(0);
        });

        it('should count 1 adjacent roll', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '@']
            ];
            expect(countAdjacentRolls(grid, 1, 1)).toBe(1);
        });

        it('should count 2 adjacent rolls', () => {
            const grid = [
                ['@', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '@']
            ];
            expect(countAdjacentRolls(grid, 1, 1)).toBe(2);
        });

        it('should count 3 adjacent rolls', () => {
            const grid = [
                ['@', '.', '.'],
                ['@', '@', '.'],
                ['.', '.', '@']
            ];
            expect(countAdjacentRolls(grid, 1, 1)).toBe(3);
        });

        it('should count 4 adjacent rolls', () => {
            const grid = [
                ['@', '.', '@'],
                ['.', '@', '.'],
                ['@', '.', '@']
            ];
            expect(countAdjacentRolls(grid, 1, 1)).toBe(4);
        });

        it('should count all 8 adjacent rolls', () => {
            const grid = [
                ['@', '@', '@'],
                ['@', '@', '@'],
                ['@', '@', '@']
            ];
            expect(countAdjacentRolls(grid, 1, 1)).toBe(8);
        });

        it('should handle corner position (top-left)', () => {
            const grid = [
                ['@', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '.']
            ];
            expect(countAdjacentRolls(grid, 0, 0)).toBe(1); // Only bottom-right adjacent
        });

        it('should handle corner position (top-right)', () => {
            const grid = [
                ['.', '.', '@'],
                ['.', '@', '.'],
                ['.', '.', '.']
            ];
            expect(countAdjacentRolls(grid, 0, 2)).toBe(1); // Only bottom-left adjacent
        });

        it('should handle edge position (top edge)', () => {
            const grid = [
                ['.', '@', '.'],
                ['@', '.', '@'],
                ['.', '.', '.']
            ];
            expect(countAdjacentRolls(grid, 0, 1)).toBe(2); // Bottom-left, bottom, bottom-right
        });

        it('should handle edge position (left edge)', () => {
            const grid = [
                ['@', '.'],
                ['.', '@'],
                ['@', '.']
            ];
            // Position (1,0) has adjacent: top (0,0)=@, right (1,1)=@, bottom (2,0)=@
            expect(countAdjacentRolls(grid, 1, 0)).toBe(3);
        });

        it('should not count out-of-bounds positions', () => {
            const grid = [
                ['@']
            ];
            expect(countAdjacentRolls(grid, 0, 0)).toBe(0);
        });

        it('should handle mixed characters correctly', () => {
            const grid = [
                ['@', '.', '@'],
                ['.', '@', '.'],
                ['@', '.', '.']
            ];
            expect(countAdjacentRolls(grid, 1, 1)).toBe(3); // Only @ symbols count
        });
    });

    describe('canAccessRoll', () => {
        it('should return true when adjacent count is 0', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '.']
            ];
            expect(canAccessRoll(grid, 1, 1)).toBe(true);
        });

        it('should return true when adjacent count is 1', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '@']
            ];
            expect(canAccessRoll(grid, 1, 1)).toBe(true);
        });

        it('should return true when adjacent count is 2', () => {
            const grid = [
                ['@', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '@']
            ];
            expect(canAccessRoll(grid, 1, 1)).toBe(true);
        });

        it('should return true when adjacent count is 3', () => {
            const grid = [
                ['@', '.', '.'],
                ['@', '@', '.'],
                ['.', '.', '@']
            ];
            expect(canAccessRoll(grid, 1, 1)).toBe(true);
        });

        it('should return false when adjacent count is 4', () => {
            const grid = [
                ['@', '.', '@'],
                ['.', '@', '.'],
                ['@', '.', '@']
            ];
            expect(canAccessRoll(grid, 1, 1)).toBe(false);
        });

        it('should return false when adjacent count is 5', () => {
            const grid = [
                ['@', '.', '@'],
                ['@', '@', '@'],
                ['@', '.', '@']
            ];
            expect(canAccessRoll(grid, 1, 1)).toBe(false);
        });

        it('should return false when adjacent count is 8', () => {
            const grid = [
                ['@', '@', '@'],
                ['@', '@', '@'],
                ['@', '@', '@']
            ];
            expect(canAccessRoll(grid, 1, 1)).toBe(false);
        });
    });

    describe('solvePart1', () => {
        it('should solve the example correctly', () => {
            const input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
            const result = solvePart1(input);
            expect(result).toBe(13);
        });

        it('should handle single accessible roll', () => {
            const input = `...
.@.
...`;
            const result = solvePart1(input);
            expect(result).toBe(1);
        });

        it('should handle single inaccessible roll (surrounded by 4+)', () => {
            const input = `@.@
.@.
@.@`;
            // Center @ has 4 adjacent (inaccessible), but 4 corners each have 1 adjacent (accessible)
            const result = solvePart1(input);
            expect(result).toBe(4);
        });

        it('should handle multiple accessible rolls', () => {
            const input = `@..
.@.
..@`;
            const result = solvePart1(input);
            expect(result).toBe(3); // All three are accessible (each has 0-1 adjacent)
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle input with only dots', () => {
            const input = `...
...
...`;
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle mixed accessible and inaccessible rolls', () => {
            // Top-left @ has 1 adjacent (accessible)
            // Center @ has 4 adjacent (inaccessible)
            // Bottom-right @ has 1 adjacent (accessible)
            const input = `@..
.@.
..@`;
            const result = solvePart1(input);
            expect(result).toBe(3); // All accessible
        });

        it('should handle edge cases with rolls on boundaries', () => {
            const input = `@.
.@`;
            const result = solvePart1(input);
            expect(result).toBe(2); // Both accessible (each has 1 adjacent)
        });

        it('should handle example with many inaccessible rolls', () => {
            // Create a pattern where center rolls are inaccessible
            const input = `@@@@
@@@@
@@@@
@@@@`;
            // Corner positions have 3 adjacent @ (accessible)
            // Edge positions (non-corners) have 5 adjacent @ (inaccessible)
            // Center positions have 8 adjacent @ (inaccessible)
            // So 4 corners are accessible
            const result = solvePart1(input);
            expect(result).toBe(4);
        });

        it('should handle example with some accessible rolls on edges', () => {
            // Edge rolls might be accessible if they have fewer than 4 adjacent
            const input = `@.@
.@.
@.@`;
            // Corner @ symbols have 1 adjacent each (accessible)
            // Center @ has 4 adjacent (inaccessible)
            const result = solvePart1(input);
            expect(result).toBe(4); // 4 corners are accessible
        });

        it('should handle input with blank lines', () => {
            const input = `@..

.@.`;
            const result = solvePart1(input);
            expect(result).toBe(2);
        });

        it('should handle input with trailing whitespace', () => {
            const input = `@.  \n.@  `;
            const result = solvePart1(input);
            expect(result).toBe(2);
        });
    });
});

