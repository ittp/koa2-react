/**
 * @file 配置文件
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path from 'path';

const port = 3001;

const config = {
  output: path.resolve(__dirname, '../build'),
  db: false,
  dev: {
    context: path.join(__dirname, '../'),
    publicPath: 'http://localhost:' + port + '/',
    // publicPath: '/dev/',
    port
  },
  build: {
    publicPath: '/'
  },
  server: {
    entry: path.resolve(__dirname, '../server/server.js'),
    port: 3002,
    fileName: 'server.js',
    sourceMap: false
  },
  proxys: [
    {
      path: '/rest/auth',
      target: 'config.proxy.auth',
      log: true,
      micro: true
    },
    {
      path: '/rest/auth',
      target: 'config.proxy.auth',
      log: true,
      rewrite: function (path) {
        return path.replace('/rest/auth', '');
      }
    }
  ]
};

export default config;
