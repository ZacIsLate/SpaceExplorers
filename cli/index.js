const Game = require('./game');
const service = {
    signUp(){
        return Promise.resolve({token: 'abc'});    
    },
    signIn(){
        return Promise.resolve({_id: '123', token: 'abc'});  
    },
    getCharacters(){
        return Promise.resolve([{_id: '122', name: 'joe'}, {_id: '789', name: 'dan'}, {_id: '345', name: 'sam'} ]);
    },
    loadEvent(){
        return Promise.resolve({description: 'here is what happened', win: false, loose: false, resolved: false});
    }
};

const game = new Game(service);
game.start();