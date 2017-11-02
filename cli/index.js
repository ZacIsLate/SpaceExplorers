const Game = require('./game');
const request = require('superagent');

let token = '';

const service = {
    signUp(info) {
        return request.post('/api/auth/signup')
            .send(info)
            .then(({body: infoRes }) => infoRes);
        //Should post a new user and return to game object with id and token property.
    },
    signIn(info) {
        return request.post('/api/auth/signin')
            .send(info)
            .then(({ body: infoRes}) => infoRes);
        //Should get a user from the database and return an object to the id and token property.
    },
    getShips(){
        return request.get('/api/ships')
            .then( res => res.body );
    },
    saveCharacter(characterData){
        return request.post(`/api/newcharacter/${characterData._id}`)
            .send(characterData)
            .then(({ body: charId}) => charId);
    },
    getCharacterTemplates() {
        return request.get('/api/characters')
            .then(({ body: newChar}) => newChar);
    },
    getCharacters(userId) {
        return request.get(`/api/characters/${userId._id}`)
            .set('Authorization', token)
            .then(({ body: userRes }) => userRes);
        //Should return to the game an array of objects containing all characters corresponding to the userId.
    },
    loadEvent(characterId) {
        return request.get(`/api/game/character/${characterId._id}/event`)
            .then(({ body: newEvent }) => newEvent);
        //Should return to a random event description object to the game.
    },
    resolveAction(option) {
        return request.post(`/api/game/character/${option.char_id}/event`)
            .then(({body: optionRes}) => optionRes);
        //Should return an event description object based an a provided option. 
    }
};


const game = new Game(service);
game.start();