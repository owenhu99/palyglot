var express = require('express');
var router = express.Router();

// Imports the Google Cloud client library
const projectId = 'csc301-d4';
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({projectId});

router.post("/", async (req, res) => {
    const {msg, target} = req.body;
    const [translation] = await translate.translate(msg, target);
    res.send({msg: translation});
});

module.exports = router;