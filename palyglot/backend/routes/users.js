var express = require('express');
var router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

/* FOR DEV PURPOSES, TO BE REMOVED FOR DEPLOYMENT */
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		return res.json(users);
	} catch (err) {
		return res.json(err);
	}
});

/* FOR DEV PURPOSES, TO BE REMOVED FOR DEPLOYMENT */
router.post("/", async (req, res) => {
	try {
		const user = new User(req.body)
		await user.save()
		return res.status(201).send(user)
	} catch (error) {
		return res.status(400).send(error)
	}
})

// dev
router.put("/updateInterests", async (req, res) => {
	try {
		const user = await User.findOneAndUpdate({ userId: req.body.userId }, { "interests": req.body.interests });
		return res.send(user);
	} catch (err) {
		res.status(400).send(err);
	}
})

/* PUT, update current user details */
router.put('/me', auth, async (req, res) => {
	try {
		const user = await User.findOneAndUpdate({ userId: req.userId }, req.body, { new: true })
		if (!user) throw new Error("current user not found")
		return res.send(user)
	} catch (error) {
		console.log(error)
		return res.status(400).send(error)
	}
})

/* GET, return logged in user pofile */
router.get('/me', auth, async (req, res) => {
	try {
		const user = await User.findOne({ userId: req.userId })
		if (!user) throw new Error("current user not found")
		res.send(user)
	} catch (error) {
		console.log(error)
		return res.status(400).send(error)
	}
})

/* DELETE, delete current user */
router.delete('/me', auth, async (req, res) => {
	try {
		const user = await User.findOneAndDelete({ userId: req.userId });
		if (!user) throw new Error("current user not found")
		res.send(user)
	} catch (error) {
		res.status(500).send(error)
	}
})

router.get('/getUsers', auth, async (req, res) => {
	try {
		const users = await User.find({ userId: { $in: req.body.users } });
		return res.send(users);
	} catch (err) {
		return res.status(400).send(err);
	}
})

module.exports = router;

/**
 * Source citation:
 * https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express
 * -mongodb-rest-apis-2019-ad14ec818122
 */