const express = require('express'),
    isAuthenticated = require('../config/passport/isAuthenticated');
let bookRouter = express.Router();
module.exports = (Book) => {
    let populateQuery = [{
        'path': 'author'
    }, {
        'path': 'comments.commenter'
    }];


    bookRouter.route('/')
        .post((req, res) => {
            let book = new Book(req.body);
            book.save();
            res.status(201).send(book);
        })
        .get((req, res) => {
                /*  //let populateQuery =[{path:'author'}];
                  let populateQuery = [{
                      path: 'author'
                  }, {
                      path: 'comment.user'
                  }]; //
                  // you can use   let query=req.query; see restful ws with node and express jonathan mills
                  */


                Book.find({}).populate(populateQuery).exec(
                    (err, books) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json(books);

                        }
                    });
            });

    bookRouter.route('/:bookId')
        .get((req, res) => {
            Book.findById(req.params.bookId).populate(populateQuery).exec((err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(book);
                }
            });
        })
        .delete((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    book.remove();
                    res.status(500).send('Removed');
                }
            });
        })
        .patch((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(req.body);
                    for (let p in req.body) {
                        book[p] = req.body[p];
                    }
                    console.log(req.body);
                    book.save();
                    res.json(book);
                }
            });
        });
    bookRouter.route('/comment/:bookId/:userId')
        .post((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let comment = {
                        "text": req.body.text,
                        "date": new Date().toISOString(),
                        "commenter": req.params.userId
                    }
                    console.log(req.params);
                    let comments = book.comments;
                    comments.push(comment);
                    book.comment = comments;
                    book.save();
                    res.sendStatus(200);
                }
            });
        });
    bookRouter.route('/rate/:bookId/:userId')
        .post((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let rating = req.body.rating;
                    console.log(req.params);
                    let ratings = book.ratings;
                    ratings.push(rating);
                    book.ratings = ratings;
                    book.save();
                    // res.json({
                    //     "type" : "message",
                    //     "content" : "This book was added successfully in your library"
                    // })


                }
            });
        });

    return bookRouter;
}
