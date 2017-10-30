const { assert } = require('chai');
const SpaceEnv = require('../../lib/models/spaceEnv');

describe('SpaceEnv Model', () => {
    let envData = null;

    beforeEach(() => envData = {
        name: 'Astroid Field',
        dmg: 25,
        description: 'The asteroid belt is the circumstellar disc in the Solar System located roughly between the orbits of the planets Mars and Jupiter. It is occupied by numerous irregularly shaped bodies called asteroids or minor planets.',
        globalDmg: 15
    });

    it('Valid Model', () => {
        const currentEnv = new SpaceEnv(envData);
        
        assert.ok(!currentEnv.validateSync());
        assert.ok(currentEnv.name);
    });

    it('required fields included', () => {
        delete envData.name;
        const currentEnv = new SpaceEnv(envData);

        assert.equal(currentEnv.validateSync().errors.name.kind, 'required');
    });
});