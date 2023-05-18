const express = require("express");
const router = express.Router();
const Post = require('../models/post');

router.put('/:postID', (req, res, next) => {
  const post = new Post({
    _id : req.body.id,
    title : req.body.title,
    content : req.body.content
  });
  Post.updateOne({_id : req.params.postID}, post)
    .then(() => {
      res.status(200).json({
        message : "put request was processed, Post was updated in mongoDB, this is from the json object sent to the postservice."
      });
    });
});
router.post('', (req, res, next) => {
  const post = new Post({
    title : req.body.title,
    content : req.body.content,
  });
  post.save()
    .then((response) => {
      console.log("post added : ", response);
      res.status(201).json({
        message : 'a post was added successfully in the backend',
        id_generated : response._id
      });
    });
});
router.delete('', (req, res, next) =>{
  Post.deleteOne({ _id : req.params.id })
    .then(result => {
      console.log("a post was deleted : ", result);
      res.status(200).json({
        message : "this post was deleted"
      });
    });
});
router.get('', (req, res, next) => {
  Post.find()
    .then((documents) => {
      //console.log("posts were get : ", documents);
      res.status(200).json({
        message : "this is an api response from the backend",
        posts : documents
      });
    });
});
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json({id : post._id, title : post.title, content : post.content});
    }else{
      res.status(404).json({message : "did not find a post with this id"});
    }
  });
});
module.exports = router;
