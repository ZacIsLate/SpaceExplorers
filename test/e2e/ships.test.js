const { assert } = require('chai');
const mongoose = require('mongoose').connection;
const request = require('./request');

describe('Ship CRUD', () => {
    let shipData = null;

    beforeEach(() => {
        mongoose.dropDatabase();

        shipData = [
            {
                name: 'Moya',
                hp: 1000,
                dmg: 100,
                description: 'A living sentient bio-mechanical space ship.',
                class: 'Leviathan'
            }
        ];
    });

    describe.only('POST ship', () => {
        it('returns a ship with a new id', () => {
            return request.post('/api/ships')
                .send(shipData[0])
                .then(res => assert.ok(res.body._id));
        });
    });
});