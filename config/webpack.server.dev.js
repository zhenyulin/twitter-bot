const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  watch: true,
  target: 'node',
  entry: [
    'babel-polyfill',
    'webpack/hot/poll?1000',
    path.resolve('./src/index'),
  ],
  output: {
    path: path.resolve('.build'),
    filename: 'app.js',
  },
  resolve: {
    modules: [
      path.resolve('.'), // to resolve path 'server/', 'config/'
      'node_modules',
    ],
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
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
    new StartServerPlugin('app.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('server'),
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  stats: {
    modules: false,
    hash: false,
    version: false,
    colors: true,
    assets: false,
  },
};
