const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');
const Enemy = require('../models/enemy');
const SpaceEnv = require('../models/spaceEnv');
let enemy = null;
let ship = null;
let char = null;
let spaceEnv = null;
let eventAction = null;

module.exports = router
    .post('/character/:id/actions', (req, res, next) => {
        getAll(req.params.id)
            .then( () =>{
    
                res.send(enemy);
            })
            .catch(next);
    });


function getChar(id){
    return Character.findById(id)
        .populate('log.currentEvent')
        .populate('log.allEvents');
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
                getEnemy(char.log.currentEvent.enemy)
                    .then( (got) =>{
                        enemy = got;
                    }),
                getEnv(char.log.currentEvent.spaceEnv)
                    .then( env => spaceEnv = env)
            ]);
        });
}

function 