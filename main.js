"use strict";

const express = require("express"),
  app = express(),
  router = require("./routes/index"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  passport = require("passport"),
  morgan = require("morgan"),
  User = require("./models/user");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === "test")
  mongoose.connect(
    "mongodb://localhost:27017/chattr",
    { useNewUrlParser: true, useFindAndModify: false }
  );
else
  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/chattr",
    { useNewUrlParser: true, useFindAndModify: false }
  );

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

if (process.env.NODE_ENV === "test") app.set("port", 3001);
else app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.set("token", process.env.TOKEN || "chattrT0k3n");
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

app.use(express.json());
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});
app.use(expressValidator());

app.use("/", router);

const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  }),
  io = require("socket.io")(server);

module.exports = app;
