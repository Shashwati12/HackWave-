import { createClient } from "redis";
import type { RedisClientType } from "redis";
import config from ".";

const redisclient:RedisClientType = createClient({
    username: config.redis_username,
    password: config.redis_password,
    socket: {
        host: config.redis_host,
        port: Number(config.redis_port)
    }
});

redisclient.on('error', err => console.log('Redis Client Error', err));

await redisclient.connect();

export default redisclient
