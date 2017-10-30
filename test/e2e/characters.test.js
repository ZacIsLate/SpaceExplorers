const request = require('./request');
const assert = require('chai').assert;
const db = require('./db');

describe('Characters API', () => {

    let characterData = [];
    beforeEach(() => db.drop());

    characterData = [
        {
            name: 'Ford Prefect',
            description: 'human/alien travel writer'
        }, 
        {
            name: 'Mark Watney',
            description: 'Maritian - colonized a planet on his own'
        }
    ];

    it('saves a character', () => {
        return request.post('/api/characters')
            .send(characterData[0])
            .then(({ body }) => {
                assert.equal(body.name, characterData[0].name);
            });
    }),

    it('gets all characters', () => {
        let characterCollection = characterData.map(item => {
            return request.post('/api/characters')
                .send(item)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(characterCollection)
            .then(_saved => {
                saved = _saved;
                return request.get('/api/characters');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
                // assert.equal(res.body[1].pob, 'Concord CA');
                // assert.equal(res.body[1].dob.slice(0, 4), 1956);
                assert.equal(res.body[1].name, 'Mark Watney');
            });
    }),

    it.only('gets a character by id', () => {
        let savedCharacter = null;
        return request.post('/api/characters')
            .send(characterData[0])
            .then(res => {
                savedCharacter = res.body;
            })
            .then(() => {
                return request.get(`/api/characters/${savedCharacter._id}`);
            
            })
            .then(res => {
                assert.equal(res.body.name, savedCharacter.name);
            });
    });

});