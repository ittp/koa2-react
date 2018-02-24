/**
 * @file 基础配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path    from 'path';
import webpack from 'webpack';
import config  from './config';

const webpackConfig = {
  entry: config.entries ,
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
    extensions: ['.js', '.tsx', '.json', '.scss', '.css', '.ts']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'ts'
        }
      },
      {
        test: /\.ts(x)?$/,
        use: {
          loader: 'ts'
        }
      }
    ]
  }
};

export default webpackConfig;
