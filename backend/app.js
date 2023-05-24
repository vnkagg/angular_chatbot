const express = require('express');
const app = express();
const mongoose = require('mongoose');

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const auth = require('./middleware/check-auth');

app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers",
//                 "Origin, X-Requested-With, Content-Type, Accept, Authorization, userData");
//   res.setHeader("Access-Control-Allow-Methods",
//                 "GET, POST, PATCH, PUT, DELETE, OPTIONS");
//   next();
// });
app.use(bodyParser.json());
console.log("connecting to the database...");
mongoose.connect("mongodb+srv://vnkaggarwal1:ZWzeRMwib0Ww2Ohv@cluster0.rxww8xk.mongodb.net/my_db?retryWrites=true&w=majority")
  .then(() => {
    console.log("connection successful!");
  })
  .catch(() => {
    console.log("connection failed :(");
  });
app.use("/images", express.static(path.join("backend/images")));
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
// app.use("/auth/local", auth, (req, res, next) => {
//   res.status(200).json({email : req.userData.email, id : req.userData.userID});
// });
app.use("/auth/local", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, userData");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
}, auth, (req, res, next) => {
  res.status(200).json({ email: req.userData.email, id: req.userData.userID });
});
module.exports = app;
