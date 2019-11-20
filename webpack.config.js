const path = require('path');
const webpackMerge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const portFinderSync = require('portfinder-sync');

const webpack = require('webpack');
const distPath = 'dist';
const { resolve } = require('path');

const modeConfig = env => require(`./webpack/webpack.${env.mode}.js`)(env);

const webcomponents = './node_modules/@webcomponents/webcomponentsjs';
const polyfils = [
  {
    from: resolve(`${webcomponents}/webcomponents-*{js,map}`),
    to: 'vendor',
    flatten: true
  },
  {
    from: resolve(`${webcomponents}/bundles/*.{js,map}`),
    to: 'vendor/bundles',
    flatten: true
  },
  {
    from: resolve(`${webcomponents}/custom-elements-es5-adapter.js`),
    to: 'vendor',
    flatten: true
  }
];

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.ProgressPlugin(),
  new HTMLWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }
  }),
  new CopyWebpackPlugin([...polyfils], {
    ignore: ['.DS_Store']
  })
];

module.exports = ({ mode }) => {
  return webpackMerge(
    {
    mode,
    resolve: {
      extensions: ['.js']
    },
    entry: {
      app: ['./appShell.js']
    },
    output: {
      path: path.join(__dirname, distPath),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-syntax-dynamic-import'],
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  targets: '>1%, not dead, not ie 11'
                }
              ]
            ]
          }
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, distPath),
      inline: true,
      host: '127.0.0.1',
      port: portFinderSync.getPort(8080),
      historyApiFallback: true,
    },
    plugins
  },
  modeConfig({mode}))
}

/*
  const webpack = require('webpack-merge');
  const { resolve } = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const webpackMerge = require('webpack-merge');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const ProgressPlugin = require("webpack").ProgressPlugin;

  const modeConfig = env => require(`./webpack/webpack.${env.mode}.js`)(env);
  const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

  const polyfills = [
    {
      from: resolve(`${webcomponentsjs}/bubles/*.{js,map}`),
      to: 'vendor/bundles',
      flatten: true
    },
    {
      from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
      to: 'vendor',
      flatten: true
    },
    {
      from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
      to: 'vendor',
      flatten: true
    }
  ];

  const assets = [
    {
      from: 'src/img',
      to: 'img/'
    }
  ];

  const plugins = [
    new CleanWebpackPlugin(),
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      }
    }),
    new CopyWebpackPlugin([...polyfills, ...assets], {
      ignore: ['.DS_Store']
    })
  ];

  module.exports = ({ mode }) => {
    return webpackMerge({
      mode,
      entry: './appShell.js',
      output: {
        filename: '[name].[chunkhash:8].js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-syntax-dynamic-import'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    targets: '>1%, not dead, not ie 11'
                  }
                ]
              ]
            }
          }
        ]
      },
      plugins
    },
    modeConfig({mode})
    );
  };

 */
