const path = require('path');

var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const appPath = path.resolve(__dirname, '../src');
const nodePath = path.resolve(__dirname, '../node_modules');
const buildPath = path.resolve(__dirname, '../public');

const base = {
  // Allows for absolute paths from locations indicated in `resolve.modules`
  resolve: {
    modules: [
      appPath,
      nodePath,
    ],
  },

  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'bundle.js',
  },

  entry: {
    app: [
      './src/index.jsx',
    ],
  },

  plugins: [
    new SWPrecacheWebpackPlugin(
      {
        cacheId: 'freeze-b-gone',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        navigateFallback: '/index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    ),
  ],

  module: {
    /*
      Loaders for specific file endings. Each one can be composed
      of multiple other loaders. For example, the loader for css
      files uses style-loader and css-loader.
    */
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: nodePath,
        loader: 'babel-loader',
      },
    ],
  },
};

module.exports = base;
