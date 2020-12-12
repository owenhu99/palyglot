const admin = require('firebase-admin')
const serviceAccount = require("../config/fbServiceAccountKey.json")
const User = require('../models/User')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://palyglot-dev.firebaseio.com"
})

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        if (token) {
            admin.auth().verifyIdToken(token)
                .then((decodedToken) => {
                    req.userId = decodedToken.uid
                    next()
                }).catch(() => {
                    res.status(403).send('Unauthorized')
                });
        } else {
            res.status(403).send('Unauthorized')
        }
    } catch(error) {
        res.status(400).send(error)
    }
}
module.exports = auth

/**
 * Source citation:
 * https://itnext.io/how-to-use-firebase-auth-with-a-custom-node-backend-99a106376c8a
 */