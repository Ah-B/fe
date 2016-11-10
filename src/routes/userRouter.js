const express = require('express');
let userRouter = express.Router();

module.exports = (User) => {
    userRouter.route('/')
        .post((req, res) => {
            let user = new User(req.body);
            user.save();
            res.status(201).send(user);
        })
        .get((req, res) => {
            User.find((err, users) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(users);

                }
            });
        });
    userRouter.route('/:userId')
        .get((req, res) => {
            User.findById(req.params.userId, (err, user) => {
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

    return userRouter;
}
