const express = require('express'),
    mongodb = require('mongodb').MongoClient,
    dblink = require('../config/db.js'),
    isAuthenticated = require('../config/passport/isAuthenticated'),
    User = require('../models/userModel');

let desktopInterfaceRouter = express.Router();
let passport = require('passport');




desktopInterfaceRouter.route('/')
    .get((req, res) => {
        res.render('desktop/signIn');
    });
desktopInterfaceRouter.route('/auth/signIn')
    .get((req, res) => {
        res.render('signIn');
    })
    .post(passport.authenticate('local', {
        failureRedirect: '/auth/error'
    }), function(req, res) {
        res.redirect('/profile');
    });

desktopInterfaceRouter.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('desktop/profile', {
            currentUser: req.user._id
        });
    } else {
        res.render('homePage');
    }
});
desktopInterfaceRouter.get('/libbook/:bookId/:currentPage', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('desktop/libBook', {
            currentUser: req.user._id,
            libbook: req.params.bookId,
            currentPage: req.params.currentPage
        });
    } else {
        res.render('homePage');
    }
})

// desktopInterfaceRouter.get('/genres', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('genres');
//     } else {
//         res.render('homePage');
//     }
// });
// desktopInterfaceRouter.get('/bookGenres/:genre', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('booksGenre',{
//             genre: req.params.genre
//         });
//     } else {
//         res.render('homePage');
//     }
// });
// desktopInterfaceRouter.get('/stats', (req, res) => {
//   if (req.isAuthenticated()) {
//       res.render('stats', {
//           currentUser: req.user._id
//       });
//   } else {
//       res.render('homePage');
//   }
// });
// desktopInterfaceRouter.get('/libbook/:bookId/:currentPage', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('libBook', {
//             currentUser: req.user._id,
//             libbook : req.params.bookId,
//             currentPage : req.params.currentPage
//         });
//     } else {
//         res.render('homePage');
//     }
// });
// desktopInterfaceRouter.get('/authors', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('authors', {
//             currentUser: req.user._id
//         });
//     } else {
//         res.render('homePage');
//     }
// });
// desktopInterfaceRouter.get('/author/:authorId', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('author', {
//             query: req.params.authorId,
//             currentUser: req.user._id,
//             userFName: req.user.fName,
//             userLName: req.user.lName
//         });
//     } else {
//         res.render('homePage');
//     }
// });
// desktopInterfaceRouter.get('/books', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('books', {
//             currentUser: req.user._id
//         });
//     } else {
//         res.render('homePage');
//     }
// });
// desktopInterfaceRouter.get('/book/:bookId', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('book', {
//             query: req.params.bookId,
//             currentUser: req.user._id,
//             userFName: req.user.fName,
//             userLName: req.user.lName,
//             userType: req.user.type
//         });
//     } else {
//         res.render('homePage');
//     }
// });



// desktopInterfaceRouter.get('/', (req, res) => {
//         if (req.isAuthenticated()) {
//             res.render('desktop/profile', {
//                 currentUser: req.user._id
//             });
//         } else {
//             res.render('homePage');
//         }
//     });

// desktopInterfaceRouter.route('/auth/signUp')
//     .get((req, res) => {
//         res.render('signup');
//     })
//     .post((req, res) => {
//         console.log(req.body);
//         mongodb.connect(dblink.url, (err, db) => {
//             let collection = db.collection('users');
//             let user = {
//                 fName: req.body.fName,
//                 lName: req.body.lName,
//                 email: req.body.email,
//                 adress: req.body.adress,
//                 birthDate: req.body.birthDate,
//                 username: req.body.userName,
//                 password: req.body.password,
//                 type : "free"
//             };
//             collection.insert(user, (err, results) => {
//                 req.login(results.ops[0], () => {
//                     res.redirect('/');
//                 });
//             });
//         });
//     });
// desktopInterfaceRouter.route('/auth/error')
//     .get((req, res) => {
//         res.send('error please check check credentials');
//     });
// desktopInterfaceRouter.route('/auth/logout')
//     .get((req, res) => {
//         req.logout();
//         res.redirect('/');
//     });


module.exports = desktopInterfaceRouter;
