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
  const { userId, password } = req.body;

  const user = await User.findOne({ userId });

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

    const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET, {
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
    const { userId, password } = req.body;

    let user = await User.findOne({ userId });

    if (user) {
      return res.status(400).json({
        success: false,
        errorCode: "USER_ALREADY_EXISTS",
        errorMessage: "User with the provided userId already exists.",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      userId,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorCode: "REGISTRATION_FAILED",
      errorMessage: "Failed to register user. Please try again later.",
    });
  }
});

module.exports = router;
