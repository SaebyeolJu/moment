const router = require("express").Router();
const passport = require("passport");

require("dotenv").config({ path: "../config/.env" });

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      token: req.user.accessToken,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "user has not been authenticated",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

// define a route to start the Google OAuth 2.0 flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/dashboard`,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })
);

module.exports = router;
