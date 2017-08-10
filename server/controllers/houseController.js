/**
 * @file 首页相关路由处理
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React      from 'react';
import Router     from 'koa-router';
import House      from '../moudles/House';
import Render     from 'react-dom/server';
import HousePage  from 'client/house/house';
import ListPage   from 'client/house/list';
import assets     from '../middleware/assets';
import ListStore  from 'client/house/listStore';
import HouseStore from 'client/house/houseStore';

const router = new Router();

// 房屋信息页渲染
router.get('/detail/:type?/:id?', assets('house'), async (ctx) => {
  const type = ctx.params.type;
  const id = ctx.params.id;
  let data = {
    canEdit: true,
    init: {
      type: [
        {
          text: '出租',
          value: 0
        },
        {
          text: '出售',
          value: 1
        },
        {
          text: '租售',
          value: 2
        }
      ],
      rentType: [
        {
          text: '月租',
          value: 0
        },
        {
          text: '季租',
          value: 1
        },
        {
          text: '半年租',
          value: 2
        },
        {
          text: '整年租',
          value: 3
        },
        {
          text: '多年租',
          value: 4
        }
      ],
      decorate: [
        {
          text: '豪装',
          value: 0
        },
        {
          text: '精装',
          value: 1
        },
        {
          text: '中装',
          value: 2
        },
        {
          text: '简装',
          value: 3
        },
        {
          text: '毛坯',
          value: 4
        }
      ],
      roomtype: [
        {
          text: '主卧',
          value: 0
        },
        {
          text: '次卧',
          value: 1
        },
        {
          text: '隔断',
          value: 2
        },
        {
          text: '整租',
          value: 3
        }
      ],
      roomlimit: [
        {
          text: '只限男',
          value: 0
        },
        {
          text: '只限女',
          value: 1
        },
        {
          text: '男女不限',
          value: 2
        }
      ],
      tags: [
        '家电齐全',
        '临近地铁',
        '拎包入住',
        '交通便利',
        '绿化好',
        '超市附近'
      ]
    },
    house: new House()
  };
  if (id) {
    data.house = await House.detail(id);
  }
  else {
    data.house = new House();
  }
  if (type === 'view') {
    data.canEdit = false;
  }
  let reactHtml = Render.renderToString(<HousePage store={new HouseStore(data)} />);
  ctx.state.title = '信息展示页面';
  await ctx.render('house/house', {
    initData: JSON.stringify(data),
    reactHtml
  });
});

// 列表页渲染
router.get('/list', assets('houselist'), async (ctx) => {
  let data = await House.list({
    pageNum: 1,
    pageSize: 2
  });
  let reactHtml = Render.renderToString(<ListPage store={new ListStore(data)} />);
  ctx.state.title = '信息列表页面';
  await ctx.render('house/list', {
    initData: JSON.stringify(data),
    reactHtml
  });
});

// 列表页分页
router.post('/api/list', async (ctx) => {
  const params = ctx.request.body;
  let data = await House.list({
    pageNum: params.current,
    pageSize: params.pageSize
  });
  ctx.type = 'json';
  ctx.body = data;
});

// ctl

export default router;
