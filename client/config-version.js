// global.console.log = function(){};   //正式库上的时候请开启;

let origin = location.port == 8080 ? location.protocol + '//' + location.hostname + ":8888" : '';

var url = origin + "/web_config";


let config = {}

$.ajax({   
    url: url + '?hostname=' + location.hostname,   
    type:'get',   
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    dataType: "JSON",
    async:false,
    
    success:function(data,status,res){
        config = data;

    },
    error:function(err){
        return alert('服务器出错，请联系管理员');
        console.log(err);
    }
}); 





module.exports = config;
