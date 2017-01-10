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
    type: String,
    avatar : String,
    library: [{
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        },
        lastPage: Number,
        lastReadDate: String,
        time : Number
    }],
    habits: [{
        time: Number,
        pagesRead: Number,
        date : String
    }]
});

module.exports = mongoose.model('User', userModel);
