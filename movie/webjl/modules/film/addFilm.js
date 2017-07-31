var pool= require('../mysql/dbOperation');
module.exports =function(type,lang,name,introduction,image,length,price,status,callback) {
    var sql="SELECT * FROM play WHERE play_name = '"+ name+"'";
    pool(sql).then(function(data){
        if(data.length>0)
            callback({status: 0})
        else{      
            console.log(111);      
        	var sqls="INSERT INTO play(play_type_id,play_lang_id,play_name,play_introduction,play_image,play_length,play_ticket_price,play_status) VALUES('"+type+"','"+lang+"','"+name+"','"+introduction+"','"+image+"','"+length+"','"+price+"','"+status+"')";
            pool(sqls).then(function(data){
                callback({status:true});
            },function(value){
                console.log(value);
            }) 
        }
    },function(value){
        callback(value);
    });
};