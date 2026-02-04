import { getRedisClient } from "../cache/redis.client.js";

export const rateLimiter = ({
  windowSeconds,
  maxRequests,
  keyPrefix,
}) => {
  return async (req, res, next) => {
    try {
      const redis = getRedisClient();
      if (!redis) return next(); // Redis down → fail open

      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;

      const key = `${keyPrefix}:${ip}`;

      // increment request count
      const current = await redis.incr(key);

      // set expiry on first hit
      if (current === 1) {
        await redis.expire(key, windowSeconds);
      }

      if (current > maxRequests) {
        return res.status(429).json({
          message: "Too many requests. Please try again later.",
        });
      }

      next();
    } catch (err) {
      console.error("❌ Rate limiter error:", err.message);
      next(); // never block due to limiter failure
    }
  };
};
