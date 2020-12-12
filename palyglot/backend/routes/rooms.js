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
            throw new Error("Current user not found")
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

/* GET, get room by room _id and auth token*/
router.get('/:roomId', auth, async(req, res) => {
    try {
        const room = await Room.findOne({_id: req.params.roomId})
        if (!room.participants.includes(req.userId)) {
            res.status(403).send('Unauthorized')
        }
        // Get
        var secondUser;
        if (room.participants[0] == req.userId) {
            secondUser = room.participants[1]
        } else {
            secondUser = room.participants[0]
        }
        const user = await User.findOne({userId: secondUser})
        if (!user) throw new Error("Second user not found")
        res.send({room, user})
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

/* FOR DEV PURPOSES, TO BE REMOVED FOR DEPLOYMENT */
// router.delete('/:roomId', async(req, res) => {
//     try {
//         const room = await Room.findOneAndDelete({_id: req.params.roomId})
//         const participants = room["participants"]
//         for (var i = 0; i < participants.length; i++) {
//             await User.findOneAndUpdate(
//                 {userId: participants[i]},
//                 { $pull: {rooms: req.params.roomId}}
//             )
//         }
//         res.send()
//     } catch (error) {
//         console.log(error)
//         res.status(400).send(error)
//     }
// })

module.exports = router;