const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config({ path: "./.env" });

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "318937775166-sqilb37ujm415ffk0dfmvhftdvpdla5h.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: `/auth/google/callback`,
    },

    // Callback function that executes when a user is authenticated
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// Configure Passport to serialize and deserialize user instances
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
