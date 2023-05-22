const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "a random string which should be very long as its sort of a password");
    next();
    // this verifies that the encoding was done by the
  } catch (err) {
    res.status(401).json({message : "Auth failed"});
  }
};
