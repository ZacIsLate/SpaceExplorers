const router = require('express').Router();
const Ship = require('../models/Ship');

router
    .post('/', (req, res, next) => {
        new Ship(req.body)
            .save()
            .then(mongoRes => res.send(mongoRes))
            .catch(next);
    });

module.exports = router;