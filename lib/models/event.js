const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requireString = {
    type: String,
    required: true
};

const requireNum ={
    type: Number,
    required: true
};

const schema = new Schema({
    scenario: requireString,
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

        difficulty: requireNum,
        
        success:{
            description: requireString,
            outcome: requireNum
        },
        failure:{
            description: requireString,
            outcome: requireNum
        },
    }]
});

module.exports = mongoose.model('Event', schema);