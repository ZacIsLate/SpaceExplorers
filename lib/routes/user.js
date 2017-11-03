const router = require('express').Router();
const User = require('../models/user');

module.exports = router
    .get('/:id/characters', (req, res, next) =>{
        console.log('we got to get');
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