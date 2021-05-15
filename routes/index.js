"use strict";

const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes"),
  postRoutes = require("./postRoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
