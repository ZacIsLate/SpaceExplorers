const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');

router

    .post('/', (req, res, next) => {
        new Character(req.body).save()
            .then(result => res.json(result))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const characterId = req.params.id;
        Character.findById(characterId)
            .then(character => {
                res.json(character);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Character.find()
            .then(result => res.json(result))
            .catch(next);
    });

module.exports = router;