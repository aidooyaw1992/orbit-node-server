const Express =require('express');
const router = Express.Router();
const model = require('../models/index');

router.get('/', (req, res) => {
    model.User.findAll({
        include: [{model: model.Event}]
    })
    .then((users) => {
        res.json({
            error: false,
            data: users
        })
    }).catch(error => res.json({
            error: error
        })
    );
});



module.exports= router;