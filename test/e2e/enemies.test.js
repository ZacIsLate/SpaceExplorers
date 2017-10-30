const assert = require('chai').assert;
const mongoose = require('mongoose'); 
const request = require('./request'); 

describe('enemy API', () => {
    beforeEach(() => mongoose.connection.dropDatabase());

    const cylonWarRaider = {
        name: 'Advanced Cylon War Raider Battalion',
        Damage: 25,
        HealthPoints: 55,
    };

    it('Should save an enemy with an id', () => {
        return request.post('/api/enemies')
            .send(cylonWarRaider)
            .then(res => {
                const enemy = res.body;
                assert.ok(enemy._id);
                assert.equal(enemy.name, cylonWarRaider.name);
            });
    });



});