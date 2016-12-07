const express = require('express'),
    mongodb = require('mongodb').MongoClient,
    dblink = require('../config/db.js'),
    isAuthenticated = require('../config/passport/isAuthenticated');
let interfaceRouter = express.Router();
let passport = require('passport');



interfaceRouter.route('/signIn')
    .get((req, res) => {
        res.render('signIn');
    })
    .post(passport.authenticate('local', {
        failureRedirect: '/auth/error'
    }), function(req, res) {
        res.redirect('/profile');
    });


interfaceRouter.route('/signUp')
    .get((req,res)=>{
      res.render('signup');
    })
    .post((req, res) => {
        //console.log("test");
        // mongodb.connect(dblink.url, (err, db) => {
        //     let collection = db.collection('user');
        //     console.log(collection);
        //     let user = {
        //         username: req.body.userName,
        //         password: req.body.password,
        //         type : req.body.type
        //     };
        //
        //
        //     collection.insert(user, (err, results) => {
        //         req.login(results.ops[0], () => {
        //         res.redirect('/profile');
        //         });
        //     });
        // });
    });

interfaceRouter.route('/error')
    .get((req, res) => {
        res.send('error please check check credentials');
    });
interfaceRouter.route('/logout')
    .get((req, res) => {
        req.logout();
        res.redirect('/');
    });
