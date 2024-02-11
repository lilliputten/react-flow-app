import * as numbers from './numbers';

describe('numbers', () => {
  it('should expose object', () => {
    const type = typeof numbers;
    expect(type).toBe('object');
  });

  describe('getApproxSize', () => {
    it('should be a function', () => {
      const type = typeof numbers.getApproxSize;
      expect(type).toBe('function');
    });
    it('should return bytes with B label', () => {
      const result = numbers.getApproxSize(100);
      expect(result).toEqual([100, 'B']);
    });
    it('should return kilobytes with K label', () => {
      const result = numbers.getApproxSize(1024 * 100);
      expect(result).toEqual([100, 'K']);
    });
    it('should return megabytes with M label', () => {
      const result = numbers.getApproxSize(1024 * 1024 * 100);
      expect(result).toEqual([100, 'M']);
    });
    it('should return gigabytes with G label', () => {
      const result = numbers.getApproxSize(1024 * 1024 * 1024 * 100);
      expect(result).toEqual([100, 'G']);
    });
    it('should return larger gigabytes with G label too', () => {
      const result = numbers.getApproxSize(1024 * 1024 * 1024 * 1024 * 100);
      expect(result).toEqual([1024 * 100, 'G']);
    });
    it('should return normalized strings from numbers', () => {
      const result = numbers.getApproxSize(1024 * 100 + 1, { normalize: true });
      expect(result).toEqual(['100', 'K']);
    });
    it('should return normalized strings for specific parameters', () => {
      const result = numbers.getApproxSize(1024 * 100 + 1, {
        normalize: { fixedPoint: 1, stripFixedZeros: true },
      });
      expect(result).toEqual(['100', 'K']);
    });
  });
});

export {};
