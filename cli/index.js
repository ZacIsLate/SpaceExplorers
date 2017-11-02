const Game = require('./game');
const ships = require('../lib/data/ships');
const request = require('../test/e2e/request');

const savedCharacters = [{ _id: '122', name: 'joe' }, { _id: '789', name: 'dan' }, { _id: '345', name: 'sam' }];
const spaceEvents = [
    [{
        description: 'You have been attacked by klingons!!',
        win: false,
        lose: false,
        resolved: false,
        prompts: [
            { text: 'laser beam', action: 'attack' },
            { text: 'talk it out', action: 'diplomacy' },
            { text: 'runaway', action: 'run' }
        ]
    },
    {
        description: 'You have escaped from the klingons!!',
        win: false,
        lose: false,
        resolved: true,
        prompts: [
            { text: 'laser beam', action: 'attack' },
            { text: 'talk it out', action: 'diplomacy' },
            { text: 'runaway', action: 'run' }
        ]
    },
    {
        description: 'Klingons will not negotiate, you have been attacked!!',
        win: false,
        lose: false,
        resolved: false,
        prompts: [
            { text: 'laser beam', action: 'attack' },
            { text: 'talk it out', action: 'diplomacy' },
            { text: 'runaway', action: 'run' }
        ]
    }],
    [{
        description: 'You have been attacked by the Advanced Cylon War Raider Battalion!!',
        win: false,
        lose: false,
        resolved: false,
        prompts: [
            { text: 'Partical cannon', action: 'attack' },
            { text: 'Negotiate', action: 'diplomacy' },
            { text: 'Try to  escape', action: 'run' }
        ]
    },
    {
        description: 'You cannot escape the Advanced Cylon War Raider Battalion!!',
        win: false,
        lose: false,
        resolved: false,
        prompts: [
            { text: 'Partical cannon', action: 'attack' },
            { text: 'Negotiate', action: 'diplomacy' },
            { text: 'Try to  escape', action: 'run' }
        ]
    },
    {
        description: 'You have succesfully negotiated with the Advanced Cylon War Raider Battalion!!',
        win: false,
        lose: false,
        resolved: true,
        prompts: [
            { text: 'Partical cannon', action: 'attack' },
            { text: 'Negotiate', action: 'diplomacy' },
            { text: 'Try to  escape', action: 'run' }
        ]
    }],
    [{
        description: 'You have been attacked by Darth Maul and Count Dooku on a space station!!',
        win: false,
        lose: false,
        resolved: false,
        prompts: [
            { text: 'Photon torpedo', action: 'attack' },
            { text: 'beg for mercy', action: 'diplomacy' },
            { text: 'run', action: 'run' }
        ]
    },
    {
        description: 'You have escaped Count Dooku and Maul!',
        win: false,
        lose: false,
        resolved: true,
        prompts: [
            { text: 'Photon torpedo', action: 'attack' },
            { text: 'beg for mercy', action: 'diplomacy' },
            { text: 'run', action: 'run' }
        ]
    },
    {
        description: 'Darth Maul will give no mercy',
        win: false,
        lose: false,
        resolved: false,
        prompts: [
            { text: 'Photon torpedo', action: 'attack' },
            { text: 'beg for mercy', action: 'diplomacy' },
            { text: 'run', action: 'run' }
        ]
    }],
    [{win: true, description: 'You have found a new home planet'}]
];
let counter = -1;
let newEvent;
let token = '';

const service = {
    signUp(info) {
        return request.post('/api/signup')
            .send(info)
            .then(({body: infoRes }) => infoRes);
        //Should post a new user and return to game object with id and token property.
        // console.log('Guest would like to create an account with: ', info);
        // return Promise.resolve({ _id: '123333', token: 'abc' });
    },
    signIn(info) {
        return request.post('/api/signin')
            .set('Authorization', token)
            .send(info)
            .then(({ body: infoRes}) => infoRes);
        //Should get a user from the database and return an object to the id and token property.
        // console.log('Guest would like to sign in with: ', info);
        // return Promise.resolve({ _id: '123', token: 'abc' });
    },
    getShips(){
        return request.get('/api/ships')
            .then( res => res.body );
        // return Promise.resolve(ships.map( ship => {
        //     ship._id = `123${ship.name}122345`;
        //     return ship;
        // }));
    },
    saveCharacter(characterData){
        return request.post('/api/newchars')
            .send(characterData)
            .then(({ body: charId}) => charId);
        // console.log(characterData, 'saved!');
        // const newCharacter = { _id: '445533', name: characterData['character name'] };
        // savedCharacters.push(newCharacter);
        // return Promise.resolve(characterData);
    },
    getCharacters(userId) {
        return request.get(`/api/characters/${userId._id}`)
            .then()
        //Should return to the game an array of objects containing all characters corresponding to the userId.
        // console.log('Characters stored under this user: ', userId);
        // return Promise.resolve(savedCharacters);
    },
    loadEvent() {
        //Should return to a random event description object to the game.
        counter++;
        newEvent = spaceEvents[counter];
        return Promise.resolve(newEvent[0]);
    },
    resolveAction(option) {
        //Should return an event description object based an a provided option. 
        console.log('User choice: ', option);
    
        if (option.action === 'attack') {
            return Promise.resolve(newEvent[0]);
        } else if (option.action === 'run'){
            return Promise.resolve(newEvent[1]);
        } else if(option.action === 'diplomacy'){
            return Promise.resolve(newEvent[2]);
        }

    }
};


const game = new Game(service);
game.start();