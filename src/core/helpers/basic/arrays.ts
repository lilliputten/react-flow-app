export function cleanupList<T = unknown>(list?: T[]): T[] | undefined {
  list = Array.isArray(list) ? list.filter(Boolean) : undefined;
  return list && list.length ? list : undefined;
}

/** Array filter mapper to filter only unique values */
export function onlyUnique<T extends unknown>(value: T, index: number, array: T[]) {
  return array.indexOf(value) === index;
}

export function areTwoSortedArraysEqual<T>(a?: T[], b?: T[]): boolean {
  if (a == null && b == null) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
