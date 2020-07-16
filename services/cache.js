const mongoose = require("mongoose");
const redis = require("redis"); // node-redis
const util = require("util");
const keys = require("../config/keys");

const client = redis.createClient(keys.RedisUrl);

client.hget = util.promisify(client.hget);
// hash get (key, nested-key, nested-value)
// get (key, value)
const exec = mongoose.Query.prototype.exec;// 保存原始的function

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () { // 改写exec源代码
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify( // nested key {query,collection}
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cacheValue = await client.hget(this.hashKey, key);

  if (cacheValue) {
    console.log("REDIS CACHE: DATA FROM REDIS");

    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }
  console.log("REDIS CACHE: DATA From MONGODB");

  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result));

  return result;
};

module.exports = {
  cleanHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
