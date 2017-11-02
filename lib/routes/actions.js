const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');
const result = {};
const spaceEvent = require('../models/event');


module.exports = router
    .get('/character/:id/event', (req, res, next) => {
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
    return spaceEvent.aggregate([
        {$sample:{ size:1} },
        {
            $lookup:{
                from:'enemies',
                localField: 'enemy',
                foreignField: '_id',
                as: 'enemy'
            }
        },
        {
            $lookup:{
                from:'spaceenvs',
                localField: 'spaceEnv',
                foreignField: '_id',
                as: 'spaceEnv'
            }
        },
        {$unwind:'$enemy'},
        {$unwind:'$spaceEnv'}
    ])
        .then( ([event]) => {
            return Character.findByIdAndUpdate(id,
                {currentEvent:{enemy:event.enemy, event:event._id}},
                {new:true});
        })
        .then(char =>{
            return char.currentEvent;
        }); 
}

function getAll(id){
    return Character.findById(id)
        .populate({
            path:'currentEvent.event',
            populate: {path:'spaceEnv'} 
        })
        .then( (char) =>{
            return {
                char,
                enemy: char.currentEvent.enemy,
                ship: char.ship,
                spaceEnv: char.currentEvent.event.spaceEnv
            };
        });
}

function resolveAttack(char, enemy, ship, spaceEnv){
    enemy.healthPoints -= (ship.damage+spaceEnv.globalDmg);
    if( enemy.healthPoints < 1 ){
        result.resolved = true;
        const description = char.currentEvent.event.actions[0].success.description;
        Character.findByIdAndUpdate(char._id, {currentEvent:null})
            .then( () => {
                return description;
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