import asyncHandler from "../../utils/asyncHandler.js";
import { getRedisClient } from "../../cache/redis.client.js";
import { CACHE_KEYS } from "../../cache/cache.keys.js";

export const getTrending = asyncHandler(async (req, res) => {
  const redis = getRedisClient();

  if (!redis) {
    return res.status(200).json({ data: [] });
  }

  const cached = await redis.get(CACHE_KEYS.TRENDING_POSTS);

  if (cached) {
    console.log("🟢 TRENDING CACHE HIT");
    return res.status(200).json({
      data: JSON.parse(cached),
    });
  }

  console.log("🟡 TRENDING CACHE MISS");
  return res.status(200).json({ data: [] });
});