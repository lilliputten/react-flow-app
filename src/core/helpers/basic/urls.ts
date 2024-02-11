export function getUrlPath(url: string): string {
  const urlPath = url
    .replace(/#.*$/, '')
    .replace(/\?.*$/, '')
    .replace(/[^/]*\.html$/, '');
  /* // Probably this is a wrong approach, eg we can get: `/{pageName}/`
   * if (urlPath && !urlPath.endsWith('/')) {
   *   urlPath += '/';
   * }
   */
  return urlPath;
}

interface TParseUrlPath {
  basePath?: string;
  route: string;
  query?: string;
  hash?: string;
}

export function parseUrlPath(url: string): TParseUrlPath {
  const [hashUrl, hash] = url.split('#');
  const [queryUrl, query] = hashUrl.split('?');
  const match = queryUrl.match(/^(.*)(\/[^/]*)$/);
  match?.shift(); // Remove first ('all') result
  let [basePath, route] = match || [undefined, queryUrl];
  // If only route is exists?
  if (!route && basePath) {
    route = basePath;
    basePath = undefined;
  }
  if (route && !route.startsWith('/')) {
    route = '/' + route;
  }
  if (route.endsWith('.html')) {
    // Remove '.html' extension
    route = route.substring(0, route.length - 5);
  }
  const result: TParseUrlPath = {
    basePath: basePath || undefined,
    route: route || '/',
    query: query && '?' + query,
    hash: hash && '#' + hash,
  };
  return result;
}

export function addUrlPath(route: string, asPath?: string) {
  return [asPath, route]
    .filter(Boolean)
    .join('')
    .replace(/\/{2,}/g, '/');
}

interface TMakeUrlParams {
  basePath?: string;
  route?: string;
  query?: string;
  hash?: string;
}
export function makeUrlFromParts(params: TMakeUrlParams): string {
  const { basePath, route, query, hash } = params;
  const correctQuery = query && !query.startsWith('?') ? '?' + query : query;
  const correctHash = hash && !hash.startsWith('#') ? '#' + hash : hash;
  const url = [basePath, route, correctQuery, correctHash]
    .filter(Boolean)
    .join('')
    .replace(/\/{2,}/g, '/');
  return url;
}
