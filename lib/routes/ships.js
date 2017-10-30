const router = require('express').Router();
const Ship = require('../models/ship');

router
    .post('/', (req, res, next) => {
        new Ship(req.body)
            .save()
            .then(mongoRes => res.send(mongoRes))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Ship.find({})
            .select('name')
            .lean()
            .then(mongoRes => res.send(mongoRes))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Ship.findById(req.params.id)
            .lean()
            .then(mongoRes => {
                if(!mongoRes) {
                    res.statusCode = 404;
                    res.send(`id: ${req.params.id} does not exist`);
                }
                else res.json(mongoRes);
            })
            .catch(next);
    });

module.exports = router;