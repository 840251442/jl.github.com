var pool= require('../mysql/dbOperation');
module.exports =function(username,callback) {
    var sql="select *FROM user WHERE emp_no = '"+ username+"'";
    pool(sql).then(function(data){
    	  if(data.length>0)
    	  {
          	var sqll="DELETE FROM user WHERE emp_no = '"+ username+"'";
          	 pool(sqll).then(function(data){
          	 	 },function(value){
        		callback({status:false});
    			});
          	 var sqlll="DELETE FROM employee WHERE emp_no = '"+ username+"'";
          	 pool(sqlll).then(function(data){
          	 	callback({status:true});
          	 	 },function(value){
        		callback({status:false});
    			});
          }
          else
          {
          	 var sqlll="DELETE FROM employee WHERE emp_no = '"+ username+"'";
          	 pool(sqlll).then(function(data){
          	 	callback({status:true});
          	 	 },function(value){
        		callback({status:false});
    			});
          }
    },function(value){
        callback({status:false});
    });
};