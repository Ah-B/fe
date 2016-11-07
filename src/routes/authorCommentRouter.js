const express = require('express');
let authorCommentRouter = express.Router();

module.exports = (AuthorComment) => {
    authorCommentRouter.route('/')
        .post((req, res) => {
            let authorComment = new AuthorComment(req.body);
            authorComment.save();
            res.status(201).send(authorComment);
        })
        .get(
            (req, res) => {
                let populateQuery = [{
                    path: 'commenter'
                }, {
                    path: 'target'
                }];
                AuthorComment.find({}).populate(populateQuery).exec(
                    (err, authorComments) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json(authorComments);
                        }
                    });
            });
    authorCommentRouter.route('/:authorCommentId')
        .get((req, res) => {
            AuthorComment.findById(req.params.authorCommentId, (err, authorComment) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(authorComment);
                }
            });
        })
        .delete((req, res) => {
            AuthorComment.findById(req.params.authorCommentId, (err, authorComment) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    authorComment.remove();
                    res.status(500).send('Removed');
                }
            });
        })
        .patch((req, res) => {
            AuthorComment.findById(req.params.authorCommentId, (err, authorComment) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(req.body);
                    for (let p in req.body) {
                        authorComment[p] = req.body[p];
                    }
                    authorComment.save();
                    res.status(500).send('patched');

                }
            });
        });

    return authorCommentRouter;
}
