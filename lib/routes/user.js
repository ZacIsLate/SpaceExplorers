const router = require('express').Router();
const User = require('../models/user');

module.exports = router
    .get('/:id/characters', (req, res, next) =>{
        User.findOne(req.params.id)
            .populate('Characters')
            .then(user => {
                return {userChars: user.Characters };
            })
            .then(result => res.send(result))
            .catch(next);
    });