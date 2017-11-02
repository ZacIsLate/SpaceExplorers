const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');
const User = require('../models/user');
const checkAuth = require('../utils/check-auth');


module.exports = router
    .post('/:id',checkAuth(), (req, res, next) => {
        return Character.findById(req.params.id)
            .then( found =>{
                return new Character({
                    name: found.name,
                    description: found.description,
                    template: false,
                    ship: found.ship,
                    user: req.user.id,
                }).save()
                    .then( saved => {
                        return User.findByIdAndUpdate(req.user.id, {Characters: saved._id})
                            .then( ()=> {
                                res.send({charId:saved._id});
                            });

                    });
            })
            .catch(next);
    });