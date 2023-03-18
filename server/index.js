const connectDB = require("./config/db.js");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

const passportSetup = require("./config/passport-setup");
const googleAuthRoute = require("./routes/googleAuth");
const authRoute = require("./routes/auth");

const app = express();
const PORT = 5000;

connectDB();

app.use(
  cookieSession({
    name: "session",
    keys: ["secret-key"],
    maxAge: 60 * 60 * 1000, // 1시간
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/auth", authRoute);
app.use("/auth", googleAuthRoute);

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
