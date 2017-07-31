var pool= require('../mysql/dbOperation');
module.exports =function(seat_id,seat_status,callback) {
            var sql="UPDATE seat SET seat_status='"+seat_status+"' where seat_id='"+seat_id+"'";
            console.log(sql);
            pool(sql).then(function(data)
            {
                callback({status:true});
            },function(value)
            {
                console.log(value);
            }) 
        
};