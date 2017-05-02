/**
 * @file 发布服务器总入口
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Koa        from 'koa';
import path       from 'path';
import router     from './router';
import jsonp      from 'koa-jsonp';
import views      from 'koa-views';
import serve      from 'koa-static';
import session    from 'koa-session2';
import parser     from 'koa-bodyparser';
import RedisStore from './routers/RedisStore';

const app = new Koa();

app.use(serve(path.join(__dirname, '../build')));
app.use(parser());
app.use(jsonp());

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

app.use(session({
    key: 'koa_dks_emiya_windiwhtfo_ssid',
    store: new RedisStore(),
    maxAge: 1000 * 60 * 60 * 24 * 1,
    overwrite: false,
    httpOnly: true
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('server listen on port 3000');
