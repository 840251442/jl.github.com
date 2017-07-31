var express = require('express');
var router = express.Router();
var parsers = require('../modules/parsers');

var update = require('../modules/seat/update');
router.use('/update', function (req, res) {
    var seat_id = req.param('seat_id');
    var seat_status = req.param('seat_status');
    update(seat_id,seat_status, function (result) {
        parsers.resultProc(req, result, res);
    });
});
module.exports = router;