const Express =require('express');
const router = Express.Router();
const Joi = require('joi');
var model = require('../models/index');
const moment = require('moment');
const csv = require('csv-parser');
const fs = require('fs');
const twilio = require('twilio');
const dotenv= require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

router.get('/', (req, res) => {
    model.Attendee.findAll({
        include: [{
                model: model.Event,
                include:[
                    {
                        model: model.Location
                    },
                    {
                        model: model.User,
                        attributes: ['firstName', 'lastName'],
                    },
                ]
            }]
    })
    .then((attendees) => {
        console.log(accountSid);

        return res.json({
            error: false,
            data: attendees
        })
    }).catch(error => res.json({
            error: true,
            error: error
        })
    );
});

router.post('/attendees_add',  (req, res) =>{

    // define the validation schema
    const schema  = Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().email(),
        ownerId: Joi.number().integer().required(),
        eventId: Joi.number().integer().required(),
        position: Joi.string(),
        phone: Joi.string(),
        organization: Joi.string(),
    });

    const {err, value} = Joi.validate(req.body, schema);
    if(err && err.details){
        return res.status(400).json(err);
    }

    model.Event.findOne({
        where: {id: value.eventId},
    }).then(event => {
        // console.log(event);
        if(event != null){

            model.Attendee.create(value)
            .then(attendee => {

                // twilioClient.messages.create({
                //     body: `hi there ${attendee.fullName}, you have been successfully registered for the event ${event.name} on ${event.startDate}`,
                //     from: '+19727930249',
                //     to: value.phone
                // }).then(message => {
                //     console.log(message.sid);
                // }).catch(err => {
                //     console.log(err);
                //     return res.json(err);
                // });

                res.status(201).json({
                    data: attendee,
                    message: 'New attendee has been created.'
                });

            }).catch(error => {
                console.log(error);
                res.status(400).json({error: error});
            });

        }else{
            return res.status(400).json({message: "No event found"});
        }
    }).catch(err => res.json(err));

});

router.post('/pre_register_verify', (req, res) =>{
    /* *
     * send 5 digit pin as request,
     * finds that pin in the list of pre registered attendees and then update
     * */
    const schema = Joi.object().keys({
        preCode: Joi.string().required(),
        dateAttended: Joi.string().required(),
        eventId: Joi.number().integer().required()
    });

    const {err, value} = Joi.validate(req.body, schema);
    console.log(value);
    if(err && err.details){
        console.log(err);
        return res.status(422).json(err);
    }

    model.Attendee.findOne({
        where: {preCode: value.preCode, eventId: value.eventId},
    }).then( attendee => {

        if(attendee == null){
            return res.status(400).json({error:true, message: 'Attendee not found'});
        }

        if(attendee.isVerified && attendee.preCode !== null
            // && (
            // (!moment(value.dateAttended).diff(attendee.dateAttended1) > 1)) ||
            // (!moment(value.dateAttended).diff(attendee.dateAttended2) > 1) ||
            // (!moment(value.dateAttended).diff(attendee.dateAttended3) > 1)
        ){
            res.status(400).json({error:true, message: 'Already Verified'});
        }else{

            //INCOMPLETE
            // check for the date for verify
            // if date2 must be > date1 && date3 must be > date2(not null)

            if(attendee.dateAttended1 !== null && moment(value.dateAttended).diff(attendee.dateAttended1) > 1){
                attendee.dateAttended2 = value.dateAttended;
                console.log("date2");
                console.log(attendee.dateAttended2);
            }else if(attendee.dateAttended2 !== null && moment(value.dateAttended).diff(attendee.dateAttended2) > 1){
                console.log("date3");
                attendee.dateAttended3 = value.dateAttended;
                console.log(attendee.dateAttended3);
            }else{
                console.log("date1");
                attendee.dateAttended1 = value.dateAttended;
                console.log(attendee.dateAttended1);
            }

            model.Attendee.update(
                {
                    preCode: value.preCode,
                    dateAttended1: attendee.dateAttended1,
                    dateAttended2: attendee.dateAttended2,
                    dateAttended3: attendee.dateAttended3,
                    eventId: value.eventId,
                    isVerified: true
                },
                {
                    where: {id: attendee.id}
                }).then(updateRes =>{
                    console.log(updateRes);
                    return res.status(200).json({
                        data: updateRes,
                        message:`${attendee.fullName} is now verified`
                    });
            }).catch(error => {
                console.log(error);
                res.status(400).json(error);
            });
        }

    }).catch(error => {
        console.log(error);
        res.status(400).json(error);
    });
});





router.get('/pre_register_bulk_insert', (req, res) =>{
    // must be able to receive csv

    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (row) =>{
            console.log(row);
        })
        .on('end', ()=> {
            console.log('CSV file successfully processed')
        });
    //must be able to receive json
});

module.exports = router;