const UserModel = require('../models/user.model');

module.exports.requiredAuthenticate = async (req, res, next) => {
    if(!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }

    let userId = req.signedCookies.userId;
    let foundUser = await UserModel.findById({_id: userId});
    if(!foundUser) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = foundUser;
    next();
}