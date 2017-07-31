var pool= require('../mysql/dbOperation');
module.exports =function(username,name,tel,address,email,mima,callback) {
    var sql="SELECT * FROM user WHERE emp_no = '"+ username+"'";
    console.log(sql);
    pool(sql).then(function(data){
        if(data.length>0)
            callback({status: 0})
        else{
            if(mima==null)
            {
                var sqls="INSERT INTO employee(emp_id,emp_no,emp_name,emp_tel_num,emp_addr,emp_email) VALUES(null,'"+username+"','"+name+"','"+tel+"','"+address+"','"+email+"')";
                console.log(sqls);
                pool(sqls).then(function(data){
                    var sqlss="INSERT INTO user(emp_no,emp_pass,type) VALUES('"+username+"','123456','0')";
                    pool(sqlss).then(function(data){
                        callback({status:1});
                    },function(value){
                        console.log(value);
                     });
                 },function(value){
                    console.log(value);
                 })
            }
            else
            {
                console.log(mima);
                var sqls="INSERT INTO employee(emp_id,emp_no,emp_name,emp_tel_num,emp_addr,emp_email) VALUES(null,'"+username+"','"+name+"','"+tel+"','"+address+"','"+email+"')";
                pool(sqls).then(function(data){
                    var sqlss="INSERT INTO user(emp_no,emp_pass,type) VALUES('"+username+"','"+mima+"',"+"'0')";
                    pool(sqlss).then(function(data){
                        callback({status:1});
                    },function(value){
                    console.log(value);
                    }) 
                },function(value){
                    console.log(value);
                 }) 
            }
        }
    },function(value){
        callback(value);
    });
};