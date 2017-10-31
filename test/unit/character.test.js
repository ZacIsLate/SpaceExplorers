const assert = require('chai').assert;
const Character = require('../../lib/models/character');

describe( 'Character model', () => {
    
    it('check if good model', () => {
        const character = new Character({
            name: 'Ellen Ripley',
            description: 'Warrant officer who survived multiple encounters with Xenomorphs',
            ship:{
                name: 'Moya',
                hp: 1000,
                dmg: 100,
                description: 'A living sentient bio-mechanical space ship.',
                class: 'Leviathan'
            },
            user: '590643bc2cd3da2808b0e651'
        });
        assert.equal(character.validateSync(), undefined);
    });

    it('checks required fields', () => {
        const character = new Character({ 
            ship:{
                description: 'A living sentient bio-mechanical space ship.',
                class: 'Leviathan'
            }
        });
        const { errors } = character.validateSync();
        assert.equal(errors.name.kind, 'required');
    });
    
    it('checks for nested required fields', () => {
        const character = new Character({ 
            ship:{
                description: 'A living sentient bio-mechanical space ship.',
                class: 'Leviathan'
            },
            log: ['badid']
        });
        const { errors } = character.validateSync();
        assert.equal(errors['ship.name'].kind, 'required');
        assert.equal(errors['ship.hp'].kind, 'required');
        assert.equal(errors['ship.dmg'].kind, 'required');
        assert.equal(errors.log.kind, 'required');
    });

});