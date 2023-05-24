const express = require("express");
const router = express.Router();
const Post = require('../models/post'); //
const mime_type_map = {  //
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
}
const checkAuth = require('../middleware/check-auth');
const multer = require('multer'); //
const storage = multer.diskStorage({   //
  destination : (req, file, cb) => {
    const isValid = mime_type_map[file.mimetype];
    let err = new Error("invalid mime type");
    if(isValid){
      err = null;
    }
    cb(err, './backend/images');
  },
  filename : (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = mime_type_map[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post('', checkAuth, multer({storage : storage}).single("image"), (req, res, next) => {
  // console.log("add post request is reaching the backend, the router.post() method starts executing");
  // console.log("this is the request received by it : ", req);
  const url = req.protocol + "://" + req.get('host');
  const post = new Post({
    title : req.body.title,
    content : req.body.content,
    imagePath : url + '/images/' + req.file.filename,
    creator : req.userData.userID
  });
  // console.log("this is the post = new Post that was created : ", post);
  // console.log("post.save() should run now")
  post.save()
    .then((response) => {
      console.log("post added : ", response);
      res.status(201).json({
        message : 'a post was added successfully in the backend',
        id_generated : response._id,
        imagePath : response.imagePath
      });
    });
});
router.put('/:postID', checkAuth, multer({storage : storage}).single("image"), (req, res, next) => {
  let imagePath;
  if(req.file){
    const url = req.protocol + "://" + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  } else {
    imagePath = req.body.imagePath;
  }
  const post = new Post({
    _id : req.params.postID,
    title : req.body.title,
    content : req.body.content,
    imagePath : imagePath,
    creator : req.userData.userID
  });
  Post.updateOne({_id : req.params.postID, creator : req.userData.userID}, post)
    .then(() => {
      res.status(200).json({
        message : "put request was processed, Post was updated in mongoDB, this is from the json object sent to the postservice."
      });
    });
});
router.delete('/:id', checkAuth, (req, res, next) =>{
  Post.deleteOne({ _id : req.params.id, creator : req.userData.userID })
    .then(result => {
      console.log("a post was deleted : ", result);
      res.status(200).json({
        message : "this post was deleted"
      });
    });
});


// const fs = require('fs');
// app.delete('/files/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filePath = `images/${filename}`;
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Failed to delete file' });
//     }

//     return res.status(200).json({ message: 'File deleted successfully' });
//   });
// });


router.get('', (req, res, next) => {
  const querySearch = Post.find();
  const page = +req.query.page;
  const items = +req.query.items;
  let fetched_docs;
  if (page && items){
    querySearch
      .skip(items * (page-1))
        .limit(items);
        // .then((documents) => {
        //   res.status(200).json({
        //     message: 'response against the query',
        //     posts : documents
        //   });
        // });
  }
  querySearch
    .then((documents) => {
      // console.log("posts were get : ", documents);
      this.fetched_docs = documents;
      return Post.count()})
      .then((count) =>{
        // console.log("count : ", count);
        res.status(200).json({
          message : "this is an api response from the backend",
          posts : this.fetched_docs,
          total : count
        });
      });
    });
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json({id : post._id, title : post.title, content : post.content, imagePath : post.imagePath});
    }else{
      res.status(404).json({message : "did not find a post with this id"});
    }
  });
});
module.exports = router;
