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
    template: Boolean,
    ship:{
        name: requiredString,
        healthPoints: requiredNumber,
        damage: requiredNumber,
        description: String,
        class: String,
        speed: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    currentEvent: {
        event: {},
        enemy: {}
    },
    log: [ 
        { event:
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        }
    ]
});

module.exports = mongoose.model('Character', characterSchema);