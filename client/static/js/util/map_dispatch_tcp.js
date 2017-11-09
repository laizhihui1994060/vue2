import "../md5.js";
let obj = {};

const timestamp = new Date().getTime();
const deviceName = browser();
const source = 'KK_SOURCE';
global.chekcedisConnect = true;

const premise = new Promise((resolve, reject) => {

		const socket_worker = io.connect(`${config.gpsAnalysis}/?deviceName=${deviceName}&source=${source}&timestamp=${timestamp}&sign=${hex_md5(timestamp + deviceName + source)}`);

		socket_worker.on('connect', function(o){
			console.log('_______map_dispatch_tcp_socket__websocket connect_______');
			resolve(socket_worker);
			bus.$emit('isConnect',true);
			
		});

		socket_worker.on('disconnect', function() {
			console.log("与服务其断开");
			bus.$emit('isConnect',false);

		    reject();
		});


		socket_worker.on('reconnect', function() {
			console.log("重新连接到服务器");
		    reject();
		});

		socket_worker.on('error', function() {
			console.log("连接异常");
		    reject();
			bus.$emit('isConnect',false);
		});

		socket_worker.on('connecting', function() {
		    console.log("正在连接");
		});

}).then((socket_worker)=>{

	class WorkerObj {
		constructor(socket) {
			this.socket = socket;
		}

		trigger(id){
			console.log('触发监听',id)

			this.socket.emit('message',{
			    "mtId": "EVENT_TRIGGER",
			    "content": [  typeof id == "object" ? id : {
		            "name": `${id}`
		        }]
			});
		}

		cancel(id){
			console.log('取消监听',id)



			this.socket.removeAllListeners(id);


			this.socket.emit('message',{
			    "mtId": "CANCEL_SUB_MSG_EVENT", 
			    "content": [{
		            "name": `${id}`
		        }]
			});

 
		}
		sub(id,cd){
			console.log('订阅消息',id)

			this.socket.on(id,(data)=>{
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
	bus.$emit('isConnect',true);
	


}).catch((err)=>console.log(err));


export default {
	sub(id,cd){
		if(obj.sub){
			obj.sub(id,cd)
		}else{
			setTimeout(()=>{
				try{
					obj.sub(id)
				}catch(err){
					console.error(err)
				}
			},1000)
		}

	},
	cancel(id,cd){
		if(obj.cancel){
			obj.cancel(id,cd)
		}else{
			setTimeout(()=>{
				try{
					obj.cancel(id)
				}catch(err){
					console.error(err)
				}
			},1000)
		}

	},
	trigger(id){
		if(obj.trigger){
			obj.trigger(id)
		}else{
			setTimeout(()=>{
				try{
					obj.trigger(id)
				}catch(err){
					console.error(err)
				}
			},1000)
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








