/**
 * @file 路由总入口
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Router from 'koa-router';

// 导入子路由

import apiCtl    from './controllers/apiController';
import listCtl   from './controllers/listController';
import userCtl   from './controllers/userController';
import indexCtl  from './controllers/indexController';
import houseCtl  from './controllers/houseController';
import detailCtl from './controllers/detailController';
// imp

const router = new Router();

// 首页拦截
router.redirect('/', '/index');

// 路由分发
router.use('/api', apiCtl.routes(), apiCtl.allowedMethods());
router.use('/list', listCtl.routes(), listCtl.allowedMethods());
router.use('/user', userCtl.routes(), userCtl.allowedMethods());
router.use('/house', houseCtl.routes(), houseCtl.allowedMethods());
router.use('/index', indexCtl.routes(), indexCtl.allowedMethods());
router.use('/detail', detailCtl.routes(), detailCtl.allowedMethods());
// router

export default router;
