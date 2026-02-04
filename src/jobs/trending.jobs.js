import { getRedisClient } from "../cache/redis.client.js";
import { CACHE_KEYS } from "../cache/cache.keys.js";
import { getTrendingPosts } from "../modules/post/post.service.js";

export const recomputeTrendingPosts = async () => {
  try {
    console.log("⚙️ Recomputing trending posts...");

    const redis = getRedisClient();
    if (!redis) return;

    // heavy work (DB + CPU)
    const trending = await getTrendingPosts(10);

    // store result in Redis
    await redis.set(
      CACHE_KEYS.TRENDING_POSTS,
      JSON.stringify(trending),
      "EX",
      300 // 5 minutes
    );

    console.log("✅ Trending posts cached");
  } catch (err) {
    console.error("❌ Trending job failed:", err.message);
  }
};
