const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "a random string which should be very long as its sort of a password");
    req.userData = {email : decodedToken.email, userID : decodedToken.id};
    next();
    // this verifies that the encoding was done by the
  } catch (err) {
    res.status(401).json({message : "Auth failed"});
  }
};
