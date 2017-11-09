//redis连接服务
var redis = require('redis');
var config = require('../../config/config')
var redisClient = redis.createClient(config.redis.port, config.redis.ip, {
    auth_pass: config.redis.password,
    db: config.redis.db
});
redisClient.on('ready', function (err) {
    console.log('redis client ready');
});
redisClient.on("error", function (err) {
    console.log("redis client Error " + err);
});

var redisPub = {
    //添加一条记录至redis中,key添加的主键，object添加的内容,fun回调方法，即当添加一条记录至redis中后的响应结果，第一个参数是响应是否成功的bool值，第二个参数为响应的说明
    add: function (key, object, fun) {
        _add(key, object, fun);
    },
    //删除一条记录从redis
    del: function (key, fun) {
        _del(key, fun);
    },
    //查询一条记录
    get: function (key, fun) {
        _get(key, fun);
    }
}
module.exports = redisPub;
/**
 * 添加一条记录至redis中，以key值加上对象实体中的值，如果key在之前的值中存在，则将覆盖之前的值
 */
function _add(key, object, fun) {
    redisClient.set(key, JSON.stringify(object), function (err, reply) {
        fun && fun(err, reply);
    });
}

/**
 *删除一条记录,key删除的值，fun删除记录后的响应值，第一个参数为删除是否成功的bool值，第二个为删除的响应说明
 */
function _del(key, fun) {
    redisClient.del(key, function (err, reply) {
        fun && fun(err, reply);
    });
}


/**
 *查询一条redis中的记录,查询的key值，fun查询返回的响应值，第一个参数表示是否查询成功，第一个参数表示参数后的值
 *
 */
function _get(key, fun) {
    redisClient.get(key, function (err, reply) {
        err ? fun(err, reply) : fun(err, JSON.parse(reply));
    });
}

