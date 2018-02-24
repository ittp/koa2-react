/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import * as React   from 'react';
import { observer } from 'mobx-react';

interface DetailPage2 {
  props: any
}

@observer
class DetailPage2 extends React.Component {
  render() {
    return (
      <div className="title">
        <button onClick={this.change}>click me to change text</button><br/>
        this is page2
        userid is {this.props.match.params.id}
      </div>
    );
  }

  change = (event: any) => {
    let val = event.target.value || 'change';
    this.props.store.textChange(val);
  }
}

export default DetailPage2;
