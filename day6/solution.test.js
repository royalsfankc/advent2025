import { describe, it, expect } from '@jest/globals';
import { parseWorksheet, solveProblem, solvePart1 } from './solution.js';

describe('Day 6 Solution', () => {
    describe('parseWorksheet', () => {
        it('should parse the example correctly', () => {
            const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
            const result = parseWorksheet(input);
            
            expect(result).toHaveLength(4);
            expect(result[0]).toEqual({ numbers: [123, 45, 6], operation: '*' });
            expect(result[1]).toEqual({ numbers: [328, 64, 98], operation: '+' });
            expect(result[2]).toEqual({ numbers: [51, 387, 215], operation: '*' });
            expect(result[3]).toEqual({ numbers: [64, 23, 314], operation: '+' });
        });

        it('should handle single problem', () => {
            const input = `123
 45
  6
*`;
            const result = parseWorksheet(input);
            
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({ numbers: [123, 45, 6], operation: '*' });
        });

        it('should handle problems with different spacing', () => {
            const input = `1  2
3  4
+  *`;
            const result = parseWorksheet(input);
            
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ numbers: [1, 3], operation: '+' });
            expect(result[1]).toEqual({ numbers: [2, 4], operation: '*' });
        });

        it('should handle empty input', () => {
            const input = '';
            const result = parseWorksheet(input);
            
            expect(result).toHaveLength(0);
        });

        it('should handle problems with single-digit numbers', () => {
            const input = `1 2 3
4 5 6
+ * +`;
            const result = parseWorksheet(input);
            
            expect(result).toHaveLength(3);
            expect(result[0]).toEqual({ numbers: [1, 4], operation: '+' });
            expect(result[1]).toEqual({ numbers: [2, 5], operation: '*' });
            expect(result[2]).toEqual({ numbers: [3, 6], operation: '+' });
        });

        it('should handle problems with varying number widths', () => {
            const input = `1   100
2   200
+   *`;
            const result = parseWorksheet(input);
            
            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({ numbers: [1, 2], operation: '+' });
            expect(result[1]).toEqual({ numbers: [100, 200], operation: '*' });
        });
    });

    describe('solveProblem', () => {
        it('should solve multiplication problem', () => {
            const result = solveProblem([123, 45, 6], '*');
            expect(result).toBe(33210); // 123 * 45 * 6
        });

        it('should solve addition problem', () => {
            const result = solveProblem([328, 64, 98], '+');
            expect(result).toBe(490); // 328 + 64 + 98
        });

        it('should handle single number with multiplication', () => {
            const result = solveProblem([5], '*');
            expect(result).toBe(5);
        });

        it('should handle single number with addition', () => {
            const result = solveProblem([5], '+');
            expect(result).toBe(5);
        });

        it('should handle empty array', () => {
            const result = solveProblem([], '*');
            expect(result).toBe(0);
        });

        it('should handle large numbers', () => {
            const result = solveProblem([1000, 2000, 3000], '*');
            expect(result).toBe(6000000000);
        });

        it('should handle many numbers', () => {
            const result = solveProblem([1, 2, 3, 4, 5], '+');
            expect(result).toBe(15);
        });
    });

    describe('solvePart1', () => {
        it('should solve the example correctly', () => {
            const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
            const result = solvePart1(input);
            // 33210 + 490 + 4243455 + 401 = 4277556
            expect(result).toBe(4277556);
        });

        it('should handle single problem', () => {
            const input = `123
 45
  6
*`;
            const result = solvePart1(input);
            expect(result).toBe(33210); // 123 * 45 * 6
        });

        it('should handle multiple problems', () => {
            const input = `1 2
3 4
+ *`;
            const result = solvePart1(input);
            // (1+3) + (2*4) = 4 + 8 = 12
            expect(result).toBe(12);
        });

        it('should handle empty input', () => {
            const input = '';
            const result = solvePart1(input);
            expect(result).toBe(0);
        });

        it('should handle problems with different operations', () => {
            const input = `10 20
5  10
*  +`;
            const result = solvePart1(input);
            // (10*5) + (20+10) = 50 + 30 = 80
            expect(result).toBe(80);
        });
    });
});

