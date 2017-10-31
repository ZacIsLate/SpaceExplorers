
module.exports = [
    {
        scenario: 'You come across a gas planet with multiple moons. The planet does not look support life but some of the moons look promising. You pick up a signal emanating from the one farthest from the planet and choose to investigate. Your chief communications officer deciphers it and discovers that it is a distress signal from a droid orbiting the moon. You retrieve the droid who provides some valuable information about a race of long-eared water-loving aliens that inhabit the planet. Their leader is Jar-Jar.',
        spaceEnv: 'moon', //needs an id
        enemy: 'Jar-Jar Binks', //needs an id
        action: 'Run',
        difficulty: 0,
        success: {
            description: 'You did not need to speak to Jar-Jar!',
            outcome: 3
        },
        failure: {
            description: 'Jar-Jar catches up to you and you are forced to watch slide shows of all his interactions with the jedi',
            outcome: -3
        }


    }
]



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

