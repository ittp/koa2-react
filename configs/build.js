/**
 * @file 构建文件
 * @author dongkunshan(windwithfo@yeah.net)
 */

import 'shelljs/global';
import ora     from 'ora';
import path    from 'path';
import webpack from 'webpack';
import nodecp  from 'child_process';
import Config  from './webpack.prod.config';
import Config2 from './webpack.release.config';

const spinner = ora('building for production...');

spinner.start();

rm('build.zip');
console.log('rm build.zip sucess');
rm('-rf', 'build');
console.log('rm build sucess');
mkdir('-p', 'build');
console.log('mkdir build sucess');
cp('assets/img/favicon.ico', 'build');
console.log('cp favicon.ico');

webpack(Config, function (err, stats) {
    spinner.stop();
    if (err) {
        throw err;
    }
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
    // let cmd = 'zip -r build.zip build';
    // nodecp.exec(cmd, function (data) {
    //     if (!data) {
    //         console.log('zip sucess');
    //     }
    //     else {
    //         console.log(data);
    //     }
    // });
});

webpack(Config2, function (err, stats) {
    spinner.stop();
    if (err) {
        throw err;
    }
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
    // let cmd = 'zip -r build.zip build';
    // nodecp.exec(cmd, function (data) {
    //     if (!data) {
    //         console.log('zip sucess');
    //     }
    //     else {
    //         console.log(data);
    //     }
    // });
});
