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
        healthPoints: requiredNumber,
        damage: requiredNumber,
        description: String,
        class: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    currentEvent:{
        event:{
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        enemy:Object
    },
    log:[ 
        { event:
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        }
    ]
});

module.exports = mongoose.model('Character', characterSchema);