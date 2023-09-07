var express = require("express");
const passport = require("passport");
var router = express.Router();
const Post = require("../models/post");

/* GET home page. */
router.get("/", async (req, res) => {
  const posts = await Post.find({}).populate("author").exec();
  posts.forEach((p) => console.log([p.elapsed]));
  res.render("index", { user: req.user, posts });
});

router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

module.exports = router;
