const mongoose = require("mongoose"),
{ Schema } = require("mongoose"),
userSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    username: {
        type: String,
        required: true
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

userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.first}`;
});

userSchema.pre("save", function(next) {
    let user = this;
    User.exists({
        username: user.username
    })
    .then(exist => {
        if(exist)
            throw ReferenceError;
        else{
            next();
        }
    })
    .catch(error => {
        console.log(`Error registering user. Username ${user.name} is already taken`);
        next(error);
    })
})

module.exports = mongoose.model("User", userSchema);