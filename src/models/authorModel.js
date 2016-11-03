const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let authorModel = new Schema({
  fName : { type: String },
  lName : { type: String },
  birthDate : { type: Date },
  deathDate : { type: Date },
  rating : { type : Number},
  imageUrl : { type : String},
  books: [{
    book : {type: Schema.Types.ObjectId, ref:'Book'}
  }],
  comments : [{type : String}] //TODO to be replaced by comments array
});
module.exports = mongoose.model('Author',authorModel);
