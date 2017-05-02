/**
 * @file 列表页相关路由处理
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs     from 'fs';
import Router from 'koa-router';
import list   from 'client/list/list';

const router = new Router();

// 列表页渲染
router.get('/', async (ctx) => {
    let assets = fs.readFileSync('webpack-assets.json');
    ctx.state.title = 'React Detail';
    await ctx.render('list', {
        assets: JSON.parse(assets),
        reactHtml: list
    });
});

export default router;
