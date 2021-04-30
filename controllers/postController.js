"use strict";
const passport = require("passport");
const Post = require("../models/post"), 
    getPostParams = body => {
        return {
            text: body.text 
        };
    };


