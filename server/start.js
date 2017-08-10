/**
 * @file 开发服务器总入口
 * @author dongkunshan(windwithfo@yeah.net)
 */

import 'babel-polyfill';
import Koa        from 'koa';
import path       from 'path';
import webpack    from 'webpack';
import proxy      from './proxy';
import router     from './router';
import jsonp      from 'koa-jsonp';
import views      from 'koa-views';
import serve      from 'koa-static';
// import convert    from 'koa-convert';
import middle     from 'koa-webpack';
import session    from 'koa-session2';
import RedisStore from './RedisStore';
import parser     from 'koa-bodyparser';
import config     from '../configs/config';
import webConfig  from '../configs/webpack.config';

const app = new Koa();
const compiler = webpack(webConfig);
let viewPath;

const middleware = middle({
  compiler: compiler,
  dev: {
    publicPath: '/dev/',
    stats: {
      colors: true,
      chunks: false
    }
  }
});

compiler.apply(new webpack.ProgressPlugin(function (percentage) {
  if (percentage === 1) {
    console.log('reload page');
    middleware.hot.publish({
      action: 'reload'
    });
  }
}));

proxy.forEach((item) => app.use(item));
if (process.env.NODE_ENV === 'development') {
  app.use(serve(path.join(__dirname, '../build')));
  app.use(serve(path.join(__dirname, './static')));
  viewPath = '../views';
}
else {
  app.use(serve(__dirname));
  viewPath = './views';
}
app.use(parser());
app.use(jsonp());
app.use(middleware);

app.use(async (ctx, next) => {
  ctx.state.isDev = false;
  if (process.env.NODE_ENV === 'development') {
    ctx.state.isDev = true;
  }
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// Must be used before any router is used
app.use(views(path.join(__dirname, viewPath), {
  extension: 'pug'
}));

app.use(session({
  key: 'koa_dks_emiya_windiwhtfo_ssid',
  store: new RedisStore(),
  maxAge: 1000 * 60 * 60 * 24 * 1,
  overwrite: false,
  httpOnly: true
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.server.port);
console.log('server listen on port ' + config.server.port);
