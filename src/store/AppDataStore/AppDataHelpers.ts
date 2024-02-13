import { periodizeNumber } from 'src/core/helpers/basic';

export function getAppDataInfo(data?: unknown) {
  if (!data) {
    return 'no data';
  }
  if (!Array.isArray(data)) {
    return 'single object';
  }
  const size = data.length;
  if (!size) {
    return 'empty';
  } else {
    const records = periodizeNumber(size, ',');
    return records + ' record' + (size > 1 ? 's' : '');
  }
}
