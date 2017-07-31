var pool= require('../mysql/dbOperation');
module.exports =function(id,callback) {
    var sql="DELETE FROM ticket WHERE sched_id = "+ id;
    pool(sql).then(function(data){
        var sqll="delete from schedule where sched_id="+id;
        console.log(sqll);
        pool(sqll).then(function(data){
        callback({status:true});
        },function(value){
        callback({status:false});
        });
    },function(value){
        callback({status:false});
    });
};