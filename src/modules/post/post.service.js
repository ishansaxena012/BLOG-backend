import Post from "./post.model.js";
import ApiError from "../../utils/ApiError.js";
import { normalizePublicFeedQuery } from "./post.public.utils.js";


// Create a new post (defaults to draft)
export const createPost = async (userId, postData) => {
  const post = await Post.create({
    ...postData,
    author: userId
  });

  return post;
};

// Get all posts of logged-in user
export const getMyPosts = async (userId) => {
  const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });
  return posts;
};

// Get a single post by ID (owner only)
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

// Update a post (owner only)
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

//  Delete a post (owner only)
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


export const fetchPublicPosts = async (query) => {
  const { page, limit, search } = normalizePublicFeedQuery(query);
  const skip = (page - 1) * limit;

  // Base filter: ONLY published posts
  const filter = {
    status: "published",
  };

  // Optional search
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("author", "username name -_id")
    .select("title slug excerpt author createdAt")
    .lean(); // Get plain JS objects

  const hasNextPage = posts.length === limit;

  return {
    data: posts.map(formatPublicPost),
    meta: {
      page,
      limit,
      hasNextPage,
    },
  };
};

export const fetchPublicPostById = async (id) => {
  const post = await Post.findOne({
    _id: id,
    status: "published",
  })
    .populate("author", "username name -_id")
    .select("title content author createdAt")
    .lean();

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return formatPublicPost(post, true);
};

const formatPublicPost = (post, full = false) => {
  const base = {
    id: post._id,
    title: post.title,
    author: post.author,
    createdAt: post.createdAt,
  };

  if (full) {
    base.content = post.content;
  } else {
    base.slug = post.slug;
    base.excerpt = post.excerpt;
  }

  return base;
};
