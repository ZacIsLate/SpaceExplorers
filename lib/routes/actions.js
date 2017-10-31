const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');

module.exports = router
    .post('/character/:id/actions', (req, res, next) => {
        let char = null;
        let enemy = null;
        let ship = null;
        const characterId = req.params.id;
        const action = req.body.action;
        console.log('action is:', action);
        Character.findById(characterId)
            .populate('log.currentEvent')
            .populate('log.allEvents')
            .then( got => {
                char = got;

            })



            .catch(next);
    });