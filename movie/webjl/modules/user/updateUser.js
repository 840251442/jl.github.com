var pool= require('../mysql/dbOperation');

module.exports =function(user_id,no,user_name,user_tel,user_addr,user_email,callback) {
    var sql="SELECT * FROM employee WHERE emp_id = '"+ user_id+"'";
    pool(sql).then(function(data){
        if(data.length>0){
            var sqlss="select *from user where emp_no= '"+data[0].emp_no+"'";
            var sx=data[0].emp_no;
            pool(sqlss).then(function(data){
                if(data.length>0)
                 {  
                    var sqlsss="delete from user where emp_no= '"+sx+"'";
                pool(sqlsss).then(function(data){
              var sqlssss="UPDATE employee SET emp_name='"+user_name+"',emp_tel_num='"+user_tel+"',emp_addr='"+user_addr+"',emp_email='"+user_email+"',emp_no='"+no+"' where emp_id='"+user_id+"'";
            pool(sqlssss).then(function(data){
                var sqlsssss="INSERT INTO user(emp_no,emp_pass,type) VALUES('"+no+"','123456','0')";
                 pool(sqlsssss).then(function(data){
                   callback({status:1})  },function(value){
                callback({status:0})
            }) 
            },function(value){
                callback({status:0})
            }) 
            },function(value){
                callback({status:0})
            }) 
            }
            else
            {
                var sqlssss="UPDATE employee SET emp_name='"+user_name+"',emp_tel_num='"+user_tel+"',emp_addr='"+user_addr+"',emp_email='"+user_email+"',emp_no='"+no+"' where emp_id='"+user_id+"'";
            pool(sqlssss).then(function(data){
                var sqlsssss="INSERT INTO user(emp_no,emp_pass,type) VALUES('"+no+"','123456','0')";
                 pool(sqlsssss).then(function(data){
                   callback({status:1})  },function(value){
                callback({status:0})
            }) 
            },function(value){
                callback({status:0})
            }) 
            }
            },function(value){
                callback({status:0})
            }) 
        }
        else
            callback({status:0})
    },function(value){
        callback({status:false,reason:'error'});
    })
};