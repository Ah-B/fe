const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let authorModel = new Schema({
    fName: String,
    lName: String,
    birthDate: String,
    deathDate: String,
    imageUrl: String,
    imageUrlBig : String,
    description : String,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'

    }],
    ratings: [{
        rating: Number,
        rater: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    comments: [{
        text: String,
        date: Date,
        commenter: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});
module.exports = mongoose.model('Author', authorModel);
