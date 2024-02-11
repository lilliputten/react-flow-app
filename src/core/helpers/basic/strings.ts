/** @module strings
 *  @description Strings utilities
 *  @since 2023.01.26, 20:43
 *  @changed 2023.02.15, 22:55
 */

// import { AxiosError } from 'axios';

import { defaultQuote } from 'src/core/constants/config';

/**
 * @param {string} val
 * @return {number}
 */
export const toNumber = (val: string): number => {
  return (val && typeof val !== 'number' && Number(val)) || 0;
};
/**
 * @param {string} val
 * @return {String}
 */
export const toString = (val: string): string => {
  return val; // String(val);
};
/**
 * @param {string} val
 * @return {boolean}
 */
export const toBoolean = (val: string): boolean => {
  return !!(val && val !== 'false' && val !== '0');
};

export const typeTransforms = {
  toNumber,
  toString,
  toBoolean,
};
type TTypeTransformsKeys = keyof typeof typeTransforms;

/** Returns length of common parts of two strings
 * @param {String} a
 * @param {String} b
 * @return {Number}
 */
export const getCommonLength = (a: string, b: string): number => {
  const maxLen = Math.min(a.length, b.length);
  let commonLen = 0;
  for (let len = 1; len < maxLen; len++) {
    const s = a.substring(0, len);
    if (b.indexOf(s) === 0) {
      commonLen = len;
    }
  }
  return commonLen;
};

/** Uppercase first letter of string
 * @param {string} str
 * @return {str}
 */
export const ucFirst = (str: string): string => {
  str = String(str);
  return str && str.charAt(0).toUpperCase() + str.slice(1); // .toLowerCase();
};

/** Convert string to desired type
 * @param {string} type
 * @param {string} val
 * @return {*}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toType = (type: string, val: string): string | number | boolean => {
  const methodName = ('to' + ucFirst(type)) as TTypeTransformsKeys;
  let result: string | number | boolean = val;
  if (
    /* typeTransforms.hasOwnProperty(methodName) && */ typeof typeTransforms[methodName] ===
    'function'
  ) {
    result = typeTransforms[methodName](val);
  }
  return result;
};

/**
 * @param {Number} length - Target hex string length
 * @return {String}
 */
export const randomHexString = (length: number): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 0xf).toString(16);
  }
  return result;
};

/** Convert (mostly error responses) html to text
 * @param {String} html
 * @return {String}
 */
export const html2string = (html: string): string => {
  return (
    html &&
    html // Process error from (html) response body
      .replace(/\s*<style>[\s\S]*<\/style>/gm, '')
      .replace(/<title>(.+)<\/title>/gi, '$1:\n')
      .replace(/<[^<>]*>/g, ' ')
      .replace(/\r/gm, '\n') // Newlines
      .replace(/[ \t]+\n/gm, '\n') // Hanged spaces
      .replace(/\n[ \t]+/gm, '\n') // Hanged spaces
      .replace(/\n{3,}/gm, '\n\n') // Extra newlines
      .replace(/\n(.+):*[ \t\n]+\1\n/gm, '\n$1:\n') // Remove repeating titles
      .trim()
  ); // Trim
};

/* // TODO: Move to react strings helper?
 * export const splitMultiline = (text, opt) => {
 *   opt = opt || {}
 *   const textClassName = opt.textClassName || 'Text'
 *   const lineClassName = opt.lineClassName || 'TextLine'
 *   return text.split('\n\n').map((text, n) => {
 *     const lines = text.split('\n').map((line, n) => {
 *       return React.createElement('div', { key: 'line' + String(n), className: lineClassName }, line)
 *     })
 *     return React.createElement('div', { key: 'text' + String(n), className: textClassName }, lines)
 *   })
 * }
 */

export function padNumber(num: number | string, size: number): string {
  return String(num).padStart(size, '0');
}

/** Make periods for long numbers. Returns string presentation of number.
 * @param {String|Number} num
 * @param {String} [periodChar=' ']
 * @return {String}
 */
export function periodizeNumber(num: number | string, periodChar: string = ' '): string {
  // periodChar = periodChar || ' ';
  let numStr = String(num);
  // If long number...
  if (numStr.length > 3 && !numStr.match(/\D/)) {
    numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, periodChar);
  }
  return numStr;
}

/** humanizeId -- Make human-readable string from id (eg, 'thisId' -> 'This Id')
 * @param {String} id
 * @return {String}
 */
export function humanizeId(id: string): string {
  return ucFirst(String(id)).replace(/\B([A-Z][a-z]+)/g, ' $1');
}

export function safeEscape(
  str: string | number | boolean,
  quote?: boolean | string,
  addQuotes?: boolean,
): string {
  // Passed only addQuotes flag
  if (quote === true && addQuotes == null) {
    addQuotes = true;
    quote = undefined;
  }
  quote = quote && typeof quote === 'string' ? quote : defaultQuote;
  const quoteReg = new RegExp(quote, 'g');
  str = String(str)
    .replace(/\\/g, '\\\\')
    .replace(quoteReg, '\\' + quote)
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    // .replace(/\b/g, '\\b')
    .replace(/\f/g, '\\f');

  if (addQuotes === true && quote) {
    str = quote + str + quote;
  }
  return str;
}

export function errorToString(error: Error | string): string {
  if (typeof error === 'string') {
    return error;
  }
  const metaError = error as Error; // & AxiosError;
  /* // Error sample (AxiosError):
   * code: "ERR_NETWORK"
   * message: "Network Error"
   * name: "AxiosError"
   * stack: "AxiosError: Network Error\n    at XMLHttpRequest.handleError (webpack-internal:///./node_modules/axios/lib/adapters/xhr.js:168:14)"
   */
  const {
    // code,
    // name,
    // stack
    message,
  } = metaError;
  return [
    // name,
    // code,
    message,
  ]
    .filter(Boolean)
    .join(': ')
    .replace(/^Error:\s*/, '');
}

export function stringToInt32(string: string): number {
  let hash = 0;
  if (!string.length) {
    return hash;
  }
  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

export function intToHex(number: number): string {
  if (number < 0) {
    number = 0xffffffff + number + 1;
  }
  return number.toString(16).toUpperCase();
}

export function stringToHash(string: string): string {
  return intToHex(stringToInt32(string)).padStart(8, '0');
}

export function isTruthyString(val: string) {
  if (val && val !== 'false' && val !== '0') {
    return true;
  }
  return false;
}
export const str2bool = isTruthyString;
