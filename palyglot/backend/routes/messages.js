var express = require('express');
var router = express.Router();
const Message = require('../models/Message');

/* GET, uses pagination to return at most 30 of the most recent messages in the 
room. Room ID must be passed in the request with the room parameter. 
The messages returned must have been sent before the date in the beforeDate
parameter. */
router.get("/", async (req, res) => {
	await Message.find({to: req.query.room, date: 
		{"$lt": new Date(req.query.beforeDate)}})
	.sort('-date').limit(30)
	.exec((err, docs) => {
		if (err) return res.json(err);
		return res.json(docs);
	})
});

/* POST, add a new message to the database */
router.post("/", (req, res) => {
	const message = new Message(req.body);

	message
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json({ message: err });
		});
});

module.exports = router;
