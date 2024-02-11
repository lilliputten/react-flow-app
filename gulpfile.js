const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const prettify = require('gulp-html-prettify');
/* // UNUSED: For relative paths processing...
 * const path = require('path');
 * const replace = require('gulp-replace');
 * const sourcemaps = require('gulp-sourcemaps');
 * const tap = require('gulp-tap');
 */

const { getBuildInfoText } = require('./utils/gulp-helpers');

/* // UNUSED: For relative paths processing...
 * const cssPath = 'build/_next/static/css';
 * const useRelativePaths = truthyValue(getEnvVariable('USE_RELATIVE_PATHS'));
 * function processRelativeStyleUrls() {
 *   // build/_next/static/css/5c20234126dae04a.css
 *   return (
 *     gulp
 *       .src([cssPath + '[>.css'])
 *       .pipe(
 *         tap(function (file) {
 *           const name = getProjectRelativeFileName(file.path).replace(/\\/g, '/');
 *           // eslint-disable-next-line no-console
 *           console.log('Processing relative urls in', name);
 *         }),
 *       )
 *       .pipe(sourcemaps.init({ loadMaps: true }))
 *       // Replace pseudo-absolute font (and mother media?) paths to relative ones...
 *       .pipe(replace(/(url\()(?:\.\/|)_next\/static\/(media\/)/g, '$1../$2'))
 *       .pipe(replace(/[\n\r\s]*\/\*# sourceMappingURL=.*\*\/[\n\r\s]<]g, ''))
 *       .pipe(sourcemaps.write('./'))
 *       .pipe(gulp.dest(cssPath))
 *   );
 * }
 * function processRelativeHtmlUrls() {
 *   // Process current urls for deep ('build/XXX[>*[>.html') html files to '../...' (or '../../......'):
 *   // `<link rel="preload" href="./_next/static/...`
 *   // `<script src="./_next/static/...`
 *   return (
 *     gulp
 *       .src(['build[>[>*[>.html'])
 *       // Replace relative paths to current folder to parent ones ('./' -> '../') -- it will work only for 1st level files ('build/XXX[>.html')...
 *       .pipe(
 *         tap(function (file) {
 *           const name = getProjectRelativeFileName(file.path).replace(/\\/g, '/');
 *           const dirname = path.dirname(name);
 *           const parts = name.split('/');
 *           const depth = parts.length - 2;
 *           const enoughDepth = depth >= 1;
 *           const prefix = enoughDepth ? '../'.repeat(depth) : './';
 *           if (enoughDepth) {
 *             // eslint-disable-next-line no-console
 *             console.log('Processing relative urls in', name);
 *             return gulp
 *               .src(name)
 *               .pipe(
 *                 replace(
 *                   /(<link[^<>]* href="|<(?:img|script)[^<>]* src=")\.\/(_next\/)/g,
 *                   '$1' + prefix + '$2',
 *                 ),
 *               )
 *               .pipe(gulp.dest(dirname));
 *           }
 *         }),
 *       )
 *     // .pipe(gulp.dest('build'))
 *   );
 * }
 */

function prettifyHtml() {
  return gulp
    .src('build/**/*.html')
    .pipe(prettify({ indent_char: ' ', indent_size: 2 }))
    .pipe(gulp.dest('build'));
}

function writeBuildInfo(cb) {
  const buildInfoText = getBuildInfoText();
  // eslint-disable-next-line no-console
  console.log('Build info:\n' + buildInfoText);
  fs.writeFile('build/build.txt', buildInfoText, cb);
}

/** This file name prefix will be removed after copy to the build folder */
const startBuildPrefix = 'start-build-';

// TODO: Create a 'watch' task for these files?
function copyExtraFiles() {
  return gulp
    .src(
      [
        // prettier-ignore
        'start-*.{py,html,js,mjs,json,md}',
        'requirements-general.txt', // Deps file for python script
        'server/**/*.{js,mjs,ts,json,md}', // Node server routines...
      ],
      { base: './' },
    )
    .pipe(
      rename((path) => {
        if (path.basename.startsWith(startBuildPrefix)) {
          path.basename = path.basename.substring(startBuildPrefix.length);
        }
      }),
    )
    .pipe(gulp.dest('build/'));
}

gulp.task('writeBuildInfo', writeBuildInfo);
/* // UNUSED: For relative paths processing...
 * gulp.task('processRelativeStyleUrls', processRelativeStyleUrls);
 * gulp.task('processRelativeHtmlUrls', processRelativeHtmlUrls);
 */
gulp.task('prettifyHtml', prettifyHtml); // NOTE: This patch can cause nextjs hydration error
gulp.task('copyExtraFiles', copyExtraFiles);

const patchBuildTasks = [
  /* // UNUSED: For relative paths processing...
   * useRelativePaths && 'processRelativeStyleUrls',
   * useRelativePaths && 'processRelativeHtmlUrls',
   */
  'writeBuildInfo',
  'prettifyHtml',
  // 'copyExtraFiles', // TODO: Use it to provide extra stuff to the 'build' folder
].filter(Boolean);

gulp.task('patchBuild', gulp.parallel.apply(gulp, patchBuildTasks));
