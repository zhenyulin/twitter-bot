const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('server'),
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
