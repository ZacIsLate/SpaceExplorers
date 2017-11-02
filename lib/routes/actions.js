const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');
const result = {};
const spaceEvent = require('../models/event');


module.exports = router
    .get('/character/:id/getEvent', (req, res, next) => {
        Character.findById(req.params.id)
            .then( character => {
                if(character.currentEvent.event) return character.currentEvent;
                return makeEvent(req.params.id);
            })
            .then(event => {
                console.log('in get event is', event);
                return res.send(event.scenario);
            })
            .catch(next);
    })

    .post('/character/:id/actions', (req, res, next) => {
        getAll(req.params.id)
            .then( ({enemy, ship, spaceEnv, char}) =>{
                result.description = resolveAttack(char,enemy,ship,spaceEnv);
                res.send({result});
            })
            .catch(next);
    });

function makeEvent(id){
// should return finished version of the current character including enemy
    return spaceEvent.findOne()
        .skip(Math.floor(Math.random() * spaceEvent.count))
        .populate('enemy')
        .then( event => {
            console.log('in make event random found event is', event);
            return Character.findByIdAndUpdate(id, {currentEvent:event._id})
                .then( char => {
                    return char.enemy = event.enemy;
                });
        }); 
}

function getAll(id){
    return Character.findById(id)
        .populate({
            path:'currentEvent.event',
            populate:'spaceEnv' 
        })
        .then( (char) =>{
            return {
                char,
                enemy:char.currentEvent.enemy,
                ship: char.ship,
                spaceEnv: char.currentEvent.spaceEnv
            };
        });
}

function resolveAttack(char, enemy, ship, spaceEnv){
    enemy.healthPoints -= (ship.damage+spaceEnv.globalDmg);
    if( enemy.healthPoints < 1 ){
        result.resolved = true;
        return Character.findByIdAndUpdate(char._id, {currentEvent:null})
            .then( () => {
                return char.currentEvent.event.actions[0].success.description;
            });
    }
    ship.healthPoints -= (enemy.damage + spaceEnv.damage);        
    if( ship.healthPoints < 1) { 
        result.resolved = true;
        result.lose = true;
        return `your ship was destroyed by ${enemy.name}, mourn your losses, regroup and try again`;
    }
    return `you damaged ${enemy.name} for ${ship.damage+spaceEnv.globalDmg}, your ship took ${enemy.damage + spaceEnv.damage} damage`;
}