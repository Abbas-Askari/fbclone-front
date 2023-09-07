const Post = require("../models/post");

const router = require("express").Router();

router.get("/create", (req, res, next) => {
  res.render("posts-create", { title: "New Post" });
});

router.post("/create", async (req, res, next) => {
  // console.log(req.user);
  const post = Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user,
    date: new Date(),
  });
  const result = await post.save();
  res.redirect("/");
});

router.get("/:postId/update", async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  res.render("posts-create", { title: "Update post", post });
});

router.post("/:postId/update", async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.postId, {
    title: req.body.title,
    content: req.body.content,
  });
  res.redirect("/");
});

router.get("/:postId/delete", async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.postId);
  res.redirect("/");
});

module.exports = router;
