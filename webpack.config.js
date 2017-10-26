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
  module: {
    rules: [
      {
        enforce: "pre",  // Force eslint to run before babel
        test: /\.(js)$/,
        include: path.join(__dirname, 'js'),
        loader: 'eslint-loader',
        options: {
          fix: true,
        }
      },
      {
        test: /\.(js)$/,
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
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: function() {
                return [autoprefixer]
              }
            }
          },
          // resolve-url-loader allos relative url() pathing in .scss files
          // this allows inlining those images using url-loader and css-loader
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
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