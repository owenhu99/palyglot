var express = require('express');
var router = express.Router();
const Room = require('../models/Room');
const auth = require('../middleware/auth')

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
