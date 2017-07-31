var express = require('express');
var router = express.Router();
var parsers = require('../modules/parsers');

var userLogin = require('../modules/user/userLogin');
var adduser = require('../modules/user/adduser');
var daleteUser = require('../modules/user/deleteUser');
var queryUser = require('../modules/user/queryUser');
var updateUser = require('../modules/user/updateUser');
var query = require('../modules/user/query');
var crypto = require('crypto');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
router.use('/userLogin', function (req, res) {
    var username = req.param('emp_no');
    var password = req.param('emp_pass');
    console.log(req.session.sessionId);
    if(req.session.sessionId){
        parsers.resultProc(req, {'status':'2'}, res);
    }
    else{
        userLogin(username, password, function (result) {
            if(result.status){
              req.session.sessionId = username;
              var md5 = crypto.createHash('md5');
              var sessions = md5.update(req.session.sessionId).digest('hex');
              parsers.resultProc(req, {'status':'1'}, res);             
            }
            else{
                parsers.resultProc(req, result, res);
            }
        });
    }
});
router.use('/updateUser', function (req, res) {
        var ids = req.param('emp_id');        
        var no = req.param("emp_no");
        var name = req.param("emp_name");
        var tel = req.param('emp_tel');
        var address = req.param('emp_add');
        var email = req.param('emp_email');
        updateUser(ids,no,name,tel,address,email, function (result) {
            parsers.resultProc(req, result, res);
        });
});
router.use('/updataImage', function (req, res) {
    //生成multiparty对象，并配置上传目标路径
  console.log(11111);
  var form = new multiparty.Form({uploadDir: './Image/'});
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);

    if(err){
      console.log('parse error: ' + err);
    } else {
      var inputFile = files.inputFile[0];
      var uploadedPath = inputFile.path;
      var dstPath = './Image/' + inputFile.originalFilename;
      var paths="./Image/"+inputFile.originalFilename;
      //重命名为真实文件名
      console.log(paths);
      fs.rename(uploadedPath, dstPath, function(err) {
        if(err){
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
    }
    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    res.end(JSON.stringify({name: inputFile.originalFilename, path: paths}));
 });
});
router.use('/adduser', function (req, res) {
    var username = req.param('emp_no');
    var name = req.param("emp_name");
    var tel = req.param('emp_tel');
    var address = req.param('emp_add');
    var email = req.param('emp_email');
    var mima = req.param('mima');
    adduser(username,name,tel,address,email, mima,function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/queryUser', function (req, res) {
    var userId = req.param('emp_id');
    var username=req.param('emp_name');
    queryUser(userId,username, function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/query', function (req, res) {
    var userId = req.param('emp_no');
    var mima = req.param('mima');
    var mima1 = req.param('mima1');
    var head = req.param('emp_head');
    query(userId,mima,mima1,head,function (result) {
        parsers.resultProc(req, result, res);
    });
});
router.use('/deleteUser', function (req, res) {
    var username = req.param('emp_no');
    daleteUser(username, function (result) {
        parsers.resultProc(req, result, res);
    });
});
module.exports = router;