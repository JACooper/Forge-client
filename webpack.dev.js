const merge = require('webpack-merge');
const base = require('./webpack.config.js');

const config = merge(base, {
  devtool: 'inline-source-map',
  devServer: {
    port: 8080
  },
});

module.exports = config;