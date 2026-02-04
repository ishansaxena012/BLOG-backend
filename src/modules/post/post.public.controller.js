import  asyncHandler  from "../../utils/asyncHandler.js";
import {
  fetchPublicPosts,
  fetchPublicPostById,
} from "./post.service.js";
import { getRedisClient } from "../../cache/redis.client.js";
import { CACHE_KEYS } from "../../cache/cache.keys.js";
import { incrementPostViews } from "./post.service.js";


export const getPublicPosts = asyncHandler(async (req, res) => {
  const redis = getRedisClient();
  const cacheKey = CACHE_KEYS.PUBLIC_FEED;

  // 🔥 debug proof
  console.log("🔥 getPublicPosts HIT");

  //  Try Redis
  if (redis) {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("🟢 CACHE HIT → public feed");
      return res.status(200).json(JSON.parse(cached));
    }
    console.log("🟡 CACHE MISS → public feed");
    console.log(
      JSON.stringify({
        type: "cache",
        key: "public:posts:feed",
        result: "MISS",
      })
    )
  }

  //  DB via service
  const posts = await fetchPublicPosts(req.query);

  const responsePayload = {
    data: posts.data,
    meta: posts.meta,
  };

  //  Store in Redis (best effort)
  if (redis) {
    await redis.set(
      cacheKey,
      JSON.stringify(responsePayload),
      "EX",
      60 
    );
  }

  return res.status(200).json(responsePayload);
});


export const getPublicPostById = asyncHandler(async (req, res) => {
  const redis = getRedisClient();
  const postId = req.params.id;
  const cacheKey = CACHE_KEYS.PUBLIC_POST(postId);

  console.log("🔥 getPublicPostById HIT:", postId);

  //  Try Redis
  if (redis) {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("🟢 CACHE HIT → public post", postId);
      setImmediate(() => incrementPostViews(postId));

      return res.status(200).json(JSON.parse(cached));
    }
    console.log("🟡 CACHE MISS → public post", postId);
    console.log(
      JSON.stringify({
        type: "cache",
        key: cacheKey,
        result: "MISS",
      })
    );
  }

  //  DB via service
  const post = await fetchPublicPostById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const responsePayload = {
    data: post,
  };

  //  Store in Redis (best effort)
  if (redis) {
    await redis.set(
      cacheKey,
      JSON.stringify(responsePayload),
      "EX",
      180 // 3 minutes TTL
    );
  }
  setImmediate(() => incrementPostViews(postId));
  return res.status(200).json(responsePayload);
});

