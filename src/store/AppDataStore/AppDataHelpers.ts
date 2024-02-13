import { periodizeNumber } from 'src/core/helpers/basic';

export function getSankeyDataInfo(list?: unknown[]) {
  if (!Array.isArray(list)) {
    return 'no data';
  }
  const size = list.length;
  if (!size) {
    return 'empty';
  } else {
    const records = periodizeNumber(size, ',');
    return records + ' record' + (size > 1 ? 's' : '');
  }
}
