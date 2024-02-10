const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const startAnalyzer = !!process.env.START_ANALYZER;

module.exports = {
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
      ].filter(Boolean),
    },
  },
};
