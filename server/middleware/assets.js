/**
* @file 静态资源中间件
* @author dongkunshan(windwithfo@yeah.net)
*/

import fs         from 'fs';
import path       from 'path';
import assetsJson from '../../configs/webpack-assets.json';

let assets = assetsJson;

function assetsLoader(assetsName) {
  return async (ctx, next) => {
    if (ctx.state.isDev) {
      const assetsBuffer = fs.readFileSync(path.resolve(__dirname,
        '../../configs/webpack-assets.json'));
      assets = JSON.parse(assetsBuffer);
    }
    ctx.state.assets = {
      styles: {
        [assetsName]: assets.styles[assetsName],
        vendor: assets.styles.vendor
      },
      javascript: {
        [assetsName]: assets.javascript[assetsName],
        vendor: assets.javascript.vendor,
        manifest: assets.javascript.manifest
      }
    };
    await next();
  };
}

export default assetsLoader;
