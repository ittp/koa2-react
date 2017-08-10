/**
 * @file 列表页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import './list.less';
import 'component/Hello.less';
import React       from 'react';
import ReactDom    from 'react-dom';
import {observer}  from 'mobx-react';
import Store       from './listStore';

import {
  Table
} from 'antd';

let isNode = typeof window === 'undefined';

@observer
class HouseList extends React.Component {
  pageChange = (opt) => {
    this.props.store.fetchData(opt);
  }
  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href={'/house/detail/view/' + record._id}>查看</a>
            <span className="ant-divider" />
            <a href={'/house/detail/edit/' + record._id}>编辑</a>
            <span className="ant-divider" />
            <a href={'/house/api/delete/' + record._id}>删除</a>
          </span>
        )
      }
    ];
    return (
      <div className="container">
        <Table dataSource={this.props.store.list} columns={columns}
          pagination={{total: this.props.store.count, defaultPageSize: 2}}
          onChange={this.pageChange} />
      </div>
    );
  }
}

if (!isNode) {
  ReactDom.render(
    <HouseList store={new Store(window.__initData)} />,
    document.getElementById('root')
  );
}

export default HouseList;
