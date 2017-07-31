var pool= require('../mysql/dbOperation');

module.exports =function(id,callback) {
	var sql;
	if(!id){
		sql="SELECT * FROM schedule";
	}
	else
    	sql="SELECT * FROM schedule WHERE play_id = "+id;
    pool(sql).then(function(data){
        callback(data);
    },function(value){
    	console.log(value)
        callback(value);
    });
};