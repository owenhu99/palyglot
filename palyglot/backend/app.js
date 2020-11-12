var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const User = require('./models/User');
const Room = require('./models/Room');
const Message = require('./models/Message');

var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');

var app = express();

let port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb+srv://admin:palyglot@cluster0.xr9zt.mongodb.net/Cluster0?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to MongoDB Database!')
);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
});

module.exports = app;
