import Redis from "ioredis";

let redis = null;

export const initRedis = () => {
  try {
    redis = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: 3,
      enableOfflineQueue: false,
    });

    redis.on("connect", () => {
      console.log("🟢 Redis connected");
    });

    redis.on("error", (err) => {
  if (err.code === "ECONNREFUSED") {
    console.warn("⚠️ Redis not available, continuing without cache");
  } else {
    console.error("🔴 Redis error:", err.message);
  }
});


  } catch (error) {
    console.error("❌ Redis initialization failed:", error.message);
  }
};

export const getRedisClient = () => redis;
