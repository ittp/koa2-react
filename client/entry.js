/**
 * @file 入口配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

let pages = {
  // entry
  list: 'client/list/list.jsx',
  house: 'client/house/house.jsx',
  houselist: 'client/house/list.jsx',
  index: 'client/index/index.jsx',
  detail: 'client/detail/detail.jsx'
};

let vendors = {
  vendor: ['react', 'react-dom', 'mobx']
};

export default {
  pages,
  vendors
};
