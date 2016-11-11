var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient,
    dbConfig = require('../../db.js');

module.exports = function() {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function(username, password, done) {
            mongodb.connect(dbConfig.url, function(err, db) {
                let collection = db.collection('users');
                collection.findOne({
                        username: username,
                        password : password
                    },
                    function(err, results) {
                        if (!results) {
                            console.log('User Not Found with username ');
                            return done(err);
                        }
                        if (results.password === password) {
                            var user = results;
                            done(null, user);
                        } else {
                            return done(err);
                        }
                    }
                );
            });
        }));
};
