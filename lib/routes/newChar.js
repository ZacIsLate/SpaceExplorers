const Router = require('express').Router;
const router = Router();
const Character = require('../models/character');
const User = require('../models/user');
const checkAuth = require('../utils/check-auth');
const Ship = require('../models/ship');


module.exports = router
    .post('/:id',checkAuth(), (req, res, next) => {
        console.log('we got to the new Char with id of:', req.params.id);
        const charData = req.body;
        return Ship.findById(charData.ship)
            .then(foundShip =>{
                return Character.findById(req.params.id)
                    .then( found =>{
                        console.log('charecter found is:', found);
                        return new Character({
                            name: found.name,
                            description: found.description,
                            template: false,
                            ship: foundShip,
                            user: req.user.id,
                        }).save()
                            .then( saved => {
                                console.log('saved char is:', saved);
                                return User.findByIdAndUpdate(req.user.id, {Characters: saved._id})
                                    .then( ()=> {
                                        console.log('sending you back:',{charId:saved._id});
                                        res.send({charId:saved._id});
                                    });
        
                            });
                    });

            })


        
            .catch(next);
    });