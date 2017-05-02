/**
 * @file 列表页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import './list.less';
import 'component/Hello.less';
import React    from 'react';
import ReactDom from 'react-dom';
import Hello    from 'component/Hello';
import Render   from 'react-dom/server';

const ssr = true;

let html = '';
let isNode = typeof window === 'undefined';

class ListPage extends React.Component {
    render() {
        return (
            <div>
                <Hello text={this.props.text}/>
            </div>
        );
    }
}

if (!isNode) {
    ReactDom.render(<ListPage text="list"/>, document.getElementById('root'));
}

if (ssr) {
    html = Render.renderToString(<ListPage text="list"/>);
}

export default html;
