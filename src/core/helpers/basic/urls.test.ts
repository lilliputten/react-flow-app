import { parseUrlPath } from './urls';

describe('urls', () => {
  describe('parseUrlPath', () => {
    it('should be a function', () => {
      const type = typeof parseUrlPath;
      expect(type).toBe('function');
    });
    it('should fetch route from only-route url', () => {
      const result = parseUrlPath('/sample?x=1');
      const { basePath, route } = result;
      expect(basePath).toBeUndefined();
      expect(route).toEqual('/sample');
    });
    it('should fetch basePath', () => {
      const result = parseUrlPath('/build/test/sample?x=1');
      const { basePath, route } = result;
      expect(basePath).toEqual('/build/test');
      expect(route).toEqual('/sample');
    });
  });
});
