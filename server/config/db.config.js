/**
 * @file redis配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

export default {
    redis: {
        // 服务地址
        ip: '127.0.0.1',
        // 服务端口
        port: 6379,
        // 服务授权密码
        pass: 'pass'
    },
    mongodb: {
        // 服务地址
        ip: '127.0.0.1',
        // 数据库名
        db: 'db',
        // 服务端口
        port: 27017,
        // 服务授权用户
        user: 'user',
        // 服务授权密码
        pass: 'pass'
    }
};
