const assert = require('chai').assert;
const Character = require('../../lib/models/character');

describe( 'Character model', () => {
    
    it('check if good model', () => {
        const character = new Character({
            name: 'Ellen Ripley',
            description: 'Warrant officer who survived multiple encounters with Xenomorphs',
            ship:'590643bc2cd3da2808b0e651',
            user: '590643bc2cd3da2808b0e651'
        });
        assert.equal(character.validateSync(), undefined);
    });

    it('checks required fields', () => {
        const character = new Character({ });
        const { errors } = character.validateSync();
        assert.equal(errors.name.kind, 'required');
    });

});