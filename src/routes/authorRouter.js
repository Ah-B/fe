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
  // you can use   let query=req.query; see restful ws with node and express jonathan mills
        //let populateQuery =[{path:'comments.commenter'}];//
        //Author.find({}).populate(populateQuery).exec(
        Author.find({}).exec(
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
                        author[p] = req.body[p];
                    }
                    author.save();
                    res.json(author);
                }
            });
        });

    return authorRouter;
}
