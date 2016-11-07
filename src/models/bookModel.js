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
    rating: Number
});

module.exports = mongoose.model('Book', bookModel);
