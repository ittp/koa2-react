/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React      from 'react';
import {observer} from 'mobx-react';

@observer
class DetailHome extends React.Component {
    render() {
        return (
            <div>
                this is {this.props.store.text}
            </div>
        );
    }
}

export default DetailHome;
