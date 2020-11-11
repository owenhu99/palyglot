var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET, returns list of all Users */
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
