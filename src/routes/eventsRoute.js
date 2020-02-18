const Express = require('express');
var model = require('../models/index');
const Joi = require('joi');
const router = Express.Router();

router.get('/', (req, res)=>{
    model.Event.findAll({
        include: [
            {model: model.Location},
            {model: model.Payment},
        ]
    }).then(events =>{
        res.status(200).json({data: events});
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            error: err
        });
    }
    );
});

router.post('/add_event', (req, res) =>{

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        locationId: Joi.number(),
        ownerId: Joi.number(),
        startDate:Joi.date(),
        endDate:Joi.date()
    });

    const {err, value} = Joi.validate(req.body, schema);
    if(err && err.details){
        return res.status(400).json(err);
    }
    model.Event.create(value).then(event =>{
        res.status(201).json({
            data: event,
            message: 'New event has been created.'
        });
    }).catch(err => console.log(err));
});




module.exports = router;