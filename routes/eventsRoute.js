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


router.post('/add_image', multerUploads,(req,res) =>{
    if(req.file){
        let file = dataUri(req).content;
        return cloudinary.uploader.upload(file).then(result => {
            const image = result.url;
            console.log(image);
            return res.status(200).json({
                message:'saved succesfully',
                data: result
            })
        }).catch(err => res.status(400).json(err));
    }
});

// router.post('/add_image', uploader.single('image'), (req, res) =>{
//     console.log(req.file);
//     cloudinary.uploader.upload(req.file.path)
//     .then(uploadRes => {
//         let imagePath=path.join(__dirname,'../uploads/');
//         fs.readdir(imagePath, (err, files) =>{
//             if (err) {
//                 console.log("Error getting directory information.");
//                 return res.send(err);
//             }else{
//                 let file = files[0];
//                 console.log(file);
//                 let imgPath = path.join(imagePath, file);
//                 fs.unlinkSync(imgPath,function (err) {
//                     if (err) return res.send(err);
//                     console.log('File deleted!');
//                 })
//             }
//         })
//         res.status(200).send(uploadRes);
//     }).catch(err => res.status(400).send(err));
// });

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