const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    ship:{
        type: Schema.Types.ObjectId,
        ref: 'Ship',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports = mongoose.model('Character', characterSchema);