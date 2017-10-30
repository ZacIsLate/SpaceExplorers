const assert = require('chai').assert;
const Enemy = require('../../lib/models/enemy');


describe('Enemy model', ()=>{

    it('Validates a good enemy model', () => {
        const enemy = new Enemy({
            name: 'Advanced Cylon War Raider Battalion',
            Damage: 25,
            HealthPoints: 55, 
        });
        assert.equal(enemy.validateSync(), undefined);
    });
});