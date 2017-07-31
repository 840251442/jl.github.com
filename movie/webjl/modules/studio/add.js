var pool= require('../mysql/dbOperation');
module.exports =function(studio_name,row,col,introduction,flag,callback) {
    var sql="INSERT INTO studio(studio_name,studio_row_count,studio_col_count,studio_introduction,studio_flag) VALUES('"+studio_name+"','"+row+"','"+col+"','"+introduction+"','"+flag+"')";
    console.log(sql);
    pool(sql).then(function(data){
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
        if(flag==0)
        {
            callback({status:true});
        }
    },function(value){
        callback({status:0});
    });
};