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
    })

    .put('/:id', (req, res, next) => {
        const id = req.params.id;
        if (!id) {
            next({ code: 404, error: `id ${id} does not exist`});
        }
        Character.update({ _id: id }, req.body, (err, data) => res.send(data));
    });

module.exports = router;