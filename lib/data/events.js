
module.exports = function new spaceEvents {



}
const schema = new Schema({
    scenario: requireString,
    spaceEnv: {
        type: Schema.Types.ObjectId,
        ref: 'SpaceEnv',
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