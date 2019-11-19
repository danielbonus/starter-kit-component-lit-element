const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const basePath = __dirname;
const distPath = 'dist';

const webpackInit = {
  mode: 'development',
  resolve: {
    extensions: ['.js']
  },
  entry: {
    app: ['./appShell.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
       /*  loader: 'babel-loader',
        include: [
          path.join(__dirname, '../src'), // + any other paths that need to be transpiled
          /\/node_modules\/quill/,
        ] */
      }
    ]
  },
  output: {
    path: path.join(basePath, distPath),
    filename: '[name].js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ]
};

module.exports = webpackInit;

