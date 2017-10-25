const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config.js');

const config = merge(base, {
  // Production source-map should not be served for end users
  devtool: 'source-map',
  plugins: [
    // For production - specifies React should get built in production mode
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