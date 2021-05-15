"use strict";

const mongoose = require("mongoose"),

//User = require("./user"),
postSchema = new mongoose.Schema({
    author: {type: String}, //{ type: Schema.Types.ObjectId, ref: User},
    text: {
        type: String
    },
    hashtag: {type: String}
},
    {
        timestamps: true
      },
);
//mongoose.Schema.index({'$**': 'text'}); //index all strings

module.exports = mongoose.model("Post", postSchema);
