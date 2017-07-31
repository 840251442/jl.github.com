var pool= require('../mysql/dbOperation');
module.exports =function(id,type,lang,name,introduction,image,length,price,status,callback) {
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
            var sqllll="UPDATE play SET play_type_id='"+type+"',play_lang_id='"+lang+"',play_introduction='"+introduction+"',play_image='"+image+"',play_length='"+length+"',play_ticket_price='"+price+"',play_status='"+status+"' where play_name='"+name+"'";
              pool(sqllll).then(function(data){
            callback({status:true});
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
                     var sqlxx="UPDATE play SET play_type_id='"+type+"',play_lang_id='"+lang+"',play_introduction='"+introduction+"',play_image='"+image+"',play_length='"+length+"',play_ticket_price='"+price+"',play_status='"+status+"' where play_name='"+name+"'";
                     pool(sqlxx).then(function(data){
                         callback({status:true});
                        },function(value){
                    callback({status:false});
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