const request = require('./request');
const assert = require('chai').assert;
const db = require('./db');

describe('Characters API', () => {

    let characterData = [];
    beforeEach(() => db.drop());

    const shipData ={
        name: 'Moya',
        healthPoints: 1000,
        damage: 100,
        description: 'A living sentient bio-mechanical space ship.',
        class: 'Leviathan'
    };

    characterData = [
        {
            name: 'Ford Prefect',
            description: 'human/alien travel writer',
            user:'590643bc2cd3da2808b0e651',
            ship: shipData
        }, 
        {
            name: 'Mark Watney',
            description: 'Maritian - colonized a planet on his own',
            user:'590643bc2cd3da2808b0e651',
            ship: shipData
        }
    ];

    it('saves a character', () => {
        return request.post('/api/characters')
            .send(characterData[0])
            .then(({ body }) => assert.equal(body.name, characterData[0].name));
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
                assert.equal(res.body[1].name, 'Mark Watney');
            });
    }),

    it('gets a character by id', () => {
        let savedCharacter = null;
        return request.post('/api/characters')
            .send(characterData[0])
            .then(res => {
                savedCharacter = res.body;
            })
            .then(() => {
                return request.get(`/api/characters/${savedCharacter._id}`);
            
            })
            .then(res => assert.equal(res.body.name, 'Ford Prefect'));
    });

    it('Should update a character', ()=>{
        let savedCharacter = null; 
        return request.post('/api/characters')
            .send(characterData[0])
            .then( res => {
                savedCharacter = res.body;
                characterData[0].name = 'Helena Cain';
                return request.put(`/api/characters/${savedCharacter._id}`)
                    .send(characterData[0]);
            })
            .then(res => assert.deepEqual(res.body.nModified === 1, true));
    });

    it('Deletes Character by ID', () =>{
        let savedCharacter = null;
        return request.post('/api/characters')
            .send(characterData[0])
            .then(res => {
                savedCharacter = res.body;
                return request.delete(`/api/characters/${savedCharacter._id}`);
            })
            .then( res => assert.deepEqual(res.body, { removed: true}));        
    });
});