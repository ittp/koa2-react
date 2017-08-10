/**
 * @file 详情页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import './detail.less';
import 'component/Hello.less';
import React       from 'react';
import DetailHome  from './home';
import DetailPage1 from './page1';
import DetailPage2 from './page2';
import ReactDom    from 'react-dom';
import Store       from './detailStore';
import {
  NavLink,
  Route,
  BrowserRouter
} from 'react-router-dom';

const isNode = typeof window === 'undefined';
const supportsHistory = 'pushState' in window.history;

class DetailPage extends React.Component {
  render() {
    return (
      <BrowserRouter basename="detail" forceRefresh={!supportsHistory}>
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
            <DetailHome store={this.props.store}/>
          )}/>
          <Route path="/page1/:userid?" render={({match}) => (
            <DetailPage1
              store={this.props.store}
              userid={match.params.userid}/>
          )}/>
          <Route path="/page2" render={() => (
            <DetailPage2 store={this.props.store}/>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}

if (!isNode) {
  ReactDom.render(<DetailPage store={new Store(window.__initData)}/>,
    document.getElementById('root'));
}

export default DetailPage;
