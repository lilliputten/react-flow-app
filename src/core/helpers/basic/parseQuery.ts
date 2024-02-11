/* eslint-disable @typescript-eslint/no-explicit-any */
/** @module parseQuery
 *  @description Parse query search string
 *  @since 2023.03.06, 22:15
 *  @changed 2023.03.14, 15:57
 */

function decodeQuery(qs: string | string[], sep?: string, eq?: string, options?: any) {
  sep = sep || '&';
  eq = eq || '=';
  const obj: any = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  const regexp = /\+/g;
  qs = qs.split(sep);

  let maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  let len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (let i = 0; i < len; ++i) {
    const x = qs[i].replace(regexp, '%20'),
      idx = x.indexOf(eq);
    let kstr: string, vstr: string;

    if (idx >= 0) {
      kstr = x.substring(0, idx);
      vstr = x.substring(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    const k = decodeURIComponent(kstr);
    const v = decodeURIComponent(vstr);

    // if (!hasOwnProperty(obj, k)) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
}

/** Parse url query string (in form `?xx=yy&...` or `xx=yy&...`)
 * @param {string} search - Query string
 * @return {object} query - Query object
 */
export function parseQuery(search?: string): Record<string, string> {
  if (!search) {
    return {};
  }
  if (search.indexOf('?') === 0) {
    search = search.substring(1);
  }
  return decodeQuery(search);
}

export function makeQuery(
  params: Record<string, string | number | boolean>,
  opts: { addQuestionSymbol?: boolean; useEmptyValues?: boolean } = {},
): string {
  let url = Object.entries(params)
    .map(([id, val]) => {
      const valStr = String(val);
      if ((val == null || valStr === '') && !opts.useEmptyValues) {
        return undefined;
      }
      return encodeURI(id) + '=' + encodeURI(String(val));
    })
    .filter(Boolean)
    .join('&');
  if (opts.addQuestionSymbol && url) {
    url = '?' + url;
  }
  return url;
}
