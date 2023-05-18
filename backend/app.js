const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const postsRoutes = require('./routes/posts')
const mongoose = require('mongoose');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, PUT, DELETE, OPTIONS");
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

app.use("/api/posts", postsRoutes);
module.exports = app;
