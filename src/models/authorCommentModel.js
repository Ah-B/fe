const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AuthorCommentModel = new Schema({
    text: String,
    commenter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
});

module.exports = mongoose.model('AuthorComment', AuthorCommentModel);
