/**
 * Created by JY.
 */
var express = require('express');
var router = express.Router();
var parsers = require('../modules/parsers');

var querys = require('../modules/film/querys');
var addFilm = require('../modules/film/addFilm')
var update = require('../modules/film/update')
var deletes= require('../modules/film/deletes')
router.use('/querys', function (req, res) {
    var play_id = req.param('play_id');
    querys(play_id, function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/addFilm', function (req, res) {
    var play_type_id = req.param('play_type_id');
    var play_lang_id = req.param('play_lang_id');
    var play_name = req.param('play_name');
    var play_introduction = req.param('play_introduction');  
    var play_image = req.param('play_image');
    var play_length = req.param('play_length');
    var play_ticket_price = req.param('play_ticket_price');
    var play_status = req.param('play_status');
    addFilm(play_type_id,play_lang_id,play_name,play_introduction,play_image,play_length,play_ticket_price,play_status,function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/update', function (req, res) {
    var play_id = req.param('play_id');
    var play_type_id = req.param('play_type_id');
    var play_lang_id = req.param('play_lang_id');
    var play_name = req.param('play_name');
    var play_introduction = req.param('play_introduction');  
    var play_image = req.param('play_image');
    var play_length = req.param('play_length');
    var play_ticket_price = req.param('play_ticket_price');
    var play_status = req.param('play_status');
    update(play_id,play_type_id,play_lang_id, play_name,play_introduction,play_image, play_length,play_ticket_price,play_status,function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/deletes', function (req, res) {
    var play_id = req.param('play_id');
    deletes(play_id, function (result) {
        parsers.resultProc(req, result, res);
    });
});
module.exports = router;