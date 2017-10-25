const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config.js');

const config = merge(base, {
  devtool: 'source-map',
  plugins: [
    // Specifies React (or other modules keying off of NODE_ENV) should get built in production mode
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    })
  ],
});

module.exports = config;