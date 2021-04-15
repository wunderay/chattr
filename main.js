const express= require("express"), app = express(),
mongoose = require("mongoose"), router = express.Router(),
methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {useNewUrlParser: true});
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
router.use(express.static("public"));

router.use(methodOverride("_method", {methods: ["POST", "GET"]}));
