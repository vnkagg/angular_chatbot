const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

var backendposts = [];
var temppostsfromdeletion = [];
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});
app.delete('/api/posts', (req, res, next) => {
  const postID = req.params.id;
  backendposts = backendposts.filter((item) => {item.id!==postID;});

  res.status(201).json({
  message : "this post was deleted successfully from the backend"
  });
});
app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  backendposts.push(post);
  res.status(201).json({
  message : "this post was added successfully from the backend"
  });
});
//DEBUG THIS HOW TO SEND AN INTEGER AS A JSON OBJECT AND DEPARSE IT FROM THERE
app.post('/api/posts', (req, res, next) => {
  console.log(req.body);
  const post = req.body;
  console.log(post);
  (post.api_call === "to_be_deleted")
  ? (() => {temppostsfromdeletion = backendposts.filter((item) => {item.id!==post.id;});
          backendposts = temppostsfromdeletion;
          temppostsfromdeletion = [];
          res.status(201).json({
            message : "this post was deleted successfully from the backend"
          });
        })()
  : (() => {
          backendposts.push(post);
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
