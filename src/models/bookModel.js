const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookModel = new Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    description: String,
    date: Date,
    genre: String,
    pdfUrl: String,
    imageUrl: String,
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

module.exports = mongoose.model('Book', bookModel);
