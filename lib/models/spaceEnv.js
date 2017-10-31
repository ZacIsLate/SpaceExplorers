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
    damage: requiredNumber,
    description: requiredString,
    globalDmg: requiredNumber

});

module.exports = mongoose.model('SpaceEnv', schema);