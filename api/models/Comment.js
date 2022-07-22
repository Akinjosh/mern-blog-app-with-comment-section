const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      // required: false,
      // unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
