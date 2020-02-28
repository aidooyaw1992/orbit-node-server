const Express = require('express');
var model = require('../models/index');
const {multerUploads, dataUri} = require('../handlers/multer');
const Joi = require('joi');
const router = Express.Router();
const cloudinary = require('../handlers/cloudinary');
const fs = require('fs');
const path = require('path');


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
    });
});


router.get('/clear_images', (req, res) =>{
    let imagePath=path.join(__dirname,'../uploads/');
    fs.readdir(imagePath, function(err, files) {
        if (err) {
            console.log("Error getting directory information.")
        } else {
        files.forEach(function(file) {
            console.log(file);
            let imgPath = path.join(imagePath, file);
            fs.unlinkSync(imgPath, (err) => {
                if (err) throw err;
                console.log('File deleted!');
            })
        })
        }
    });
    return;
});


router.put('/add_image/:id', multerUploads,(req,res) =>{
    console.log(req.params.id);
    let eventId = req.params.id;
    model.Event.findByPk(eventId).then(event =>{
        console.log(event);
        if(event !== null && req.file){
            let file = dataUri(req).content;
            return cloudinary.uploader.upload(file).then(result => {
                const image = result.url;
                console.log(image);

                model.Event.update({
                    imgUrl: image
                }, {where: {id: eventId}}
                ).then(updatedResult =>{
                    res.status(201).json({
                        message:'added image successfully',
                        data: updatedResult
                    })
                }).catch(err => res.status(400).json(err));

            }).catch(err => res.status(400).json(err));
        }else{
            return res.status(400).json("Event not found");
        }
    }).catch(err => res.send(err));

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