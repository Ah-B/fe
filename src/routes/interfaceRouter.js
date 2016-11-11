const express = require('express'),
    mongodb = require('mongodb').MongoClient,
    dblink = require('../config/db.js');
let interfaceRouter = express.Router();
let passport = require('passport');

let isAuthenticated = (req, res, next) => {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}


interfaceRouter.route('/auth/signIn')
    .get((req, res) => {
        res.render('signIn');
    })
    .post(passport.authenticate('local', {
        failureRedirect: '/auth/error'
    }), function(req, res) {
        res.redirect('/profile');
    });


interfaceRouter.route('/auth/signUp')
    .get((req, res) => {
        res.render('signup');
    })
    .post((req, res) => {
        console.log(req.body);
        mongodb.connect(dblink.url, (err, db) => {
            let collection = db.collection('users');
            let user = {
                fName : req.body.fName,
                lName : req.body.lName,
                email : req.body.email,
                adress : req.body.adress,
                birthDate : req.body.birthDate,
                username: req.body.userName,
                password: req.body.password
            };
            collection.insert(user, (err, results) => {
                req.login(results.ops[0], () => {
                    res.redirect('/profile');
                });
            });
        });
    });

interfaceRouter.route('/auth/error')
    .get((req, res) => {
        res.send('error please check check credentials');
    });
interfaceRouter.route('/auth/logout')
    .get((req, res) => {
        req.logout();
        res.redirect('/');
    });

interfaceRouter.get('/', (req, res) => {
    res.send('Helloworld Homepage')
});


interfaceRouter.route('/profile')
    .get(isAuthenticated, (req, res) => {
        res.json(req.user);
    });


module.exports = interfaceRouter;
