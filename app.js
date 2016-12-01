const express = require('express'),
    bodyParser = require('body-parser'),
    dbConfig = require('./src/config/db'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    engine = require('ejs-mate'),
    socket = require('socket.io'),
    port = process.env.PORT || 3000;


const app = express();
app.use(express.static('public'));



//SOCKET IO CHAT
let server = require('http').createServer(app);
let io = socket(server);
let numUsers = 0;
let users = [];

io.on('connection', function(socket) {


    socket.on('subscribe', function(data) {
        numUsers++;
        users.push(data.userName);
        console.log(users);
        console.log("users count ", numUsers);
        console.log("User " + data.userName + " has joined room " + data.room);
        //io.sockets.in(data.room).emit('message', users, numUsers);
        socket.join(data.room);
        io.sockets.in(data.room).emit('joined', data.userName, users, numUsers);

    })
    socket.on('send', function(data) {
        console.log('sending message');
        io.sockets.in(data.room).emit('message', data);
    });

    socket.on('unsubscribe', function(data) {
        numUsers--;
        let index = users.indexOf(data.userName);
        if (index > -1) {
            users.splice(index, 1);
        }
        console.log("users count ", numUsers);
        io.sockets.in(data.room).emit('leaving', data, numUsers);
        socket.leave(data.room);
    })

    socket.on('focusIn', function(data) {
        console.log("focusin");
        io.sockets.in(data.room).emit('writing', data)
        console.log(data.userName + "is writing");
    })


    socket.on('focusOut', function(data) {
        io.sockets.emit('stopWriting');
    })
    socket.on('focusIn', function(data) {
        console.log("focusin");
        io.sockets.in(data.room).emit('writing', data)
        console.log(data.userName + "is writing");
    })

});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());




mongoose.connect(dbConfig.url);



//AUTHENTICATION
app.engine('ejs', engine);

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







server.listen(port, () => {
    console.log("Running on port " + port);

})
