// @ts-check

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const fs = require('fs');
// const webpack = require('webpack');
// const { overrideCracoConfig } = require('craco-plugin-env');

/* // Trying to provide build info to the source code...
 * const { allData } = require('./utils/gulp-helpers.js');
 * const buildInfo = allData();
 * process.env.REACT_BUILD_INFO = JSON.stringify(buildInfo);
 * // Write build info data to use in the source code...
 * // console.log('Writting build info:', buildInfo);
 * fs.writeFileSync('./src/build-info.json', JSON.stringify(buildInfo, undefined, 2), 'utf8');
 */

const startAnalyzer = !!process.env.START_ANALYZER;

const cracoConfig = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @use 'sass:math';
          @use 'sass:color';
          @import "src/core/assets/scss/variables.scss";
          @import "src/core/assets/scss/mixins.scss";
        `,
      },
    },
  },
  webpack: {
    plugins: {
      add: [
        // Enable core nodejs polyfills (like 'buffer' etc) for webpack 5
        new NodePolyfillPlugin(),
        // Build analyzer
        startAnalyzer &&
          new BundleAnalyzerPlugin({
            // @see: https://www.npmjs.com/package/webpack-bundle-analyzer#options-for-plugin
            analyzerMode: 'server',
          }),
        /* // This doesn't work: can't get parameters in the code
         * new webpack.DefinePlugin(
         *   Object.entries(buildInfo).reduce((data, [key, val]) => {
         *     data['process.env.' + key] = JSON.stringify(val);
         *     return data;
         *   }, {}),
         * ),
         */
      ].filter(Boolean),
    },
  },
};

/* // This doesn't work: can't get parameters in the code
 * const extendedConfig = overrideCracoConfig({
 *   cracoConfig,
 *   pluginOptions: {
 *     variables: { ...buildInfo },
 *   },
 * });
 * module.exports = extendedConfig;
 */

module.exports = cracoConfig;
