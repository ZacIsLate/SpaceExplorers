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
    log: [{
        type: Schema.Types.ObjectId,
        ref: 'SpaceEnv',
        required: true
    }]
});

module.exports = mongoose.model('Character', characterSchema);