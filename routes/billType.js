var express = require('express');
var router = express.Router();
var bill = require("./billType/index");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/billAdd', bill.billAdd);
router.post('/billDelete', bill.billDelete);
router.post('/billGet', bill.billGet);


module.exports = router;