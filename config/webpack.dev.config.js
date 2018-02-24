/**
 * @file 开发配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import webpack    from 'webpack';
import config     from './config';
import merge      from 'webpack-merge';
import isoConfig  from './isomorphic.config';
import Html       from 'html-webpack-plugin';
import webConfig  from './webpack.base.config';
import Linter     from 'stylelint-webpack-plugin';
import Extract    from 'extract-text-webpack-plugin';
import Isomorphic from 'webpack-isomorphic-tools/plugin';

// add hot-reload related code to entry chunks
Object.keys(webConfig.entry).forEach(function (name) {
  webConfig.entry[name] = ['./config/client'].concat(webConfig.entry[name]);
});

const webpack_isomorphic_tools_plugin = new Isomorphic(isoConfig).development();

const webpackConfig = merge(webConfig, {
  context: config.dev.context,
  output: {
    path: config.output,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].js',
    publicPath: config.dev.publicPath
  },
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
          use: [
            {
              loader: 'css',
              options: {
                modules: true
              }
            },
            {
              loader: 'sass'
            }
          ]
        })
      }
    ]
  },
  devtool: '#eval-source-map',
  performance: {
    hints: false
  },
  // 插件项
  plugins: [
    webpack_isomorphic_tools_plugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new Linter({
      configFile: '.stylelintrc.js',
      files: ['assets/style/*.scss', 'client/**/*.scss'],
      ignorePath: 'node_modules/*',
      syntax: 'scss'
    }),
    new Extract({
      filename: 'css/[name].[contenthash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new Html({
      filename: 'index.html',
      template: 'client/index.html',
      inject: true
    })
  ]
});

export default webpackConfig;
