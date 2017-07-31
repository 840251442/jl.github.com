var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/user');
var film = require('./routes/film');
var studio = require('./routes/studio');
var schedu = require('./routes/schedu');
var ticket = require('./routes/ticket');
var seat= require('./routes/seat');
var session = require('express-session');
var app = express(); 

app.use(bodyParser.json()); //加载解析json中间件
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'sessiontest',
  name: 'sessionId',
  cookie: {maxAge: 18000}
}));
//路由控制器
app.use('/user', users);
app.use('/film', film);
app.use('/studio',studio);
app.use('/schedu',schedu);
app.use('/seat',seat);
app.use('/ticket',ticket);
var uniResult = {
    Result: false,
    Detail: null
};

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    uniResult.Detail = 'NOT_FOUND';
    res.end(JSON.stringify(uniResult));
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    uniResult.Detail = err.message;
    res.end(JSON.stringify(uniResult));
});

module.exports = app;
