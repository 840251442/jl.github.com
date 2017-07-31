var pool= require('../mysql/dbOperation');
module.exports =function(id,callback) {
    var sql="select *FROM schedule WHERE play_id = '"+ id+"'";
    pool(sql).then(function(data){
        if(data.length>0)
        {
            
        for(var i=0;i<data.length;i++)
        {
        var sqll="delete from ticket where sched_id='"+data[i].sched_id+"'";
        pool(sqll).then(function(data){       
        },function(value){
        callback({status:false});
        });
        }
        var sqlll="delete from schedule where play_id='"+id+"'";
        console.log(sqlll);
        pool(sqlll).then(function(data){   
            var sqllll="delete from play where play_id ='"+id+"'";
              pool(sqllll).then(function(data){
            var sqla;
             if(!name){
             sqla="SELECT * FROM play";
                }
            else
             sqla="SELECT * FROM play WHERE play_name = '"+name+"'";
            pool(sqla).then(function(data){
            callback(data);
        },function(value){
        console.log(value)
        callback(value);
    });
             },function(value){
        callback({status:false});
        });

        },function(value){
        callback({status:false});
        });

    }
    else
    {
            var sqlx="select *from play where play_id='"+id+"'";

            pool(sqlx).then(function(data){
                if(data.length>0)
                {
                     var sqlxx="delete from play where play_id='"+id+"'";
                     pool(sqlxx).then(function(data){
                        },function(value){
                    callback({status:false});
                        }); 
                        var sqla="select *from play";
                        console.log(sqla);
                        pool(sqla).then(function(data){
                        callback(data);
                        },function(value){
                        console.log(value)
                         callback(value);
                        });
                }
                else
                {
                    callback({status:false});
                }
            },function(value){
        callback({status:false});
        }); 
    }
    },function(value){
        callback({status:false});
    });
};