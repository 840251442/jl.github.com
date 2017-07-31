var express = require('express');
var router = express.Router();
var parsers = require('../modules/parsers');
var query = require('../modules/studio/query');
var deletes = require('../modules/studio/deletes');
var add = require('../modules/studio/add');
var update = require('../modules/studio/update');
router.use('/query', function (req, res) {
    var studio_id = req.param('studio_id');
    var studio_name = req.param('studio_name');
    query(studio_id,studio_name, function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/deletes', function (req, res) {
    var studio_id = req.param('studio_id');
    var id=parseInt(studio_id);
    deletes(id, function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/add', function (req, res) {
    var studio_name = req.param('studio_name');
    var row = req.param("studio_row_count");
    var col = req.param('studio_col_count');
    var introduction = req.param('studio_introduction');
    var flag = req.param('studio_flag');
    add(studio_name,row,col,introduction,flag,function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/update', function (req, res) {
    var studio_id = req.param('studio_id');
    var studio_name = req.param('studio_name');
    var row = req.param("studio_row_count");
    var col = req.param('studio_col_count');
    var introduction = req.param('studio_introduction');
    var flag = req.param('studio_flag');
    update(studio_id,studio_name,row,col,introduction,flag, function (result) {
        parsers.resultProc(req, result, res);
    });
});
module.exports = router;