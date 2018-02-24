/**
 * @file 详情页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import '../assets/style/common';
import * as React        from 'react';
import Routes            from './routes';
import * as ReactDOM     from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const supportsHistory = 'pushState' in window.history;

class MainPage extends React.Component {
  render() {
    return (
      <BrowserRouter forceRefresh = { !supportsHistory }>
        <Routes/>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<MainPage/>, document.getElementById('root'));

export default MainPage;
