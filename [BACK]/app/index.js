const express = require('express');
const passport = require('passport');
require('./passport');
const path = require('path');
require('dotenv').config();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const { format, loggers, transports } = require('winston');
// app.js

var cors = require('cors')

const app = express();
app.use(cors());

var io = socketIo();
app.io = io;
app.set('socketio', io);


loggers.add('my-logger', {
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.level} (${info.timestamp}) : ${info.message}`)
    ),
    transports: [new transports.Console()]
});


// Middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var users = [];

/*app.io.on( "connection", function( socket )
{
    console.log( "A user connected" );
    socket.on('setUserId', function (userId) {
        users[userId]=socket;
        app.set('usersSocket', users);
    });
    socket.on('send notification', function (userId) { //=> /survey/validate/
        users[userId].emit('notification', "important notification message");
    });

});
*/


const routes = require('./routes/router');
//TODO Remove line below
app.use('/', routes);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', routes);

app.get('/*', function (req, res) {
    console.log(express.static('public'));
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});


module.exports = app;

