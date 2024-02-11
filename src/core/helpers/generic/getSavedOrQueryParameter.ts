import { TUpdatableParameter } from 'src/core/types';

export function getSavedOrQueryParameter<T extends string = string>(
  paramItem: TUpdatableParameter<T>,
  opts: {
    /** Prefix for local storage value */
    storagePrefix?: string;
    /** Show warning in console for invalid value */
    showWarining?: boolean;
    /** Throw an error for invalid value */
    throwError?: boolean;
  } = {},
) {
  const hasLocalStorage = typeof localStorage !== 'undefined';
  const hasWindow = typeof window !== 'undefined';
  const urlQuery = hasWindow ? window.location.search : undefined;
  const urlParams = new URLSearchParams(urlQuery);
  const {
    // prettier-ignore
    id,
    type,
    validValues,
  } = paramItem;
  let val = urlParams.get(id);
  if (val == null && hasLocalStorage) {
    const storageId = [opts.storagePrefix, id].filter(Boolean).join('');
    val = localStorage.getItem(storageId);
  }
  if (val == null) {
    return undefined;
  }
  if (validValues && !validValues.includes(val)) {
    const error = new Error(`Got invalid value for parameter '${id}': '${val}'`);
    if (opts.showWarining) {
      // eslint-disable-next-line no-console
      console.warn('[getSavedOrQueryParameter]', error.message, {
        error,
        id,
        val,
        hasLocalStorage,
        hasWindow,
        urlQuery,
        urlParams,
      });
    }
    if (opts.throwError) {
      throw error;
    }
    return undefined;
  }
  switch (type) {
    case 'boolean': {
      const falsy = val.toLowerCase();
      return falsy !== 'false' && falsy !== 'no' && falsy !== '0' && Boolean(falsy);
    }
    case 'number': {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }
  }
  return val;
}
