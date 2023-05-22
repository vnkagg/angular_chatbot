const express = require('express');
const app = express();
const mongoose = require('mongoose');

const path = require('path');
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());
console.log("connecting to the database...")
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
module.exports = app;
