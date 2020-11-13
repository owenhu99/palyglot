var express = require('express');
var router = express.Router();
const Message = require('../models/Message');

/* GET, returns list of all messages for given room, room ID must be passed
in the request with the room parameter */
router.get("/", async (req, res) => {
	try {
		const messages = await Message.find({to: req.query.room});
		res.json(messages);
	} catch (err) {
		res.json(err);
	}
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