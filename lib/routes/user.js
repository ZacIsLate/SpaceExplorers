const router = require('express').Router();
const User = require('../models/user');
const checkAuth = require('../utils/check-auth');

module.exports = router
    .get('/:id/characters', checkAuth(), (req, res, next) =>{
        User.findById(req.params.id)
            .populate('Characters')
            .then(user => {
                return {userChars: user.Characters };
            })
            .then(result =>{
                res.send(result);
            })
            .catch(next);
    });