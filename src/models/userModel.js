const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userModel = new Schema({
  fName : String,
  lName : String,
  birthDate : Date,
  adress : String,
  signDate : Date,
  password : String,
  //TODO reading habits will be an object array containing {date:date,pageRead:number}

});

module.exports = mongoose.model('User', userModel);
