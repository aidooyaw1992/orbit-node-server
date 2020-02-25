const saltRounds = 10;
const Express = require('express');
const Joi = require('joi');
const bcrypt = require("bcrypt");
var model = require('../models/index');

const router = Express.Router();


router.post('/login', (req, res) => {

    model.User.findOne({
        where: {username: req.body.username},
    }).then(user => {
        // console.log(user);
        if(user !== null){
            bcrypt.compare(req.body.password, user.password).then(user => {
                console.log(user);
                res.status(200).json({data: user, message:"login successful"});
            }).catch(err => res.status(400).json({error: err}));
        }else{
            res.status(200).json({message:"No User Found"});
        }

    }).catch(err => console.log(err));

});

router.post('/register',  (req, res) =>{

    // define the validation schema
    const schema  = Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        passwd: Joi.string().required(),
        firstname: Joi.string(),
        lastname: Joi.string(),
    });

    const {err, value} = Joi.validate(req.body, schema);
    if(err && err.details){
        return res.status(400).json(err);
    }

    bcrypt.hash(value.password, saltRounds).then(hash => {
        // console.log(hash);
        value.password = hash;

        model.User.create(value)
            .then(user => res.status(201).json({
                data: user,
                message: 'New user has been created.'
            })).catch(error => res.status(400).json({error: error['errors']})
        );

    }).catch(err => console.log(err));

});

module.exports = router;