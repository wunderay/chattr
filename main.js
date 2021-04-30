const express= require("express"), app = express(),
mongoose = require("mongoose"), router = express.Router(),
methodOverride = require("method-override"), layouts = require("express-ejs-layouts"),
homeController = require("./controllers/homeController"), 
usersController = require("./controllers/usersController"),
errorController = require("./controllers/errorController"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
passport = require("passport"),
connectFlash = require("connect-flash")
const User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/chattr", {useNewUrlParser: true});
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(
    express.urlencoded({extended: false})
);
router.use(express.json());
router.use(layouts);
router.use(express.static("public"));

router.use(methodOverride("_method", {methods: ["POST", "GET"]}));

//Cookie
router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
      },
    resave: false,
    saveUninitialized: false
 }));
router.use(connectFlash());
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.use('local',User.serializeUser);
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);


router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.User;
    next();
    })


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
