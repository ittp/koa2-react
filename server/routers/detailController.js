/**
 * @file 详情页相关路由处理
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs          from 'fs';
import React       from 'react';
import Router      from 'koa-router';
import Render      from 'react-dom/server';
import DetailHome  from 'client/detail/home';
import DetailPage1 from 'client/detail/page1';
import DetailPage2 from 'client/detail/page2';
import StoreHome   from 'client/detail/storeHome';
import StorePage1  from 'client/detail/storePage1';
import StorePage2  from 'client/detail/storePage2';
import {
    Link,
    Route,
    StaticRouter
} from 'react-router-dom';

const router = new Router();

// 详情页渲染
router.get('/:paganame?/:arg?', async (ctx) => {
    let context = {};
    let pagename = ctx.params.paganame;
    let assets = fs.readFileSync('webpack-assets.json');
    let reactHtml = Render.renderToString(
        <StaticRouter basename="detail" location={{pathname: ctx.url}} context={context}>
            <div>
                <ul>
                    <li><Link to="/">DetailHome</Link></li>
                    <li><Link to="/page1/123">DetailPage1</Link></li>
                    <li><Link to="/page2">DetailPage2</Link></li>
                </ul>
                <Route exact path="/" render={() => (
                    <DetailHome store={new StoreHome('stroe in home')}/>
                )}/>
                <Route path="/page1/:userid?" render={({match}) => (
                    <DetailPage1 store={new StorePage1('stroe in page1')} userid={match.params.userid}/>
                )}/>
                <Route path="/page2" render={() => (
                    <DetailPage2 store={new StorePage2('stroe in page2')}/>
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
    await ctx.render('detail', Object.assign({reactHtml}, JSON.parse(assets)));
});

export default router;
