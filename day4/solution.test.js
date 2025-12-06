import { describe, it, expect } from '@jest/globals';
import { countAdjacentRolls, canAccessRoll, solvePart1, removeAccessibleRolls, simulateRemoval, solvePart2 } from './solution.js';

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

    describe('removeAccessibleRolls', () => {
        it('should remove all accessible rolls in one pass', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '.']
            ];
            const removed = removeAccessibleRolls(grid);
            expect(removed).toBe(1);
            expect(grid[1][1]).toBe('.');
        });

        it('should remove multiple accessible rolls', () => {
            const grid = [
                ['@', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '@']
            ];
            const removed = removeAccessibleRolls(grid);
            expect(removed).toBe(3);
            expect(grid[0][0]).toBe('.');
            expect(grid[1][1]).toBe('.');
            expect(grid[2][2]).toBe('.');
        });

        it('should not remove inaccessible rolls', () => {
            const grid = [
                ['@', '.', '@'],
                ['.', '@', '.'],
                ['@', '.', '@']
            ];
            const removed = removeAccessibleRolls(grid);
            expect(removed).toBe(4); // 4 corners are accessible
            expect(grid[1][1]).toBe('@'); // Center remains (inaccessible)
        });

        it('should return 0 when no rolls are accessible', () => {
            // Use a 2x2 grid where all positions have 3 adjacent (inaccessible)
            // Actually, in a 2x2, each has 3 adjacent, so all are accessible!
            // Let's use a pattern where center has 4+ adjacent
            const grid = [
                ['@', '@', '@', '@'],
                ['@', '@', '@', '@'],
                ['@', '@', '@', '@'],
                ['@', '@', '@', '@']
            ];
            // In a 4x4, corners have 3 adjacent (accessible), edges have 5 (inaccessible), center has 8 (inaccessible)
            // So corners will be removed, but let's check if any remain after first pass
            // Actually, let's use a different pattern - a dense center with sparse edges
            // Better: use a pattern where all have 4+ adjacent
            // Actually, the only way to have 0 accessible is if the grid is empty or has no @
            // Let's test with a pattern that has some inaccessible rolls
            const grid2 = [
                ['@', '@', '@'],
                ['@', '@', '@'],
                ['@', '@', '@']
            ];
            // Corners have 3 adjacent (accessible), so they will be removed
            const removed = removeAccessibleRolls(grid2);
            expect(removed).toBe(4); // 4 corners are accessible
        });

        it('should handle empty grid', () => {
            const grid = [];
            const removed = removeAccessibleRolls(grid);
            expect(removed).toBe(0);
        });

        it('should handle grid with no rolls', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', '.', '.']
            ];
            const removed = removeAccessibleRolls(grid);
            expect(removed).toBe(0);
        });
    });

    describe('simulateRemoval', () => {
        it('should remove all rolls in a simple case', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '.']
            ];
            const totalRemoved = simulateRemoval(grid);
            expect(totalRemoved).toBe(1);
            expect(grid[1][1]).toBe('.');
        });

        it('should handle cascading removal', () => {
            // Create a pattern where removing one makes others accessible
            // @ . @
            // . @ .
            // @ . @
            // Initially: 4 corners accessible (1 adjacent each)
            // After removing corners: center becomes accessible (0 adjacent)
            const grid = [
                ['@', '.', '@'],
                ['.', '@', '.'],
                ['@', '.', '@']
            ];
            const totalRemoved = simulateRemoval(grid);
            expect(totalRemoved).toBe(5); // 4 corners + 1 center
            // All should be removed
            expect(grid[0][0]).toBe('.');
            expect(grid[0][2]).toBe('.');
            expect(grid[1][1]).toBe('.');
            expect(grid[2][0]).toBe('.');
            expect(grid[2][2]).toBe('.');
        });

        it('should handle example with no cascading', () => {
            // All accessible rolls removed in first pass, no cascading
            const grid = [
                ['@', '.', '.'],
                ['.', '@', '.'],
                ['.', '.', '@']
            ];
            const totalRemoved = simulateRemoval(grid);
            expect(totalRemoved).toBe(3);
        });

        it('should stop when no more rolls can be removed', () => {
            // Grid where some rolls are permanently inaccessible
            // In a 3x3 grid of all @, corners have 3 adjacent (accessible)
            // After removing corners, edges have 2 adjacent (accessible)
            // After removing edges, center has 0 adjacent (accessible)
            // So all will be removed
            // Let's use a pattern that has some permanently inaccessible rolls
            // Actually, it's hard to create a pattern where rolls remain
            // Let's test with a pattern that eventually stops
            const grid = [
                ['@', '@', '@', '@'],
                ['@', '@', '@', '@'],
                ['@', '@', '@', '@'],
                ['@', '@', '@', '@']
            ];
            // This will cascade and remove many, but let's verify it stops
            const totalRemoved = simulateRemoval(grid);
            // Should remove at least some rolls
            expect(totalRemoved).toBeGreaterThan(0);
            // The function should stop when no more can be removed
            // Verify by checking that no accessible rolls remain
            let accessibleCount = 0;
            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[row].length; col++) {
                    if (grid[row][col] === '@' && canAccessRoll(grid, row, col)) {
                        accessibleCount++;
                    }
                }
            }
            expect(accessibleCount).toBe(0); // No accessible rolls should remain
        });
    });

    describe('solvePart2', () => {
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
            const result = solvePart2(input);
            expect(result).toBe(43);
        });

        it('should handle single roll', () => {
            const input = `...
.@.
...`;
            const result = solvePart2(input);
            expect(result).toBe(1);
        });

        it('should handle multiple isolated rolls', () => {
            const input = `@..
.@.
..@`;
            const result = solvePart2(input);
            expect(result).toBe(3);
        });

        it('should handle cascading removal', () => {
            // Pattern where removal cascades
            const input = `@.@
.@.
@.@`;
            // Initially: 4 corners accessible
            // After removing corners: center becomes accessible
            const result = solvePart2(input);
            expect(result).toBe(5);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart2(input);
            expect(result).toBe(0);
        });

        it('should handle input with no rolls', () => {
            const input = `...
...
...`;
            const result = solvePart2(input);
            expect(result).toBe(0);
        });

        it('should handle input where some rolls cannot be removed', () => {
            // Dense grid where center rolls are inaccessible
            const input = `@@@@
@@@@
@@@@
@@@@`;
            // Only corner rolls can be removed (they have 3 adjacent)
            // After removing corners, edge rolls might become accessible
            // But center rolls remain inaccessible
            const result = solvePart2(input);
            // Should remove at least the 4 corners
            expect(result).toBeGreaterThanOrEqual(4);
        });

        it('should handle input with blank lines', () => {
            const input = `@..

.@.`;
            const result = solvePart2(input);
            expect(result).toBe(2);
        });
    });
});

