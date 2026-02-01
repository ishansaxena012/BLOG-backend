import asyncHandler from "../../utils/asyncHandler.js";
import {
  createPost,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost
} from "./post.service.js";

/**
 * Create a new post
 * POST /api/posts
 */
export const create = asyncHandler(async (req, res) => {
  const post = await createPost(req.user.id, req.body);

  res.status(201).json({
    success: true,
    data: post
  });
});

/**
 * Get all posts of logged-in user
 * GET /api/posts/mine
 */
export const getMine = asyncHandler(async (req, res) => {
  const posts = await getMyPosts(req.user.id);

  res.status(200).json({
    success: true,
    data: posts
  });
});

/**
 * Get a single post by ID
 * GET /api/posts/:id
 */
export const getOne = asyncHandler(async (req, res) => {
  const post = await getPostById(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    data: post
  });
});

/**
 * Update a post
 * PUT /api/posts/:id
 */
export const update = asyncHandler(async (req, res) => {
  const post = await updatePost(
    req.params.id,
    req.user.id,
    req.body
  );

  res.status(200).json({
    success: true,
    data: post
  });
});

/**
 * Delete a post
 * DELETE /api/posts/:id
 */
export const remove = asyncHandler(async (req, res) => {
  const result = await deletePost(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    data: result
  });
});
