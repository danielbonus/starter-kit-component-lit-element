const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const indexOutput = 'indexOutput.html'
const basePath = __dirname;
const distPath = 'demo';

const webpackInit = {
  mode: 'development',
  resolve: {
    extensions: ['.js']
  },
  entry: {
    app: ['./component.js']
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
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

