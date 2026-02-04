import { Router } from "express";
import {
  getPublicPosts,
  getPublicPostById,
} from "./post.public.controller.js";
import { getTrending } from "./post.trending.controller.js";
import { rateLimiter } from "../../rate-limit/rateLimiter.js";


const router = Router();

// Public feed
router.get(
  "/public",
  rateLimiter({
    windowSeconds: 60,
    maxRequests: 100,
    keyPrefix: "rl:public-feed",
  }),
  getPublicPosts
);


// Single public post
router.get("/public/:id", getPublicPostById);

router.get("/trending", getTrending);

export default router;
