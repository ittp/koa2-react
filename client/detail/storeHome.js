/**
 * @file 首页数据仓库
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
    observable
} from 'mobx';

class StateHome {
    @observable text = '';

    constructor(data) {
        this.text = data || '';
    }
}

export default StateHome;
