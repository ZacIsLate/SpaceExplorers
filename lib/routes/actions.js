const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');
const spaceEvent = require('../models/event');


module.exports = router
    .get('/character/:id/event', (req, res, next) => {
        Character.findById(req.params.id)
            .then( character => {
                if(character.currentEvent.event){
                    res.send({result:{
                        description: character.currentEvent.event.scenario,
                        prompts:[
                            {
                                text:character.currentEvent.event.actions[0].option,
                                action:character.currentEvent.event.actions[0].option
                            },
                            {
                                text:character.currentEvent.event.actions[1].option,
                                action:character.currentEvent.event.actions[1].option
                            },
                            {
                                text:character.currentEvent.event.actions[2].option,
                                action:character.currentEvent.event.actions[2].option
                            }
                        ]
                    }});
                } else return makeEvent(req.params.id)
                    .then(event => {
                        return res.send({result:{
                            description:event.event.scenario,
                            prompts:[
                                {
                                    text:event.event.actions[0].option,
                                    action:event.event.actions[0].option
                                },
                                {
                                    text:event.event.actions[1].option,
                                    action:event.event.actions[1].option
                                },
                                {
                                    text:event.event.actions[2].option,
                                    action:event.event.actions[2].option
                                }
                            ]
                        }});
                    });
            })
            .catch(next);
    })

    .post('/character/:id/actions', (req, res, next) => {
        console.log('we are hitting actions with id and body of:', req.params.id, req.body);
        const result = {};
        getAll(req.params.id)
            .then( ({enemy, ship, spaceEnv, char}) =>{
                if(req.body.action ==='Attack'){
                    return resolveAttack(char, enemy, ship, spaceEnv, result)
                        .then( (got) => {
                            result.description = got;
                            if(result.resolved){
                                if(char.log.length >5) result.win = true;
                                return Character.update({_id:char._id},
                                    {
                                        $push: {log:char.currentEvent.event._id},
                                        $set: {currentEvent:null} 
                                    })
                                    .then( () => {
                                        console.log('we are sending back resolved event of',result);
                                        res.send({result});
                                    });
                            }
                            else {
                                console.log('we are sending back undersolved event of',result);
                                res.send({result});
                            }
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
    result.prompts=[
        {
            text:char.currentEvent.event.actions[0].option,
            action:char.currentEvent.event.actions[0].option
        },
        {
            text:char.currentEvent.event.actions[1].option,
            action:char.currentEvent.event.actions[1].option
        },
        {
            text:char.currentEvent.event.actions[2].option,
            action:char.currentEvent.event.actions[2].option
        }
    ];
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