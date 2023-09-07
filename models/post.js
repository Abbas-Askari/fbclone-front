const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  downVoters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  upVoters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

PostSchema.virtual("votes").get(function () {
  return this.upVoters.length - this.downVoters.length;
});

PostSchema.virtual("elapsed").get(function () {
  if (!this.date) return ``;
  const duration = DateTime.fromJSDate(new Date())
    .diff(DateTime.fromJSDate(this.date), [
      "month",
      "weeks",
      "days",
      "hour",
      "minutes",
      "seconds",
    ])
    .toObject();

  const key = Object.keys(duration).find((key) => duration[key] >= 1);
  if (key) return Math.floor(duration[key]) + " " + key.replace("s", "(s)");
  else return "Just Now";
});
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
