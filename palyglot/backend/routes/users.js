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

/* POST, create a new user */
router.post("/", async (req, res) => {
	try {
		const user = new User(req.body)
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
})

/* POST, log in a user */
router.post('/login', async(req, res) => {
    try {
		const { email, password } = req.body
		const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
		}
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
		console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router;

/**
 * Source citation:
 * https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express
 * -mongodb-rest-apis-2019-ad14ec818122
 */