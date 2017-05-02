/**
 * @file 开发服务器总入口封装
 * @author dongkunshan(windwithfo@yeah.net)
 */

import 'babel-polyfill';
import path       from 'path';
import Isomorphic from 'webpack-isomorphic-tools';
import isoConfig  from '../configs/isomorphic.config';

// this must be equal to your Webpack configuration "context" parameter
const basePath = path.join(__dirname, '../');

// this global variable will be used later in express middleware
global.webpack_isomorphic_tools = new Isomorphic(isoConfig)
.server(basePath, function () {
    require('./release.js');
});
