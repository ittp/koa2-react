/**
 * @file 信息页数据仓库
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
  action,
  autorun,
  computed,
  observable
} from 'mobx';
import fetch from 'isomorphic-fetch';

class HouseState {
  @observable formData = {};
  @observable house = {};
  @observable canEdit = true;

  constructor(data) {
    this.formData = data.init || {};
    this.house = data.house || {};
    this.canEdit = data.canEdit;
    autorun(() => console.log(this.word));
  }

  @action fetchData() {
    fetch('/api/people')
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((stories) => {
      this.formData = stories.list;
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
      this.formData = stories.list;
    });
  }

  @computed get word() {
    return 'The text is:' + this.formData.title;
  }

  @action titleChange(title) {
    this.formData.title = title;
  }
}

export default HouseState;
