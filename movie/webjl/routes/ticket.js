var express = require('express');
var router = express.Router();
var parsers = require('../modules/parsers');
var query = require('../modules/ticket/query');
router.use('/query', function (req, res) {
    var play_id = req.param('play_id');
    query(play_id, function (result) {
        parsers.resultProc(req, result, res);
    });
});
module.exports = router;