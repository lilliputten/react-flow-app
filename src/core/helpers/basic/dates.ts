/** @module strings
 *  @description Strings utilities
 *  @since 2023.02.01, 00:37
 *  @changed 2024.02.08, 17:40
 */

// import { format, Duration, intervalToDuration } from 'date-fns';
import dayjs from 'dayjs'; // @see https://day.js.org/docs/en/display/format
/* // TODO: Use timezone features
 * import dayjsUtc from 'dayjs/plugin/utc.js';
 * // @ts-expect-error: No type definitions for dayjs-timezone-iana-plugin yet
 * import dayjsTimezone from 'dayjs-timezone-iana-plugin'; // @see https://day.js.org/docs/en/plugin/timezone
 */

import {
  dateTimeFormat,
  hourTicks,
  minuteTicks,
  secondTicks,
  // timeFormat,
} from 'src/core/constants/config';

export function formatIsoDateString(dateStr: string, formatStr?: string): string {
  if (!formatStr) {
    formatStr = dateTimeFormat;
  }
  // XXX: Is it bug? Eg: '0012-11-16T16:31:15Z'? -> Change it to 20XX. Is it correct?
  if (dateStr.startsWith('00')) {
    dateStr = dateStr.replace(/^00/, '20');
  }
  const date = new Date(dateStr);
  let dayjsDate = dayjs(date);
  /* // TODO: Use timezone features
   * if (timeZone) {
   *   // @ts-expect-error: No type definitions for dayjs-timezone-iana-plugin yet
   *   dayjsDate = dayjsDate.tz(timeZone);
   * }
   */
  const fmtDate = dayjsDate.format(formatStr);
  return fmtDate;
}

export function getDayStartForDate(date: Date): number {
  const time = date.getTime();
  const milliseconds = date.getMilliseconds();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const dayStart =
    time - hours * hourTicks - minutes * minuteTicks - seconds * secondTicks - milliseconds;
  return dayStart;
}
export function getDayStart(time: number): number {
  const date = new Date(time);
  return getDayStartForDate(date);
}
