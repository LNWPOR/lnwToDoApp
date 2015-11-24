// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy;

mongoose.connect('mongodb://LNWPOR:lnwpor@ds057204.mongolab.com:57204/lnwtodoapp');
// mongoose.connect('mongodb://LNWPOR:lnwpor@ds051553.mongolab.com:51553/hungry-joe');

// user schema/model
var Users = require('./models/users');

// create instance of express
var app = express();

// define middleware
app.use(logger('dev'));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new localStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

//Cross Origin Request Sharing
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// require routes
var routes = require('./routes/api');
// routes
app.use('/api', routes);

module.exports = app;