const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    scenario: {
        type: String, 
        required: true
    },
    environment: {
        type: Schema.Types.ObjectId,
        ref: 'Environment',
        required: true
    }, 
    enemy: {
        type: Schema.Types.ObjectId,
        ref: 'Enemy',
        required: true
    },
    actions: [{
        option: {
            type: String,
            enum: ['Attack', 'Run', 'Diplomacy'],
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Event', schema);