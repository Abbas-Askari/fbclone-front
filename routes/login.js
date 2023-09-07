const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");

router.get("/", (req, res, next) => {
  console.log({ messages: req.session.messages });
  res.render("login", { title: "hello" });
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

router.get("/signup", (req, res, next) => {
  res.render("login", { title: "hello", creating: true });
});

router.post("/signup", [
  body("username")
    .trim()
    .custom(async (username) => {
      if ((await User.findOne({ username }).exec()) != null) {
        throw new Error("Thrown: In use");
      }
      return true;
    })
    .withMessage("Username Already exists.")
    .isAlpha()
    .withMessage("Username must only contain letters.")
    .isLength({ min: 4 })
    .withMessage("Username Needs to be of minimum length 4."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password needs to be of mininum length 8")
    .isAlphanumeric()
    .withMessage("Password must contain letters and numbers."),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("login", {
        title: "Sign Up",
        creating: true,
        errors: errors.array(),
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      });
      return;
    }

    const userExisting = await User.findOne({
      username: req.body.username,
    }).exec();

    const newUser = User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    });
    const result = await newUser.save();
    return res.render("login", { title: "Login" });
  },
]);

module.exports = router;
