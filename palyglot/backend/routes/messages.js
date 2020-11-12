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

module.exports = router;