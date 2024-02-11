interface TNormalizedFloatStrOptions {
  /** Fixed point position */
  fixedPoint?: number;
  stripFixedZeros?: boolean;
}
export function normalizedFloatStr(n: number, opts: TNormalizedFloatStrOptions = {}): string {
  const {
    // prettier-ignore
    fixedPoint = 2,
    stripFixedZeros = true,
  } = opts;
  let str = n.toFixed(fixedPoint);
  if (stripFixedZeros) {
    str = str.replace(/\.*0+$/, '');
  }
  return str;
}

interface TGetApproxSizeOptions {
  /** Normalize result to string representation using `normalizedFloatStr` */
  normalize?: boolean | TNormalizedFloatStrOptions;
}
export function getApproxSize(
  size: number,
  opts: TGetApproxSizeOptions = {},
): [number | string, string] {
  const { normalize } = opts;
  const levels = [
    'B', // Bytes
    'K', // Kilobytes
    'M', // Megabytes
    'G', // Gigabites
  ];
  const lastLevel = levels.length - 1;
  const range = 1024;
  let level = 0;
  while (level < lastLevel) {
    if (size < range) {
      break;
    }
    size /= range;
    level++;
  }
  const currLevelStr = levels[level];
  // Result: final number or normalized representation (depends on option's `normalize`)
  let result: number | string = size;
  if (normalize) {
    const normalizeOpts = typeof normalize === 'object' ? normalize : undefined;
    result = normalizedFloatStr(size, normalizeOpts);
  }
  return [result, currLevelStr];
}
