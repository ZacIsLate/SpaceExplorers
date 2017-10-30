const { assert } = require('chai');
const Ship = require('../../lib/models/Ship');

describe('Ship Model', () => {
    let shipData = null;

    beforeEach(() => shipData = {
        name: 'Moya',
        hp: 1000,
        dmg: 100,
        description: 'A living sentient bio-mechanical space ship.',
        class: 'Leviathan'
    });

    it('Valid Model', () => {
        const farScape = new Ship(shipData);

        assert.ok(!farScape.validateSync());
        assert.ok(farScape.name);
    });
    it(' required fields include', () => {
        delete shipData.name;
        const farScape = new Ship(shipData);

        assert.equal(farScape.validateSync().errors.name.kind, 'required');
    });
});