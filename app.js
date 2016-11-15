const express = require('express'),
bodyParser = require('body-parser'),
dbConfig = require('./src/config/db'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
passport = require('passport'),
mongoose = require('mongoose'),
port = process.env.PORT || 3000;


const app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());




mongoose.connect(dbConfig.url);



//AUTHENTICATION

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'library',
    name: 'libCookie',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./src/config/passport/passport')(app);
const rootRouter = require('./src/routes/rootRouter.js')(app);







app.listen(port, () => {
    console.log("Running on port " + port);

})
