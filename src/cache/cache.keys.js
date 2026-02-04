export const CACHE_KEYS = {
  PUBLIC_FEED: "public:posts:feed",

  PUBLIC_POST: (postId) => `public:posts:post:${postId}`,

  TRENDING_POSTS: "trending:posts",
};
