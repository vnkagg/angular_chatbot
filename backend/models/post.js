const mongoose = require('mongoose');

const postschema = mongoose.Schema({
  title : { type : String, require : true },
  content : { type : String, require : true},
});

module.exports = mongoose.model('Post', postschema);
