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
        const result = {};
        getAll(req.params.id)
            .then( ({enemy, ship, spaceEnv, char}) =>{
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
                if(req.body.action ==='Attack'){
                    return resolveAttack(char, enemy, ship, spaceEnv, result)
                        .then( (got) => {
                            return resolveAction(got,result,char,res);
                        }); 
                }
                if(req.body.action ==='Run'){
                    return resolveRun(char, enemy, ship, spaceEnv, result)
                        .then( (got) => {
                            return resolveAction(got,result,char,res);
                        }); 
                }            
            })  
            .catch(next);
    });

function resolveAction(got, result, char, res){
    result.description = got;
    if(result.resolved){
        if(char.log.length >5) result.win = true;
        return Character.update({_id:char._id},
            {
                $push: {log:char.currentEvent.event._id},
                $set: {currentEvent:null} 
            })
            .then( () => {
                res.send({result});
            });
    }
    else {
        res.send({result});
    }
}

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

function resolveRun(char, enemy, ship, spaceEnv, result){
    if(enemy.speed<ship.speed){
        result.resolved = true;
        const description = char.currentEvent.event.actions[1].success.description;
        return Promise.resolve(description);
    }
    if(enemy.speed >= ship.speed){
        ship.healthPoints -= (enemy.damage + spaceEnv.damage + 30);
        return Character.findByIdAndUpdate(char._id,
            {'ship.healthPoints':ship.healthPoints}
        ).then( () => {
            if( ship.healthPoints < 1) { 
                result.resolved = true;
                result.lose = true;
                return `as you were trying to run your ship was destroyed by ${enemy.name}, you died as a coward, with death coming at your back, good job loser`;
            }
            return `You tried to run but ${enemy.name} caught up and inflicted ${enemy.damage + spaceEnv.damage} damage`;
        });
    }
}

function resolveAttack(char, enemy, ship, spaceEnv, result){
    let shipDmg = spaceEnv.globalDmg + Math.floor(Math.random() *ship.damage) + ship.damage;
    enemy.healthPoints -=shipDmg ;
    return Character.findByIdAndUpdate(char._id,   {'currentEvent.enemy.healthPoints':enemy.healthPoints}
    ).then( () => {
        if (enemy.healthPoints < 1 ){
            result.resolved = true;
            const description = char.currentEvent.event.actions[0].success.description;
            return description;
        }
        let enemyDmg =  Math.floor(Math.random() * enemy.damage) + enemy.damage + spaceEnv.damage; 
        ship.healthPoints -= enemyDmg;
        return Character.findByIdAndUpdate(char._id,
            {'ship.healthPoints':ship.healthPoints}
        ).then( () => {
            if( ship.healthPoints < 1) { 
                result.resolved = true;
                result.lose = true;
                return `your ship was destroyed by ${enemy.name}. Try again! Or dont, you already bought the game.`;
            }
            return `you damaged ${enemy.name} for ${shipDmg} damage. Your ship took ${enemyDmg} damage`;
        });
    });
}