
var pool= require('../mysql/dbOperation');

module.exports =function(username,password,callback) {
    var sql="SELECT * FROM user WHERE emp_no = '"+ username + " 'AND emp_pass = '" + password+"'";
    pool(sql).then(function(data){
        if(data.length>0)
        {
             console.log(data[0].type);
            if(data[0].type==1)
            {
                console.log(data);
                callback({status:1})
            }
            else if(data[0].type==0)
            {
                     callback({status:2})
            }
        }
        else
        {
            callback({status:0})
        }
    },function(value){
        callback({status:0,reason:'error'});
    })
}; 