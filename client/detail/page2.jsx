/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React from 'react';
import {observer} from 'mobx-react';

@observer
class DetailPage2 extends React.Component {
    render() {
        return (
            <div>
                <input maxLength='25' value={this.props.store.text} onChange={this.change}></input><br/>
                <button onClick={this.change}>click me to change text</button><br/>
                this is {this.props.store.text}
            </div>
        );
    }

    change = (event) => {
        let val = event.target.value || 'change';
        this.props.store.text = val;
    }
}

export default DetailPage2;
