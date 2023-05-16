const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/post');
const mongoose = require('mongoose');

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
  const post = Post({
    title : req.body.title,
    content : req.body.content,
  });
  post.save()
    .then(() => {
      res.status(201).json({
        message : 'a post was added successfully in the backend'
      });
    });
  console.log(post);
});
app.delete('/api/posts/:id', (req, res, next) =>{
  Post.deleteOne({ _id : req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message : "this post was deleted"
      });
    });
});
app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message : "this is an api response from the backend",
        posts : documents
      });
    });
});

module.exports = app;
