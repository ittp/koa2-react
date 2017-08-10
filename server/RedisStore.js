/**
 * @file session操作
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Redis   from 'ioredis';
import {Store} from 'koa-session2';
import config  from './config/db.config';

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
    return this.redis.get(`SESSION:${sid}`).then((data) => JSON.parse(data));
  }

  set(session, opts) {
    if (!opts.sid) {
      opts.sid = this.getID(24);
    }

    return this.redis.set(`SESSION:${opts.sid}`, JSON.stringify(session)).then(() => {
      if (opts.maxAge) {
        this.redis.expire(`SESSION:${opts.sid}`, opts.maxAge / 1000);
      }
      return opts.sid;
    });
  }

  destroy(sid) {
    return this.redis.del(`SESSION:${sid}`);
  }

  // constructor() {
  //   super();
  //   this.redis = new Redis({
  //     password: config.redis.pass,
  //     port: config.redis.port,
  //     host: config.redis.ip
  //   });
  // }
  //
  // async get(sid) {
  //   let data = await this.redis.get(`SESSION:${sid}`);
  //   return JSON.parse(data);
  // }
  //
  // async set(session, {
  //   sid = this.getID(24),
  //   maxAge = 1000000
  // } = {}) {
  //   try {
  //     // Use redis set EX to automatically drop expired sessions
  //     await this.redis.set(`SESSION:${sid}`, JSON.stringify(session),
  //     'EX', maxAge / 1000);
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  //   return sid;
  // }
  //
  // async destroy(sid) {
  //   return await this.redis.del(`SESSION:${sid}`);
  // }
}

export default RedisStore;
