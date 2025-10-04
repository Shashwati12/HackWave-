import { createClient } from "redis";
import type { RedisClientType } from "redis";
import config from ".";

const pub:RedisClientType = createClient({
    username: config.redis_username,
    password: config.redis_password,
    socket: {
        host: config.redis_host,
        port: Number(config.redis_port)
    }
});

pub.on('error', err => console.log('pub connection failed:', err));

await pub.connect();
console.log("Connected to pub");

const sub:RedisClientType = createClient({
    username: config.redis_username,
    password: config.redis_password,
    socket: {
        host: config.redis_host,
        port: Number(config.redis_port)
    }
});

sub.on('error', err => console.log('pub connection failed:', err));
 
await sub.connect();
console.log("Connected to sub");

export {
    pub,sub
}
