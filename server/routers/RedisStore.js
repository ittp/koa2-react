/**
 * @file session操作
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Redis   from 'ioredis';
import {Store} from 'koa-session2';
import config  from '../config/db.config';

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis({
            password: config.redis.pass,
            port: config.redis.port,
            host: config.redis.ip
        });
    }

    get(sid) {
        return this.redis.get(`SESSION:${sid}`).then(data => JSON.parse(data));
    }

    set(session, opts) {
        if(!opts.sid) {
            opts.sid = this.getID(24);
        }

        return this.redis.set(`SESSION:${opts.sid}`, JSON.stringify(session)).then(() => {
            if (opts.maxAge) {
                this.redis.expire(`SESSION:${opts.sid}`, opts.maxAge / 1000);
            }
            return opts.sid
        });
    }

    destroy(sid) {
        return this.redis.del(`SESSION:${sid}`);
    }
}

export default RedisStore;
