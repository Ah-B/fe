const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let authorModel = new Schema({
    fName: String,
    lName: String,
    birthDate: Date,
    deathDate: Date,
    rating: Number,
    imageUrl: String,
    comments: [{
            type: String
        }] //TODO to be replaced by comments array
});
module.exports = mongoose.model('Author', authorModel);
