var express = require('express');
var router = express.Router();
var classify = require('./classify/index');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/classifyAdd', classify.classifyAdd);
router.post('/classifyGet', classify.classifyGet);

module.exports = router;