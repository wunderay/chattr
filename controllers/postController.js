"use strict";
const Post = require("../models/post"), 
    getPostParams = body => {
        return {
            author: body.author,
            text: body.content,
            hashtag: body.hashtag
        };
    };

module.exports = {
    getPostParams,
    index: (req, res, next) => {
        Post.find({})
          .then(posts => {
            res.locals.posts = posts;
            next();
          })
          .catch(error => {
            console.log(`Error fetching posts: ${error.message}`);
            next(error);
          });
      },
      indexView: (req, res) => {
        res.render("posts/index");
      },
    new: (req, res) => {
        res.render("posts/new");
      },
    create: (req, res, next) => {
        let newPost = new Post(getPostParams(req.body));
        Post.create(newPost)
        .then(post => {
            res.locals.redirect = "/posts";
            res.locals.post = post;
            next();
          })
          .catch(error => {
            console.log(`Error saving post: ${error.message}`);
            next();
          });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else res.redirect("/");
      },
    show: (req, res, next) => {
        let postId = req.params.id;
        Post.findById(postId)
          .then(post => {
            res.locals.post = post;
            next();
          })
          .catch(error => {
            console.log(`Error fetching post by ID: ${error.message}`);
            next(error);
          });
      },
    showView: (req, res) => {
        res.render("posts/show");
      },
    search: (req, res) =>{
        let searchString = req.body.search;
        User.find({hashtag: searchString})
        .then(post => {
            res.render("posts/show", {
            post: post
            });
        })
      .catch(error => {
        console.log(`Error fetching post: ${error.message}`);
        next(error);
      });
    }
    
}

