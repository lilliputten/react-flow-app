/** @module strings.test
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

import * as strings from './strings';

describe('strings', () => {
  // beforeAll(() => {})

  it('should expose object', () => {
    const type = typeof strings;
    expect(type).toBe('object');
  });

  describe('toNumber', () => {
    it('should be a function', () => {
      const type = typeof strings.toNumber;
      expect(type).toBe('function');
    });
    it('should serialize numbers', () => {
      const result = strings.toNumber('1');
      expect(result).toEqual(1);
    });
  });
});
