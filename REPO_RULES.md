# Repository Rules and Practices

This document outlines the coding standards, practices, and rules that should be followed when working on this Advent of Code 2025 repository.

## Core Principles

1. **Simplicity First**: Keep code simple, clean, and readable. Avoid over-engineering.
2. **Test Everything**: Every function must have corresponding tests. No exceptions.
3. **Best Practices**: Follow JavaScript best practices and modern ES6+ patterns.
4. **Function Purity**: Prefer pure functions when possible (no side effects, same input = same output).

## Code Standards

### Function Guidelines

- **Single Responsibility**: Each function should do one thing well
- **Pure Functions**: Prefer pure functions (no side effects) when possible
- **Descriptive Names**: Use clear, descriptive function names
- **Small Functions**: Keep functions small and focused (ideally < 50 lines)
- **Documentation**: Add JSDoc comments for complex functions
- **Error Handling**: Handle errors gracefully with try-catch where appropriate

### Code Structure

- **ES6+ Features**: Use modern JavaScript (arrow functions, destructuring, async/await, etc.)
- **Modular Design**: Break solutions into small, testable functions
- **No Magic Numbers**: Use named constants instead of magic numbers
- **Consistent Formatting**: Follow consistent indentation and spacing

### Example Function Structure

```javascript
/**
 * Solves part 1 of the puzzle
 * @param {string} input - The puzzle input
 * @returns {number} The answer for part 1
 */
function solvePart1(input) {
    // Implementation
    return result;
}
```

## Testing Requirements

### Mandatory Testing Rules

1. **Every Function Must Have Tests**: When you create a new function, immediately create tests for it
2. **Test Before/After Changes**: When altering a function, update or add tests
3. **Test Coverage**: Aim for 100% function coverage (all functions tested)
4. **Test Location**: Tests should be in `dayN/solution.test.js` files
5. **Test Naming**: Use descriptive test names: `describe('functionName', () => { it('should do X when Y', ...) })`

### Test Structure

```javascript
describe('Day N Solution', () => {
    describe('solvePart1', () => {
        it('should return correct answer for example input', () => {
            const input = 'example';
            const result = solvePart1(input);
            expect(result).toBe(expected);
        });

        it('should handle edge cases', () => {
            // Test edge cases
        });
    });
});
```

### What to Test

- **Happy Path**: Normal input and expected output
- **Edge Cases**: Empty input, single items, boundary conditions
- **Error Cases**: Invalid input, missing data
- **Helper Functions**: Test all helper/utility functions separately

## File Organization

### Day Structure

```
dayN/
  ├── solution.js      # Main solution with exported solve() function
  ├── solution.test.js # Tests for all functions in solution.js
  ├── input.txt        # Puzzle input
  └── README.md        # Optional: Notes about the solution
```

### Function Organization in solution.js

```javascript
// 1. Helper/utility functions (pure functions first)
function helperFunction1() { }
function helperFunction2() { }

// 2. Part 1 solution
function solvePart1(input) { }

// 3. Part 2 solution
function solvePart2(input) { }

// 4. Main solve function (exports)
export async function solve() { }
```

## Workflow

### When Creating a New Function

1. Write the function
2. **Immediately** write tests for it
3. Run tests to ensure they pass
4. Refactor if needed (and update tests)

### When Altering a Function

1. Update existing tests or write new ones first (TDD approach)
2. Make the changes
3. Run tests to ensure everything still works
4. Add tests for new edge cases if needed

### Before Committing

1. All tests must pass: `npm test`
2. Code should be clean and follow these rules
3. No console.log statements in production code (use for debugging only, remove before commit)

## Best Practices

### Input Processing

- Parse input into a usable format early
- Create helper functions for parsing if needed
- Test parsing functions separately

### Algorithm Design

- Start with a simple, working solution
- Optimize only if needed (Advent of Code usually doesn't require extreme optimization)
- Comment complex algorithms

### Error Handling

- Use try-catch for async operations
- Return meaningful error messages
- Test error cases

## Example Day Structure

```javascript
// day1/solution.js

// Helper function
function parseInput(input) {
    return input.trim().split('\n').map(Number);
}

// Part 1
function solvePart1(input) {
    const numbers = parseInput(input);
    // Solution logic
    return result;
}

// Part 2
function solvePart2(input) {
    const numbers = parseInput(input);
    // Solution logic
    return result;
}

// Main export
export async function solve() {
    const input = await fetchInput();
    return {
        part1: solvePart1(input),
        part2: solvePart2(input)
    };
}
```

```javascript
// day1/solution.test.js

import { solvePart1, solvePart2, parseInput } from './solution.js';

describe('Day 1 Solution', () => {
    describe('parseInput', () => {
        it('should parse input correctly', () => {
            const input = '1\n2\n3';
            expect(parseInput(input)).toEqual([1, 2, 3]);
        });
    });

    describe('solvePart1', () => {
        it('should solve example', () => {
            const input = 'example';
            expect(solvePart1(input)).toBe(expected);
        });
    });

    describe('solvePart2', () => {
        it('should solve example', () => {
            const input = 'example';
            expect(solvePart2(input)).toBe(expected);
        });
    });
});
```

## AI Assistant Rules

When working on this repository, AI assistants should:

1. **Always create tests** when creating new functions
2. **Always update tests** when modifying functions
3. **Run tests** after making changes
4. **Follow the function structure** outlined above
5. **Keep functions small and focused**
6. **Use descriptive names**
7. **Prefer pure functions**
8. **Handle errors appropriately**
9. **Reference this document** when making decisions about code structure

## Testing Commands

- Run all tests: `npm test`
- Run tests for a specific day: `npm test -- day1`
- Run tests in watch mode: `npm test -- --watch`
- Check test coverage: `npm test -- --coverage`

