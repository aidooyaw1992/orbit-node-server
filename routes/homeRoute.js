const Express =require('express');
const router = Express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome to Orbit Server' });
});

module.exports = router;