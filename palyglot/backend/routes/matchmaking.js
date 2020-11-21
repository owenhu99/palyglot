var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET, returns list of all possible new matches for the current user. 
 * Sorting parameters must be passed in the request body and 
 * sortType must be passed in the request query. */
router.get("/matchmaking", async (req, res) => {
        var minAge = req.body.minAge;
        var manAge = req.body.maxAge;
        var genders = req.body.genders;
        var target_languages = req.body.languages;
        var previous_matches = req.body.previous_matches;
        var potential_matches = req.body.potential_matches;

        if (!minAge) {
                minAge = 0;
        }

        if (!maxAge) {
                maxAge = Number.MAX_VALUE;
        }

        if (!genders) {
                genders = [];
        }

        if (!target_languages) {
                target_languages = [];
        }

        if (!previous_matches) {
                previous_matches = [];
        }

        if (!potential_matches) {
                potential_matches = [];
        }

	try {
                switch (req.query.sortType) {
                        case 'recent': break;
                        default: 
		          const users = await User.find({ $and [ 
                          { _id: { $nin: previous_matches } },  
                          { age: { $gte: minAge } }, 
                          { age: { $lte: maxAge } }, 
                          { gender: { $in: genders } }, 
                          { targetLanguages: { $elemMatch: 
                            { $in: target_languages }}}]});
                          users.toArray().sort(function(a, b){ return a - b });
                          res.json(users);
                }
          
	} catch (err) {
		res.json(err);
	}
});

/* POST, add a user as a potential match to the database */
router.post("/", (req, res) => {
	const message = new Message(req.body);

	message
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json({ message: err });
		});
});

module.exports = router;
