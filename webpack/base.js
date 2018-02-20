const path = require('path');

const nodePath = path.resolve(__dirname, '../node_modules');

const base = {
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
