/**
 * @file 首页数据仓库
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
    observable
} from 'mobx';

class StatePage1 {
    @observable text = '';

    constructor(data) {
        this.text = data || '';
    }
}

export default StatePage1;
