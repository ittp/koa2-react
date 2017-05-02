/**
 * @file 详情页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import './detail.less';
import 'component/Hello.less';
import React    from 'react';
import ReactDom from 'react-dom';
import DetailHome from './home';
import DetailPage1 from './page1';
import DetailPage2 from './page2';
import StoreHome   from './storeHome';
import StorePage1  from './storePage1';
import StorePage2  from './storePage2';
import {
    Link,
    Route,
    BrowserRouter
} from 'react-router-dom';

const isNode = typeof window === 'undefined';
const supportsHistory = 'pushState' in window.history;

class DetailPage extends React.Component {
    render() {
        return (
            <BrowserRouter basename="detail" forceRefresh={!supportsHistory}>
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
            </BrowserRouter>
        );
    }
}

if (!isNode) {
    ReactDom.render(<DetailPage/>, document.getElementById('root'));
}

export default DetailPage;
