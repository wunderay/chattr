const express= require("express"), app = express(),
mongoose = require("mongoose"), router = express.Router(),
methodOverride = require("method-override"), layouts = require("express-ejs-layouts"),
homeController = require("./controllers/homeController"), 
usersController = require("./controllers/usersController"),
errorController = require("./controllers/errorController");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {useNewUrlParser: true});
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(
    express.urlencoded({extnded: false})
);
router.use(express.json());
router.use(layouts);
router.use(express.static("public"));

router.use(methodOverride("_method", {methods: ["POST", "GET"]}));

router.get("/", homeController.index);

//routes
router.get("/login", usersController.loginView);
router.get("/signup", usersController.new);
router.get("/home", usersController.new);
router.post("/signup", usersController.create, usersController.redirectView);

//Errors
router.use(errorController.pageNotFoundError );
router.use(errorController.internalServerError );

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: $ ${app.get("port")}`)
    router.post("/users/create", usersController.create, usersController.redirectView);
});
