/** @desc Update build date/time tag file with current timestamp
 *  @changed 2024.02.08, 17:50
 */
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const dayjsUtc = require('dayjs/plugin/utc.js');
const dayjsTimezone = require('dayjs-timezone-iana-plugin'); // @see https://day.js.org/docs/en/plugin/timezone
const dayjs = require('dayjs'); // @see https://day.js.org/docs/en/display/format

dayjs.extend(dayjsUtc);
dayjs.extend(dayjsTimezone);


const currPath = path.resolve(__dirname);
const prjPath = path.dirname(path.basename(currPath));

const configFileName = path.resolve(prjPath, 'utils', 'config.js');
const config = require(configFileName);

const defaultTimeZome = config.timeZone || '';

// NOTE: Date formats for 'dayjs', @see https://day.js.org/docs/en/display/format
const tagFormat = 'YYMMDD-HHmm';
const timeTzFormat = 'YYYY.MM.DD HH:mm ZZ';
/** // NOTE: Date formats for `date-fns*` library...
 * const tagFormat = 'yyMMdd-HHmm';
 * const timeTzFormat = 'yyyy.MM.dd, HH:mm zzz';
 */

// Timezone argument should be passed as '--tz={timeZone}`
const timeZone = getTzFromArgs() || defaultTimeZome; // 'Europe/Moscow', 'GMT, etc

const now = new Date();
const buildTag = formatDate(now, timeZone, tagFormat);
const buildTzTime = formatDate(now, timeZone, timeTzFormat);

/* console.log('DEBUG', {
 *   config,
 *   configFileName,
 *   argv: process.argv,
 *   args: process.args,
 *   now,
 *   buildTag,
 *   buildTime,
 *   buildTzTime,
 *   timeZone,
 * });
 */

const timestampFileName = path.resolve(prjPath, 'build-timestamp.txt');
const timetagFileName = path.resolve(prjPath, 'build-timetag.txt');
// const versionFileName = path.resolve(prjPath, 'build-version.txt');

console.log('Updating build tag/time:', buildTag, '/', buildTzTime);

fs.writeFileSync(timetagFileName, buildTag, 'utf8');
fs.writeFileSync(timestampFileName, buildTzTime, 'utf8');

function formatDate(date, timeZone, fmt) {
  let dayjsDate = dayjs(date);
  if (timeZone) {
    dayjsDate = dayjsDate.tz(timeZone);
  }
  const fmtDate = dayjsDate.format(fmt);
  return fmtDate;
  /* // OLD_CODE: Using 'date-fns-tz'
  if (timeZone) {
    return formatInTimeZone(date, timeZone, fmt);
  } else {
    return format(date, fmt);
  }
  */
}

function getTzFromArgs() {
  const args = process.argv.slice(2);
  const lookup = '--tz=';
  for (const s of args) {
    if (s.startsWith(lookup)) {
      return s.substring(lookup.length);
    }
  }
}
