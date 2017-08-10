/**
 * @file 详情页相关路由处理
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React       from 'react';
import Router      from 'koa-router';
import Render      from 'react-dom/server';
import DetailHome  from 'client/detail/home';
import DetailPage1 from 'client/detail/page1';
import DetailPage2 from 'client/detail/page2';
import assets      from '../middleware/assets';
import Store       from 'client/detail/detailStore';
import {
  NavLink,
  Route,
  StaticRouter
} from 'react-router-dom';

const router = new Router();

// 详情页渲染
router.get('/:paganame?/:arg?', assets('detail'), async (ctx) => {
  let context = {};
  let store = new Store();
  let pagename = ctx.params.paganame;
  let reactHtml = Render.renderToString(
    <StaticRouter basename="detail" location={{pathname: ctx.url}} context={context}>
      <div className="detail">
        <ul>
          <li><NavLink activeClassName="active"
            to="/" exact>DetailHome</NavLink></li>
          <li><NavLink activeClassName="active"
            to="/page1/123">DetailPage1</NavLink></li>
          <li><NavLink activeClassName="active"
            to="/page2">DetailPage2</NavLink></li>
        </ul>
        <Route exact path="/" render={() => (
          <DetailHome store={store}/>
        )}/>
        <Route path="/page1/:userid?" render={({match}) => (
          <DetailPage1 store={store} userid={match.params.userid}/>
        )}/>
        <Route path="/page2" render={() => (
          <DetailPage2 store={store}/>
        )}/>
      </div>
    </StaticRouter>
  );
  ctx.state.title = 'React Detail';
  switch (pagename) {
    case 'page1':
      ctx.state.title = 'React Detail page1';
      break;
    case 'page2':
      ctx.state.title = 'React Detail page2';
      break;
  }
  await ctx.render('detail/detail', {
    reactHtml,
    initData: '""'
  });
});

// ctl

export default router;
