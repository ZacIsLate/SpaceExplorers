const router = require('express').Router();
const User = require('../models/user');
const checkAuth = require('../utils/check-auth');

module.exports = router
    .get('/:id/characters', checkAuth(), (req, res, next) =>{
        console.log('we got to get');
        if (req.user.id !== req.params.id) throw { code:401, error: 'You are not allowed to change other users'};
        User.findById(req.params.id)
            .populate('Characters')
            .then(user => {
                console.log('this is user', user);
                return {userChars: user.Characters };
            })
            .then(result =>{
                console.log('this is what server send back', result);
                res.send(result);
            })
            .catch(next);
    });