const { assert } = require('chai');
const db = require('./db');
const request = require('./request');

describe('spaceEnv API', () => {
    
    let envData = null;
    beforeEach(() => db.drop());
        
    envData = [
        {
            name: 'Asteroid Field',
            damage: 40,
            description: 'The asteroid belt is the circumstellar disc in the Solar System located roughly between the orbits of the planets Mars and Jupiter. It is occupied by numerous irregularly shaped bodies called asteroids or minor planets.',
            globalDmg: 30
        },
        {
            name: 'Black Hole',
            damage: 50,
            description: 'A black hole is a region of spacetime exhibiting such strong gravitational effects that nothing—not even particles and electromagnetic radiation such as light—can escape from inside it.',
            globalDmg: 25
        }
    ];

    function saveEnv(data) {
        return request.post('/api/spaceEnvs')
            .send(data)
            .then(res => res.body);
    }

    it('returns environment with a new id', () => {
        return saveEnv(envData[0])
            .then(res => assert.ok(res.body._id));
    });

    it('returns all when no id is given', () => {
        
        return Promise.all(envData.map(saveEnv))
            .then(saved => {
                return request.get('/api/spaceEnvs')
                    .then(envs => [envs, saved]);
            })
            .then(([envs, saved]) => {
                assert.deepEqual(envs.body[0].name, saved[0].name);
                assert.deepEqual(envs.body[1].name, saved[1].name);
            });
    });

    it('gets an env by id', () => {
        let asteroidEnv = null;
        return saveEnv(envData[1])
            .then(res => {
                asteroidEnv = res.body;
                return request.get(`/api/spaceEnvs/${asteroidEnv._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, asteroidEnv);
            });
    });

    it('updates a spaceEnv', () => {
        return saveEnv(envData[0])
            .then(res => {
                envData[0].name = '#######';
                return request.put(`/api/spaceEnvs/${res.body._id}`)
                    .send(envData[0]);       
            })
            .then(res => {
                assert.deepEqual(res.body.nModified === 1, true);
            });
    });

    it('deletes environment by id', () => {
        return request.post('/api/spaceEnvs')
            .send(envData[0])
            .then(res => {
                return request.delete(`/api/spaceEnvs/${res.body._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
            });        
    });

    it('patches an environment', () => {
        return saveEnv(envData[0])
            .then(({ body: savedEnv }) => {
                assert.ok(savedEnv._id);
                savedEnv.name = 'Asteroid Belt';
                return request.patch(`/api/spaceEnvs/${savedEnv._id}`)
                    .send({ name: 'Asteroid Belt' })
                    .then(res => res.body)
                    .then(updatedEnv => [savedEnv, updatedEnv]);
            })
            .then(([savedEnv, updatedEnv]) => {
                assert.deepEqual(savedEnv, updatedEnv);
            });
    });
});