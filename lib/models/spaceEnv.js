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
    damage: requiredNumber,
    description: requiredString,
    globalDmg: requiredNumber

});

module.exports = mongoose.model('SpaceEnv', schema);