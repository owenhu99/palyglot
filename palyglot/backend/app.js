var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const mongoose = require('mongoose');
const User = require('./models/User');
const Room = require('./models/Room');

var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms')

var app = express();

let port = process.env.PORT || 5000;

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter)

mongoose.connect(process.env.MONGODB_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to MongoDB Database!')
);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
});

module.exports = app;
