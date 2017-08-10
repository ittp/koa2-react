/**
 * @file 列表页相关路由处理
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React    from 'react';
import Router   from 'koa-router';
import ListPage from 'client/list/list';
import Render   from 'react-dom/server';
import assets   from '../middleware/assets';

const router = new Router();

// 列表页渲染
router.get('/', assets('list'), async (ctx) => {
  ctx.state.title = 'React List';
  let ua = ctx.req.headers['user-agent'];
  let reactHtml = Render.renderToString(<ListPage text="list" ua={ua} />);
  await ctx.render('list/list', {
    reactHtml
  });
});

// ctl

export default router;
