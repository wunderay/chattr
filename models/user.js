"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  passportLocalMongoose = require("passport-local-mongoose"),
  userSchema = new Schema(
    {
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
      },
      following: [{type: String}]
    },
    {
      timestamps: true
    }
  );

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function (next) {
  let user = this;
  // if (user.subscribedAccount === undefined) {
  //   Subscriber.findOne({
  //     email: user.email
  //   })
  //     .then(subscriber => {
  //       user.subscribedAccount = subscriber;
  //       next();
  //     })
  //     .catch(error => {
  //       console.log(`Error in connecting subscriber:${error.message}`);
  //       next(error);
  //     });
  // } else {
  //   next();
  // }
});

// userSchema.pre("save", function(next) {
//   let user = this;
//   if (!user.apiToken) user.apiToken = randToken.generate(16);
//   next();
// });

userSchema.plugin(passportLocalMongoose, {
  usernameField: "username"
});

module.exports = mongoose.model("User", userSchema);
