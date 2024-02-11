/** @module objects
 *  @descr Object helpers.
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

export function reverseKeyAndValueReducer(
  result: Record<string, string>,
  [key, val]: [string, string],
): Record<string, string> {
  return { ...result, [val]: key };
}
export function reverseDataHash(hash: Record<string, string>): Record<string, string> {
  return Object.entries(hash).reduce(reverseKeyAndValueReducer, {});
}

export function isDomElement(obj: HTMLElement): boolean {
  return (
    !!obj &&
    (typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement // DOM2
      : typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string')
  );
}

export function isArray(obj: unknown): boolean {
  return Array.isArray(obj);
}

export function arrayIndexOf(arr: string | unknown[], find: unknown): number {
  if (!(arr instanceof Array) || !arr.length) {
    return -1;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === find) {
      return i;
    }
  }
  return -1;
}

interface DeepData {
  a: number | { b: number };
}
/**
 * getDeepValue -- Fetch value (id may be hierarchial path like `Account.Login`)
 * @param {Object} data -- Data object
 * @param {String} dataId -- Field id (may be hierarchial path like `Account.Login`)
 */
export function getDeepValue(data: DeepData | null | undefined, dataId: string): unknown {
  if (!data) {
    return undefined;
  }
  let value = data;
  if (typeof value === 'object' && dataId && typeof dataId === 'string') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataId.split('.').forEach((chunkId) => (value = (value as any)[chunkId]));
  }
  return value;
}

interface ObjectsDiff {
  added?: string[];
  removed?: string[];
  diff?: string[];
  equals?: string[];
}
/** Compare two objects.
@return { added, removed, diff, [equals] }
*/
export function getObjectsDiff(
  objOld: { [x: string]: unknown; a?: number; b?: string } | undefined | null,
  objNew: { [x: string]: unknown; a?: number; b?: string } | undefined | null,
): ObjectsDiff {
  if (objNew == null || objOld == null) {
    // One of objects is undefined -- they're different.
    return {};
  }
  const keysNew = Object.keys(objNew);
  const keysOld = Object.keys(objOld);
  const results: ObjectsDiff = {
    // added: [],
    // removed: [],
    // diff: [],
    // equals: [],
  };
  keysNew.forEach((key) => {
    if (!keysOld.includes(key)) {
      (results.added || (results.added = [])).push(key);
    } else if (objNew[key] !== objOld[key]) {
      (results.diff || (results.diff = [])).push(key);
    }
  });
  keysOld.forEach((key) => {
    if (!keysNew.includes(key)) {
      (results.removed || (results.removed = [])).push(key);
    }
  });
  return results;
}
