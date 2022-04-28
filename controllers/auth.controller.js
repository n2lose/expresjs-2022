const UserModel = require('../models/user.model');

module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.postLogin =  async (req, res) => {
    const { email, password } = req.body;

    let user = await UserModel.find({email: email});
    if(!user) {
        res.render('auth/login', {
            errors: ['User does not exist.'],
            values: req.body
        });
        return;
    }

    if(user[0].password !== req.body.password) {
        res.render('auth/login', {
            errors: ['Incorect password'],
            values: req.body
        });
        return;
    }

    res.cookie('userId', user[0]._id, {
        signed: true
    });
    res.redirect('/users');
}