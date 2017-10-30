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
    hp: requiredNumber,
    dmg: requiredNumber,
    description: String,
    class: String
});

module.exports = mongoose.model('Ship', schema);