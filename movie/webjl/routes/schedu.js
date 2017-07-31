var express = require('express');
var router = express.Router();
var parsers = require('../modules/parsers');
var queryschedu = require('../modules/schedu/queryschedu');
var deleteschedu = require('../modules/schedu/deleteschedu')
var updateschedu = require('../modules/schedu/updateschedu')
var addschedu = require('../modules/schedu/addschedu')
router.use('/queryschedu', function (req, res) {
    var play_id = req.param('play_id');
    queryschedu(play_id, function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/deleteschedu', function (req, res) {
    var sched_id = req.param('sched_id');
    deleteschedu(sched_id,function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/addschedu', function (req, res) {
    var studio_id= req.param('studio_id');
    var play_id = req.param('play_id');
    var sched_time = req.param('sched_time');
    var sched_ticket_price = req.param('sched_ticket_price');  
    addschedu(studio_id,play_id,sched_time,sched_ticket_price,function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/updateschedu', function (req, res) {
    var sched_id=req.param('sched_id');
    var studio_id= req.param('studio_id');
    var play_id = req.param('play_id');
    var sched_time = req.param('sched_time');
    var sched_ticket_price = req.param('sched_ticket_price');  
    updateschedu(sched_id,studio_id,play_id, sched_time,sched_ticket_price,function (result) {
        parsers.resultProc(req, result, res);
    });
});
module.exports = router;