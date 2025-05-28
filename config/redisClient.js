import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 2,
  retryStrategy: (times) => {
    if (times >= 2) return null;
    return Math.min(times * 50, 2000);
  },
  tls: process.env.REDIS_URL?.includes("upstash") ? {} : undefined,
});

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.error("Redis error", err));

export default redis;
