const multer = require('multer');
const cloudinary = require('cloudinary');
const Datauri = require('datauri');
const path = require('path');
const dUri = new Datauri();

const storage = multer.memoryStorage();
const multerUploads = multer({storage}).single('image');
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);



// module.exports = multer({
// storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//             cb(null, 'uploads')
//         },
//     filename: function (req, file, cb) {
//             let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
//         cb(null, file.fieldname + '-' + Date.now()+ext)
//     },
//     rename: function(fieldname, filename){
//         return filename;
//     },
//     fileFilter: (req, file, cb) =>{
//         if(!file.mimetype.match(/jpe|jpeg|webp|png|gif$i/)){
//                 cb(new Error('File is not supported'), false)
//                 return;
//             }
//             cb(null, true)
//         }
//     })
// });


module.exports={multerUploads, dataUri};