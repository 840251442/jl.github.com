var pool= require('../mysql/dbOperation');
module.exports =function(id,callback) {
	var sql="select *FROM schedule WHERE studio_id ='"+id+"'";
    pool(sql).then(function(data){
    	if(data.length>0)
    	{
            for(var i=0;i<data.length;i++)
            {
    		  var sql1="delete from ticket where sched_id='"+data[0].sched_id+"'";
    		pool(sql1).then(function(data){
            	},function(value){
                callback({status:false})
            	}) 
            }
                var sql2="delete from schedule where studio_id ='"+id+"'";
                console.log(sql2);
                pool(sql2).then(function(data){
                },function(value){
                callback({status:false})
                }) 
                var sql6="select *from studio where studio_id ='"+id+"'";
                pool(sql6).then(function(data){
                        var sql3="delete from seat where studio_name ='"+data[0].studio_name+"'";
                        var name=data[0].studio_name;
                         pool(sql3).then(function(data){
                         var sql4="delete from studio where studio_id ='"+id+"'";
                         pool(sql4).then(function(data){
                               callback({status:true})
                         },function(value){
                     callback({status:false})
                      }) 
                        },function(value){
                callback({status:false})
                }) 
                },function(value){
                callback({status:false})
                }) 
                
    	}
    	else 
    	{
            var sql5="select *FROM studio WHERE studio_id ='"+id+"'";
            pool(sql5).then(function(data){
            if(data[0].studio_flag==1)
            {
    		var sql9="delete from seat where studio_name='"+data[0].studio_name+"'";
            var name=data[0].studio_name;
    		pool(sql9).then(function(data){
                    var sql8="delete from studio where studio_id='"+id+"'";
                    pool(sql8).then(function(data){
                            callback({status:true})
                        },function(value){
                callback({status:false})
                }) 
            	},function(value){
                callback({status:false})
            	}) 
            }
            else
            {
                var sql7="delete from studio where studio_id='"+id+"'";
                console.log(sql7);
                pool(sql7).then(function(data){
                    callback({status:true})
                },function(value){
                callback({status:false})
                }) 

    	   }
            },function(value){
                callback({status:false})
                }) 
        }
    },function(value){
        callback({status:0});
    });
};