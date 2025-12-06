import { describe, it, expect } from '@jest/globals';
import { applyCircularRotation, countValueInCircularMovement } from './numbers.js';

describe('Numbers Utils', () => {
    describe('applyCircularRotation', () => {
        it('should rotate right correctly', () => {
            expect(applyCircularRotation(11, 8, 0, 99)).toBe(19);
        });

        it('should rotate left correctly', () => {
            expect(applyCircularRotation(19, -19, 0, 99)).toBe(0);
        });

        it('should wrap around when rotating left from 0', () => {
            expect(applyCircularRotation(0, -1, 0, 99)).toBe(99);
        });

        it('should wrap around when rotating right from 99', () => {
            expect(applyCircularRotation(99, 1, 0, 99)).toBe(0);
        });

        it('should handle custom range', () => {
            expect(applyCircularRotation(5, 3, 0, 10)).toBe(8);
            // Range 0-10 has 11 values, so 9 + 2 = 11, 11 % 11 = 0 (wraps to start)
            expect(applyCircularRotation(9, 2, 0, 10)).toBe(0); // Wraps to 0
            // Test actual wrap: 10 + 1 should wrap to 0, then +1 = 1
            expect(applyCircularRotation(10, 1, 0, 10)).toBe(0); // 10 + 1 = 11, wraps to 0
        });
    });

    describe('countValueInCircularMovement', () => {
        it('should count 1 crossing for L68 from position 50', () => {
            const result = countValueInCircularMovement(50, -68, 0, 0, 99);
            expect(result).toBe(1);
        });

        it('should count 1 crossing for R48 from position 52', () => {
            const result = countValueInCircularMovement(52, 48, 0, 0, 99);
            expect(result).toBe(1);
        });

        it('should count 10 crossings for R1000 from position 50', () => {
            const result = countValueInCircularMovement(50, 1000, 0, 0, 99);
            expect(result).toBe(10);
        });

        it('should return 0 for no movement', () => {
            const result = countValueInCircularMovement(50, 0, 0, 0, 99);
            expect(result).toBe(0);
        });
    });
});

