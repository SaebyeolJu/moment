const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Frame = require("../models/Frame");

const { uploadToGCS, upload } = require("../config/storage");

// get a list of all frames
// GET /api/frames

router.get("/", async (req, res) => {
  try {
    const user = await User.findById();
    const frames = await Frame.find({});
    res.json(frames);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET /api/frames/:frameId
router.get("/:frameId", async (req, res) => {
  const { frameId } = req.params;

  try {
    const frames = await Frame.findOne({ frameId });
    if (!frame) {
      return res.status(404).json({ message: "Frame not found" });
    }
    res.json(frames);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// frame 작성
// POST /api/frames/post
router.post(
  "/post",
  upload.fields([{ name: "medalUrl" }, { name: "photoUrls" }]),
  async (req, res) => {
    try {
      const {
        userId,
        username,
        frameId,
        title,
        caption,
        date,
        location,
        frameType,
        tags,
      } = req.body;

      console.log(req.body);
      const medal = req.files.medalUrl[0];
      const photos = req.files.photoUrls;

      const medalUrl = medal ? await uploadToGCS(medal) : undefined;
      const photoUrls =
        photos && photos.length > 0
          ? await Promise.all(photos.map((photo) => uploadToGCS(photo)))
          : [];

      const frame = new Frame({
        userId,
        username,
        frameId,
        title,
        medalUrl,
        photoUrls,
        caption,
        date,
        location,
        frameType,
        likes: { totalLikes: 0, userLikes: [] },
        comments: [],
        tags: [],
      });

      const savedFrame = await frame.save();
      res.json(savedFrame);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// frame 삭제 API endpoint
// DELETE /api/frames/:frameId
router.delete("/:id", async (req, res) => {
  const frameId = req.params.id;
  try {
    const deletedFrame = await Frame.findByIdAndDelete(frameId);
    if (!deletedFrame) {
      return res.status(404).json({ message: "Frame not found" });
    }
    res.json(deletedFrame);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// frame 수정 API endpoint
// PUT /api/frames/:frameId
router.put("/:frameId", async (req, res) => {
  const frameId = req.params.id;
  const {
    title,
    medalUrl,
    imageUrl,
    caption,
    date,
    location,
    frameType,
    tags,
  } = req.body;

  try {
    const frame = await Frames.findOne({ _id: frameId });
    if (!frame) {
      return res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
    }

    // 게시물 내용을 업데이트합니다.
    frame.title = title || frame.title;
    frame.medalUrl = medalUrl || frame.medalUrl;
    frame.caption = caption || frame.caption;
    frame.date = date || frame.date;
    frame.frameType = frameType || frame.frameType;
    frame.photoUrl = imageUrl || frame.photoUrl;
    frame.location = location || frame.location;
    frame.tags = tags || frame.tags;

    const updatedFrame = await frame.save();
    res.json(updatedFrame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
