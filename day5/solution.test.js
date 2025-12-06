import { describe, it, expect } from '@jest/globals';
import { parseInput, isIngredientFresh, solvePart1, parseRangesOnly, mergeRanges, countFreshIngredientIds, solvePart2 } from './solution.js';

describe('Day 5 Solution', () => {
    describe('parseInput', () => {
        it('should parse ranges and ingredient IDs correctly', () => {
            const input = `3-5
10-14
16-20

1
5
8
11
17
32`;
            const result = parseInput(input);
            
            expect(result.ranges).toHaveLength(3);
            expect(result.ranges[0]).toEqual({ start: 3, end: 5 });
            expect(result.ranges[1]).toEqual({ start: 10, end: 14 });
            expect(result.ranges[2]).toEqual({ start: 16, end: 20 });
            
            expect(result.ingredientIds).toEqual([1, 5, 8, 11, 17, 32]);
        });

        it('should handle single range and single ingredient ID', () => {
            const input = `1-10

5`;
            const result = parseInput(input);
            
            expect(result.ranges).toHaveLength(1);
            expect(result.ranges[0]).toEqual({ start: 1, end: 10 });
            expect(result.ingredientIds).toEqual([5]);
        });

        it('should handle multiple ranges and multiple ingredient IDs', () => {
            const input = `1-5
10-15
20-25

3
12
22
100`;
            const result = parseInput(input);
            
            expect(result.ranges).toHaveLength(3);
            expect(result.ingredientIds).toEqual([3, 12, 22, 100]);
        });

        it('should handle empty ranges section', () => {
            const input = `

5
10`;
            const result = parseInput(input);
            
            expect(result.ranges).toHaveLength(0);
            expect(result.ingredientIds).toEqual([5, 10]);
        });

        it('should handle empty ingredient IDs section', () => {
            const input = `1-5
10-15

`;
            const result = parseInput(input);
            
            expect(result.ranges).toHaveLength(2);
            expect(result.ingredientIds).toHaveLength(0);
        });

        it('should handle input with extra blank lines', () => {
            const input = `3-5

1
5

8`;
            const result = parseInput(input);
            
            expect(result.ranges).toHaveLength(1);
            expect(result.ranges[0]).toEqual({ start: 3, end: 5 });
            expect(result.ingredientIds).toEqual([1, 5, 8]);
        });

        it('should handle whitespace around ranges and IDs', () => {
            const input = `  3-5  
  10-14  

  1  
  5  `;
            const result = parseInput(input);
            
            expect(result.ranges).toHaveLength(2);
            expect(result.ranges[0]).toEqual({ start: 3, end: 5 });
            expect(result.ranges[1]).toEqual({ start: 10, end: 14 });
            expect(result.ingredientIds).toEqual([1, 5]);
        });
    });

    describe('isIngredientFresh', () => {
        it('should return true when ingredient is in a range', () => {
            const ranges = [
                { start: 3, end: 5 },
                { start: 10, end: 14 }
            ];
            expect(isIngredientFresh(3, ranges)).toBe(true);
            expect(isIngredientFresh(4, ranges)).toBe(true);
            expect(isIngredientFresh(5, ranges)).toBe(true);
            expect(isIngredientFresh(10, ranges)).toBe(true);
            expect(isIngredientFresh(12, ranges)).toBe(true);
            expect(isIngredientFresh(14, ranges)).toBe(true);
        });

        it('should return false when ingredient is not in any range', () => {
            const ranges = [
                { start: 3, end: 5 },
                { start: 10, end: 14 }
            ];
            expect(isIngredientFresh(1, ranges)).toBe(false);
            expect(isIngredientFresh(2, ranges)).toBe(false);
            expect(isIngredientFresh(6, ranges)).toBe(false);
            expect(isIngredientFresh(9, ranges)).toBe(false);
            expect(isIngredientFresh(15, ranges)).toBe(false);
        });

        it('should return true when ingredient is in multiple ranges', () => {
            const ranges = [
                { start: 3, end: 10 },
                { start: 8, end: 15 }
            ];
            // 8, 9, 10 are in both ranges
            expect(isIngredientFresh(8, ranges)).toBe(true);
            expect(isIngredientFresh(9, ranges)).toBe(true);
            expect(isIngredientFresh(10, ranges)).toBe(true);
        });

        it('should handle empty ranges array', () => {
            const ranges = [];
            expect(isIngredientFresh(5, ranges)).toBe(false);
        });

        it('should handle single range', () => {
            const ranges = [{ start: 1, end: 5 }];
            expect(isIngredientFresh(1, ranges)).toBe(true);
            expect(isIngredientFresh(3, ranges)).toBe(true);
            expect(isIngredientFresh(5, ranges)).toBe(true);
            expect(isIngredientFresh(0, ranges)).toBe(false);
            expect(isIngredientFresh(6, ranges)).toBe(false);
        });

        it('should handle ranges with same start and end', () => {
            const ranges = [{ start: 5, end: 5 }];
            expect(isIngredientFresh(5, ranges)).toBe(true);
            expect(isIngredientFresh(4, ranges)).toBe(false);
            expect(isIngredientFresh(6, ranges)).toBe(false);
        });

        it('should handle non-overlapping ranges', () => {
            const ranges = [
                { start: 1, end: 5 },
                { start: 10, end: 15 },
                { start: 20, end: 25 }
            ];
            expect(isIngredientFresh(3, ranges)).toBe(true);
            expect(isIngredientFresh(12, ranges)).toBe(true);
            expect(isIngredientFresh(22, ranges)).toBe(true);
            expect(isIngredientFresh(7, ranges)).toBe(false);
            expect(isIngredientFresh(18, ranges)).toBe(false);
        });
    });

    describe('solvePart1', () => {
        it('should solve the example correctly', () => {
            const input = `3-5
10-14
16-20

1
5
8
11
17
32`;
            const result = solvePart1(input);
            expect(result).toBe(3); // 5, 11, 17 are fresh
        });

        it('should handle single fresh ingredient', () => {
            const input = `1-10

5`;
            const result = solvePart1(input);
            expect(result).toBe(1);
        });

        it('should handle no fresh ingredients', () => {
            const input = `1-5

10
20
30`;
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle all fresh ingredients', () => {
            const input = `1-10

1
5
10`;
            const result = solvePart1(input);
            expect(result).toBe(3);
        });

        it('should handle overlapping ranges', () => {
            const input = `3-10
8-15

5
10
20`;
            // 5 is in first range, 10 is in both ranges, 20 is in neither
            const result = solvePart1(input);
            expect(result).toBe(2);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle input with no ingredient IDs', () => {
            const input = `1-5
10-15

`;
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle input with no ranges', () => {
            const input = `

5
10`;
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle large numbers', () => {
            const input = `1000-2000
5000-6000

1500
5500
9999`;
            const result = solvePart1(input);
            expect(result).toBe(2); // 1500 and 5500 are fresh
        });

        it('should handle single-value ranges', () => {
            const input = `5-5
10-10

5
10
15`;
            const result = solvePart1(input);
            expect(result).toBe(2); // 5 and 10 are fresh
        });

        it('should handle ingredient IDs at range boundaries', () => {
            const input = `1-5
10-15

1
5
10
15
0
6
9
16`;
            const result = solvePart1(input);
            expect(result).toBe(4); // 1, 5, 10, 15 are fresh
        });
    });

    describe('parseRangesOnly', () => {
        it('should parse only ranges, stopping at blank line', () => {
            const input = `3-5
10-14
16-20

1
5
8`;
            const result = parseRangesOnly(input);
            
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({ start: 3, end: 5 });
            expect(result[1]).toEqual({ start: 10, end: 14 });
            expect(result[2]).toEqual({ start: 16, end: 20 });
        });

        it('should handle input with no blank line', () => {
            const input = `1-5
10-15`;
            const result = parseRangesOnly(input);
            
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ start: 1, end: 5 });
            expect(result[1]).toEqual({ start: 10, end: 15 });
        });

        it('should handle input starting with blank line', () => {
            const input = `

1-5`;
            const result = parseRangesOnly(input);
            
            expect(result).toHaveLength(0);
        });

        it('should handle single range', () => {
            const input = `1-10

5`;
            const result = parseRangesOnly(input);
            
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({ start: 1, end: 10 });
        });

        it('should handle empty input', () => {
            const input = '';
            const result = parseRangesOnly(input);
            
            expect(result).toHaveLength(0);
        });
    });

    describe('mergeRanges', () => {
        it('should merge overlapping ranges', () => {
            const ranges = [
                { start: 1, end: 5 },
                { start: 3, end: 10 }
            ];
            const result = mergeRanges(ranges);
            
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({ start: 1, end: 10 });
        });

        it('should merge adjacent ranges', () => {
            const ranges = [
                { start: 1, end: 5 },
                { start: 6, end: 10 }
            ];
            const result = mergeRanges(ranges);
            
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({ start: 1, end: 10 });
        });

        it('should not merge non-overlapping ranges', () => {
            const ranges = [
                { start: 1, end: 5 },
                { start: 10, end: 15 }
            ];
            const result = mergeRanges(ranges);
            
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ start: 1, end: 5 });
            expect(result[1]).toEqual({ start: 10, end: 15 });
        });

        it('should handle multiple overlapping ranges', () => {
            const ranges = [
                { start: 3, end: 5 },
                { start: 10, end: 14 },
                { start: 16, end: 20 },
                { start: 12, end: 18 }
            ];
            const result = mergeRanges(ranges);
            
            // Should merge: 3-5, 10-20 (12-18 and 16-20 merge with 10-14)
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ start: 3, end: 5 });
            expect(result[1]).toEqual({ start: 10, end: 20 });
        });

        it('should handle empty ranges array', () => {
            const ranges = [];
            const result = mergeRanges(ranges);
            
            expect(result).toHaveLength(0);
        });

        it('should handle single range', () => {
            const ranges = [{ start: 1, end: 5 }];
            const result = mergeRanges(ranges);
            
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({ start: 1, end: 5 });
        });

        it('should sort ranges before merging', () => {
            const ranges = [
                { start: 10, end: 15 },
                { start: 1, end: 5 }
            ];
            const result = mergeRanges(ranges);
            
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ start: 1, end: 5 });
            expect(result[1]).toEqual({ start: 10, end: 15 });
        });

        it('should handle completely overlapping ranges', () => {
            const ranges = [
                { start: 1, end: 10 },
                { start: 5, end: 15 }
            ];
            const result = mergeRanges(ranges);
            
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({ start: 1, end: 15 });
        });
    });

    describe('countFreshIngredientIds', () => {
        it('should count IDs from single range', () => {
            const ranges = [{ start: 3, end: 5 }];
            const result = countFreshIngredientIds(ranges);
            
            expect(result).toBe(3); // 3, 4, 5
        });

        it('should count IDs from multiple non-overlapping ranges', () => {
            const ranges = [
                { start: 1, end: 3 },
                { start: 10, end: 12 }
            ];
            const result = countFreshIngredientIds(ranges);
            
            expect(result).toBe(6); // 1-3 (3) + 10-12 (3) = 6
        });

        it('should handle overlapping ranges correctly', () => {
            const ranges = [
                { start: 3, end: 5 },
                { start: 10, end: 14 },
                { start: 16, end: 20 },
                { start: 12, end: 18 }
            ];
            const result = countFreshIngredientIds(ranges);
            
            // Merged: 3-5 (3 IDs) + 10-20 (11 IDs) = 14
            expect(result).toBe(14);
        });

        it('should handle completely overlapping ranges', () => {
            const ranges = [
                { start: 1, end: 10 },
                { start: 5, end: 15 }
            ];
            const result = countFreshIngredientIds(ranges);
            
            // Merged: 1-15 = 15 IDs
            expect(result).toBe(15);
        });

        it('should handle adjacent ranges', () => {
            const ranges = [
                { start: 1, end: 5 },
                { start: 6, end: 10 }
            ];
            const result = countFreshIngredientIds(ranges);
            
            // Merged: 1-10 = 10 IDs
            expect(result).toBe(10);
        });

        it('should handle empty ranges array', () => {
            const ranges = [];
            const result = countFreshIngredientIds(ranges);
            
            expect(result).toBe(0);
        });

        it('should handle single-value ranges', () => {
            const ranges = [
                { start: 5, end: 5 },
                { start: 10, end: 10 }
            ];
            const result = countFreshIngredientIds(ranges);
            
            expect(result).toBe(2); // 5 and 10
        });

        it('should handle ranges with same start and end', () => {
            const ranges = [
                { start: 1, end: 1 },
                { start: 1, end: 1 }
            ];
            const result = countFreshIngredientIds(ranges);
            
            // Merged: 1-1 = 1 ID
            expect(result).toBe(1);
        });
    });

    describe('solvePart2', () => {
        it('should solve the example correctly', () => {
            const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
            const result = solvePart2(input);
            // Unique IDs: 3,4,5,10,11,12,13,14,15,16,17,18,19,20 = 14
            expect(result).toBe(14);
        });

        it('should handle single range', () => {
            const input = `1-5

10`;
            const result = solvePart2(input);
            expect(result).toBe(5); // 1,2,3,4,5
        });

        it('should handle non-overlapping ranges', () => {
            const input = `1-3
10-12

5`;
            const result = solvePart2(input);
            expect(result).toBe(6); // 1,2,3,10,11,12
        });

        it('should handle overlapping ranges', () => {
            const input = `1-5
3-7

10`;
            const result = solvePart2(input);
            // Unique IDs: 1,2,3,4,5,6,7 = 7
            expect(result).toBe(7);
        });

        it('should handle completely overlapping ranges', () => {
            const input = `1-10
5-15

20`;
            const result = solvePart2(input);
            // Unique IDs: 1-15 = 15
            expect(result).toBe(15);
        });

        it('should ignore ingredient IDs section', () => {
            const input = `1-5

10
20
30`;
            const result = solvePart2(input);
            // Should only count IDs from ranges: 1,2,3,4,5 = 5
            expect(result).toBe(5);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart2(input);
            expect(result).toBe(0);
        });

        it('should handle input with no ranges', () => {
            const input = `

5
10`;
            const result = solvePart2(input);
            expect(result).toBe(0);
        });

        it('should handle input with no blank line', () => {
            const input = `1-5
10-15`;
            const result = solvePart2(input);
            // Should parse all ranges: 1,2,3,4,5,10,11,12,13,14,15 = 11
            expect(result).toBe(11);
        });

        it('should handle large ranges', () => {
            const input = `1000-1005
2000-2002

5000`;
            const result = solvePart2(input);
            // 1000-1005 (6 IDs) + 2000-2002 (3 IDs) = 9
            expect(result).toBe(9);
        });

        it('should handle many overlapping ranges', () => {
            const input = `1-10
5-15
10-20
15-25

30`;
            const result = solvePart2(input);
            // Unique IDs: 1-25 = 25
            expect(result).toBe(25);
        });
    });
});

