const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const config = {
  entry: {
    app: './js/app.js',
  },
  output: {
    // Take each entry point (e.g. 'app-bundle.js') and put it in folder 'build'
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname + '/build')
  },
  devServer: {
    port: 8080
  },
  // Waiting to include commons chunk until it's needed
  // plugins: [
  //   // If you create multiple bundles with "overlapping" code, this will take
  //   //  that code and put it into a common bundle, allowing fewer re-downloads
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'common',
  //     file: 'common.js'
  //   }),
  //   // For production - specifies React should get built in production mode
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('production')
  //     }
  //   }),
  //   new webpack.optimize.UglifyJsPlugin()
  // ],
  module: {
    rules: [
      {
        enforce: "pre",  // Force eslint to run before babel
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'js'),
        loader: 'eslint-loader',
        options: {
          fix: true,
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'js'),
        loader: 'babel-loader',
        options: { 
          presets: ['es2015', 'stage-0', 'react'],
          // transform-decorators-legacy allows use of decorators
          // transform-class-properties is required to make it work properly
          // see: https://stackoverflow.com/questions/33801311/webpack-babel-6-es6-decorators
          plugins: ['transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer]
              }
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer]
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer]
              }
            }
          },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          // Images under 8kb are inlined as base64 to reduce requests
          // Images over the limit are loaded using file-loader
          // Note that images have to be imported/required to be inlined
          limit: 8192,
          name: '/assets/img/[name].[ext]',
        },
      },
    ]
  }
};

module.exports = config;