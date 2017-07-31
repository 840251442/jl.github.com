var pool= require('../mysql/dbOperation');

module.exports =function(id,callback) {
	var sql;
	if(!id){
		sql="SELECT * FROM ticket";
	}
	else
    	sql="SELECT * FROM ticket WHERE sched_id = '"+id+"'";
    console.log(sql);
    pool(sql).then(function(data){
        callback(data);
    },function(value){
    	console.log(value)
        callback(value);
    });
};