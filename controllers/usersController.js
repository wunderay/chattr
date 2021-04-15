"use strict";

const User = require("../models/user");

module.exports = {
    loginView: (req, res) => {
        res.render("login");
    },
    new: (req, res) => {
        res.render("signup");
    },
    create: (req, res, next) => {
        let newuser = new User({
            name: {
                first: req.body.first,
                last: req.body.last
            },
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender,
            location: req.body.location,
            dob: req.body.dob,
            security: {
                question: req.body.secQ,
                last: req.body.txtSecQ
            },
            bio: req.body.bio,

        });
        User.create(newuser)
        .then( user => {
            res.locals.user = user;
            res.locals.redirect = "home";
            next();
        })
        .catch(error => {
            console.log(`Error saving: ${error.message}`);
            next(error);
        })
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