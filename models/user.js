const passportLocalMongoose = require("passport-local-mongoose");


const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
userSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
            trim: true
        },
        last: {
            type: String,
            required: true,
            trim: true
        }
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    security: {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    },
    bio: {
        type: String
    }

})
const User = mongoose.model("User", userSchema);

userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.first}`;
});

userSchema.pre("save", function(next) {
    let user = this;
    User.findOne({
        username: user.username
    })
    .then(exist => {
        if(exist)
            //throw ReferenceError;
            console.log(exist);
        else{
            next();
        }
    })
    .catch(error => {
        console.log(`Error registering user. Username ${user.name} is already taken`);
        next(error);
    })
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
