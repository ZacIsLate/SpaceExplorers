const router = require('express').Router();
const SpaceEvent = require('../models/event');


module.exports = router
    .post('/', (req, res, next) => {
        const Events = Array.isArray(req.body) ? req.body : [req.body];
        Promise.all(Events.map(event => new SpaceEvent(event).save()))
            .then(got => {
                got.length < 2 ? res.json(got[0]) : res.json(got);
            })
            .catch(next);
    })

    .get('/', (req, res, next) =>{
        SpaceEvent
            .find()
            .lean()
            .then(events => res.json(events))
            .catch(next);  
    })

    .put('/:id', (req, res, next) => {
        const id = req.params.id;
        if (!id) {
            next({ code: 404, error: `id ${id} does not exist`});
        }
        SpaceEvent.update({ _id: id }, req.body, (err, data) => res.send(data));
    })

    .get('/:id', (req, res) =>{
        console.log('we are in get:', req.params.id);
        SpaceEvent
            .findById(req.params.id)
            .populate('enemy', 'name')
            .lean()
            .then( event => {
                console.log('this is what we are sending',event);
                res.json(event);
            })
            .catch((err)=> console.log('error is:',err));
    })

    .delete('/:id', (req, res, next) => {
        SpaceEvent.findByIdAndRemove(req.params.id)
            .then(result => {
                const exist = result !=null;
                res.json({removed: exist });
            })
            .catch(next);
    });
