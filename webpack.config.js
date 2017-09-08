var path = require('path');
var webpack = require('webpack');

const config = {
  entry: {
    app: './js/app.js',
  },
  output: {
    // Take each entry point (e.g. 'app-bundle.js') and put it in folder 'build'
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname + '/build')
  },
  plugins: [
    // If you create multiple bundles with "overlapping" code, this will take
    //  that code and put it into a common bundle, allowing fewer re-downloads
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      file: 'common.js'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'js'),
        loader: 'babel-loader',
        options: { 
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy'], // To allow usage of @connect
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
  }
};

module.exports = config;