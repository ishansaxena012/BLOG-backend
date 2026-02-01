import Post from "./post.model.js";
import ApiError from "../../utils/ApiError.js";

/**
 * Create a new post (defaults to draft)
 */
export const createPost = async (userId, postData) => {
  const post = await Post.create({
    ...postData,
    author: userId
  });

  return post;
};

/**
 * Get all posts of logged-in user
 */
export const getMyPosts = async (userId) => {
  const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });
  return posts;
};

/**
 * Get a single post by ID (owner only)
 */
export const getPostById = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to access this post");
  }

  return post;
};

/**
 * Update a post (owner only)
 */
export const updatePost = async (postId, userId, updateData) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to update this post");
  }

  Object.assign(post, updateData);
  await post.save();

  return post;
};

/**
 * Delete a post (owner only)
 */
export const deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to delete this post");
  }

  await post.deleteOne();

  return { message: "Post deleted successfully" };
};
