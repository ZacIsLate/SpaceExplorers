const Game = require('./game');
const ships = require('./lib/data/ships');

const service = {
    signUp(info) {
        //Should post a new user and return to game object with id and token property.
        console.log('Guest would like to create an account with: ', info);
        return Promise.resolve({ _id: '123333', token: 'abc' });
    },
    signIn(info) {
        //Should get a user from the database and return an object to the id and token property.
        console.log('Guest would like to sign in with: ', info);
        return Promise.resolve({ _id: '123', token: 'abc' });
    },
    getShips(){
        return Promise.resolve(ships.map( ship => {
            ship._id = `123${ship.name}122345`;
            return ship;
        }));
    },
    getCharacters(userId) {
        //Should return to the game an array of objects containing all characters corresponding to the userId.
        console.log('Characters stored under this user: ', userId);
        return Promise.resolve([{ _id: '122', name: 'joe' }, { _id: '789', name: 'dan' }, { _id: '345', name: 'sam' }]);
    },
    loadEvent() {
        //Should return to a random event description object to the game.
        return Promise.resolve({
            description: 'You have been attacked by klingons!!',
            win: false,
            lose: false,
            resolved: false,
            prompts: [
                { text: 'laser beam', action: 'attack' },
                { text: 'talk it out', action: 'diplomacy' },
                { text: 'runaway', action: 'run' }
            ]
        });
    },
    resolveAction(option) {
        //Should return an event description object based an a provided option. 
        console.log('User choice: ', option);
        if (option.action === 'attack') {
            return Promise.resolve({
                description: 'You have been attacked by klingons!!',
                win: false,
                lose: false,
                resolved: false,
                prompts: [
                    { text: 'laser beam', action: 'attack' },
                    { text: 'talk it out', action: 'diplomacy' },
                    { text: 'runaway', action: 'run' }
                ]
            });
        } else {
            return Promise.resolve({
                description: 'You have been attacked by klingons!!',
                win: false,
                loose: false,
                resolved: true,
                prompts: [
                    { text: 'laser beam', action: 'attack' },
                    { text: 'talk it out', action: 'diplomacy' },
                    { text: 'runaway', action: 'run' }
                ]
            });
        }
    }
};


const game = new Game(service);
game.start();