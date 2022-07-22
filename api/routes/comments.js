const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Posts = require("../routes/posts");
const Comment = require("../models/Comment.js");

// CREATE COMMENTS
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    console.log("hfhfhf");
    console.log(req.body);
    console.log(newComment);
    const savedComment = await newComment.save();
    console.log("hfhfhf22222");
    res.status(200).json(savedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// trial and error

// router.post("/", async (req, res) => {
//   const newComment = new Comment(req.body);
//   try {
//     await newComment.save();
//     console.log(hshshshs);
//     res.status(201).json({
//       status: "Success",
//       data: {
//         newComment,
//       },
//     });
//     console.log(h2222);
//   } catch (err) {
//     res.status(500).json({
//       status: "Failed",
//       message: err,
//     });
//   }
// });

// const comment = new Comment({
//     text: req.body.comment,
//     post: id,
//   });
//   // save comment
//   await comment.save();
//   console.log(hshshshs);
//   // get this particular post
//   const postRelated = await Post.findById(id);
//   // push the comment into the post.comments array
//   postRelated.comments.push(comment);
//   console.log(vjrgbj);
//   // save and redirect...
//   await postRelated.save(function (err) {
//     if (err) {
//       console.log(err);
//     }

//DELETE COMMMENTS
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.username === req.body.username) {
      try {
        await comment.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL COMMENTS
router.get("/", async (req, res) => {
  try {
    const comment = await Comment.find();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET COMMENT BY ID

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //  get comment for specific posts

// router.get("/:id/comment", async (req, res) => {
//   try {
//     const comment = await Post.findById(req.params.id);
//     res.status(200).json(comment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:postid", async (req, res) => {
//   await Comment.find({ postid: req.params.postid }, (err, comments) => {
//     if (err) {
//       res.status(400).json({ error: err });
//     } else {
//       res.json(comments);
//     }
//   });
// });

// //
// router.get("/:id", async (req, res) => {
//   const post = await Article.findOne({ id: req.params.id }).populate(
//     "comments"
//   );
//   const comments = await Comment.find({});
//   res.render("post/show", { post: post, comments: comments });
// });

// post comment using post id

// router.post("/posts/:id/comment", async (req, res) => {
//   // find out which post you are commenting
//   const id = req.params.id;
//   // get the comment text and record post id
//   const comment = new Comment({
//     text: req.body.comment,
//     post: id,
//   });
//   // save comment
//   await comment.save();
//   console.log(hshshshs);
//   // get this particular post
//   const postRelated = await Post.findById(id);
//   // push the comment into the post.comments array
//   postRelated.comments.push(comment);
//   console.log(vjrgbj);
//   // save and redirect...
//   await postRelated.save(function (err) {
//     if (err) {
//       console.log(err);
//     }
//     res.redirect("/");
//   });
// });

// router.post("/do-comment", async (req, res) => {
//   const comment = new Comment({
//     comment: req.body.comment,
//   });
//   await comment.save();
//   await Blog.findOneAndUpdate({ _id: req.body._id }, { $push: { comment } });
//   res.send("Comment was added successfully");
// });

// router.post("/:id/comments/create", async (req, res) => {
//   let postId = req.params.id;
//   if (!mongoose.Types.ObjectId.isValid(postId)) {
//     return res.status(400).send({
//       message: "Invalid post id",
//       data: {},
//     });
//   }
//   Post.findOne({ _id: postId })
//     .then(async (post) => {
//       if (!post) {
//         return res.status(400).send({
//           message: "No post found",
//           data: {},
//         });
//       } else {
//         try {
//           let newCommentDocument = new Comment({
//             comment: req.body.comment,
//             postId: postId,
//           });

//           let commentData = await newCommentDocument.save();

//           await Post.updateOne(
//             { _id: postId },
//             {
//               $push: { comments: commentData._id },
//             }
//           );

//           let query = [
//             {
//               $lookup: {
//                 from: "users",
//                 localField: "user_id",
//                 foreignField: "_id",
//                 as: "user",
//               },
//             },
//             { $unwind: "$user" },
//             {
//               $match: {
//                 _id: mongoose.Types.ObjectId(commentData._id),
//               },
//             },
//           ];

//           let comments = await Comment.aggregate(query);

//           return res.status(200).send({
//             message: "Comment successfully added",
//             data: commentData,
//           });
//         } catch (err) {
//           return res.status(400).send({
//             message: err.message,
//             data: err,
//           });
//         }
//       }
//     })
//     .catch((err) => {
//       return res.status(400).send({
//         message: err.message,
//         data: err,
//       });
//     });
// });
module.exports = router;
