const mongoose = require('mongoose');

// use common Require fields
const requiredString = {
    type: String,
    required: true
};

const requiredNumber = {
    type: Number,
    required: true
};

const schema = new mongoose.Schema({
    name: requiredString,
    healthPoints: requiredNumber,
    damage: requiredNumber,
    speed: Number,
    description: String,
    class: String
});

module.exports = mongoose.model('Ship', schema);