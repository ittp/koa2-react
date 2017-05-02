/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import './index.less';
import 'component/Hello.less';
import React      from 'react';
import Store      from './store';
import ReactDom   from 'react-dom';
import {observer} from 'mobx-react';
import Hello      from 'component/Hello';
import DevTools   from 'mobx-react-devtools';

import {
    DatePicker
} from 'antd';

let isNode = typeof window === 'undefined';

@observer
class IndexPage extends React.Component {
    render() {
        let items = this.props.store.list.map((item) =>
            <li key={item.id}>
                name:{item.name},
                age:{item.age},
                sex:
                {(() => {
                    switch (item.sex) {
                        case 1:return '男';
                        case 2:return '女';
                        default:return '未知';
                    }
                })()}
            </li>
        );

        return (
            <div>
                <Hello text="index"/>
                <p>click the button to pop from list</p>
                <button onClick={this.popList}>
                    click me
                </button>
                <ul>
                    {items}
                </ul>
                <DatePicker/>
                <DevTools noPanel/>
            </div>
        );
    }

    popList = () => {
        this.props.store.popItem();
    }
}

if (!isNode) {
    ReactDom.render(<IndexPage store={new Store(window.__initData)}/>, document.getElementById('root'));
}

export default IndexPage;
