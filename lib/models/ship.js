const mongoose = require('mongoose');

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