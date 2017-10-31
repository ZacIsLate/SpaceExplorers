const assert = require('chai').assert;
const mongoose = require('mongoose'); 
const request = require('./request'); 

describe('enemy API', () => {
    const enemy = {
        name: 'Advanced Cylon War Raider Battalion',
        damage: 25,
        healthPoints: 55,
    };
    const environment = {
        name: 'Astroid Field',
        dmg: 25,
        description: 'The asteroid belt is the circumstellar disc in the Solar System located roughly between the orbits of the planets Mars and Jupiter. It is occupied by numerous irregularly shaped bodies called asteroids or minor planets.',
        globalDmg: 15
    };
    let savedEnvironment = null;
    let savedEnemy = null;


    beforeEach(() => mongoose.connection.dropDatabase());

    beforeEach(()=>{
        return Promise.all([
            request.post('/api/enemies')
                .send(enemy)
                .then(res => re)
        ])
    });

});