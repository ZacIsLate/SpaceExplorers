
module.exports = (spaceEnv, enemy) => {
    return {
        scenario: 'You have encountered an Advanced Cylon War Raider Battalion inside of an asteroid field!',
        spaceEnv,
        enemy,
        actions: [
            {
                option: 'Attack',
                difficulty: 3,
                success: {
                    description: 'You have decided to engage the Advanced Cylon War Raider squad, Your point defences cut each squadron in turn, sustaining minimal damage',
                    outcome: 0
                },
                failure: {
                    description: 'You have decided to engage the Advanced Cylon War Raider squad. Your point defense system was overwhelmed by the swarming raiders and your ship sustained heavy damage',
                    outcome: -40
                }
            },

            {
                option: 'Diplomacy',
                difficulty: 0,
                success: {
                    description: 'You have decided to negotiate with the Advanced Cylon War Raider squad. Surprisingly they decided to bury the hatchet of war and become friends. Apparently all that was needed was a little human/robot kindness.',
                    outcome: 0
                },

                failure: {
                    description: 'not gonna happen',
                    outcome: 1
                }
            },
            {
                option: 'Run',
                difficulty: 6,
                success: {
                    description: 'You have decided to try and outrun the Advanced Cylon War Raider squad. Your swift ship leaves the squad in the dust',
                    outcome: 0
                },
                failure: {
                    description: 'You have decided to outrun the Advanced Cylon War Raider squad. Unfortunately fast and nimble raiders manage to inflict significant damage before your ship manages to jump away',
                    outcome: -40
                }
            }
        ]
    };
};
