var express = require('express');
var router = express.Router();
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({projectId: "AIzaSyCnqThoiLedqZesnVf0KFQRHCbbcvNuWvQ"});

router.get("/", async (req, res) => {
    let [translations] = await translate.translate(req.body.message, "en");
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation, i) => {
      console.log(`${text[i]} => (${target}) ${translation}`);
    });
});

module.exports = router;