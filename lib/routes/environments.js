const router = require('express').Router();
const Environment = require('../models/Environment');

router
    .post('/', (req, res, next) => {
        new Environment(req.body)
            .save()
            .then(mongoRes => res.send(mongoRes))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Environment.find({})
            .select('name')
            .lean()
            .then(mongoRes => res.send(mongoRes))
            .catch(next);
    });

module.exports = router;