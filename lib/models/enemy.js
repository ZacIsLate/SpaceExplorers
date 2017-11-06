const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String, 
        required: true
    },
    healthPoints: {
        type: Number,
        required: true
    },
    damage: {
        type: Number,
        required: true
    },
    speed: Number
});

module.exports = mongoose.model('Enemy', schema);
