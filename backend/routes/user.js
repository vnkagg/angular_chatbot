const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email : req.body.email,
        password : hash
      });
      user.save()
        .then(response => {
          console.log("user created : ", response);
          res.status(201).json({
            message : "user created!"
          });
        })
        .catch(err => {
          console.log("error received in routes/user.js. post req /signup, after user.save() : ", err);
          res.status(401).json({
            message : "error received in routes/user.js"
          });
        });
    });
});
router.post('/login', (req, res, next) => {
  let fetcheduser;
  //if credentials are valid -> generate jwt
  User.findOne({email : req.body.email})
  .then(user => {
    fetcheduser = user;
    console.log("user login req. User : ", user);
    if(!user){
      return res.status(404).json({
        message : "auth failed"
      });
    }
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    console.log('result : ', result);
    if(!result){
      return res.status(401).json({
        message : "auth failed"
      });
    }
    //generate jwt
    const token = jwt.sign(
      {email: fetcheduser.email, id : fetcheduser._id},
      "a random string which should be very long as its sort of a password", //a_random_string_which_should_be_very_long_its_sort_of_a_password
      {expiresIn : "1h"}
    );
    res.status(201).json({
      token : token,
      userid : fetcheduser._id
    });
  }).catch(err => {
    console.log(err);
    res.status(401).json({
      message : "auth failed"
    });
  })

});
module.exports = router;
