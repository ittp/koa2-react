/**
 * @file 详情页
 * @author dongkunshan(windwithfo@yeah.net)
 */
import React     from 'react';
import Loadable  from 'react-loadable';
import { Route } from 'react-router-dom';

const Home = Loadable({
  loader: () => import('./home/home'),
  loading: () => null,
});

const Page1 = Loadable({
  loader: () => import('./page1/page1'),
  loading: () => null,
});

const Page2 = Loadable({
  loader: () => import('./page2/page2'),
  loading: () => null,
});

function Routes() {
  return (
    <div>
      <Route exact path="/home" component={ Home }/>
      <Route exact path="/page1" component={ Page1 }/>
      <Route exact path="/page2/:id?" component={ Page2 }/>
    </div>
  );
}

export default Routes;