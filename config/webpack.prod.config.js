/**
 * @file 部署配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import webpack    from 'webpack';
import config     from './config';
import merge      from 'webpack-merge';
import isoConfig  from './isomorphic.config';
import Uglify     from 'uglifyjs-webpack-plugin';
import webConfig  from './webpack.base.config.js';
import Linter     from 'stylelint-webpack-plugin';
import Extract    from 'extract-text-webpack-plugin';
import Isomorphic from 'webpack-isomorphic-tools/plugin';

const webpack_isomorphic_tools_plugin = new Isomorphic(isoConfig);

let webpackConfig = merge(webConfig, {
  module: {
    rules: [
      {
        test: webpack_isomorphic_tools_plugin.regular_expression('images'),
        use: {
          loader: 'url',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: webpack_isomorphic_tools_plugin.regular_expression('fonts'),
        use: {
          loader: 'url',
          options: {
            limit: 10000,
            name: 'font/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: webpack_isomorphic_tools_plugin.regular_expression('styles'),
        use: Extract.extract({
          fallback: 'style',
          use: [
            {
              loader: 'css',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss',
              options: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            {
              loader: 'less'
            }
          ]
        })
      }
    ]
  },
  output: {
    path: config.output,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    publicPath: config.build.publicPath
  },
  performance: {
    hints: false
  },
  // 插件项
  plugins: [
    webpack_isomorphic_tools_plugin,
    new Uglify({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});

export default {
  ...webpackConfig
};
