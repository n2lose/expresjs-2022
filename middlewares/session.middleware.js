const SessionModel = require('../models/session.model');

module.exports.addSessionId = (req, res, next) => {

    if(!req.signedCookies.sessionId) {
        let newSessionId = new SessionModel();

        let sessionId = newSessionId._id;
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        newSessionId.save((err) => {
            if(err) {
                console.log(err);
            }
        });
    }

    next();
}