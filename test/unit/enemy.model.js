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

    it('Checks for required fields', () => {
        const enemy = new Enemy({});
        const { errors } = enemy.validateSync();
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.Damage.kind, 'required');
        assert.equal(errors.HealthPoints.kind, 'required');
    });
});