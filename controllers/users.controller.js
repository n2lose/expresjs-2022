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

module.exports.getUserDetails = async (req, res) => {
    let userId = req.params.id;
    let foundUser = await UserModel.findById({_id: userId});
    if(foundUser) {
        res.render('users/profile', {
            user: foundUser,
            fullName: foundUser.first_name + ' ' + foundUser.last_name
        });
    } else {
        res.render('error')
    }
};

module.exports.create = (req, res) => {
    res.render('users/create');
}

module.exports.postCreateUser = (req, res) => {
    let avatarPath = req.file.path;
    if(avatarPath) {
        avatarPath = avatarPath.split('\\').slice(1).join('/');
    }

    let user = new UserModel(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            avatar: avatarPath ? avatarPath : ''
        }
    );

    user.save((err) => {
        if(err) {
            console.log('error');
            res.redirect('/users/create');
        };
    });
    res.redirect('/users');
}