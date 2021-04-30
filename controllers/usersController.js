"use strict";
const passport = require("passport");
const User = require("../models/user"), 
    getUserParams = body => {
        return {
            name: {
                first: body.firstName,
                last: body.lastName
            },
            username: body.username,
            password: body.password,
            email: body.email,
            gender: body.gender,
            location: body.location,
            dob: body.dob,
            security: {
                question: body.secQ,
                answer: body.txtSecQ
            },
            bio: body.bio,
        };
    };

module.exports = {
    loginView: (req, res) => {
        res.render("login");
    },
    new: (req, res) => {
        res.render("signup");
    },
    create: (req, res, next) => {

        let userParams = getUserParams(req.body);

        let newuser = new User({userParams});

        console.log(newuser.name.first);
        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", "User account has been successfully created!");
                res.locals.redirect= "/users";
                next();
            }
            else{
                req.flash("error", `failed to creat user account: ${error.message}`);
                res.locals.redirect = "/users/new"; 
                next();
            }
        });
    },
    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
            }).trim();
          req.check("email", "Email is invalid").isEmail();
          req.check("zipCode", "Zip code is invalid")
        .notEmpty().isInt().isLength({
            min: 5,
            max: 5
          }).equals(req.body.zipCode);
          req.check("password", "Password cannot be empty").notEmpty();
        
          req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
              let messages = error.array().map(e => e.msg);
              req.skip = true;
              req.flash("error", messages.join(" and "));
              res.locals.redirect = "/users/new";
              next();
            } else {
              next();
            }
          });
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
      }),
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    home: (req, res, next) =>{
        res.render("home");
    }
}