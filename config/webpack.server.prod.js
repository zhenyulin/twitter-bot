const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const SourceMapSupport = require('webpack-source-map-support');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'source-map',
  target: 'node',
  entry: ['babel-polyfill', path.resolve('./src/index')],
  output: {
    path: path.resolve('./dist'),
    filename: 'app.js',
  },
  resolve: {
    modules: [
      path.resolve('.'), // to resolve path 'server/', 'config/'
      'node_modules',
    ],
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new SourceMapSupport(),
    new Dotenv(),
    new webpack.EnvironmentPlugin({
      BUILD_TARGET: 'server',
      NODE_ENV: 'production',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {
        dead_code: true,
        unused: true,
        warnings: false,
        screw_ie8: true,
      },
      exclude: [/\.min\.js$/gi],
    }),
  ],
};
