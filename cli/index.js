const Game = require('./game');
const request = require('superagent');
const API_URL = 'https://zacIsLate.herokuapp.com/api';

let token = '';
const service = {
    signUp(info) {
        console.log('we are hitting sign up in index and the info is', info);
        return request.post(`${API_URL}/auth/signup`)
            .send(info)
            .then(({body}) => {
                token = body.token;
                console.log('we got body back', body);
                return body;
            });
        //Should post a new user and return to game object with id and token property.
    },
    signIn(info) {
        return request.post(`${API_URL}/auth/signin`)
            .send(info)
            .then(({ body: infoRes}) => infoRes);
        //Should get a user from the database and return an object to the id and token property.
    },
    getShips(){
        return request.get(`${API_URL}/ships`)
            .then( res => res.body );
    },
    saveCharacter(characterData){
        console.log('save char with this id',characterData['Character choice']);
        return request.post(`${API_URL}/newChar/${characterData['Character choice']}`)
            .set('Authorization', token)
            .send(characterData)
            .then(({ body: charId}) => charId);
    },
    getCharacterTemplates() {
        console.log('we got to charecter Templates');
        return request.get(`${API_URL}/characters`)
            .set('Authorization', token)
            .then(({ body: newChar}) => newChar);
    },
    getCharacters(userId) {
        console.log('we got to get charecters user id is:', userId);
        return request.get(`${API_URL}/characters/${userId}`)
            .set('Authorization', token)
            .then(({body}) =>{
                console.log('we got body from get charecters', body);
                return body;
            });
        //Should return to the game an array of objects containing all characters corresponding to the userId.
    },
    loadEvent(characterId) {
        return request.get(`${API_URL}/character/${characterId._id}/event`)
            .then(({ body: newEvent }) => newEvent);
        //Should return to a random event description object to the game.
    },
    resolveAction(option) {
        return request.post(`${API_URL}/game/character/${option.char_id}/event`)
            .then(({body: optionRes}) => optionRes);
        //Should return an event description object based an a provided option. 
    }
};


const game = new Game(service);
game.start();