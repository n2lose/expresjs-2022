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
    console.log('userId ======================== ', userId);
    // let foundUser = await UserModel.findById({id: userId}, (err, user) => {
    //     if(err) {
    //         console.log('User not found!'); 
    //         return;
    //     } else {
    //         return user;
    //     }
        
    // });
    let foundUser = await UserModel.findById({_id: userId});
    console.log("foundUser ================> ", foundUser);
    res.render('users/profile', {
        user: foundUser,
        fullName: foundUser.first_name + ' ' + foundUser.last_name
    });
}

