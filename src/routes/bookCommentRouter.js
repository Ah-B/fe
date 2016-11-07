const express = require('express');
let bookCommentRouter = express.Router();

module.exports = (BookComment) => {
    bookCommentRouter.route('/')
        .post((req, res) => {
            let bookComment = new BookComment(req.body);
            bookComment.save();
            res.status(201).send(bookComment);
        })
        .get(
            (req, res) => {
                let populateQuery = [{
                    path: 'commenter'
                }, {
                    path: 'target'
                }]; //
                // you can use   let query=req.query; see restful ws with node and express jonathan mills
                BookComment.find({}).populate(populateQuery).exec(
                    (err, bookComments) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json(bookComments);
                        }
                    });
            });
    bookCommentRouter.route('/:bookCommentId')
        .get((req, res) => {
            BookComment.findById(req.params.bookCommentId, (err, bookComment) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(bookComment);
                }
            });
        })
        .delete((req, res) => {
            BookComment.findById(req.params.bookCommentId, (err, bookComment) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    bookComment.remove();
                    res.status(500).send('Removed');
                }
            });
        })
    .patch((req, res) => {
        BookComment.findById(req.params.bookCommentId, (err, bookComment) => {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(req.body);
                for (let p in req.body) {
                    bookComment[p] = req.body[p];
                }
                bookComment.save();
                res.status(500).send('patched');

            }
        });
    });

    return bookCommentRouter;
}
