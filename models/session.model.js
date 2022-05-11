const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    cart: [{
        productId: String,
        count: Number
    } ]
});

const Session = mongoose.model('Session', sessionSchema, 'sessions')

module.exports = Session;