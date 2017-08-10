koa2-react
===
A porject with koa2,react,mobx on server side render
***
Install with:

    npm install koa2-react
    
If you need to ues redis and mongodb,updata the config file in **server/config/db.config.js** and make it turn on in **config/config.js**

	db: true

Usage Example
===
Init

    npm install

Build fe

    npm run fe

Build rd

    npm run rd

Run develop

    npm run dev

Build release

    #先运行lint,避免语法错误导致打包失败耽误时间
    npm run lint
    #lint通过后再运行
    npm run build

Publish

    npm run release

Run server online

    npm start

Stop server online

    npm stop


Entry
===
config file path:`client/entry.js`

License
===
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 dongkunshan
