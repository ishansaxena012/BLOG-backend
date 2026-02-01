import  asyncHandler  from "../../utils/asyncHandler.js";
import {
  fetchPublicPosts,
  fetchPublicPostById,
} from "./post.service.js";

export const getPublicPosts = asyncHandler(async (req, res) => {
  const posts = await fetchPublicPosts(req.query);

  res.status(200).json({
    data: posts.data,
    meta: posts.meta,
  });
});

export const getPublicPostById = asyncHandler(async (req, res) => {
  const post = await fetchPublicPostById(req.params.id);

  res.status(200).json({
    data: post,
  });
});
