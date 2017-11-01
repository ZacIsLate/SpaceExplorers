
module.exports = [
    {
        scenario: 'You come across a gas planet with multiple moons. The planet does not look support life but some of the moons look promising. You pick up a signal emanating from the one farthest from the planet and choose to investigate. Your chief communications officer deciphers it and discovers that it is a distress signal from a droid orbiting the moon. You retrieve the droid who provides some valuable information about a race of long-eared water-loving aliens that inhabit the planet. Their leader is Jar-Jar.',
        spaceEnv: 'moon', //needs an id
        enemy: 'Jar-Jar Binks', //needs an id
        actions: [
            {
                option: 'Attack',
                difficulty: 3,
                success: {
                    description: 'You kill Jar-Jar! Life is good for all of humanity.',
                    outcome: 10
                },
                failure: {
                    description: 'Jar-Jar inflicts some damage and you are forever humiliated.',
                    outcome: -30
                }
            },

            {
                option: 'Run',
                difficulty: 0,
                success: {
                    description: 'You did not need to speak to Jar-Jar!',
                    outcome: 3
                },
                failure: {
                    description: 'Jar-Jar catches up to you and you are forced to watch slide shows of all his interactions with the jedi',
                    outcome: -3
                }   
            },

            {
                option: 'Diplomacy',
                difficulty: 5,
                success: {
                    description: 'After hours and hours of mind-numbing talk, Jar-Jar agrees to give you some much needed supplies and rewards you with the droid that you recovered.',
                    outcome: 3
                },
                failure: {
                    description: 'Many members of your crew die of boredom.',
                    outcome: -3
                }
            }
        ]
    },
            

    {
        scenario: 'You discover that another ship is following you. It is large and ominous. You try to contact the ship to no avail. Little do you know that you have stumbled across The Borg.',
        spaceEnv: 'Ship', //needs an id 
        enemy: 'The Borg', //needs an id
        actions: [
            {
                option: 'Attack',
                difficulty: 10,
                success:{
                    description: 'Your superior power rules the day. They are not an easy enemy to defeat.',
                    outcome: 10
                },
                failure:{
                    description: 'You cannot outrun The Borg. You are assimilated.',
                    outcome: -50
                }
            },

            {
                option: 'Run',
                difficulty: 2,
                success:{
                    description: 'You outrun the unknown ship. Their intent was to destroy you.',
                    outcome: 10
                },
                failure:{
                    description: 'You cannot outrun The Borg. You are assimilated.',
                    outcome: -50
                }
            },

            {
                option: 'Diplomacy',
                difficulty: 20,
                success:{
                    description: 'There is not much chance of success with the Borg but you came across them when they were celebrating their birthday.',
                    outcome: 10
                },
                failure:{
                    description: 'You cannot outrun The Borg. You are assimilated.',
                    outcome: -50
                }
            }    
        ]
    },

    {
        scenario: 'You approach an ice planet and are about to forego any investigation of it when you get this gut feeling that there may be something worthwhile at this location. On the surface of the planet, you find lots of resources but some of your crew start to mysteriously disappear. An unseen predator is taking them out one by one.',
        spaceEnv: 'Ice Planet', 
        enemy: 'Predator',
        actions: [
            {
                option: 'Attack',
                difficulty: 25,
                success:{
                    description: 'You got lucky',
                    outcome: 3
                },
                failure:{
                    description: 'No one escapes the Predator unscathed.',
                    outcome: -22
                }
            },

            {
                option:'Run',
                difficulty: 4,
                success:{
                    description: 'Running was your only good option.',
                    outcome: 5
                },
                failure:{
                    description: 'The Predator inflicted lots of damage.',
                    outcome: -15
                }
            },

            {
                option:'Diplomacy',
                difficulty: 75,
                success:{
                    description: 'The Predator must be dying if it was willing to negotiate.',
                    outcome: 25
                },
                failure:{
                    description: 'The Predator inflicted lots of damage when you tried to make nice. You are lucky to be alive - if you are alive.',
                    outcome: -35
                }
            }
        ]
    }
];








//     {
//         option:''
//         difficulty:
//             success:{
//                 description: '',
//                 outcome: 
//             },
//             failure:{
//                 description: '',
//                 outcome:
//             }
//     }
// },

    