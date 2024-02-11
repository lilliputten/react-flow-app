/** Date conversion & presentation templates... */

// Date/time formats for use in DatePicker and other date/time-related
// components, @see: https://date-fns.org/v2.16.1/docs/format

// NOTE: Date formats for 'dayjs', @see https://day.js.org/docs/en/display/format
export const dateFormat = 'YYYY.MM.DD';
export const timeFormat = 'HH:mm';
export const timeSecFormat = 'HH:mm:ss';
export const timeMsFormat = 'HH:mm:ss:SSS';
export const tzFormat = 'ZZ';
export const dateTimeFormat = dateFormat + ' ' + timeFormat;
export const dateTimeFormatTz = dateFormat + ' ' + timeFormat + ' ' + tzFormat;
export const dateTimeSecFormat = dateFormat + ' ' + timeSecFormat;
export const dateTimeSecFormatTz = dateFormat + ' ' + timeSecFormat + ' ' + tzFormat;
export const dateTimeMsFormat = dateFormat + ' ' + timeMsFormat;
export const dateTimeMsFormatTz = dateFormat + ' ' + timeMsFormat + ' ' + tzFormat;
export const dateRangeDelim = ' – ';

export const timeIntervals = 60;

export const secondTicks = 1000;
export const minuteTicks = 60 * secondTicks;
export const hourTicks = minuteTicks * 60;
export const dayTicks = hourTicks * 24;
export const weekTicks = dayTicks * 7;
// export const monthTicks = 31 * dayTicks; // Approx: not for months with 28, 29, 30 days
// export const yearTicks = 365 * dayTicks; // Approx: not for years with 366 days

/** App title parts delimiter */

export const defaultQuote = '"';
export const squareOpen = '[';
export const squareClose = ']';
export const curlyOpen = '{';
export const curlyClose = '}';

export const errRegExp = /^Error[:\n\r\s]*/m;
export const errDelim = '\n'; // <br/>\n';
export const errDelim2 = errDelim + errDelim;
export const ellipsis = '…'; // '...';

export const maxShowStringLength = 300;
