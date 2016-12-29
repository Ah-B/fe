const express = require('express'),
    isAuthenticated = require('../config/passport/isAuthenticated');

let userRouter = express.Router();

module.exports = (User) => {
    let populateQuery = [{
        'path': 'library.book'
    }];
    userRouter.route('/')
        .post((req, res) => {
            let user = new User(req.body);
            user.save();
            res.status(201).send(user);
        })
        .get(isAuthenticated, (req, res) => {
            User.find({}).populate(populateQuery).exec((err, users) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(users);
                }
            });
        });
    userRouter.route('/:userId')
        .get(isAuthenticated, (req, res) => {
            User.findById(req.params.userId).populate(populateQuery).exec((err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(user);
                }
            });
        })
        .delete((req, res) => {
            User.findById(req.params.userId, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    user.remove();
                    res.status(500).send('Removed');
                }
            });
        })
        .patch((req, res) => {
            User.findById(req.params.userId, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    for (let p in req.body) {
                        user[p] = req.body[p];
                    }
                    user.save();
                    res.json(user);
                }
            });
        });
    //Add a new book to personal library
    userRouter.route('/addToLibrary/:userId/:bookId')
        .post((req, res) => {
            User.findById(req.params.userId, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let unique = true;
                    for (book of user.library) {
                        if (book.book == req.params.bookId) {
                            unique = false;
                            console.log(unique);
                        }
                    }
                    if (unique === true) {
                        let entry = {
                            "book": req.params.bookId,
                            "lastPage": 1,
                            "lastReadDate": new Date()
                        }
                        user.library.push(entry);
                        user.save();
                        res.json({
                            "type" : "successMessage",
                            "content" : "This book was added successfully in your personal library"
                        })
                    } else {
                        res.json({
                            "type" : "errorMessage",
                            "content" : "This book is already in you personal library"
                        })
                    }
                }
            });
        });
    //add Library data last read and date
    userRouter.route('/addLibraryData/:userId/:bookId')
        .post((req, res) => {
            User.findById(req.params.userId, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    for (lib of user.library) {
                        if (lib.book == req.params.bookId) {
                            lib.lastPage = req.body.lastPage;
                            lib.lastReadDate = req.body.lastReadDate;
                            user.save();
                            res.sendStatus(200);
                        }
                    }
                }
            });
        });
    //add habit
    userRouter.route('/addHabit/:userId')
        .post((req, res) => {
            User.findById(req.params.userId, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let habitData = {
                        "time": req.body.time,
                        "pagesRead": req.body.pagesRead,
                        "date" : req.body.date
                    };
                    user.habits.push(habitData);
                    user.save();
                    res.sendStatus(200);
                }
            });
        });
    return userRouter;
}
