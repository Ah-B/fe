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
            (req, res) =>{
              //let populateQuery =[{path:'author'}];
            let populateQuery =[{path:'author'},{path:'comment.user'}];//

            // you can use   let query=req.query; see restful ws with node and express jonathan mills
                Book.find({}).populate(populateQuery).exec(
                    (err, books) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {            console.log(req.body);

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
                    book.save();
                    res.json(book);
                }
            });
        });

    return bookRouter;
}
