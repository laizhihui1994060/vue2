global.isSend = false;
global.socket = io.connect(config.nodePath);

socket.on('connect', function(o){
    console.log('_______websocket connect_______');

	socket.on(socket.id +':user_adopt',function(text){ 
	    console.log(text);
	    isSend = true;
	});
});

socket.on('disconnect', function() {
    console.log("与服务其断开");
});


socket.on('reconnect', function() {
    console.log("重新连接到服务器");
});


if(cookie.getCookie('uid')){
	const uid = cookie.getCookie('uid');
	if( uid.indexOf('-') != -1){
		socket.emit('user_join',cookie.getCookie('uid'));
	}else{

	}
}else{
	alert('账号异常，即将返回首页');
	window.location = window.location.origin;
}


global.send = function(info,cb){
	if(!isSend){
		setTimeout(function() {
			if(isSend){
				gogogo(info,cb);
			}else{
				setTimeout(function(){
					if(isSend){
						gogogo(info,cb);
					}else{
						setTimeout(function(){
							if(isSend){
								gogogo(info,cb);
							}else{
								setTimeout(function(){
									if(isSend){
										gogogo(info,cb);
									}else{
										alert('web socket连接失败，请刷新重试');
									}
								},5000)

							}
						},3000);
					}
				},1000);
			}
		}, 200);
	}else{
		gogogo(info,cb);
	}
};
const $loading = $('#main_loading');

function gogogo(info,cb){

	if(!info.isLoading){
		info.inter = setTimeout(function() {
	    	$loading.show();   // 展示蒙版loading
		}, 500);
	}

	var _event = randomId(10);
	info._event = _event;
	if(info.type != 'get' && info.type != 'put' && info.type != 'delete' && info.type != 'post'){
		return console.log(info.url,info.type,'不存在');
	}; 
	if(typeof info.url !== 'string'){
		return console.log(info.url,'传入URL错误');
	};
	socket.emit(socket.id,info);    // 传入数据

	// 服务端传来数据
	socket.on(socket.id +':'+_event,function(err,res){ 
		if(err == 'socket连接异常' || (res.error && res.error == 'invalid_token')){
			return location.reload();
		}
		cb(err,res);
		clearTimeout(info.inter);
		$loading.hide();   // 隐藏蒙版loading
	});
} 




// 对于前台传入的socket数据请求json格式:
//  {
//    type:"get",//请求类型get、put、delete、post
//    event:"",//请求响应的事件处理名，可以没有
//    url:"",//请求的url,只需要项目后面的部分url,前面的项目地址已保留在客户端
//    parme:"",传入的值，例如在添加和删除的时候可能会需要一些值的传递
//  }

// socket响应的json格式：
// {
// 	err:"",//响应的事件名,可以没有
// 	content:"",//响应的内容
// }




var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function randomId(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}

