/**
 * @file 路由总入口
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Router from 'koa-router';

// 导入子路由
import indexCtl  from './routers/indexController';
import detailCtl from './routers/detailController';
import listCtl   from './routers/listController';
import apiCtl    from './routers/apiController';
import userCtl   from './routers/userController';

const router = new Router();

// 首页拦截
router.redirect('/', '/index');

// 路由分发
router.use('/index', indexCtl.routes(), indexCtl.allowedMethods());
router.use('/detail', detailCtl.routes(), detailCtl.allowedMethods());
router.use('/list', listCtl.routes(), listCtl.allowedMethods());
router.use('/api', apiCtl.routes(), apiCtl.allowedMethods());
router.use('/user', userCtl.routes(), userCtl.allowedMethods());

export default router;
