const router = require('express').Router();
const User = require('../models/user');
const tokenService = require('../utils/token-service');

module.exports = router
    .post('/signup', (req, res, next) => {
        const {name, password} = req.body;
        delete req.body.password;
        delete req.body.roles;

        if (!password) throw { code:400, error: 'password is required!'};

        User.nameExists(name)
            .then( exists => {
                if (exists) throw { code: 400, error: 'this Username is already taken'};
        
                const user = new User(req.body);
                user.generateHash(password);
                return user.save();

            })
            .then(user => tokenService.sign(user))
            .then(token => res.send({ token }))
            .catch(next);

    })

    .post('/signin', (req, res, next) => {
        const { name, password } = req.body;
        delete req.body.password;

        if(!password) throw { code: 400, error: 'password is required'};
        
        User.findOne({ name })
            .then(user => {
                if(!user || !user.comparePassword(password)) {
                    throw { code: 401, error: 'authentication failed' };
                }
                return tokenService.sign(user);
            })
            .then(token => res.send({ token }))
            .catch(next);
    });

