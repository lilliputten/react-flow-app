/** @module typescript.test
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

import * as typescript from './typescript';

enum EWithNumerics {
  A = 0,
  B = 1,
}
enum EWithLiterals {
  A = 'AValue',
  B = 'BValue',
}

describe('typescript', () => {
  // beforeAll(() => {})

  it('should expose object', () => {
    const type = typeof typescript;
    expect(type).toBe('object');
  });

  describe('getEnumKeys', () => {
    it('should be a function', () => {
      const type = typeof typescript.getEnumKeys;
      expect(type).toBe('function');
    });
    it('should get keys for enum with numeric values', () => {
      const result = typescript.getEnumKeys(EWithNumerics);
      expect(result).toEqual(['A', 'B']);
    });
    it('should get keys for enum with literal values', () => {
      const result = typescript.getEnumKeys(EWithLiterals);
      expect(result).toEqual(['A', 'B']);
    });
  });
  describe('getEnumValues', () => {
    it('should be a function', () => {
      const type = typeof typescript.getEnumValues;
      expect(type).toBe('function');
    });
    it('should get values for enum with numeric values', () => {
      const result = typescript.getEnumValues(EWithNumerics);
      expect(result).toEqual([0, 1]);
    });
    it('should get values for enum with literal values', () => {
      const result = typescript.getEnumValues(EWithLiterals);
      expect(result).toEqual(['AValue', 'BValue']);
    });
  });
  describe('getEnumMap', () => {
    it('should be a function', () => {
      const type = typeof typescript.getEnumMap;
      expect(type).toBe('function');
    });
    it('should get reversed hashmap for enum with numeric values', () => {
      const result = typescript.getEnumMap(EWithNumerics);
      expect(result).toEqual({ 0: 'A', 1: 'B' });
    });
    it('should get reversed hashmap for enum with literal values', () => {
      const result = typescript.getEnumMap(EWithLiterals);
      expect(result).toEqual({ AValue: 'A', BValue: 'B' });
    });
  });
});
