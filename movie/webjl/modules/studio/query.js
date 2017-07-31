var pool= require('../mysql/dbOperation');

module.exports =function(id,name,callback) {
	var sql;
    if(!id)
    {
	   if(!name){
		  sql="SELECT * FROM studio";
	   }
       else
        sql="SELECT * FROM studio WHERE studio_name = '"+name+"'";
       pool(sql).then(function(data){
             callback(data);
            },function(value){
            console.log(value)
            callback(value);
        });
    }
	else
    	sql="SELECT * FROM studio WHERE studio_id = '"+id+"'";
        pool(sql).then(function(data){
        var sqll="select *from seat where studio_name= '"+data[0].studio_name+"'";
        pool(sqll).then(function(data){
            callback(data);
            },function(value){
        console.log(value)
        callback(value);
    });
    },function(value){
    	console.log(value)
        callback(value);
    });
};