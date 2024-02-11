/** @module objects.test
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

import * as objects from './objects';

describe('objects', () => {
  // beforeAll(() => {})

  it('should expose object', () => {
    const type = typeof objects;
    expect(type).toBe('object');
  });

  describe('getDeepValue', () => {
    it('should be a function', () => {
      const type = typeof objects.getDeepValue;
      expect(type).toBe('function');
    });
    it('should return undefined for null', () => {
      const result = objects.getDeepValue(null, 'absent');
      expect(result).toEqual(undefined);
    });
    it('should return undefined for undefined', () => {
      const result = objects.getDeepValue(undefined, 'absent');
      expect(result).toEqual(undefined);
    });
    it('should fetch undefined for absent keys', () => {
      const result = objects.getDeepValue({ a: 1 }, 'b');
      expect(result).toEqual(undefined);
    });
    it('should fetch simple key value', () => {
      const result = objects.getDeepValue({ a: 1 }, 'a');
      expect(result).toEqual(1);
    });
    it('should fetch deep key value', () => {
      const result = objects.getDeepValue({ a: { b: 2 } }, 'a.b');
      expect(result).toEqual(2);
    });
  });

  describe('getObjectsDiff', () => {
    it('should be a function', () => {
      const type = typeof objects.getObjectsDiff;
      expect(type).toBe('function');
    });
    it('should return empty result for null', () => {
      const result = objects.getObjectsDiff(null, null);
      expect(result).toEqual({});
    });
    it('should find empty result for equal objects', () => {
      const result = objects.getObjectsDiff({ a: 1 }, { a: 1 });
      expect(result).toEqual({});
    });
    it('should find different properties', () => {
      const result = objects.getObjectsDiff({ a: 1 }, { a: 2 });
      expect(result).toEqual({ diff: ['a'] });
    });
    it('should find added properties', () => {
      const result = objects.getObjectsDiff({ a: 1 }, { a: 1, b: '2' });
      expect(result).toEqual({ added: ['b'] });
    });
    it('should find removed properties', () => {
      const result = objects.getObjectsDiff({ a: 1, b: '2' }, { a: 1 });
      expect(result).toEqual({ removed: ['b'] });
    });
  });
});
