const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });

        // 이미 가입되어 있는 사용자인지 확인
        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await newUser.save();
          done(null, newUser);
        }
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);

// Configure Passport to serialize and deserialize user instances
// User 객체를 어떻게 저장할지 정의
passport.serializeUser((user, done) => {
  done(null, user);
});

// 세션에 저장된 user 정보를 불러와 user 객체로 전환하는 역할
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
