const request = require('./request');
const assert = require('chai').assert;
const db = require('./db');

describe('Characters API', () => {

    beforeEach(() => db.drop());

    const character = {
        name: 'Ford Prefect',
        description: 'human/alien travel writer'
    };

    it.only('saves a character', () => {
        return request.post('/api/characters')
            .send(character)
            .then(({ body }) => {
                assert.equal(body.name, character.name);
            });
    }),

    it.only('gets a character', () => {
        return request.get('/api/characters')
            .then(({ body }) => {
                assert.equal(body.name, 'Ford Prefect');
            });
    });
});