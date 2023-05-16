const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/post');
const mongoose = require('mongoose');

var backendposts = []; // i need globally
var temppostsfromdeletion = []; // i dont need globally
var c =[];
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});
// how to send just an integer as json?

app.use(bodyParser.json());
mongoose.connect("mongodb+srv://vnkaggarwal1:ZWzeRMwib0Ww2Ohv@cluster0.rxww8xk.mongodb.net/my_db?retryWrites=true&w=majority")
  .then(() => {
    console.log("connection to the database : successful");
  })
  .catch(() => {
    console.log("connection to the database : failed");
  });

app.post('/api/posts', (req, res, next) => {
  // post = req.body;
  const post = Post({
    title : req.body.title,
    content : req.body.content
  });
  post.save();
  console.log(post);
  (post.api_call === "to_be_deleted")
  ? (() =>  {
          backendposts = backendposts.filter((item) => item.id!==post.id); // there is no {} in the arrow function to evaluate a condition
          console.log("a post is deleted from the backend, there are total of ", backendposts.length, " number of posts");
          res.status(201).json({
            message : "this post was deleted successfully from the backend"
          });
        })()
  : (() => {
          post.api_call = 'this_post_is_in_the_backend';
          backendposts.push(post);
          console.log("new post added in the backend, there are total of ", backendposts.length, " number of posts");
          res.status(201).json({
            message : "this post was added successfully in the backend"
          });
        })()
});
app.get('/api/posts', (req, res, next) => {
  res.status(200).json({
    message : "this is an api response from the backend",
    posts : backendposts
  });
});

module.exports = app;
