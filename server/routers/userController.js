/**
 * @file 用户相关路由处理
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Router from 'koa-router';
import User   from '../moudles/User';

const router = new Router();

router.get('/view/*', (ctx, next) => {
    let user = ctx.session.user;
    if (ctx.path.indexOf('/user/view/login') > -1) {
        return next();
    }
    if (!user) {
        ctx.redirect('/user/view/login');
    }
    else {
        return next();
    }
});

router.get('/view/login', async (ctx) => {
    await ctx.render('login', {
        title: 'login',
    });
});

router.post('/api/login', async (ctx, next) => {
    console.log('login');
    ctx.type = 'json';
    let user = new User(ctx.request.body);
    let ret = await user.getOne();
    let data;
    if (ret) {
        ctx.session.user = ret;
        data = {
            code: 0,
            jump: '/home/view/addHouse',
            msg: "登录成功"
        };
    }
    else {
        data = {
            code: 1,
            msg: "用户名或密码错误"
        };
    }
    ctx.body = data;
});

router.get('/api/list', async (ctx) => {
    console.log('list');
    let ret = await new User().list();
    console.log('list: ' + ret);
    ctx.body = ret ? ret : 'no data';
});

router.get('/api/all', async (ctx) => {
    console.log('all');
    let user = new User();
    let ret = await user.getAll();
    console.log('all: ' + ret);
    ctx.body = ret ? ret : 'no data';
});

router.get('/api/regedit', async (ctx) => {
    console.log('regedit');
    let user = new User({
        username: 'emiya',
        password: '12345',
        email: '434503826@qq.com',
        phone: '18811656110'
    });
    let ret = await user.add();
    console.log('regedit: ' + ret);
    ctx.body = ret ? ret : 'no data';
});

router.get('/api/update', async (ctx) => {
    console.log('update');
    let user = new User({
        // id: 1,
        _id: '58d33395c20b8f479689d596',
        username: 'emiya',
        password: 'passw0rd',
        email: '434503826@qq.com',
        phone: '18811656110'
    });
    let ret = await user.update();
    console.log('update: ' + ret);
    ctx.body = ret ? ret : 'no data';
});

router.get('/api/delete', async (ctx) => {
    console.log('delete');
    let user = new User({
        // id: 1,
        _id: '58d33395c20b8f479689d596',
        username: 'emiya',
        password: 'passw0rd',
        email: '434503826@qq.com',
        phone: '18811656110'
    });
    let ret = await user.del();
    console.log('delete: ' + ret);
    ctx.body = ret ? ret : 'no data';
});

export default router;
