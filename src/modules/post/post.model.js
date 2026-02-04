import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true
  }
);

// Public feed indexes
postSchema.index({ status: 1 }); // For filtering published posts
postSchema.index({ createdAt: -1 }); // For sorting by creation date
postSchema.index({ status: 1, createdAt: -1 }); // Mongo uses indexes left to right, filter then sort

const Post = mongoose.model("Post", postSchema);

export default Post;
