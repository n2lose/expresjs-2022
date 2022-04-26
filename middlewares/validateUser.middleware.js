module.exports.createUser = (req, res, next) => {
    let errors = [];
    if(!req.body.first_name) {
        errors.push('First Name is required');
    }

    if(!req.body.last_name) {
        errors.push('Last Name is required');
    }

    if(!req.body.email) {
        errors.push('Email is required');
    }

    if(!req.body.password) {
        errors.push('Password is required');
    }

    if(errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        });
    }

    next();
};