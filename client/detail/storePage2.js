/**
 * @file 首页数据仓库
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
    action,
    autorun,
    computed,
    observable
} from 'mobx';

class StatePage2 {
    @observable text = '';

    constructor(data) {
        this.text = data || '';
        autorun(() => console.log(this.word));
    }

    @computed get word() {
        return 'The text is:' + this.text;
    }

    @action textChange(text) {
        this.text = text;
    }
}

export default StatePage2;
