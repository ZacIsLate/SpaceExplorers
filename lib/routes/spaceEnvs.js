const router = require('express').Router();
const SpaceEnv = require('../models/spaceEnv');

router
    .post('/', (req, res, next) => {
        new SpaceEnv(req.body)
            .save()
            .then(mongoRes => res.send(mongoRes))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        SpaceEnv.find({})
            .select('name')
            .lean()
            .then(mongoRes => res.send(mongoRes))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        SpaceEnv.findById(req.params.id)
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