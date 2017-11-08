const assert = require('chai').assert;
const db = require('./db'); 
const request = require('./request'); 
const createTestEvent = require('./event-test-data');

describe('event API', () => {
    const enemy = {
        name: 'Advanced Cylon War Raider Battalion',
        damage: 15,
        healthPoints: 50,
    };
    const environment = {
        name: 'Asteroid Field',
        damage: 40,
        description: 'The asteroid belt is the circumstellar disc in the Solar System located roughly between the orbits of the planets Mars and Jupiter. It is occupied by numerous irregularly shaped bodies called asteroids or minor planets.',
        globalDmg: 30
    };

    beforeEach(() => db.drop());
    
    let testEvent = null;
    let testEvent2 = null;
    beforeEach(() => {
        return Promise.all([
            request.post('/api/enemies')
                .send(enemy)
                .then(res => res.body._id),
            request.post('/api/spaceEnvs')
                .send(environment)
                .then(res => res.body._id)
        ])
            .then(([savedEnemy, savedEnvironment]) => {
                testEvent = createTestEvent(savedEnvironment, savedEnemy);
                testEvent2 = createTestEvent(savedEnvironment, savedEnemy);
            });
    });

    it('saves an event with an id', () => {
        return request.post('/api/events')
            .send(testEvent)
            .then(savedEvent => {
                savedEvent = savedEvent.body;
                assert.ok(savedEvent._id);
                assert.equal(savedEvent.scenario, testEvent.scenario);    
            });
    });

    it('gets all events', () => {
        let testEventData = [testEvent, testEvent2];
        return Promise.all(testEventData.map(event => {
            return request.post('/api/events')
                .send(event)
                .then(res => res.body);
        }))
            .then(savedEvents => {
                return request.get('/api/events')
                    .then(gotEvents => {
                        gotEvents = gotEvents.body.sort((a, b) => a._id < b._id);
                        savedEvents.sort((a, b) => a._id < b._id);
                        assert.deepEqual(savedEvents, gotEvents);
                    });
            });
    });

    it('gets an event by id', () => {
        return request.post('/api/events')
            .send(testEvent)
            .then(res => {
                const savedEvent = res.body;
                return request.get(`/api/events/${savedEvent._id}`)
                    .then(gotEvent => {
                        gotEvent = gotEvent.body;
                        assert.deepEqual(savedEvent.name, gotEvent.name);
                    });
            });

    });

    it('updates an event', () => {
        let savedEvent = null; 
        return request.post('/api/events')
            .send(testEvent)
            .then(res => {
                savedEvent = res.body;
                testEvent.scenario = '#######';
                return request.put(`/api/events/${savedEvent._id}`)
                    .send(savedEvent);
            })
            .then(res => assert.deepEqual(res.body.nModified === 1, true));
    });

    it('deletes event by id', () => {
        let savedEvent = null;
        return request.post('/api/events')
            .send(testEvent)
            .then(res => {
                savedEvent = res.body;
                return request.delete(`/api/events/${savedEvent._id}`);
            })
            .then(res => assert.deepEqual(res.body, { removed: true} ));        
    });

    it('patches an event', () => {
        return request.post('/api/events')
            .send(testEvent)
            .then(({ body: eventRes }) => {
                assert.ok(eventRes._id);
                eventRes.scenario = 'event has ended';
                return request.patch(`/api/events/${eventRes._id}`)
                    .send({ scenario: 'event has ended' })
                    .then(({ body: updatedEvent }) => {
                        assert.deepEqual(eventRes, updatedEvent);
                    });
            });
    });
});