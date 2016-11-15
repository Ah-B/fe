const express = require('express'),
    mongodb = require('mongodb').MongoClient,
    dblink = require('../config/db.js'),
    isAuthenticated = require('../config/passport/isAuthenticated');

let interfaceRouter = express.Router();
let passport = require('passport');



interfaceRouter.get('/', (req, res) => {
  if (req.isAuthenticated()){
    res.render('index');
  } else {
    res.render('homePage');
    }
});


interfaceRouter.route('/auth/signIn')
    .get((req, res) => {
        res.render('signIn');
    })
    .post(passport.authenticate('local', {
        failureRedirect: '/auth/error'
    }), function(req, res) {
        res.redirect('/');
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
                    res.redirect('/');
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



//
// interfaceRouter.route('/profile')
//     .get(isAuthenticated, (req, res) => {
//         //res.json(req.user);
//         res.render('index');
//     });


module.exports = interfaceRouter;
