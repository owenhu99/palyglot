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
        var num_results = req.query.display_count;
        const MAX_RESULTS = 20;

        if (num_results < 0) {
                res.send([]);
        }

        else if (!num_results || num_results > 20) {
                num_results = MAX_RESULTS;
        }

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
                        case 'youngest': break;
		          const users = await User.find({ $and [ 
                            { _id: { $nin: previous_matches } },  
                            { age: { $gte: minAge } }, 
                            { age: { $lte: maxAge } }, 
                            { gender: { $in: genders } }, 
                            { targetLanguages: { $elemMatch: 
                              { $in: target_languages }}}]}).sort({ "age" : 1 })
                                .limit(num_results);
                          res.json(users);
                        case 'oldest': break;
		          const users = await User.find({ $and [ 
                            { _id: { $nin: previous_matches } },  
                            { age: { $gte: minAge } }, 
                            { age: { $lte: maxAge } }, 
                            { gender: { $in: genders } }, 
                            { targetLanguages: { $elemMatch: 
                              { $in: target_languages }}}]}).sort({ "age" : -1 })
                                .limit(num_results);
                          res.json(users);
                        default: 
		          const users = await User.find({ $and [ 
                            { _id: { $nin: previous_matches } },  
                            { age: { $gte: minAge } }, 
                            { age: { $lte: maxAge } }, 
                            { gender: { $in: genders } }, 
                            { targetLanguages: { $elemMatch: 
                              { $in: target_languages }}}]}).limit(num_results);
                          res.json(users);
                }
          
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;
