// defines the application
import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import postRoutes from "./modules/post/post.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { initRedis } from "./cache/redis.client.js";
import { recomputeTrendingPosts } from "./jobs/trending.jobs.js";
import { requestTimer } from "./metrics/requestTimer.js";

const app = express();
initRedis();
recomputeTrendingPosts();
app.use(requestTimer);

setInterval(recomputeTrendingPosts, 5 * 60 * 1000);

/**
 * Global middlewares
 */
app.use(express.json());

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

/**
 * Error handler (must be last)
 */
app.use(errorMiddleware);

export default app;
