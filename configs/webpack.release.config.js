/**
 * @file 开发配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs      from 'fs';
import path    from 'path';
import webpack from 'webpack';
import Uglify  from 'uglifyjs-webpack-plugin';

let nodeModules = {};
fs.readdirSync('node_modules')
.filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

let webpackConfig = {
    entry: path.resolve(__dirname, '../server/server.js'),
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'server.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '../'),
            path.resolve(__dirname, '../node_modules')
        ],
        alias: {
            component: 'components',
            assets: 'assets',
            noop: 'assets/js/noop'
        },
        extensions: ['.js', '.jsx', '.json', '.less', '.css']
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
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
                            ['import', {
                                libraryName: 'antd',
                                style: true
                            }]
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '/img/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '/fonts/[name].[hash:7].[ext]'
                    }
                }
            }
        ]
    },
    target: 'node',
    externals: nodeModules,
    node: {
        __filename: false,
        __dirname: false
    },
    devtool: '#eval-source-map',
    performance: {
        hints: false
    },
    // 插件项
    plugins: [
        new Uglify({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.NormalModuleReplacementPlugin(/\.(css|less)$/, 'noop'),
        new webpack.IgnorePlugin(/\.(css|less)$/)
    ]
};

export default {
    ...webpackConfig
};
