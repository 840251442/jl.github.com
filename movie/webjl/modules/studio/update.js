var pool= require('../mysql/dbOperation');
module.exports =function(studio_id,studio_name,row,col,introduction,flag,callback) {
    var sql="select *FROM schedule WHERE studio_id ='"+studio_id+"'";
    pool(sql).then(function(data){
    		if(data.length>0)
    		{
    				for(var i=0;i<data.length;i++)
            {
    		  var sqla="delete from ticket where sched_id='"+data[0].sched_id+"'";
    		
    		pool(sqla).then(function(data){
            	},function(value){
                callback({status:false})
            	}) 
            }
                var sqlb="delete from schedule where studio_id ='"+studio_id+"'";
                pool(sqlb).then(function(data){
                },function(value){
                callback({status:false})
                }) 
                var sqlc="delete from seat where studio_name ='"+name+"'";
                console.log(sqlc);
                pool(sqlc).then(function(data){
                        var sqld="UPDATE studio SET studio_row_count='"+row+"',studio_col_count='"+col+"',studio_introduction='"+introduction+"',studio_flag='"+flag+"',studio_name='"+studio_name+"' where studio_id='"+studio_id+"'";
                         pool(sqld).then(function(data){
                         if(flag==1)
                         {
                          for(var i=1;i<=row;i++)
           						 {
               					 for(var j=1;j<=col;j++)
               					 {
                    
                   					 var sqle="INSERT INTO seat(studio_name,seat_row,seat_column,seat_status) values('"+studio_name+"','"+i+"','"+j+"','"+1+"')";
                   					 pool(sqle).then(function(data){
                       				 },function(value){
                        			callback({status:0});
                        			});
                 				}   
                 			}
           				 	callback({status:true});	
                    	 }
                    	 else
                    	 {
                    	 	 callback({status:true});
                    	 }
                        },function(value){
                callback({status:false})
                }) 
                },function(value){
                callback({status:false})
                }) 
                
    		}
    		else
    		{
    			 var sql5="select *FROM studio WHERE studio_id ='"+studio_id+"'";
            pool(sql5).then(function(data){
            if(data[0].studio_flag==1)
            {
    		var sql2="delete from seat where studio_name='"+data[0].studio_name+"'";
    		console.log(sql2);
    		pool(sql2).then(function(data){
                    var sql8="UPDATE studio SET studio_row_count='"+row+"',studio_col_count='"+col+"',studio_introduction='"+introduction+"',studio_flag='"+flag+"',studio_name='"+studio_name+"' where studio_id='"+studio_id+"'";
                    pool(sql8).then(function(data){
                        if(flag==1)
                        {
                        		 for(var i=1;i<=row;i++)
           						 {
               					 for(var j=1;j<=col;j++)
               					 {
                    
                   					 var sqlf="INSERT INTO seat(studio_name,seat_row,seat_column,seat_status) values('"+studio_name+"','"+i+"','"+j+"','"+1+"')";
                   					 console.log(sqlf);
                   					 pool(sqlf).then(function(data){	
                       				 },function(value){
                        			callback({status:0});
                        			});
                 				}   
                 			}
           				 	callback({status:true});	
                        }
                        else
                        {
                        	 callback({status:true});
                        }
                        },function(value){
                callback({status:false})
                }) 
            	},function(value){
                callback({status:false})
            	}) 
            }
            else
            {
                var sql7="UPDATE studio SET studio_row_count='"+row+"',studio_col_count='"+col+"',studio_introduction='"+introduction+"',studio_flag='"+flag+"',studio_name='"+studio_name+"' where studio_id='"+studio_id+"'";
                pool(sql7).then(function(data){
                 if(flag==1)
                        {
                        		 for(var i=1;i<=row;i++)
           						 {
               					 for(var j=1;j<=col;j++)
               					 {
                    
                   					 var sqls="INSERT INTO seat(studio_name,seat_row,seat_column,seat_status) values('"+studio_name+"','"+i+"','"+j+"','"+1+"')";
                   					 pool(sqls).then(function(data){
                       				 },function(value){
                        			callback({status:0});
                        			});
                 				}   
                 			}
           				 	callback({status:true});	
                        }
                        else
                        {
                        	 callback({status:true});
                        }
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