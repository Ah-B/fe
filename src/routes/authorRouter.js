const express = require('express'),
    isAuthenticated = require('../config/passport/isAuthenticated');
let authorRouter = express.Router();

module.exports = (Author) => {
    let populateQuery = [{
        'path': 'books',
    }, {
        'path': 'comments.commenter'
    }];
    authorRouter.route('/')
        .post((req, res) => {
            let author = new Author(req.body);
            author.save();
            res.status(201).send(author);
        })
        .get(isAuthenticated, (req, res) => {
            Author.find({}).populate(populateQuery).exec(
                (err, authors) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(authors);
                    }
                });
        });
    authorRouter.route('/:authorId')
        .get(isAuthenticated, (req, res) => {
            Author.findById(req.params.authorId).populate(populateQuery).exec((err, author) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(author);
                }
            });
        })
        .delete((req, res) => {
            Author.findById(req.params.authorId, (err, author) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    author.remove();
                    res.sendStatus(200);
                }
            });
        })
        .post((req, res) => {
            Author.findById(req.params.authorId, (err, author) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    for (let p in req.body) {
                        /*  Patching an array of books
                        if(p=="books"){
                            let bookList = author.books;
                            let addition = {
                              "book" : req.body.book
                            }
                            bookList.push(addition);
                          }
                          else {*/
                          author[p] = req.body[p];
                        //}
                    }
                    author.save();
                    res.json(author);
                }
            });
        });

    authorRouter.route('/comment/:authorId/:userId')
        .post((req, res) => {
            Author.findById(req.params.authorId, (err, author) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let comment = {
                        "text": req.body.text,
                        "date": new Date().toISOString(),
                        "commenter": req.params.userId
                    }
                    console.log(req.params);
                    let comments = author.comments;
                    comments.push(comment);
                    author.comments = comments;
                    author.save();
                    res.sendStatus(200)
                }
            });
        });

        authorRouter.route('/comment/:commentId')
            .delete((req, res) => {
                Author.find({}).populate(populateQuery).exec(
                    (err, authors) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            var comments = [];
                            for (author of authors) {
                                for (comment of author.comments) {
                                    if (comment._id != req.params.commentId) {
                                        comments.push(comment);
                                    }
                                    author.comments = [];
                                    author.comments = comments
                                    author.save();
                                }
                            }
                            res.sendStatus(200);
                        }
                    })
            });
    authorRouter.route('/rate/:authorId/:userId')
        .post((req, res) => {
            Author.findById(req.params.authorId, (err, author) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let unique = true;
                    for (ratingData of author.ratings) {
                        if (ratingData.rater == req.params.userId) {
                            unique = false;
                        }
                    }
                    if (unique === true) {
                        let ratings = author.ratings;
                        let newRating = {
                            "rating": req.body.rating,
                            "rater": req.params.userId
                        };
                        ratings.push(newRating);
                        author.ratings = ratings;
                        author.save();
                        res.json({
                            "type": "successMessage",
                            "content": "This author was rated successfully"
                        });
                    } else {
                        res.json({
                            "type": "errorMessage",
                            "content": "You can rate an author only once"
                        });
                    }
                }
            });
        });

    return authorRouter;
}
