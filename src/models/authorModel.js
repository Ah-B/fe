const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let authorModel = new Schema({
    fName: String,
    lName: String,
    birthDate: Date,
    deathDate: Date,
    rating: Number,
    imageUrl: String/*,
    comments: [{
        text: String,
        commenter: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]*/
});
module.exports = mongoose.model('Author', authorModel);
