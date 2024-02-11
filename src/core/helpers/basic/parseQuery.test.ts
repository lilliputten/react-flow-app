import { parseQuery } from './parseQuery';

describe('parseQuery', () => {
  it('should parse query url', () => {
    const params = parseQuery('?a=A&b=B');
    expect(params).toMatchObject({ a: 'A', b: 'B' });
  });
});
