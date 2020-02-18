const Express =require('express');
const model = require('../models/index');
const Joi = require('joi');

const router = Express.Router();

router.get('/', (req, res) => {
    model.Location.findAll({})
    .then((locations) => res.json({
        data: locations,
        error: false
    })).catch(error => res.json({
            error: error,
        })
    );
});

router.post('/add_location', (req, res) =>{
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        region: Joi.string(),
        town: Joi.string()
    });

    
    const {err, value} = Joi.validate(req.body, schema);
    if(err && err.details){
        return res.status(400).json(err);
    }
    model.Location.create(value).then(location =>{
        res.status(201).json({
            data: location,
            message: 'New location has been created.'
        });
    }).catch(err => console.log(err));
});

module.exports= router;