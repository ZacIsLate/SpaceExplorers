const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
};

const requiredNumber = {
    type: Number,
    required: true
};

const characterSchema = new Schema({
    name: requiredString,
    description: String,
    ship:{
        name: requiredString,
        hp: requiredNumber,
        dmg: requiredNumber,
        description: String,
        class: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    log: {
        currentEvent:{
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        allEvents:[{
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        }]
    }
});

module.exports = mongoose.model('Character', characterSchema);