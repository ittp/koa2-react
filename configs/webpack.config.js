/**
 * @file 开发配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path       from 'path';
import webpack    from 'webpack';
import merge      from 'webpack-merge';
import isoConfig  from './isomorphic.config';
import config     from './webpack.base.config';
import Linter     from 'stylelint-webpack-plugin';
import Extract    from 'extract-text-webpack-plugin';
import Isomorphic from 'webpack-isomorphic-tools/plugin';


// add hot-reload related code to entry chunks
// Object.keys(config.entry).forEach(function (name) {
//     config.entry[name] = ['./configs/client'].concat(config.entry[name]);
// });


const webpack_isomorphic_tools_plugin = new Isomorphic(isoConfig).development();

let webpackConfig = merge(config, {
    context: path.join(__dirname, '../'),
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[id].[hash].js',
        publicPath: 'http://localhost:3001/'
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                enforce: 'pre',
                use: {
                    loader: 'eslint-loader'
                },
                exclude: /node_modules/
            },
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
                        },
                        {
                            loader: 'postcss'
                        },
                        {
                            loader: 'less'
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
        new Linter({
            configFile: 'configs/stylelintrc.config.js',
            files: ['assets/style/*.less', 'client/**/*.less'],
            ignorePath: 'node_modules/*',
            syntax: 'less'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: 3001,
        hot: true,
        inline: true,
        watchContentBase: true
    }
});

export default {
    ...webpackConfig
};
