const express = require('express'),
    mongodb = require('mongodb').MongoClient,
    dblink = require('../config/db.js'),
    isAuthenticated = require('../config/passport/isAuthenticated'),
    paypal = require('paypal-rest-sdk'),
    User = require('../models/userModel');

let interfaceRouter = express.Router();
let passport = require('passport');



//Paypal Api config
let config = {
    'mode': 'sandbox',
    "client_id": "ASMtmV0jHVXdMyPx8htHHqJSO49RSzrvRO2nt5kn-wOjzET3IUq763q9LNwSWbjxIJkli8qrMq2xI7hZ", // your paypal application client id
    "client_secret": "EHSMuUjfEs6T6rLbVDOuiaNZ043obf1RhksR_b6kl6nh4xOnMRT-ZFJKE8awR28FwnmbnkTizmlCkRhv" // your paypal application secret id
}
paypal.configure(config);

interfaceRouter.post('/paypal/pay', (req, res) => {

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/paypal/success",
            "cancel_url": "http://localhost:3000/paypal/cancel"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "20.00"
            },
            "description": "Booker premium account "
        }]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            for (var index = 0; index < payment.links.length; index++) {
                //Redirect user to this endpoint for redirect url
                if (payment.links[index].rel === 'approval_url') {
                    redirectUrl = payment.links[index].href
                    res.redirect(redirectUrl);
                }
            }

        }
    });
});

interfaceRouter.get('/paypal/success', function(req, res) {

    var execute_payment_json = {
        "payer_id": req.query.PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "20.00"
            }
        }]
    };
    var paymentId = req.query.paymentId;

    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
        }
    });
    console.log("***********************************************", req.user._id);
    User.findById(req.user._id, (err, user) => {
        user.type = "premium";
        user.save();
        res.render('profile', {
            currentUser: req.user._id
        });
    });


});


interfaceRouter.get('/', (req, res) => {
    if (req.isAuthenticated() && req.user.type == "admin") {
        res.render('admin/users');
    } else if (req.isAuthenticated()) {
        res.render('main', {
            currentUser: req.user._id
        });
    } else {
        res.render('homePage');
    }
});



interfaceRouter.get('/genres', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('genres');
    } else {
        res.render('homePage');
    }
});

interfaceRouter.get('/bookGenres/:genre', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('booksGenre', {
            genre: req.params.genre
        });
    } else {
        res.render('homePage');
    }
});


interfaceRouter.get('/stats', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('stats', {
            currentUser: req.user._id
        });
    } else {
        res.render('homePage');
    }
});

interfaceRouter.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('profile', {
            currentUser: req.user._id
        });
    } else {
        res.render('homePage');
    }
});
interfaceRouter.get('/libbook/:bookId/:currentPage', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('libBook', {
            currentUser: req.user._id,
            libbook: req.params.bookId,
            currentPage: req.params.currentPage
        });
    } else {
        res.render('homePage');
    }
});
interfaceRouter.get('/authors', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('authors', {
            currentUser: req.user._id
        });
    } else {
        res.render('homePage');
    }
});
interfaceRouter.get('/author/:authorId', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('author', {
            query: req.params.authorId,
            currentUser: req.user._id,
            userFName: req.user.fName,
            userLName: req.user.lName,
            userAvatar: req.user.avatar
        });
    } else {
        res.render('homePage');
    }
});

interfaceRouter.get('/books', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('books', {
            currentUser: req.user._id
        });
    } else {
        res.render('homePage');
    }
});

interfaceRouter.get('/book/:bookId', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('book', {
            query: req.params.bookId,
            currentUser: req.user._id,
            userFName: req.user.fName,
            userLName: req.user.lName,
            userType: req.user.type,
            userAvatar: req.user.avatar
        });
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



interfaceRouter.route('/admin/comments')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/comments');
        } else {
            res.redirect('/');
        }
    });

interfaceRouter.route('/admin/users')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/users');
        } else {
            res.redirect('/');
        }
    });
interfaceRouter.route('/admin/user/add')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/addUser');
        } else {
            res.redirect('/');
        }
    });

interfaceRouter.get('/admin/user/stats/:id', (req, res) => {
    if (req.isAuthenticated() && req.user.type == "admin") {
        res.render('admin/stats', {
            currentUser: req.params.id
        });
    } else {
        res.render('/');
    }
});
interfaceRouter.route('/admin/user/:id')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/updateUser', {
                userId: req.params.id
            });
        } else {
            res.redirect('/');
        }
    })



interfaceRouter.route('/admin/authors')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/authors');
        } else {
            res.redirect('/');
        }
    });
interfaceRouter.route('/admin/author/add')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/addAuthor');
        } else {
            res.redirect('/');
        }
    });
interfaceRouter.route('/admin/author/:id')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/updateAuthor', {
                authorId: req.params.id
            });
        } else {
            res.redirect('/');
        }
    })


interfaceRouter.route('/admin/books')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/books');
        } else {
            res.redirect('/');
        }
    });
interfaceRouter.route('/admin/book/add')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/addBook');
        } else {
            res.redirect('/');
        }
    });
interfaceRouter.route('/admin/book/:id')
    .get((req, res) => {
        if (req.isAuthenticated() && req.user.type == "admin") {
            res.render('admin/updateBook', {
                bookId: req.params.id
            });
        } else {
            res.redirect('/');
        }
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
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                adress: req.body.adress,
                birthDate: req.body.birthDate,
                username: req.body.userName,
                password: req.body.password,
                avatar: "default.png",
                type: "free"
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


module.exports = interfaceRouter;
