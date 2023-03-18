const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/**
 * @route   POST api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  try {
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to request user", error: err });
  }
});

/**
 * @route   POST api/auth/signup
 * @desc    Register a new user : Authenticate user, save user on DB & get token
 * @access  Public
 */

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Failed to register user", error: err });
  }
});

module.exports = router;
