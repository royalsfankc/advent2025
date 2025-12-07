import { describe, it, expect } from '@jest/globals';
import { findStartPosition, simulateBeamPropagation, solvePart1 } from './solution.js';

describe('Day 7 Solution', () => {
    describe('findStartPosition', () => {
        it('should find S at the top', () => {
            const grid = [
                ['S', '.', '.'],
                ['.', '.', '.']
            ];
            const result = findStartPosition(grid);
            expect(result).toEqual({ row: 0, col: 0 });
        });

        it('should find S in the middle', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', 'S', '.'],
                ['.', '.', '.']
            ];
            const result = findStartPosition(grid);
            expect(result).toEqual({ row: 1, col: 1 });
        });

        it('should return null if S not found', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', '.', '.']
            ];
            const result = findStartPosition(grid);
            expect(result).toBeNull();
        });

        it('should find S at edge', () => {
            const grid = [
                ['.', '.', 'S'],
                ['.', '.', '.']
            ];
            const result = findStartPosition(grid);
            expect(result).toEqual({ row: 0, col: 2 });
        });
    });

    describe('simulateBeamPropagation', () => {
        it('should handle beam with no splitters', () => {
            const grid = [
                ['.', 'S', '.'],
                ['.', '.', '.'],
                ['.', '.', '.']
            ];
            const result = simulateBeamPropagation(grid);
            expect(result).toBe(0);
        });

        it('should handle single splitter', () => {
            const grid = [
                ['.', 'S', '.'],
                ['.', '.', '.'],
                ['.', '^', '.']
            ];
            const result = simulateBeamPropagation(grid);
            expect(result).toBe(1);
        });

        it('should handle beam that exits grid', () => {
            const grid = [
                ['.', 'S', '.'],
                ['.', '.', '.']
            ];
            const result = simulateBeamPropagation(grid);
            expect(result).toBe(0);
        });

        it('should handle splitter at edge (left)', () => {
            const grid = [
                ['S', '.', '.'],
                ['.', '.', '.'],
                ['^', '.', '.']
            ];
            const result = simulateBeamPropagation(grid);
            expect(result).toBe(1);
            // Beam should only go right (left would be out of bounds)
        });

        it('should handle splitter at edge (right)', () => {
            const grid = [
                ['.', '.', 'S'],
                ['.', '.', '.'],
                ['.', '.', '^']
            ];
            const result = simulateBeamPropagation(grid);
            expect(result).toBe(1);
            // Beam should only go left (right would be out of bounds)
        });

        it('should handle two splitters in sequence', () => {
            // Beam hits first splitter, splits into two beams
            // Those beams continue down and can hit splitters below
            const grid = [
                ['.', 'S', '.'],
                ['.', '.', '.'],
                ['.', '^', '.'],
                ['.', '.', '.'],
                ['^', '.', '^']  // Two splitters that the split beams can hit
            ];
            const result = simulateBeamPropagation(grid);
            // First split at row 2, then two beams hit splitters at row 4
            expect(result).toBe(3);
        });

        it('should handle splitter creating two beams that hit splitters', () => {
            const grid = [
                ['.', 'S', '.'],
                ['.', '.', '.'],
                ['.', '^', '.'],
                ['.', '.', '.'],
                ['^', '.', '^']
            ];
            const result = simulateBeamPropagation(grid);
            // First split at row 2, then two beams hit splitters at row 4
            expect(result).toBe(3);
        });

        it('should handle multiple beams hitting same splitter (only count once)', () => {
            // Create a case where two beams from a split converge on the same splitter
            const grid = [
                ['.', '.', 'S', '.', '.'],
                ['.', '.', '.', '.', '.'],
                ['.', '.', '^', '.', '.'],  // First splitter
                ['.', '.', '.', '.', '.'],
                ['.', '^', '.', '^', '.'],  // Two splitters that beams can hit
                ['.', '.', '.', '.', '.'],
                ['.', '.', '^', '.', '.']   // Splitter where both beams converge
            ];
            const result = simulateBeamPropagation(grid);
            // Beam starts at (0,2), moves down
            // At row 2, hits splitter at (2,2) - 1 split, emits beams at (2,1) and (2,3)
            // Beams at (2,1) and (2,3) move down
            // At row 4, beam from (3,1) hits splitter at (4,1) - 1 split
            // At row 4, beam from (3,3) hits splitter at (4,3) - 1 split
            // Beams continue and both hit splitter at (6,2) - but only count as 1 split
            // Total: 4 splits
            expect(result).toBe(4);
        });

        it('should solve the example correctly', () => {
            const input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;
            const grid = input.trim().split('\n').map(line => line.split(''));
            const result = simulateBeamPropagation(grid);
            expect(result).toBe(21);
        });

        it('should handle empty grid', () => {
            const grid = [];
            const result = simulateBeamPropagation(grid);
            expect(result).toBe(0);
        });

        it('should handle grid with no S', () => {
            const grid = [
                ['.', '.', '.'],
                ['.', '.', '.']
            ];
            const result = simulateBeamPropagation(grid);
            expect(result).toBe(0);
        });

        it('should handle complex branching', () => {
            const grid = [
                ['.', '.', 'S', '.', '.'],
                ['.', '.', '.', '.', '.'],
                ['.', '.', '^', '.', '.'],
                ['.', '.', '.', '.', '.'],
                ['.', '^', '.', '^', '.'],
                ['.', '.', '.', '.', '.'],
                ['^', '.', '.', '.', '^']
            ];
            const result = simulateBeamPropagation(grid);
            // Row 2: 1 split (creates 2 beams)
            // Row 4: 2 splits (2 beams hit 2 splitters)
            // Row 6: 2 splits (2 beams hit 2 splitters)
            expect(result).toBe(5);
        });
    });

    describe('solvePart1', () => {
        it('should solve the example correctly', () => {
            const input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;
            const result = solvePart1(input);
            expect(result).toBe(21);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle simple case', () => {
            const input = `S
.
^`;
            const result = solvePart1(input);
            expect(result).toBe(1);
        });
    });
});

