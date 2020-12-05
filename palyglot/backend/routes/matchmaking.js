const { compare } = require('bcryptjs');
var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET, returns list of all possible new matches for the current user. 
 * Sorting parameters must be passed in the request body and 
 * sortType must be passed in the request query. */
router.get("/matchmaking", async (req, res) => {
        var target_languages = req.body.languages;
        var previous_matches = req.body.previous_matches;
        var potential_matches = req.body.potential_matches;
        var interests = req.query.interests;
        
        if (!target_languages) {
                target_languages = [];
        }

        if (!previous_matches) {
                previous_matches = [];
        }

        if (!potential_matches) {
                potential_matches = [];
        }

        // match users with same target language first, sort by interests
        // match target language of request with known languages of users next,
        // sort by interest. append to the first query results.
        try {
                const users_with_same_target_langs =
                        await User.find({
                                targetLanguages: {
                                        $elemMatch: { $in: target_languages }
                                }
                        }).sort(function (arr1, arr2) {
                                let num_common_arr1 = countCommonArrayElements(
                                        interests, arr1);
                                let num_common_arr2 = countCommonArrayElements(
                                        interests, arr2);
                                return num_common_arr1 - num_common_arr2;
                        }).limit(20);

                const users_with_same_known_langs =
                        await User.find({
                                knownLanguages: {
                                        $elemMatch: { $in: target_languages }
                                }
                        }).sort(function (arr1, arr2) {
                                let num_common_arr1 = countCommonArrayElements(
                                        interests, arr1);
                                let num_common_arr2 = countCommonArrayElements(
                                        interests, arr2);
                                return num_common_arr1 - num_common_arr2;
                        })
                                .limit(20 - users_with_same_target_langs.length);

                const matches = users_with_same_target_langs.concat(
                        users_with_same_known_langs
                );
                res.json({ matches: matches });
        } catch (err) {
                res.status(500);
                res.json({ message: err });
        }

});

// returns the number of matching elements in arr1 and arr2
function countCommonArrayElements(arr1, arr2) {
        return arr1.reduce((a, c) => a + arr2.includes(c), 0);
}

module.exports = router;
