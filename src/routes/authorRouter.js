const express = require('express');
let authorRouter = express.Router();

module.exports = (Author) => {
    authorRouter.route('/')
        .post((req, res) => {
            let author = new Author(req.body);
            author.save();
            res.status(201).send(author);
        })
        .get((req, res) => {
          let populateQuery = [{
            'path':'books',
              }, {
                'path': 'ratings.rater',
              }, {
                  'path': 'comments.commenter'
              }];
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
        .get((req, res) => {
            Author.findById(req.params.authorId, (err, author) => {
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
                    res.status(500).send('Removed');
                }
            });
        })
        .patch((req, res) => {
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
        .patch((req, res) => {
            Author.findById(req.params.authorId, (err, author) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    let comment = {
                        "text": req.body.text,
                        "date": req.body.date,
                        "commenter": req.params.userId
                    }
                    console.log(req.params);
                    let comments = author.comment;
                    comments.push(comment);
                    author.comment = comments;
                    author.save();
                    res.json(author);
                }
            });
        });

    return authorRouter;
}
