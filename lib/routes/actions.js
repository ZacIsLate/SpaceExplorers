const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');
const Enemy = require('../models/enemy');
const SpaceEnv = require('../models/spaceEnv');
let enemy = null;
let ship = null;
let char = null;
let spaceEnv = null;
//let eventAction = null;

module.exports = router
    .post('/character/:id/actions', (req, res, next) => {
        getAll(req.params.id)
            .then( () =>{
                console.log(' char ship and ship is', char.ship, ship);
                console.log(' enemy and current event enemy is', char.currentEvent.enemy, enemy);
                console.log(' char currentEvent is', char.currentEvent.event);
                console.log(' char current event env and Space env is', char.currentEvent.event.spaceEnv, spaceEnv);
                // let result = resolveAttack(enemy,ship,spaceEnv);
                res.send({win:true});
            })
            .catch(next);
    });


function getChar(id){
    return Character.findById(id)
        .populate('log.currentEvent')
        .populate('log.allEvents')
        .populate('currentEvent.event');
}

function getEnemy(id){
    return Enemy.findById(id)
        .lean();
}
function getEnv(id){
    return SpaceEnv.findById(id)
        .lean();
}


function getAll(id){
    return getChar(id)
        .then( (got) =>{
            char = got;
            ship = got.ship;
        })
        .then( () => {
            return Promise.all([
                getEnemy(char.currentEvent.event.enemy)
                    .then( (got) =>{
                        enemy = got;
                        return char.currentEvent.enemy = got;
                    }),
                getEnv(char.currentEvent.event.spaceEnv)
                    .then( env => spaceEnv = env)
            ]);
        });
}


// function resolveAttack(enemy, ship, spaceEnv){
//     let startHealth = ship.healthPoints;
//     while(true) {
//         let enemyHealth = enemy.healthPoints-ship.damage-spaceEnv.globalDmg;
//         if( enemyHealth < 1 ){
//             if (ship.healthPoints < startHealth/2) {
//                 return char.log.currentEvent.actions[0].failure.description;
//             } else char.log.currentEvent.actions[0].success.description;
//         }
//         ship.healthPoints -= (enemy.damage + spaceEnv.damage);
//         if( (ship.healthPoints-enemy.damage-spaceEnv.damage) < 1) { 
//             return `your ship was destroyed by ${enemy.name}, mourn your losses, regroup and try again`;
//         }
//     }
// }