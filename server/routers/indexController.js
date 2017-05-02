/**
 * @file 首页相关路由处理
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs        from 'fs';
import React     from 'react';
import Router    from 'koa-router';
import Render    from 'react-dom/server';
import Store     from 'client/index/store';
import IndexPage from 'client/index/index';

const router = new Router();

// 首页渲染
router.get('/', async (ctx) => {
    let assets = fs.readFileSync('webpack-assets.json');
    let data = [
        {
            id: 1,
            name: 'emiya',
            age: 30,
            sex: 1
        },
        {
            id: 2,
            name: 'tom',
            age: 23,
            sex: 2
        },
        {
            id: 3,
            name: 'jack',
            age: 32,
            sex: 3
        }
    ];
    let reactHtml = Render.renderToString(<IndexPage store={new Store(data)}/>);

    ctx.state.title = 'React Home';
    await ctx.render('index', {
        assets: JSON.parse(assets),
        initData: JSON.stringify(data),
        reactHtml
    });
});

export default router;
