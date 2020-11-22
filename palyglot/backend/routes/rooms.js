var express = require('express');
var router = express.Router();
const Room = require('../models/Room');
const User = require('../models/User')

/* POST, creating a new room */
router.post('/', async(req, res) => {
    try {
        const user1 = await User.findOne({userId: req.body["participants"][0]})
        const user2 = await User.findOne({userId: req.body["participants"][1]})
        const room = new Room(req.body)
        await room.save()
        user1.rooms.push(room["_id"])
        user2.rooms.push(room["_id"])
        res.send({roomId: room["_id"]})
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
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