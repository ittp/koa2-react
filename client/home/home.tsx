/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import * as style from './style.scss';

import * as React   from 'react';
import { observer } from 'mobx-react';
// import {Button}   from 'antd-mobile';
// <Button type="primary" size="small">{this.props.store.homeText}</Button>

interface DetailHome {
  props: any
}

@observer
class DetailHome extends React.Component {
  render() {
    return (
      <div className={style.title}>
        this is Home
      </div>
    );
  }
}

export default DetailHome;
