const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookCommentModel = new Schema({
    text: String,
    commenter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
});

module.exports = mongoose.model('BookComment', bookCommentModel);
