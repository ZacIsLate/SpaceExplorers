const Router = require('express').Router;
const router = Router();
// const Character = require('../models/character');
const request = require('../../test/e2e/request');

module.exports = router
    .get('/character/:id/actions', (req, res, next) => {
        console.log('we got to the correct get!');
        console.log('params are:',req.params.id);
        const characterId = req.params.id;
        return request.get(`/api/characters/${characterId}`)
            .populate('log.currentEvent')
            .populate('log.allEvents')
            .then(character => {
                res.json(character);
            })
            .catch(next);
    });