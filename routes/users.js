var express = require('express');
var router = express.Router();
var user = require('./user-api/')
    /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/add', user.userAdd);
module.exports = router;