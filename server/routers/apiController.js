/**
 * @file 数据相关路由处理
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs     from 'fs';
import Router from 'koa-router';
import House  from '../moudles/House';
import log4js from '../config/log.config';

const router = new Router();
const logger = log4js.getLogger('api');

router.get('/version', (ctx) => {
    logger.info('get config version by api');
    ctx.type = 'json';
    let data = {
        code: 0,
        version: '20170322-1',
        msg: 'msg'
    };
    ctx.body = data;
});

router.get('/config', (ctx) => {
    logger.info('get config by api');
    ctx.type = 'json';
    let data = {
        code: 0,
        nav: [
            {
                name: '我要买',
                path: '../sell/sell',
                icon: 'http://dongkunshan.cn/assets/imgs/sell.png'
            },
            {
                name: '我要租',
                path: '../rent/rent',
                icon: 'http://dongkunshan.cn/assets/imgs/rent.png'
            },
            {
                name: '找一找',
                path: '../search/search',
                icon: 'http://dongkunshan.cn/assets/imgs/search.png'
            }
        ],
        sellTabs: [
            {
                text: '总价',
                value: -1,
                name: '总价',
                word: 'sellPrice',
                items: [
                    {
                        text: '不限',
                        value: -1
                    },
                    {
                        text: '200万以下',
                        value: 200
                    },
                    {
                        text: '200万-500万',
                        value: 500
                    },
                    {
                        text: '500万以上',
                        value: 501
                    }
                ]
            },
            {
                text: '面积',
                value: -1,
                name: '面积',
                word: 'square',
                items: [
                    {
                        text: '不限',
                        value: -1
                    },
                    {
                        text: '40平以下',
                        value: 40
                    },
                    {
                        text: '40-80平',
                        value: 80
                    },
                    {
                        text: '80-120平',
                        value: 120
                    },
                    {
                        text: '120平以上',
                        value: 121
                    }
                ]
            },
            {
                text: '户型',
                value: -1,
                name: '户型',
                word: 'bedroom',
                items: [
                    {
                        text: '不限',
                        value: -1
                    },
                    {
                        text: '一室',
                        value: 1
                    },
                    {
                        text: '二室',
                        value: 2
                    },
                    {
                        text: '三室',
                        value: 3
                    },
                    {
                        text: '四室',
                        value: 4
                    },
                    {
                        text: '四室以上',
                        value: 5
                    }
                ]
            }
        ],
        rentTabs: [
            {
                text: '类型',
                value: -1,
                name: '类型',
                word: 'roomtype',
                items: [
                    {
                        text: '不限',
                        value: -1
                    },
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
                        text: '其他',
                        value: 3
                    }
                ]
            },
            {
                text: '租金',
                value: -1,
                name: '租金',
                word: 'rentPrice',
                items: [
                    {
                        text: '不限',
                        value: -1
                    },
                    {
                        text: '2000以下',
                        value: 2000
                    },
                    {
                        text: '2000-5000',
                        value: 5000
                    },
                    {
                        text: '5000以上',
                        value: 5001
                    }
                ]
            },
            {
                text: '面积',
                value: -1,
                name: '面积',
                word: 'square',
                items: [
                    {
                        text: '不限',
                        value: -1
                    },
                    {
                        text: '40平以下',
                        value: 40
                    },
                    {
                        text: '40-80平',
                        value: 80
                    },
                    {
                        text: '80-120平',
                        value: 120
                    },
                    {
                        text: '120平以上',
                        value: 121
                    }
                ]
            }
        ],
        msg: 'msg'
    };
    ctx.body = data;
});

router.get('/top/:num?', async (ctx) => {
    logger.info('get top 10 by api');
    ctx.type = 'json';
    let num = 10;
    if (ctx.params.num) {
        num = +ctx.params.num;
    }
    let data = await House.top(num);
    ctx.body = data;
});

router.get('/detail', async (ctx) => {
    logger.info('get top 10 by api');
    ctx.type = 'json';
    let id = ctx.request.query.id;
    let data;
    data  = await House.detail(id);
    ctx.body = data;
});

router.get('/fetchData', async (ctx) => {
    logger.info('fetchData by api');
    ctx.type = 'json';
    let opt = {
        query: {}
    };
    let type = ctx.request.query.type || 0;
    opt.query.$or = [{type: +type}, {type: 2}];
    opt.query.status = 0;
    if (type === '0') {
        let roomtype = ctx.request.query.roomtype || -1;
        switch (+roomtype) {
            case -1:
                break;
            case 5:
                opt.query.roomtype = {
                    $gte: 5
                };
            default:
            opt.query.roomtype = +roomtype;
        }
        let rentPrice = ctx.request.query.rentPrice || -1;
        switch (+rentPrice) {
            case 2000:
                opt.query.rentPrice = {
                    $lt: 2000
                };
                break;
            case 5000:
                opt.query.$and = [
                    {
                       rentPrice: {
                           $gte: 2000
                       }
                    },
                    {
                        rentPrice: {
                            $lt: 5000
                        }
                    }
                ];
                break;
            case 5001:
                opt.query.rentPrice = {
                    $gt: 5000
                };
                break;
        }
    }
    else if (type === '1') {
        let bedroom = ctx.request.query.bedroom || -1;
        switch (+bedroom) {
            case -1:
                break;
            case 5:
                opt.query.bedroom = {
                    $gt: 4
                };
            default:
                opt.query.bedroom = +bedroom;
        }
        let sellPrice = ctx.request.query.sellPrice || -1;
        switch (+sellPrice) {
            case 200:
                opt.query.sellPrice = {
                    $lt: 200
                };
                break;
            case 500:
                opt.query.$and = [
                    {
                       sellPrice: {
                           $gte: 200
                       }
                    },
                    {
                        sellPrice: {
                            $lt: 500
                        }
                    }
                ];
                break;
            case 501:
                opt.query.sellPrice = {
                    $gt: 500
                };
                break;
        }
    }
    let square = ctx.request.query.square || -1;
    switch (+square) {
        case 40:
            opt.query.square = {
                $lt: 40
            };
            break;
        case 80:
            if (opt.query.$and) {
                opt.query.$and.push(
                    {
                       square: {
                           $gte: 40
                       }
                    },
                    {
                        square: {
                            $lt: 80
                        }
                    }
                );
            }
            else {
                opt.query.$and = [
                    {
                       square: {
                           $gte: 40
                       }
                    },
                    {
                        square: {
                            $lt: 80
                        }
                    }
                ];
            }
            break;
        case 120:
        if (opt.query.$and) {
            opt.query.$and.push(
                {
                   square: {
                       $gte: 80
                   }
                },
                {
                    square: {
                        $lt: 120
                    }
                }
            );
        }
        else {
            opt.query.$and = [
                {
                   square: {
                       $gte: 80
                   }
                },
                {
                    square: {
                        $lt: 120
                    }
                }
            ];
        }
            break;
        case 121:
            opt.query.square = {
                $gt: 120
            };
            break;
    }
    opt.pageNum = +ctx.request.query.pageNum || 1;
    opt.pageSize = +ctx.request.query.pageSize || 10;
    let data = await House.fetch(opt);
    ctx.body = data;
});

router.get('/search', async (ctx) => {
    logger.info('search by api');
    ctx.type = 'json';
    let pageNum = +ctx.request.query.pageNum || 1;
    let pageSize = +ctx.request.query.pageSize || 10;
    let keyword = decodeURIComponent(ctx.request.query.q);
    let data = await House.search(keyword, pageNum, pageSize);
    ctx.body = data;
});

router.get('/addhouse', async (ctx) => {
    return;
    ctx.type = 'json';
    console.log('add house');
    let data = [];
    data.push(new House(
        {
            // 标题
            title: '花园小区 简装 地下室',
            // 类型 0:租 1:售 2:租售
            type: 2,
            // 地址
            address: '北京市太阳区花园路',
            // 售价
            sellPrice: 143,
            // 租金
            rentPrice: 20000,
            // 租金类型 0:月租,1:季租,2:半年租,3:整年租,4:多年租
            rentType: 4,
            // 大小
            square: 80,
            // 楼层
            floor: -2,
            // 总楼层
            totalFloor: 11,
            // 卧室
            bedroom: 2,
            // 客厅
            drawingroom: 2,
            // 卫生间
            toilet: 1,
            // 装修 0:豪装,1:精装,2:中装,3:简装,4:毛坯
            decorate: 0,
            // 类型 0:主卧,1:次卧,2:隔断,3:其他
            roomtype: 0,
            // 朝向
            orientation: '西',
            // 限制 0:男,1:女,2:男女不限
            roomlimit: 2,
            // 房主称呼
            owner: '董女士',
            // 房主联系电话
            tel: '11012345678',
            // 标签
            tag: ['临近地铁']
        }
    ));
    data.push(new House(
        {
            // 标题
            title: '花园小区 中装 地下室',
            // 类型 0:租 1:售 2:租售
            type: 2,
            // 地址
            address: '北京市太阳区花园路',
            // 售价
            sellPrice: 521,
            // 租金
            rentPrice: 15450,
            // 租金类型 0:月租,1:季租,2:半年租,3:整年租,4:多年租
            rentType: 1,
            // 大小
            square: 120,
            // 楼层
            floor: -1,
            // 总楼层
            totalFloor: 12,
            // 卧室
            bedroom: 1,
            // 客厅
            drawingroom: 1,
            // 卫生间
            toilet: 1,
            // 装修 0:豪装,1:精装,2:中装,3:简装,4:毛坯
            decorate: 0,
            // 类型 0:主卧,1:次卧,2:隔断,3:其他
            roomtype: 0,
            // 朝向
            orientation: '北',
            // 限制 0:男,1:女,2:男女不限
            roomlimit: 2,
            // 房主称呼
            owner: '张先生',
            // 房主联系电话
            tel: '17712345678',
            // 标签
            tag: ['家电齐全', '临近地铁']
        }
    ));
    // ctx.body = data;
    House.adds(data);
});

router.get('/list', async (ctx) => {
    console.log('addhouse');
});

router.get('/people', (ctx) => {
    ctx.type = 'json';
    let data = {
        code: 0,
        list: [
            {
                id: 1,
                name: 'emiya',
                age: 30,
                sex: 1
            },
            {
                id: 2,
                name: 'tom',
                age: 23,
                sex: 2
            },
            {
                id: 3,
                name: 'jack',
                age: 32,
                sex: 3
            }
        ],
        msg: 'msg'
    };
    ctx.body = data;
});

export default router;
