var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
const config = require('config-lite')(__dirname);

const app = express();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./libs/sequelize');

const sequelizeStore = new SequelizeStore({
    db: sequelize
});
sequelizeStore.sync();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: config.cookie.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        expires: config.cookie.expires
    },
    // store: sequelizeStore
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/comment', require('./routes/comment'));
app.use('/users', require('./routes/users'));
app.use('/upload', require('./routes/upload'));
app.use('/portfolio', require('./routes/portfolio'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err);
    // render the error page
    res.status(err.status || 500);
    res.json({
        status: 9000,
        message: '服务器内部错误'
    });
});

module.exports = app;

