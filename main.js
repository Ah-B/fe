const {app, BrowserWindow,Menu} = require('electron');
const path = require('path');
const url = require('url');
const  bodyParser = require('body-parser'),
    dbConfig = require('./src/config/db'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    engine = require('ejs-mate'),
    socket = require('socket.io'),
    port = process.env.PORT || 3000;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;


var express = require('express');
var backEnd = express();
backEnd.use(express.static('public'));
mongoose.connect(dbConfig.url);
backEnd.engine('ejs', engine);
backEnd.set('views', './src/views');
backEnd.set('view engine', 'ejs');
backEnd.use(bodyParser.urlencoded({
    extended: true
}));

backEnd.use(bodyParser.json());
backEnd.use(cookieParser());
backEnd.use(session({
    secret: 'library',
    name: 'libCookie',
    resave: true,
    saveUninitialized: true
}));
backEnd.use(passport.initialize());
backEnd.use(passport.session());

require('./src/config/passport/passport')(backEnd);
const rootRouter = require('./src/routes/desktopRootRouter.js')(backEnd);

const template = [];

function createWindow () {


backEnd.get('/', function (req, res) {
  res.send('Hello express!');
});

backEnd.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

  win = new BrowserWindow({fullscreen:false})
  win.loadURL('http://localhost:3000/');
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
