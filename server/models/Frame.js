const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  totalLikes: { type: Number, default: 0 },
  userLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const commentsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String, ref: "User", required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const frameSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true,
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    medalUrl: {
      type: String,
      required: true,
    },
    photoUrls: [
      {
        type: String,
        required: false,
      },
    ],
    caption: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    frameType: {
      type: String,
      required: true,
    },
    likes: likeSchema,
    comments: [commentsSchema],
    tags: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

frameSchema.pre("save", function (next) {
  this.tags = this.tags.map((tag) => tag.toLowerCase().trim());
  next();
});

commentsSchema.pre("save", function (next) {
  this.totalComments = this.comments.length;
  next();
});

commentsSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update && update.comments) {
    this.totalComments = update.comments.length;
  }
  next();
});

const Frame = mongoose.model("Frame", frameSchema);

module.exports = Frame;
