const { assert } = require('chai');
const mongoose = require('mongoose').connection;
const request = require('./request');

describe('Environment CRUD', () => {
    let envData = null;

    beforeEach(() => {
        mongoose.dropDatabase();

        envData = [
            {
                name: 'Astroid Field',
                dmg: 25,
                description: 'The asteroid belt is the circumstellar disc in the Solar System located roughly between the orbits of the planets Mars and Jupiter. It is occupied by numerous irregularly shaped bodies called asteroids or minor planets.',
                globalDmg: 15
            },
            {
                name: 'Black Hole',
                dmg: 50,
                description: 'A black hole is a region of spacetime exhibiting such strong gravitational effects that nothing—not even particles and electromagnetic radiation such as light—can escape from inside it.',
                globalDmg: 25
            }
        ];
    });

    describe('POST environments', () => {
        it('returns env with a new id', () => {
            return request.post('/api/environments')
                .send(envData[0])
                .then(res => assert.ok(res.body._id));
        });
    });

    describe('GET environments', () => {
        it('returns all when no id is given', () => {
            const savedEnv = [
                request.post('/api/environments')
                    .send(envData[0]),
                request.post('/api/environments')
                    .send(envData[1])
            ];

            return Promise.all(savedEnv)
                .then(resArray => {
                    resArray = resArray.map(res => {
                        return {
                            name: res.body.name,
                            _id: res.body._id
                        };
                    });
                    return request.get('/api/environments')
                        .then(received => {
                            assert.deepInclude(received.body, resArray[0]);
                            assert.deepInclude(received.body, resArray[1]);
                        });
                });
        });

        it('gets an env by id', () => {
            let asteroidEnv = null;
            return request.post('/api/environments')
                .send(envData[1])
                .then(res => {
                    asteroidEnv = res.body;
                    return request.get(`/api/environments${asteroidEnv._id}`);
                })
                .then(res => {
                    assert.deepEqual(res.body, asteroidEnv);
                });
        });
    });
});