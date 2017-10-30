const assert = require('chai').assert;
const Event = require('../../lib/models/event');


describe('Event model', ()=>{

    it('Validates a good enemy model', () => {
         
        const event = new Event({
            scenario: 'You have encountered an Advanced Cylon War Raider Battalion inside of an astroid field!',
            enviornment: '590643bc2cd3da2808b0e651', 
            enemy: '590643bc2cd3da2808b0e651',
            actions: [
                {
                    option: 'Attack',
                    description: 'You have decided to engage the Advanced Cylon War Raider Battalion',
                },
                {
                    option: 'Diplomacy',
                    description: 'You have decided to negotiate with the Advanced Cylon War Raider Battalion'
                }, 
                {
                    option: 'Run',
                    description: 'You have decided to run away from the Advanced Cylon War Raider Battalion'
                }
            ]
        });
        assert.equal(event.validateSync(), undefined);
    });

    it('Checks for required fields', () => {
        const event = new Event({});
        const { errors } = event.validateSync();
        assert.equal(errors.scenario.kind, 'required');
        assert.equal(errors.enviornment.kind, 'required');
        assert.equal(errors.enemy.kind, 'required');
    });
});