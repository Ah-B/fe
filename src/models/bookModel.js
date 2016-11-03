const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookModel = new Schema({
  title : { type: String },
  author : { type : String},//TODO to be replaced author: {type: Schema.Types.ObjectId, ref:'Author'},
  description : { type : String},
  date : { type: Date },
  genre :{ type : String },
  pdfUrl : { type : String},
  imageUrl : { type : String},
  rating : { type : Number},
  comments : [{type : String}] //TODO to be replaced by comments array
});

module.exports = mongoose.model('Book',bookModel);
