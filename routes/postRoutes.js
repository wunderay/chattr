"use strict";

const router = require("express").Router(),
  postContoller = require("../controllers/postController");

router.get("", postContoller.index, postContoller.indexView);
router.get("/new", postContoller.new);
router.post("/create", postContoller.create, postContoller.index, postContoller.indexView);
router.get("/:id", postContoller.show, postContoller.showView);

module.exports = router;
