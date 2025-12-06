import { describe, it, expect } from '@jest/globals';
import { formatSolutionResult, formatErrorMessage, loadDaySolution, checkDaySolutionExists } from './main.js';

describe('Main.js Functions', () => {
    describe('formatSolutionResult', () => {
        it('should format result with both parts', () => {
            const result = { part1: 123, part2: 456 };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Part 1:');
            expect(html).toContain('123');
            expect(html).toContain('Part 2:');
            expect(html).toContain('456');
        });

        it('should format result with only part1', () => {
            const result = { part1: 123 };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Part 1:');
            expect(html).toContain('123');
            expect(html).not.toContain('Part 2:');
        });

        it('should format result with only part2', () => {
            const result = { part2: 456 };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Part 2:');
            expect(html).toContain('456');
            expect(html).not.toContain('Part 1:');
        });

        it('should format error message', () => {
            const result = { error: 'Something went wrong' };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Error:');
            expect(html).toContain('Something went wrong');
        });

        it('should handle empty result', () => {
            const result = {};
            const html = formatSolutionResult(result);
            
            expect(html).toContain('No solution available yet');
        });

        it('should handle null result', () => {
            const html = formatSolutionResult(null);
            
            expect(html).toContain('No solution available yet');
        });
    });

    describe('formatErrorMessage', () => {
        it('should format error message correctly', () => {
            const error = new Error('Failed to load');
            const html = formatErrorMessage(5, error);
            
            expect(html).toContain('Error loading day 5:');
            expect(html).toContain('Failed to load');
            expect(html).toContain('error');
        });
    });

    describe('checkDaySolutionExists', () => {
        it('should return true for day 1 (exists)', async () => {
            const exists = await checkDaySolutionExists(1);
            expect(exists).toBe(true);
        });

        it('should return false for day 99 (does not exist)', async () => {
            const exists = await checkDaySolutionExists(99);
            expect(exists).toBe(false);
        });
    });

    // Note: loadDaySolution is tested indirectly through integration
    // as it requires actual day modules to exist
});

