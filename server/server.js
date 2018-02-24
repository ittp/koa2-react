/**
 * @file 发布服务器总入口
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Koa       from 'koa';
import path      from 'path';
import proxy     from './proxy';
import webpack   from 'webpack';
import jsonp     from 'koa-jsonp';
import views     from 'koa-views';
import Router    from 'koa-router';
import serve     from 'koa-static';
import middle    from 'koa-webpack';
import parser    from 'koa-bodyparser';
import config    from '../config/config';
import webConfig from '../config/webpack.dev.config';

const app = new Koa();
const router = new Router();
const compiler = webpack(webConfig);
let viewPath;

const middleware = middle({
  compiler: compiler,
  dev: {
    stats: {
      colors: true,
      chunks: true,
      process: true
    }
  }
});

compiler.apply(new webpack.ProgressPlugin(function (percentage) {
  if (percentage === 1) {
    console.log('reload page');
    if (middleware.hot) {
      middleware.hot.publish({
        action: 'reload'
      });
    }
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
// app.use(views(path.join(__dirname, viewPath), {
//   extension: 'pug'
// }));

router.get('/*', (ctx, next) => {
  // ctx.router available
  const html = middleware.dev.fileSystem
  .readFileSync(middleware.dev.getFilenameFromUrl('/index.html'))
  .toString();
  ctx.body = html;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.server.port);
console.log('server listen on port ' + config.server.port);
