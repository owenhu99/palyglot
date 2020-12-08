var express = require('express');
const Room = require('../models/Room');
var router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth')

/* GET, returns list of all possible new matches for the current user. 
 * Sorting parameters must be passed in the request body and 
 * sortType must be passed in the request query. */
router.get("/", auth, async (req, res) => {

        // match users with same target language first, sort by interests
        // match target language of request with known languages of users next,
        // sort by number of common interests. append to the first query results.
        try {
                const user = await User.findOne({ userId: req.userId });
                if (!user) throw new Error("current user not found");
                const target_languages = user.targetLanguages;
                const interests = user.interests;

                // match users who have the same target languages as the current
                // user.
                const arr1 =
                        await User.find({
                                $and: [{
                                        targetLanguages: {
                                                $elemMatch: { $in: target_languages }
                                        }
                                },
                                // only match users who haven't already matched
                                // with the current user. leave out users who
                                // have already sent a match request to the 
                                // current user.
                                { userId: { $nin: user.matches } },
                                { userId: { $nin: user.matchInvites } },
                                { userId: { $nin: user.sentMatches } },
                                { userId: { $nin: [req.userId] } }
                                ]
                        });
                
                const users_with_same_target_langs = arr1
                        .sort((doc1, doc2) => {
                                // sort the matches by the number of matching
                                // interests.
                                let i1 = [];
                                let i2 = [];
                                if (Array.isArray(doc1.interests)) {
                                        i1 = doc1.interests;
                                }
                                if (Array.isArray(doc2.interests)) {
                                        i2 = doc2.interests;
                                }
                                let num_common_arr1 = countCommonArrayElements(
                                        interests, i1);
                                let num_common_arr2 = countCommonArrayElements(
                                        interests, i2);
                                return num_common_arr2 - num_common_arr1;
                        });

                // match users who know the languages that the current user is 
                // learning. These take less priority over people who have the 
                // same target language as the current user.
                const arr2 =
                        await User.find({
                                $and: [{
                                        knownLanguages: {
                                                $elemMatch: { $in: target_languages }
                                        }
                                },
                                { userId: { $nin: user.matches } },
                                { userId: { $nin: user.matchInvites } },
                                { userId: { $nin: user.sentMatches } },
                                { userId: { $nin: [req.userId] } }
                                ]
                        });

                const users_with_same_known_langs = arr2
                        .sort((doc1, doc2) => {
                                // sort the matches by the number of matching
                                // interests.
                                let i1 = [];
                                let i2 = [];
                                if (Array.isArray(doc1.interests)) {
                                        i1 = doc1.interests;
                                }
                                if (Array.isArray(doc2.interests)) {
                                        i2 = doc2.interests;
                                }
                                let num_common_arr1 = countCommonArrayElements(
                                        interests, i1);
                                let num_common_arr2 = countCommonArrayElements(
                                        interests, i2);
                                return num_common_arr2 - num_common_arr1;
                        });

                const matches = users_with_same_target_langs.concat(
                        users_with_same_known_langs
                );

                console.log(matches.length);
                return res.json({ matches: matches });
        } catch (err) {
                return res.status(400).send(err);
        }

});

router.post("/requestMatch", auth, async (req, res) => {
        try {
                const fromUser = await User.findOne({ userId: req.userId });
                if (!fromUser) throw new Error("current user not found");
                const toUserId = req.body.toUser;
                const toUser = await User.findOne({ userId: toUserId });
                if (!toUser) throw new Error("target user not found");
                // toUser has already sent an invite to fromUser, so create a match
                let found = false;
                for (let i = 0; i < fromUser.matchInvites.length; i++) {
                        if (fromUser.matchInvites[i].userId === toUserId) {
                                found = true;
                                fromUser.matchInvites = fromUser.matchInvites.filter(
                                        function(obj) {
                                                return obj.userId !== toUserId;
                                        }
                                );
                                toUser.sentMatches = toUser.sentMatches.filter(
                                        function(obj) {
                                                return obj.userId !== fromUserId;
                                        }
                                );
                                toUser.matches.push(fromUser);
                                fromUser.matches.push(toUser);
                                const room = new Room({ "participants": [req.userId, toUserId] });
                                await room.save();
                                fromUser.rooms.push(room["_id"]);
                                toUser.rooms.push(room["_id"]);
                                await fromUser.save();
                                await toUser.save();
                                return res.json({ roomId: room["_id"] });
                        }
                }

                if (!found) {
                        fromUser.sentMatches.push(toUser);
                        toUser.matchInvites.push(fromUser);
                        await fromUser.save();
                        await toUser.save();
                        return res.json({ msg: "match invite was sent" });
                }
        } catch (err) {
                return res.status(400).json({ message: err });
        }
});

router.post("/acceptMatch", auth, async (req, res) => {
        try {
                const senderId = req.body.sender;
                const accepterId = req.body.accepter;
                const accepter = await User.findOne({ userId: accepterId });
                if (!accepter) throw new Error("current user not found");
                const sender = await User.findOne({ userId: senderId });
                if (!sender) throw new Error("target user not found");
                accepter.matchInvites = accepter.matchInvites.filter(function(obj) {
                        return obj.userId !== senderId;
                });
                sender.sentMatches = sender.sentMatches.filter(function(obj) {
                        return obj.userId !== accepterId;
                })
                accepter.matches.append(accepter);
                sender.matches.append(sender);
                // create a new room for the matched users
                const room = new Room({ "participants": [accepterId, senderId] });
                await room.save();
                accepter.rooms.push(room["_id"]);
                sender.rooms.push(room["_id"]);
                await accepter.save();
                await sender.save();
                return res.json({ roomId: room["_id"] });
        } catch (err) {
                return res.status(400).json({ msg: err });
        }
});

router.post("/declineMatch", auth, async (req, res) => {
        try {
                const decliner = await User.findOne({ userId: req.body.decliner });
                if (!decliner) throw new Error("current user not found");
                const declinerId = req.body.decliner;
                const senderId = req.body.sender;
                const sender = await User.findOne({ userId: senderId });
                if (!sender) throw new Error("target user not found");

                decliner.matchInvites = decliner.matchInvites.filter(function(obj) {
                        return obj.userId !== senderId;
                });
                sender.sentMatches = sender.sentMatches.filter(function(obj) {
                        return obj.userId !== declinerId;
                });
                sender.save();
                decliner.save();
                return res.json({ msg: "match invite declined successfully" });
        } catch (err) {
                return res.status(400).json({ msg: err });
        }
})

// returns the number of matching elements in arr1 and arr2
function countCommonArrayElements(arr1, arr2) {
        return arr1.reduce((a, c) => a + arr2.includes(c), 0);
}

module.exports = router;
