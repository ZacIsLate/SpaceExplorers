const router = require('express').Router();
const Enemy = require('../models/enemy');

module.exports = router
    .post('/', (req, res, next) => {
        const Enemies = Array.isArray(req.body) ? req.body : [req.body];
        Promise.all(Enemies.map(enemy => new Enemy(enemy).save()))
            .then(got => {
                got.length < 2 ? res.json(got[0]) : res.json(got);
            })
            .catch(next);
    })

    .get('/', (req, res, next) =>{
        Enemy
            .find()
            .lean()
            .then(enemies => res.json(enemies))
            .catch(next);  
    })

    .get('/:id', (req, res, next) =>{
        Enemy
            .findById(req.params.id)
            .then( enemy => res.json(enemy))
            .catch(next);
    });