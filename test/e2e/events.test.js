const assert = require('chai').assert;
const mongoose = require('mongoose'); 
const request = require('./request'); 

describe('enemy API', () => {
    const enemy = {
        name: 'Advanced Cylon War Raider Battalion',
        damage: 25,
        healthPoints: 55,
    };
    const environment = {
        name: 'Astroid Field',
        dmg: 25,
        description: 'The asteroid belt is the circumstellar disc in the Solar System located roughly between the orbits of the planets Mars and Jupiter. It is occupied by numerous irregularly shaped bodies called asteroids or minor planets.',
        globalDmg: 15
    };
    let savedEnvironment = null;
    let savedEnemy = null;
    let testEvent = null;
    let testEvent2 = null;


    beforeEach(() => mongoose.connection.dropDatabase());

    beforeEach(() => {
        return Promise.all([
            request.post('/api/enemies')
                .send(enemy)
                .then(res => savedEnemy = res.body),
            request.post('/api/spaceEnvs')
                .send(environment)
                .then(res => savedEnvironment = res.body)
        ])
            .then(() => {
                testEvent = {
                    scenario: 'You have encountered an Advanced Cylon War Raider Battalion inside of an astroid field!',
                    spaceEnv: savedEnvironment._id,
                    enemy: savedEnemy._id,
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
                        }]
                };
                testEvent2 = {
                    scenario: 'You have encountered an Advanced Cylon War Raider Battalion inside of an astroid field!',
                    spaceEnv: savedEnvironment._id,
                    enemy: savedEnemy._id,
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
                        }]
                };
            });
    });

    it('Should save an event with an id', () => {
        return request.post('/api/events')
            .send(testEvent)
            .then(savedEvent => {
                savedEvent = savedEvent.body;
                assert.ok(savedEvent._id);
                assert.equal(savedEvent.scenario, testEvent.scenario);    
            });
    });

    it('Should get all events', () => {
        let savedEvents = [];
        let testEventData = [testEvent, testEvent2];
        return Promise.all(testEventData.map( event =>{
            return request.post('/api/events')
                .send(event)
                .then(res => savedEvents.push(res.body));
        }))
            .then(() => {
                return request.get('/api/events')
                    .then(gotEvents => {
                        gotEvents = gotEvents.body.sort((a, b) => a._id < b._id);
                        savedEvents.sort((a, b) => a._id < b._id);
                        assert.deepEqual(savedEvents, gotEvents);
                    });
            });
    });

    it('Should get an event by id', ()=>{
        return request.post('/api/events')
            .send(testEvent)
            .then(res => {
                const savedEvent = res.body;
                return request.get(`/api/events/${savedEvent._id}`)
                    .then( gotEvent => {
                        gotEvent = gotEvent.body;
                        assert.deepEqual(savedEvent.name, gotEvent.name);
                    });
            });

    });

    it('Should update an event', ()=>{
        let savedEvent = null; 
        return request.post('/api/events')
            .send(testEvent)
            .then( res => {
                savedEvent = res.body;
                testEvent.scenario = '#######';
                return request.put(`/api/events/${savedEvent._id}`)
                    .send(savedEvent);
            })
            .then(res => assert.deepEqual(res.body.nModified === 1, true));
    });

    it('Deletes event by ID', () =>{
        let savedEvent = null;
        return request.post('/api/events')
            .send(testEvent)
            .then(res => {
                savedEvent = res.body;
                return request.delete(`/api/events/${savedEvent._id}`);
            })
            .then( res => assert.deepEqual(res.body, { removed: true}));        
    });

});