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

    // OAuth 인증에서는 JWT대신, Access Token과 Refresh Token이 사용. Access Token은 사용자를 인증하고 권한 부여에 사용되며, Refresh Token은 Access Token의 만료 시간이 지난 경우 새로운 Access Token을 발급하는 데 사용
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
