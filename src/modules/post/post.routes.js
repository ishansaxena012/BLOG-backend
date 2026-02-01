import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  create,
  getMine,
  getOne,
  update,
  remove
} from "./post.controller.js";
import {
  createPostValidator,
  updatePostValidator
} from "./post.validator.js";
import publicPostRoutes from "./post.public.routes.js";

const router = Router();
router.use(publicPostRoutes);

/**
 * Create a post
 * POST /api/posts
 */
router.post(
  "/",
  authMiddleware,
  validate(createPostValidator),
  create
);

/**
 * Get all posts of logged-in user
 * GET /api/posts/mine
 */
router.get(
  "/mine",
  authMiddleware,
  getMine
);

/**
 * Get a single post by ID (owner only)
 * GET /api/posts/:id
 */
router.get(
  "/:id",
  authMiddleware,
  getOne
);

/**
 * Update a post
 * PUT /api/posts/:id
 */
router.put(
  "/:id",
  authMiddleware,
  validate(updatePostValidator),
  update
);

/**
 * Delete a post
 * DELETE /api/posts/:id
 */
router.delete(
  "/:id",
  authMiddleware,
  remove
);

export default router;
