const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userModel = new Schema({
    fName: String,
    lName: String,
    birthDate: Date,
    email: String,
    username: String,
    adress: String,
    signDate: Date,
    password: String,
    library: [{
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        },
        lastPage: Number,
        lastReadDate: Date
    }],
    habits: [{
        date: Date,
        pagesRead: Number
    }]
});

module.exports = mongoose.model('User', userModel);
