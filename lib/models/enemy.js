const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String, 
        required: true
    },
    HealthPoints: {
        type: Number,
        required: true
    },
    Damage: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Enemy', schema);