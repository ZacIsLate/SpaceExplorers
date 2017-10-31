const router = require('express').Router();
const Event = require('../models/event');

module.exports = router
    .post('/', (req, res, next) => {
        const Events = Array.isArray(req.body) ? req.body : [req.body];
        Promise.all(Events.map(event => new Event(event).save()))
            .then(got => {
                got.length < 2 ? res.json(got[0]) : res.json(got);
            })
            .catch(next);
    })