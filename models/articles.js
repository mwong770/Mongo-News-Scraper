
// dependency
var mongoose = require('mongoose');

//creates Schema class
var Schema = mongoose.Schema;

// create Articles schema
var ArticlesSchema = new Schema ({
  title: {
    type: String,
    required: true,
    index: { unique: true }
  },
  source: {
    type: String,
  },
  teaser: {
    type: String,
  },
  link: {
    type: String,
  },
  img: {
    type: String,
  },
  saved: {
    type: Boolean,
    default: false
  },
  comments: {
    // saves one comment's ObjectID
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }
});

// creates Articles model
var Articles = mongoose.model("Articles", ArticlesSchema);

// exports Articles model
module.exports = Articles;
