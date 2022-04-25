const UserModel = require('../models/user.model');

module.exports.index = async (req, res) => {
    const users = await UserModel.find();
    res.render('users/index', {
        users:users
    });
};

module.exports.search = async (req, res) => {
    let q = req.query.q;
    let regex =  new RegExp(q, 'i');
    await UserModel.find().or([{ 'first_name': { $regex: regex }}, { 'last_name': { $regex: regex }}]).exec(function(err, users) {  
        res.render('users/index', {
            users:users
        });
    });
};


