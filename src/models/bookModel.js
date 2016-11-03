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
    rating: Number,
    comments: [{
        text: String,
        commenter: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]

});

module.exports = mongoose.model('Book', bookModel);
