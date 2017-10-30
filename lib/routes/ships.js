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
    });

module.exports = router;