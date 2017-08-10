```
assets                    资源文件夹
    |-img                 图片文件夹
    |    |-favicon.ioc    icon
    |    |-logo.jpg       logo
    |-js                  js文件夹
    |    |-common.js      通用js
    |    |
    |-style               样式文件夹
    |    |-hello.less     测试样式
    |
build                       前端静态资源目录
client                      前端文件夹
    |-detail                详情页文件夹(单页同构)
    |    |-detail.jsx       详情页入口文件
    |    |-detail.less      详情页入口样式文件
    |    |-home.jsx         详情页第一页
    |    |-page1.jsx        详情页第二页
    |    |-page2.jsx        详情页第三页
    |    |-storeHome.js     详情页第一页数据仓库
    |    |-storePage1.js    详情页第二页数据仓库
    |    |-storePage2.js    详情页第三页数据仓库
    |
    |-index               首页文件夹
    |    |-index.jsx      首页入口文件
    |    |-index.less     首页入口样式文件
    |    |-store.less     首页入口数据仓库
    |
    |-list                列表页文件夹
    |    |-list.jsx       列表页入口文件
    |    |-list.less      列表页入口样式文件
    |
    |-entry.js            入口文件配置
    |
component                 通用组件文件夹
    |-Hello.jsx           测试组件，输出调用页面所传内容
    |-Hello.less          测试组件样式，输出调用页面所传内容
    |
configs                            配置文件夹
    |-build.js                     发布构建脚本
    |-client.js                    客户端刷新脚本
    |-isomorphic.config.js         同构插件配置
    |-nodemon.json                 nodemon配置文件
    |-webpack.base.config.js       打包基础配置文件
    |-webpack.config.js            开发打包配置文件
    |-webpack.prod.config.js       发布打包配置文件(前端)
    |-webpack.release.config.js    发布打包配置文件(后端)
    |
server                         后端文件夹
    |-config                   配置文件
    |    |-db.config.js        数据库配置
    |    |-log.config.js       日志配置
    |
    |-controllers              路由分发文件夹
    |    |-apiController       api路由
    |    |-detailController    详情页路由
    |    |-indexController     首页路由
    |    |-listController      列表页路由
    |    |-RedisStore          session存储
    |    |-userController      用户页路由
    |
    |-middleware               中间价文件夹
    |    |-assets.js           静态资源中间件
    |    |-webpack.assets.json 前端静态资源版本(分布部署用,git不维护此文件)
    |
    |-logs                     日志文件夹(git不维护此文件)
    |-moudles                  实体类文件
    |    |-Base_redis.js       redis备用
    |    |-Base.js             基类
    |    |-House.js            房屋实体类
    |    |-User.js             用户实体类
    |
    |-release.js               启动文件(发布)
    |-router.js                路由入口分发
    |-server.js                启动文件封装
    |-start.js                 启动文件(开发)
    |
views                          页面文件夹
    |-includes                 导入模板文件夹
    |   |-head.pug             头文件页面
    |
    |-layouts                  布局模板文件夹
    |   |-base.pug             基本布局页面
    |
    |-detail.pug               详情页模板
    |-index.pug                首页模板
    |-list.pug                 列表页模板
    |-login.pug                登录页模板
    |
.eslintrc.js                   eslint规则配置
.babelrc                       babel配置
.gitignore                     git忽略目录配置
build.zip                      前端静态资源包(分布部署用,git不维护此文件)
.stylelintrc.sj                stylelint规则配置
FILELIST.md                    文件清单
LICENSE                        license文件
package.json                   项目信息文件
README.md                      项目说明文件
RELEASENOTE.md                 项目版本记录文件
```
