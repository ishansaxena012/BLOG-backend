// defines the application
import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import postRoutes from "./modules/post/post.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

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
