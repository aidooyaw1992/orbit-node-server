const Express = require('express');
var model = require('../models/index');
const Joi = require('joi');
const router = Express.Router();

router.get('/', (req, res)=>{
    model.Payment.findAll({
        include: [{model: model.Event}]
    }).then(payments =>{
        res.status(200).json({data: payments});
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            error: err
        });
    }
    );
});

router.post('/add_payment', (req, res) =>{

    const schema = Joi.object().keys({
        amount: Joi.string().required(),
        eventId: Joi.number().required(),
        ownerId: Joi.number().required(),
        paidDate:Joi.date(),
        transactionref:Joi.number(),
        paymentTyoe: Joi.number()
    });

    const {err, value} = Joi.validate(req.body, schema);
    if(err && err.details){
        return res.status(400).json(err);
    }

    model.Payment.create(value).then(payment =>{
        res.status(201).json({
            data: payment,
            message: 'New payment has been created.'
        });
    }).catch(err => console.log(err));
});




module.exports = router;