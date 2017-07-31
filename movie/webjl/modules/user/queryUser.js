var pool= require('../mysql/dbOperation');
module.exports =function(userId,username,callback) {
    var sql;
    if(!userId){
        if(!username){
            sql="SELECT * FROM employee";
        }
        else
            sql="SELECT * FROM employee WHERE emp_no = "+ username;
    }
    else
        sql="SELECT * FROM employee WHERE emp_id = "+ userId;

    pool(sql).then(function(data){
        callback(data);
    },function(value){
        callback(value);
    });
};