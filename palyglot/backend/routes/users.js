var express = require('express');
var router = express.Router();
const User = require('../models/User');
// const auth = require('../middleware/auth');

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
		res.status(400).send(error)
	}
})

/* [TEMPORARY] GET, return user details by userId */
router.get('/:userId', async(req, res) => {
	console.log(req.params.userId)
	try {
		const user = await User.findOne({userId: req.params.userId})
		res.send(user)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
})

/* [TEMPORARY] PUT, update user details by userId */
router.put('/:userId', async(req, res) => {
	console.log(req.params.userId)
	try {
		const user = await User.findOneAndUpdate({userId: req.params.userId}, req.body)
		res.send(user)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
})

// /* GET, return logged in user pofile */
// router.get('/me', auth, async(req, res) => {
// 	res.send(req.user)
// })

// /* DELETE, delete user */
// router.delete('/me', auth, async(req, res) => {
// 	try {
// 		await req.user.remove()
// 		res.send()
// 	} catch (error) {
// 		res.status(500).send(error)
// 	}
// })

// /* POST, log out a user */
// router.post('/me/logout', auth, async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token != req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// /* POST, log out a user from all devices */
// router.post('/me/logoutall', auth, async(req, res) => {
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length)
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

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