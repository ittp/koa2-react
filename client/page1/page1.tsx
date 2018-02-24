/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import * as style   from './style.scss';

import * as React   from 'react';
import { observer } from 'mobx-react';

interface DetailPage1 {
  props: any
}

@observer
class DetailPage1 extends React.Component {

  render() {
    return (
      <div className={ style.title }>
        this is page1<br/>
      </div>
    );
  }
}

export default DetailPage1;
