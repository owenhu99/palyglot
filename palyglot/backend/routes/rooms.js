var express = require('express');
var router = express.Router();
const Room = require('../models/Room');
const User = require('../models/User')

/* POST, creating a new room */
router.post('/', async(req, res) => {
    try {
        if (await Room.findOne({participants: req.body["participants"]})) {
            res.status(400).send({error: "room already exists"})
            return
        }
        await User.findOne({userId: req.body["participants"][0]})
        await User.findOne({userId: req.body["participants"][1]})
        const room = new Room(req.body)
        await room.save()
        await User.findOneAndUpdate(
            { userId: req.body["participants"][0] },
            { $addToSet: { rooms: room["_id"] } }
        )
        await User.findOneAndUpdate(
            { userId: req.body["participants"][1] },
            { $addToSet: { rooms: room["_id"] } }
        )
        res.send({roomId: room["_id"]})
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

/* DELETE, delete a room */
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

/* GET, get all rooms */
router.get('/', async(req, res) => {
    try {
		const rooms = await Room.find();
		res.json(rooms);
	} catch (err) {
		res.json(err);
	}
})

/* [TEMPORARY] GET, get room by room _id */
router.get('/:roomId', async(req, res) => {
    try {
        const room = await Room.findOne({_id: req.params.roomId})
        res.send(room)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router;