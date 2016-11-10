const express = require('express');
let bookRouter = express.Router();

module.exports = (Book) => {
    bookRouter.route('/')
        .post((req, res) => {
            let book = new Book(req.body);
            book.save();
            res.status(201).send(book);
        })
        .get(
            (req, res) => {
                /*  //let populateQuery =[{path:'author'}];
                  let populateQuery = [{
                      path: 'author'
                  }, {
                      path: 'comment.user'
                  }]; //
                  // you can use   let query=req.query; see restful ws with node and express jonathan mills
                  */
                let populateQuery = [{
                        'path': 'author'
                    }, {
                        'path': 'ratings.rater'
                    }, {
                        'path': 'comments.commenter'
                    }];

                    Book.find().populate(populateQuery).exec(
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
            Book.findById(req.params.bookId, (err, book) => {
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
        .patch((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let comment = {
                        "text": req.body.text,
                        "date": req.body.date,
                        "commenter": req.params.userId
                    }
                    console.log(req.params);
                    let comments = book.comment;
                    comments.push(comment);
                    book.comment = comments;
                    book.save();
                    res.json(book);
                }
            });
        });
    bookRouter.route('/rate/:bookId/:userId')
        .patch((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                  //unique ratings
                    for (rater of book.ratings) {
                        //  if (rater.)
                    }

                    let rating = {
                        "rate": req.body.rate,
                        "rater": req.params.userId
                    }
                    console.log(req.body);
                    let rates = book.rating;
                    rates.push(rating);
                    book.rating = rates;
                    book.save();
                    res.json(book);
                }
            });
        });

    return bookRouter;
}
