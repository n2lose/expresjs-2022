const UserModel = require('../models/user.model');


module.exports.index = async (req, res) => {
    const users = await UserModel.find();

    let perPage = 10;
    let size = Math.ceil(users.length / perPage);
    let page = parseInt (req.query.page) || 1;
    let action = req.query.action;

    if(action === 'prev') {
        if(page === 1) return;
        page = page -1;
    }

    if(action === 'next') {
        if(page === size) return;
        page = page +1;
    }
    
    let start = (page -1) * perPage;
    let end = page * perPage;
    res.render('users/index', {
        users:users.slice(start, end),
        size: size,
        page: page
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