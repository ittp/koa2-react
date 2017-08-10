/**
 * @file 列表页数据仓库
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
  action,
  // autorun,
  // computed,
  observable
} from 'mobx';
import fetch from 'isomorphic-fetch';

class ListHouseState {
  @observable count = 0;
  @observable list = [];

  constructor(data) {
    this.count = data.count || 0;
    this.list = data.list || [];
  }

  @action fetchData(opt) {
    fetch('/house/api/list', {
      method: 'POST',
      body: JSON.stringify(opt)
    })
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((stories) => {
      this.list = stories.list;
    });
  }

  @action async submitForm(sendData) {
    return await fetch('/api/people', sendData)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((stories) => {
      this.list = stories.list;
    });
  }
}

export default ListHouseState;
