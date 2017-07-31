var pool= require('../mysql/dbOperation');
module.exports =function(studio_id,play_id,sched_time,sched_ticket_price,callback) {
    var sql="SELECT * FROM schedule WHERE sched_time= '"+ sched_time+"'";
    pool(sql).then(function(data){
        if(data.length>0)
            callback({status: 0})
        else{            
        	var sqls="INSERT INTO schedule(studio_id,play_id,sched_time,sched_ticket_price) VALUES('"+studio_id+"','"+play_id+"','"+sched_time+"','"+sched_ticket_price+"')";
            pool(sqls).then(function(data){
                var sqll="select *from schedule where sched_time='"+sched_time+"'";
                pool(sqll).then(function(data){
                var id=data[0].sched_id;
                var price=data[0].sched_ticket_price;
                var time=sched_time;
                var sqlss="select *from studio where studio_id= '"+studio_id+"'";
                pool(sqlss).then(function(data){
                    var sqlsss="select *from seat where studio_name= '"+data[0].studio_name+"'";
                    pool(sqlsss).then(function(data){
                                for(var i=0;i<data.length;i++)
                                {
                                    if(data[0].seat_status==1)
                                    {
                                        var sqlssss="insert into ticket(seat_id,sched_id,ticket_price,ticket_status,ticket_locked_time)values('"+data[i].seat_id+"','"+id+"','"+price+"','"+0+"','"+time+"')";
                                        pool(sqlssss).then(function(data){
                                        },function(value){
                                            console.log(value);
                                            })
                                    }
                                }
                                callback({status: true})
                             },function(value){
                                    console.log(value);
                            })
                     },function(value){
                        console.log(value);
                    })     
                    },function(value){
                        console.log(value);
                    }) 
            },function(value){
                console.log(value);
            }) 
        }
    },function(value){
        callback(value);
    });
};