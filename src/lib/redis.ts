// import Redis from "ioredis";

// const redis = new Redis({
//   port: parseInt(process.env.REDIS_PORT || ""),
//   host: process.env.REDIS_HOST,
//   username: process.env.REDIS_USER || "default",
//   password: process.env.REDIS_PASSWORD,
//   db: 0,
// });

// export default redis;

import { Client } from "redis-om";

const redis = new Client();
// redis.close();

async function redisConnect() {
  if (!redis.isOpen()) {
    await redis.open(process.env.REDIS_URL);
  }
}

export { redis as db, redisConnect as dbConnect };
