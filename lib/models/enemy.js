const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enemySchema = new Schema({
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

module.exports = mongoose.model('Enemy', enemySchema);