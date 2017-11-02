const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');
const spaceEvent = require('../models/event');


module.exports = router
    .get('/character/:id/event', (req, res, next) => {
        Character.findById(req.params.id)
            .then( character => {
                if(character.currentEvent.event) return character.currentEvent;
                else return makeEvent(req.params.id);
            })
            .then(event => {
                return res.send({description:event.event.scenario});
            })
            .catch(next);
    })

    .post('/character/:id/actions', (req, res, next) => {
        console.log('we hit the action route');
        const result = {};
        getAll(req.params.id)
            .then( ({enemy, ship, spaceEnv, char}) =>{
                if(req.body.action ==='attack'){
                    resolveAttack(char, enemy, ship, spaceEnv, result)
                        .then( (got) => {
                            result.description = got;
                            if(result.resolved){
                                Character.findByIdAndUpdate(char._id, {currentEvent:null})
                                    .then( () => {
                                        res.send({result});
                                    });
                            }
                            else res.send({result});
                        }); 
                }
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
        .then( (got) => {
            return Character.findByIdAndUpdate(id,
                {currentEvent:{enemy:got[0].enemy, event:got[0]}},
                {new:true});
        })
        .then(char =>{
            return char.currentEvent;
        }); 
}

function getAll(id){
    return Character.findById(id)
        .then( (char) =>{
            return {
                char,
                enemy: char.currentEvent.enemy,
                ship: char.ship,
                spaceEnv: char.currentEvent.event.spaceEnv
            };
        });
}

function resolveAttack(char, enemy, ship, spaceEnv, result){
    enemy.healthPoints -= (ship.damage+spaceEnv.globalDmg);
    return Character.findByIdAndUpdate(char._id,   {'currentEvent.enemy.healthPoints':enemy.healthPoints}
    ).then( () => {
        if (enemy.healthPoints < 1 ){
            result.resolved = true;
            const description = char.currentEvent.event.actions[0].success.description;
            return description;
        }
        ship.healthPoints -= (enemy.damage + spaceEnv.damage);
        return Character.findByIdAndUpdate(char._id,
            {'ship.healthPoints':ship.healthPoints}
        ).then( () => {
            if( ship.healthPoints < 1) { 
                result.resolved = true;
                result.lose = true;
                return `your ship was destroyed by ${enemy.name}, mourn your losses, regroup and try again`;
            }
            return `you damaged ${enemy.name} for ${ship.damage+spaceEnv.globalDmg}, your ship took ${enemy.damage + spaceEnv.damage} damage`;
        });
    });
}