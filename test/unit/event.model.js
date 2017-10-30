const assert = require('chai').assert;
const Event = require('../../lib/models/event');


describe('Event model', ()=>{

    it('Validates a good enemy model', () => {
         
        const event = new Event({
            scenario: 'You have encountered an Advanced Cylon War Raider Battalion inside of an astroid field!',
            enviornment: '590643bc2cd3da2808b0e651', 
            enemy: '590643bc2cd3da2808b0e651',
            actions: ['attack', 'diplomacy','run']

        });
        assert.equal(event.validateSync(), undefined);
    });
});