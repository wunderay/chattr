"use strict";
const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
User = require("./user"),
postSchema = mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref: User},
    text: {
        type: String
    },
    image: {
        type: Image
    },
    likes: {
        type: Number
    },
    shares: {
        type: Number
    }}, 
    {
        timestamps: true
      },
)