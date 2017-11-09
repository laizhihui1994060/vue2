let socket_worker = '';
let obj = {};
global.listEventIsComplete = false; 

const premise = new Promise((resolve, reject) => {

		// if(global.tenantId){

		// 	socket_worker = io.connect(`${config.listEvent}/?tenantId=${global.tenantId}&orgId=${global.ourOrgId}&uid=${global.userId}&platform=WEB&deviceName=${browser()}`);

		// 	socket_worker.on('connect', function(o){
		// 		console.log('_______worker_socket__websocket connect_______');
		// 		global.listEventIsComplete = true;
		// 		resolve();
		// 	});

		// 	socket_worker.on('disconnect', function() {
		// 		console.log("与服务器断开");
		// 		global.listEventIsComplete = false;
		// 	    reject();
		// 	});


		// 	socket_worker.on('reconnect', function() {
		// 		console.log("重新连接到服务器");
		// 		global.listEventIsComplete = true;
		// 	    resolve();
		// 	});

		// 	socket_worker.on('error', function() {
		// 		console.log("连接异常");
		// 		global.listEventIsComplete = false;
		// 	    reject();
		// 	});

		// 	socket_worker.on('connecting', function() {
		// 	    console.log("正在连接");
		// 	});


		// }else{
		// 	setTimeout(function() {
		// 		socket_worker = io.connect(`${config.listEvent}/?tenantId=${global.tenantId}&orgId=${global.ourOrgId}&uid=${global.userId}&platform=WEB&deviceName=${browser()}`);

		// 		socket_worker.on('connect', function(o){
		// 			console.log('_______worker_socket__websocket connect_______');
		// 			global.listEventIsComplete = true;
		// 			resolve();
		// 		});

		// 		socket_worker.on('disconnect', function() {
		// 			console.log("与服务器断开");
		// 			global.listEventIsComplete = false;
		// 		    reject();
		// 		});


		// 		socket_worker.on('reconnect', function() {
		// 			global.listEventIsComplete = true;
		// 		    console.log("重新连接到服务器");
		// 		    resolve();
		// 		});

		// 		socket_worker.on('error', function() {
		// 			console.log("连接异常");
		// 			global.listEventIsComplete = false;
		// 		    reject();
		// 		});
				

		// 		socket_worker.on('connecting', function() {
		// 		    console.log("正在连接");
		// 		});
		// 	}, 5000);
		// }
}).then(()=>{

	class WorkerObj {
		constructor(socket) {
			this.socket = socket;
		}

		trigger(id){
			console.log('触发监听')

			this.socket.emit('message',{
			    "mtId": "EVENT_TRIGGER",
			    "content": [{
		            "name": `${id}`
		        }]
			});
		}

		cancel(id){
			console.log('取消监听')



			this.socket.removeAllListeners(id);


			this.socket.emit('message',{
			    "mtId": "CANCEL_SUB_MSG_EVENT", 
			    "content": [{
		            "name": `${id}`
		        }]
			});

 
		}
		sub(id,cd){

			this.socket.on(id,(data)=>{
				console.log('收到消息',id)
				cd(data);
	
			});

			this.socket.emit('message',{
			    "mtId": "SUB_MSG_EVENT",
			    "content": [{
		            "name": `${id}`
		        }]
			});
		}

	};


	obj = new WorkerObj(socket_worker);

	


}).catch((err)=>console.log(err));


global.listEvent = {
	sub(id,cd){
		if(global.listEventIsComplete){
			obj.sub(id,cd)
		}else{

			setTimeout(()=>{
				global.listEventIsComplete ? obj.sub(id,cd) :console.log('监听失败');
			}, 7000);
		}

	},
	cancel(id,cd){
		if(global.listEventIsComplete){
			obj.cancel(id)
		}else{

			setTimeout(()=>{ 
				global.listEventIsComplete ? obj.cancel(id,cd) :console.log('取消监听失败');
			}, 7000);
		}

	},
	trigger(id,cd){
		if(global.listEventIsComplete){
			obj.trigger(id)
		}else{

			setTimeout(()=>{ 
				global.listEventIsComplete ? obj.trigger(id,cd) :console.log('触发监听失败');
			}, 7000);
		}

	}


};



function browser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (userAgent.indexOf("Opera") > -1)  return "Opera"
    if (userAgent.indexOf("Firefox") > -1)  return "FF";
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    if (userAgent.indexOf("Safari") > -1)  return "Safari";
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) return "IE";
}








