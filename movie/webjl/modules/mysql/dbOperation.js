var conf = require('../../confdb');
var mysql = require('mysql');
var pool  = mysql.createConnection(conf.mysql);
pool.connect();
pool.query("USE ttms");
module.exports = function(sql){
	var promise = new Promise(function(resolve,reject) {
        var result = null;
        pool.query(sql, function (err, results, fields) { 
            if (err) { 
                reject(err); 
            }else {
                resolve(results);         
            } 
          } 
        );
    })
    return promise; 
};