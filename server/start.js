/**
 * @file 开发服务器总入口
 * @author dongkunshan(windwithfo@yeah.net)
 */

import 'babel-polyfill';
import Koa     from 'koa';
import path    from 'path';
import webpack from 'webpack';
import router  from './router';
import jsonp   from 'koa-jsonp';
import views   from 'koa-views';
import serve   from 'koa-static';
import middle  from 'koa-webpack';
import config  from '../configs/webpack.config';

const app = new Koa();
const compiler = webpack(config);

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

app.use(serve(path.join(__dirname, '../build')));
app.use(jsonp());
app.use(middleware);

// Must be used before any router is used
app.use(views(path.join(__dirname, '../views'), {
    extension: 'pug'
}));

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('server listen on port 3000');
