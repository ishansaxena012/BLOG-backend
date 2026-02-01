import { Router } from "express";
import {
  getPublicPosts,
  getPublicPostById,
} from "./post.public.controller.js";

const router = Router();

// Public feed
router.get("/public", getPublicPosts);

// Single public post
router.get("/public/:id", getPublicPostById);

export default router;
