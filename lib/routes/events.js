const router = require('express').Router();
const SpaceEvent = require('../models/event');

module.exports = router
    .post('/', (req, res, next) => {
        const Events = Array.isArray(req.body) ? req.body : [req.body];
        Promise.all(Events.map(event => new SpaceEvent(event).save()))
            .then(got => {
                got.length < 2 ? res.json(got[0]) : res.json(got);
            })
            .catch(next);
    })

    .get('/', (req, res, next) =>{
        SpaceEvent
            .find()
            .lean()
            .then(events => res.json(events))
            .catch(next);  
    })

    .get('/:id', (req, res, next) =>{
        SpaceEvent
            .findById(req.params.id)
            .then( event => res.json(event))
            .catch(next);
    });
