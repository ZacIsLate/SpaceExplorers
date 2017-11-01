const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');
const result = {};
const spaceEvent = require('../models/event');


module.exports = router
    .get('/character/:id/getEvent', (req, res, next) => {
        console.log('we hit the get event route');
        Character.findById(req.params.id)
            .then( character => {
                if(character.currentEvent.event) return character.currentEvent;
                return makeEvent(req.params.id);
            })
            .then(event => {
                return res.send({description:event.scenario});
            })
            .catch(next);
    })

    .post('/character/:id/actions', (req, res, next) => {
        console.log('we hit the action route');
        getAll(req.params.id)
            .then( ({enemy, ship, spaceEnv, char}) =>{
                if(req.body.action ==='attack'){
                    result.description = resolveAttack(char,enemy,ship,spaceEnv);
                }
                res.send({result});
            })
            .catch(next);
    });

function makeEvent(id){
    return spaceEvent.findOne()
        .skip(Math.floor(Math.random() * spaceEvent.count))
        .populate('enemy')
        .lean()
        .then( event => {
            console.log('event.enemy is',event.enemy);
            return Character.findByIdAndUpdate(id, {'currentEvent.enemy':event.enemy},{new:true})
                .then( (char) => {
                    console.log('charecter thats updated is:', char.currentEvent.enemy);
                    return event;
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