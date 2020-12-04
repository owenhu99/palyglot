var express = require('express');
var router = express.Router();
const Room = require('../models/Room');
const User = require('../models/User')
const auth = require('../middleware/auth')

/* POST, creating a new room */
router.post('/', auth, async(req, res) => {
    try {
        const targetUserId = req.body["targetUserId"]
        // check that current user exists
        if (!await User.findOne({userId: req.userId})) 
            throw new Error()
        // check that target user exists
        if (!await User.findOne({userId: targetUserId}))
            return res.status(400).send({error: "invalid userId"})
        // check if a room already exists
        if (await Room.findOne({
            $or: [
                { participants: [targetUserId, req.userId] },
                { participants: [req.userId, targetUserId] }
            ]
        })) return res.status(400).send({error: "room already exists"})
        // add new room
        const room = new Room({"participants": [req.userId, targetUserId]})
        await room.save()
        await User.findOneAndUpdate(
            { userId: req.userId },
            { $addToSet: { rooms: room["_id"] } }
        )
        await User.findOneAndUpdate(
            { userId: targetUserId },
            { $addToSet: { rooms: room["_id"] } }
        )
        res.send(room)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

/* To be implemented: unmatch two users*/

/* FOR DEV PURPOSES, TO BE REMOVED FOR DEPLOYMENT */
router.delete('/:roomId', async(req, res) => {
    try {
        const room = await Room.findOneAndDelete({_id: req.params.roomId})
        const participants = room["participants"]
        for (var i = 0; i < participants.length; i++) {
            await User.findOneAndUpdate(
                {userId: participants[i]},
                { $pull: {rooms: req.params.roomId}}
            )
        }
        res.send()
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

/* FOR DEV PURPOSES, TO BE REMOVED FOR DEPLOYMENT */
router.get('/', async(req, res) => {
    try {
		const rooms = await Room.find();
		res.json(rooms);
	} catch (err) {
		res.json(err);
	}
})

module.exports = router;