var pool= require('../mysql/dbOperation');
module.exports =function(userId,mima,mima1,head,callback) {
    var sql;
     sql="SELECT * FROM user WHERE emp_no = '"+ userId+"'";
    pool(sql).then(function(data){
        console.log(mima);
        console.log(data[0].emp_pass);
        if(data[0].emp_pass==mima)
        {
            var sqls="update user set emp_pass='"+mima1+"',emp_head='"+head+"' where emp_no= '"+userId+"'";
            console.log(sqls);
             pool(sqls).then(function(data){
                 callback({status:true}) ;
                 },function(value){
            console.log(value);
        });
        }
    },function(value){
       console.log(value);
    });
};