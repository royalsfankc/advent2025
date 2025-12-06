import { describe, it, expect } from '@jest/globals';
import { hasRepeatedPattern, hasTwoIdenticalHalves } from './strings.js';

describe('Strings Utils', () => {
    describe('hasTwoIdenticalHalves', () => {
        it('should return true for single digit repeated twice', () => {
            expect(hasTwoIdenticalHalves('11')).toBe(true);
            expect(hasTwoIdenticalHalves('22')).toBe(true);
        });

        it('should return true for two digits repeated twice', () => {
            expect(hasTwoIdenticalHalves('6464')).toBe(true);
        });

        it('should return true for three digits repeated twice', () => {
            expect(hasTwoIdenticalHalves('123123')).toBe(true);
        });

        it('should return false for odd length strings', () => {
            expect(hasTwoIdenticalHalves('123')).toBe(false);
            expect(hasTwoIdenticalHalves('12345')).toBe(false);
        });

        it('should return false for strings that are not repeated', () => {
            expect(hasTwoIdenticalHalves('12')).toBe(false);
            expect(hasTwoIdenticalHalves('1234')).toBe(false);
        });
    });

    describe('hasRepeatedPattern', () => {
        it('should return true for pattern repeated twice', () => {
            expect(hasRepeatedPattern('11', 2)).toBe(true);
            expect(hasRepeatedPattern('123123', 2)).toBe(true);
        });

        it('should return true for pattern repeated multiple times', () => {
            expect(hasRepeatedPattern('111', 2)).toBe(true); // 1 repeated 3 times
            expect(hasRepeatedPattern('123123123', 2)).toBe(true); // 123 repeated 3 times
            expect(hasRepeatedPattern('1212121212', 2)).toBe(true); // 12 repeated 5 times
        });

        it('should return false for strings without pattern', () => {
            expect(hasRepeatedPattern('123', 2)).toBe(false);
            expect(hasRepeatedPattern('1234', 2)).toBe(false);
        });

        it('should respect minParts parameter', () => {
            expect(hasRepeatedPattern('111', 3)).toBe(true); // 1 repeated 3 times
            expect(hasRepeatedPattern('11', 3)).toBe(false); // Only 2 parts
        });
    });
});

