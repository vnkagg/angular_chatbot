const mongoose = require('mongoose');

const postschema = mongoose.Schema({
  title : { type : String, require : true },
  content : { type : String, require : true},
  imagePath : {type : String, require : true},
  creator : {type : mongoose.Schema.Types.ObjectId, ref: 'User', required : true}
});

module.exports = mongoose.model('Post', postschema);
