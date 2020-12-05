var express = require('express');
const Room = require('../models/Room');
var router = express.Router();
const User = require('../models/User');

/* GET, returns list of all possible new matches for the current user. 
 * Sorting parameters must be passed in the request body and 
 * sortType must be passed in the request query. */
router.get("/matchmaking", async (req, res) => {

        // match users with same target language first, sort by interests
        // match target language of request with known languages of users next,
        // sort by number of common interests. append to the first query results.
        try {
                const user = await User.findOne({ userId: req.params.userId });
                const target_languages = user.targetLanguages;
                const interests = user.interests;

                // match users who have the same target languages as the current
                // user.
                const users_with_same_target_langs =
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
                                { userId: { $nin: user.sentMatches } }
                                ]
                        }).sort(function (doc1, doc2) {
                                // sort the matches by the number of matching
                                // interests.
                                let num_common_arr1 = countCommonArrayElements(
                                        interests, doc1.interests);
                                let num_common_arr2 = countCommonArrayElements(
                                        interests, doc2.interests);
                                return num_common_arr1 - num_common_arr2;
                        }).limit(20);

                // match users who know the languages that the current user is 
                // learning. These take less priority over people who have the 
                // same target language as the current user.
                const users_with_same_known_langs =
                        await User.find({
                                $and: [{
                                        knownLanguages: {
                                                $elemMatch: { $in: target_languages }
                                        }
                                },
                                { userId: { $nin: user.matches } },
                                { userId: { $nin: user.matchInvites } },
                                { userId: { $nin: user.sentMatches } }
                                ]
                        }).sort(function (doc1, doc2) {
                                let num_common_arr1 = countCommonArrayElements(
                                        interests, doc1.interests);
                                let num_common_arr2 = countCommonArrayElements(
                                        interests, doc2.interests);
                                return num_common_arr1 - num_common_arr2;
                        }).limit(20 - users_with_same_target_langs.length);

                const matches = users_with_same_target_langs.concat(
                        users_with_same_known_langs
                );
                return res.json({ matches: matches });
        } catch (err) {
                return res.status(400).json({ message: err });
        }

});

router.post("/matchmaking/requestMatch", async (req, res) => {
        try {
                const fromUserId = req.body.fromUser;
                const toUserId = req.body.toUser;
                const fromUser = await User.findOne({ userId: fromUserId });
                const toUser = await User.findOne({ userId: toUserId });
                // toUser has already sent an invite to fromUser, so create a match
                if (fromUser.matchInvites.includes(toUserId)) {
                        fromUser.matchInvites.splice(
                                fromUser.matchInvites.indexOf(toUserId), 1
                        );
                        toUser.sentMatches.splice(
                                toUser.sentMatches.indexOf(fromUserId), 1
                        );
                        fromUser.matches.push(toUserId);
                        toUser.matches.push(fromUserId);
                        // create a new room for the matched users
                        const room = new Room({ "participants": [fromUserId, toUserId] });
                        await room.save();
                        fromUser.rooms.push(room["_id"]);
                        toUser.rooms.push(room["_id"]);
                        return res.json({ roomId: room["_id"] });
                } else {
                        fromUser.sentMatches.push(toUserId);
                        toUser.matchInvites.push(fromUserId);
                        return res.json({ msg: "match invite was sent" });
                }
        } catch (err) {
                return res.status(400).json({ message: err });
        }
});

router.post("/matchmaking/acceptMatch", async (req, res) => {
        try {
                const accepterId = req.body.accepter;
                const senderId = req.body.sender;
                const accepter = await User.findOne({ userId: accepterId });
                const sender = await User.findOne({ userId: senderId });
                accepter.matchInvites.splice(
                        accepter.matchInvites.indexOf(senderId), 1
                );
                sender.sentMatches.splice(
                        sender.sentMatches.indexOf(accepterId), 1
                );
                accepter.matches.append(senderId);
                sender.matches.append(accepterId);
                // create a new room for the matched users
                const room = new Room({ "participants": [accepterId, senderId] });
                await room.save();
                accepter.rooms.push(room["_id"]);
                sender.rooms.push(room["_id"]);
                return res.json({ roomId: room["_id"] });
        } catch (err) {
                return res.status(400).json({ msg: err });
        }
});

router.post("/matchmaking/declineMatch", async (req, res) => {
        try {
                const declinerId = req.body.decliner;
                const senderId = req.body.sender;
                const decliner = await User.findOne({ userId: declinerId });
                const sender = await User.findOne({ userId: senderId });

                decliner.matchInvites.splice(
                        decliner.matchInvites.indexOf(senderId), 1
                );
                sender.sentMatches.splice(
                        sender.sentMatches.indexOf(declinerId), 1
                );
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
