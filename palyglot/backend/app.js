var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const mongoose = require('mongoose');
const User = require('./models/User');
const Room = require('./models/Room');
const Pusher = require('pusher');

var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');
var messagesRouter = require('./routes/messages');

var app = express();

let port = process.env.PORT || 5000;

const pusher = new Pusher({
    appId: "1111301",
    key: "a4e914a09d88628d31df",
    secret: "41cfd5478b78016dbbb7",
    cluster: "us2",
    useTLS: true
  });

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/messages', messagesRouter);

mongoose.connect(process.env.MONGODB_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to MongoDB Database!')
);

const db = mongoose.connection;

db.once('open', () => {
    console.log("DB connected");

    let filter = [{
        $match: {
            $and: [
                {"updateDescription.updatedFields.messages": {$exists: true}},
                {operationType: "update"}
            ]
        }
    }];

    let options = { fullDocument: 'updateLookup'};
    db.collection('rooms').watch(filter, options).on('change', (change) => {
        console.log("A change occurred.");
        console.log(change);
        const roomDetails = change.fullDocument;
        // pusher.trigger('messages', 'inserted', {
        // })
    })
})

app.listen(port, () => {
	console.log(`Server is listening on port ${port}.`);
});

module.exports = app;
