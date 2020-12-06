var express = require('express');
var router = express.Router();
const Room = require('../models/Room');
const auth = require('../middleware/auth')


/* GET, uses pagination to return at most 30 of the most recent messages in the 
room. Room ID must be passed in the request with the room parameter. 
The messages returned must have been sent before the date in the beforeDate
parameter. */

// router.get("/", async (req, res) => {
// 	await Message.find({to: req.query.room, date: 
// 		{"$lt": new Date(req.query.beforeDate)}})
// 	.sort('-date').limit(30)
// 	.exec((err, docs) => {
// 		if (err) return res.json(err);
// 		return res.json(docs);
// 	})
// });

/* get all of the stored messages for a room */
router.get("/", auth, async (req, res) => {
	let roomId = req.query.roomId;
	await Room.findOne({_id: roomId}).exec((err, room) => {
		if (err) return res.json(err);
		if (room === null) {
			return res.json({"error": "room could not be found"}, 404)
		}
		if (!room.participants.includes(req.userId)) {
			return res.status(403).send('Unauthorized')
		}
		let messages = room.messages;
		messages.sort(function(a,b) {
			return new Date(a.date) - new Date(b.date);
		})
		return res.json(messages);
	});
})
/* POST, add a new message to the room */
router.post("/", auth, async (req, res) => {
	const message = {
		text: req.body['text'],
		date: new Date(Date.now()),
		from: req.body['from'],
		to: req.body['to']
	};

	let roomId = req.body['roomId'];
	await Room.findOne({_id: roomId}).exec((err, room) => {
		if (err) return res.json(err);
		if (room === null) {
			return res.json({"error": "room could not be found"}, 404)
		}
		if (!room.participants.includes(req.userId)) {
			return res.status(403).send('Unauthorized')
		}
		room.messages.push(message);
		room.save();
		res.json({msg: "success"});
	})
});

module.exports = router;