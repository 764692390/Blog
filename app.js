var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var RedisStore = require('connect-redis')(session)
var MongoStore = require('connect-mongo')(session);
var config = require('./config.js');
var index = require('./routes/index');
var admin = require('./routes/admin');
var api = require('./routes/api');
var db = require('./db/db.js');
var Tool = require('./tool/tool.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mongodb存储session
app.use(cookieParser('session'));
app.use(session({
    secret: 'session',
    resave: true,
    cookie: { maxAge: 30000 * 60 },
    saveUninitialized: true,
    store: new MongoStore({
        url: DB_URL
    })
}));

//Redus存储session
// app.use(cookieParser());
// app.use(session({
//     secret: 'test',
//     store: new RedisStore({
//         host: '127.0.0.1',
//         port: 6379
//     }),
//     resave: true,
//     saveUninitialized: true
// }))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', admin);
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;