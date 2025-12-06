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
            
            expect(html).toContain('Answers');
            expect(html).not.toContain('Part 1');
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

    describe('formatSolutionResult with puzzleInfo', () => {
        it('should format result with puzzleInfo title and description', () => {
            const result = {
                part1: 123,
                puzzleInfo: {
                    title: 'Test Puzzle',
                    description: 'This is a test puzzle'
                }
            };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Test Puzzle');
            expect(html).toContain('This is a test puzzle');
        });

        it('should format result with part1Description', () => {
            const result = {
                part1: 123,
                puzzleInfo: {
                    title: 'Test',
                    description: 'Test',
                    part1Description: 'Find the answer'
                }
            };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Part 1:');
            expect(html).toContain('Find the answer');
        });

        it('should format result with part2Description', () => {
            const result = {
                part2: 456,
                puzzleInfo: {
                    title: 'Test',
                    description: 'Test',
                    part2Description: 'Find the second answer'
                }
            };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Part 2:');
            expect(html).toContain('Find the second answer');
        });

        it('should format result with approach section', () => {
            const result = {
                part1: 123,
                puzzleInfo: {
                    title: 'Test',
                    description: 'Test',
                    approach: {
                        part1: 'Use algorithm X',
                        part2: 'Use algorithm Y'
                    }
                }
            };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Approach');
            expect(html).toContain('Use algorithm X');
            expect(html).toContain('Use algorithm Y');
        });

        it('should format result with approach part1 only', () => {
            const result = {
                part1: 123,
                puzzleInfo: {
                    title: 'Test',
                    description: 'Test',
                    approach: {
                        part1: 'Use algorithm X'
                    }
                }
            };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Use algorithm X');
            expect(html).not.toContain('Part 2:');
        });

        it('should format result with input section', () => {
            const result = {
                part1: 123,
                input: 'line1\nline2\nline3\nline4\nline5'
            };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Input');
            expect(html).toContain('line1');
            expect(html).toContain('Show all input');
        });

        it('should format result with functions section', () => {
            const result = {
                part1: 123,
                puzzleInfo: {
                    title: 'Test',
                    description: 'Test',
                    functions: {
                        'solvePart1': 'Solves part 1',
                        'helperFunc': 'Helper function'
                    }
                }
            };
            const html = formatSolutionResult(result);
            
            expect(html).toContain('Solution Functions');
            expect(html).toContain('solvePart1()');
            expect(html).toContain('Solves part 1');
            expect(html).toContain('helperFunc()');
            expect(html).toContain('Helper function');
        });

        it('should handle HTML escaping in puzzleInfo', () => {
            const result = {
                part1: 123,
                puzzleInfo: {
                    title: 'Test <script>alert("xss")</script>',
                    description: 'Test & "quotes"'
                }
            };
            const html = formatSolutionResult(result);
            
            // Should escape HTML, not execute it
            expect(html).not.toContain('<script>');
            expect(html).toContain('&lt;script&gt;');
            expect(html).toContain('&amp;');
        });
    });

    // Note: loadDaySolution is tested indirectly through integration
    // as it requires actual day modules to exist
    // Note: generateDayButtons, showAnswer, and DOM event handlers are browser-specific
    // and are tested through manual browser testing
});

