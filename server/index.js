const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

const passportSetup = require("./config/passport-setup");
const authRoute = require("./routes/auth");

const app = express();
const PORT = 5000;

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
app.use(cors());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    method: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
