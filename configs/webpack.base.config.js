/**
 * @file 基础配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path    from 'path';
import webpack from 'webpack';
import entry   from '../client/entry';
import Extract from 'extract-text-webpack-plugin';

let entries = Object.assign({}, entry.pages, entry.vendors);

let webpackConfig = {
  entry: entries,
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, '../node_modules')
    ],
    alias: {
      component: 'components',
      assets: 'assets',
      client: 'client'
    },
    extensions: ['.web.js', '.js', '.jsx', '.json', '.less', '.css']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [
    new Extract({
      filename: 'css/[name].[contenthash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: {
          loader: 'babel',
          query: {
            presets: [
              'es2015',
              'react',
              'stage-0'
            ],
            plugins: [
              'transform-decorators-legacy',
              'transform-runtime',
              ['import', [{
                libraryName: 'antd',
                style: true
              }, {
                libraryName: 'antd-mobile',
                style: 'css'
              }]]
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};

export default {
  ...webpackConfig
};
