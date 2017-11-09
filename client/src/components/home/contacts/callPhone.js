
const uid = cookie.getCookie('uid');
let $el = null;
let $currentCallOperation = null;
let callStatus = {
	callConnectionState:"error",
	loginStatus:"not_logged_in"
};

let currentCallInfo={};

import power_on from "../../../assets/power_on.png"; //打出去
import not_connected_to_power from "../../../assets/not_connected_to_power.png"; //打出去未接通
import call_not_connected from "../../../assets/call_not_connected.png"; //打进来未接通
import call_through from "../../../assets/call_through.png"; //打进来
import no_answering from "../../../assets/no_answering.png"; //未通话
import answering from "../../../assets/answering.png"; //通话中
import not_logged_in from "../../../assets/d_hujiao.png"; //没登陆状态
import guaji from "../../../assets/guaji.png"; //没登陆状态

export class CallCenterSocket {
	constructor(vue) {
		this.vue = vue;
	}

	callCenter(){
		socket.on(socket.id+":callCenter",(channel,res)=>{
            let content = JSON.parse(res);
            
            if(content['type'] !== 'call_site_heartbeat'){
            	console.info( '呼叫中心收到的信息',content,channel);
            }



			if(!$el)$el = $('#callUser');
    		if(!$currentCallOperation)$currentCallOperation = $('#currentCallOperation');

            
            if(content['type']=='loginresult'){//登录结果

            	if(!$el)$el = $('#callUser');

                if(content['result']=='success'){

                	if(content['ranson_code']){

	                    send({
				            type:'post',
				            url:'client:/user/detail',
				            param:{
				              "userIdList": [{"id": content['sys_userId']}]
				            }
				        },function(err,result){
				        	if(err)return console.log(err);
                			const userInfo = res.content[0];

				        	alert(`${userInfo.techInfo.empName}用户已经占用${this.vue.userInfo ? this.vue.userInfo.extNum:''}分机号,下次登陆呼叫中心请使用正确分机`,'warning');
							this.vue.text="登出";
	                    	this.vue.type = 'login';
		                    callStatus.loginStatus = 'login';
				        });

                	}else{

	                    this.vue.text="登出";
	                    this.vue.type = 'login';
	                    callStatus.loginStatus = 'login';
	                    
                	}



    				this.vue.$emit('changeStatus',no_answering);
	    			if($el)$el.html(``);


                }else{

                    this.vue.text="登录";
                    this.vue.type = 'not_logged_in';

                    callStatus.loginStatus = 'not_logged_in';
    				this.vue.$emit('changeStatus',not_logged_in);



                    if(content['reason_code']=='1'){
                        return alert("该分机未在该用户的租户下部署!");
	    				$el.html(`<label style="color:red;font-size:14px;"> 交换机与云端连接断开</label>`);
                    }else{
                        return alert('该分机注册的bpx未连线');
	    				$el.html(`<label style="color:red;font-size:14px;"> 该分机注册的bpx未连线</label>`);
                    }
                }
                

            
            }else if(content['type']=='logoutresult'){//登出结果

            	if(callStatus.callConnectionState == 'error')return;
	    		if(callStatus.loginStatus == 'not_logged_in')return;

            	if(content['result']=='success'){
                    this.vue.text="登录";

                    callStatus.loginStatus = 'not_logged_in';
    				this.vue.$emit('changeStatus',not_logged_in);

	    			this.vue.iphone = '';
	    			this.vue.type = 'not_logged_in';
	    			$el.html(``);
    				$currentCallOperation.hide();
    				this.vue.$emit('changeDialStatus','error');

            	}
            
            }else if(content['type']== 'dial'){//拨打结果


            	if(callStatus.callConnectionState == 'error')return;
	    		if(callStatus.loginStatus == 'not_logged_in')return;

            	if(content['result'] == 'fail'){

	            	if(content['ranson_code']=='1'){
	                    alert("pbx失去连接!");
	    				// $el.html(`<label style="color:red"> pbx失去连接</label>`);
	                }else if(content['ranson_code']=='2'){
	                    alert('网络通讯故障');
	    				// $el.html(`<label style="color:red"> 网络通讯故障</label>`);
	                }else{
	                    alert('分机已被占用,请修改分机号重新登陆呼叫中心;');
	    				// $el.html(`<label style="color:red"> 分机已被占用,请修改分机号重新登陆呼叫中心;</label>`);
	                }
    				this.vue.$emit('changeDialStatus','error');

	            }else{
	            	console.log( currentCallInfo )
	            	$el.html(`<img src="${power_on}" width="20" height="22" alt="" /> <label style="color:#21e92d">&nbsp;&nbsp;${currentCallInfo.name ? currentCallInfo.name + '&nbsp;:&nbsp;' :''} ${currentCallInfo.phoneNo}</label>&nbsp;&nbsp;<spn  id="Prompt" style="color:#46b8da">拨号中...</spn>`);
    				this.vue.$emit('changeStatus',no_answering);

    				this.vue.$emit('changeDialStatus','success');
	            }
    				$currentCallOperation.hide();
            
            } else if(content['type']== 'hangup'){  //挂机返回


            	if(callStatus.callConnectionState == 'error')return;
	    		if(callStatus.loginStatus == 'not_logged_in')return;

            	if(content['result'] == 'fail'){

	            	if(content['reason_code']=='1'){
	                    alert("pbx失去连接!");
	    				// $el.html(`<label style="color:red"> pbx失去连接</label>`);
	                }else if(content['reason_code']=='2'){
	                    alert('网络通讯故障');
	    				// $el.html(`<label style="color:red"> 网络通讯故障</label>`);
	                }else if(content['reason_code']=='3'){
	                    alert('不用挂机，或分机已经离线');
	    				// $el.html(`<label style="color:red"> 不用挂机，或分机已经离线</label>`);
	                }else if(content['reason_code']=='4'){
	                    alert('分机通道ID未记录');
	    				// $el.html(`<label style="color:red"> 分机通道ID未记录</label>`);
	                }
    				this.vue.$emit('changeDialStatus','success');
    				$currentCallOperation.hide();

            	}else{

    				$el.html(`<label style="color:red;font-size:14px;"><label style="color:#21e92d">&nbsp;&nbsp;${currentCallInfo.name ? currentCallInfo.name + '&nbsp;:&nbsp;' :''} ${currentCallInfo.phoneNo ? currentCallInfo.phoneNo :''}</label> 通话已挂机...&nbsp;&nbsp;</label>&nbsp;&nbsp;`);
    				this.vue.$emit('changeDialStatus','error');
    				$currentCallOperation.show();

            		//挂机成功
            	}



            }else if(content['type']== 'newstate'){//分机最新消息


            	if(callStatus.callConnectionState == 'error')return;
	    		if(callStatus.loginStatus == 'not_logged_in')return;

            	if(content['state']=='Up'){//接通
    				this.vue.$emit('changeStatus',answering);
    				$('#callUser img').hide();
    				$currentCallOperation.show();
    				$('#callUser #Prompt').text('通话中...');

            	}else if(content['state']=='Ringing'){


            		currentCallInfo.phoneNo = content['CallerId'] && (content['CallerId'] == this.vue.userInfo.extNum ) ? currentCallInfo.phoneNo : content['CallerId'];
            		currentCallInfo.name = content['CallerName'] ? content['CallerName'] :currentCallInfo.name;

            		if(content.CallType == 'incoming'){//来电
		            	$el.html(`<img src="${call_through}" width="20" height="22" alt="" /> <label style="color:#21e92d">&nbsp;&nbsp;${currentCallInfo.name ?currentCallInfo.name + '&nbsp;:&nbsp;' : currentCallInfo.name } ${currentCallInfo.phoneNo}</label>`);
	    				this.vue.$emit('changeDialStatus','success');
            		}else if(content.CallType == 'outgoing'){ //去电
		            	$el.html(`<img src="${power_on}" width="20" height="22" alt="" /> <label style="color:#21e92d">&nbsp;&nbsp;${currentCallInfo.name ?currentCallInfo.name + '&nbsp;:&nbsp;' : currentCallInfo.name } ${currentCallInfo.phoneNo}</label>&nbsp;&nbsp;<spn id="Prompt" style="color:#46b8da">拨号中...</spn>&nbsp;&nbsp;`);
	    				this.vue.$emit('changeDialStatus','success');
            		}


            	}

            //心跳结果	
            }else if(content['type']== 'call_site_heartbeat' ){

            	if(this.vue.userInfo.tenantId !== content['sys_tenant_id'] )return console.log( content['sys_tenant_id'],this.vue.userInfo.tenantId );  

                if(callStatus.callConnectionState == 'error')this.vue.$emit('watchStatus','success');
            	callStatus.callConnectionState = content['cctest'];

            	clearTimeout(callStatus.time);

            	callStatus.time = setTimeout(()=>{
	                this.vue.$emit('watchStatus','error');
                    callStatus.loginStatus = 'not_logged_in';
	            	callStatus.callConnectionState = 'error';
	            	if($el)$el.html('');
	    			this.vue.iphone = '';
	    			this.vue.type = 'not_logged_in';
            	},30000);
            }

        });
		//挂机被占用
        socket.on(socket.id+":phoneIsOccupied",(channel,res)=>{

        	send({
	            type:'post',
	            url:'client:/user/detail',
	            param:{
	              "userIdList": [{"id": json['ranson_code']}]
	            }
	        },function(err,result){
	        	if(err)return console.log(err);
    			const userInfo = res.content[0];

	    		if($el)$el.html(`<label style="color:red;font-size:14px;"> ${userInfo.techInfo.empName}已经占用${this.vue.userInfo.extNum}分机号, 请修改分机号重新登陆呼叫中心</label>`);
				
                this.vue.text="登录";
                this.vue.type = 'not_logged_in';

                callStatus.loginStatus = 'not_logged_in';
				this.vue.$emit('changeStatus',not_logged_in);

	        });

        });
	}

	static call_login(self,status){

        if( !self.userInfo.extNum)return alert('用户分机号不存在，请添加分机号在重试！');


        if(self.type == 'not_logged_in'){
	    	if(callStatus.callConnectionState == 'error')return alert( '你还暂无交换机，无法连上呼叫中心！','warning');

            socket.emit('CallCenter', {
                type: "login",
                uid: uid,
                exten:self.userInfo.extNum
            });
            
        }else if(self.type == 'login'){
            socket.emit('CallCenter', {
                type: "logout",
                uid: uid
            })
        }
	}
	static call_hangup(){
		 //挂机
		 console.log("挂断操作");
        socket.emit('CallCenter', {
            type: "hangup",
            uid: uid
        });
	}

	static call_dial(phone,name){
		console.log(phone,name,currentCallInfo)
	    if(callStatus.callConnectionState == 'error')return alert( '你还暂无交换机，无法连上呼叫中心！','warning');
	    if(callStatus.loginStatus == 'not_logged_in')return alert( '无法连接交换机，请先登录呼叫中心','warning');
		if(!phone && phone !== null  )return alert('号码不正确','warning');
    	if(!$el)$el = $('#callUser');
    	if(!$currentCallOperation)$currentCallOperation = $('#currentCallOperation');
    	phone = phone ? phone.trim() :"";
    	console.log('拨号了');

	    socket.emit('CallCenter', {
	        type: "dial",
	        uid: uid,
	        phoneNo:phone ? phone:currentCallInfo.phoneNo
	    });
	    console.log( {
	        type: "dial",
	        uid: uid,
	        phoneNo:phone ? phone:currentCallInfo.phoneNo
	    })

	   if(phone)currentCallInfo.phoneNo = phone;
	   if(!phone && !name)return ;
	    currentCallInfo.name =  typeof name === 'string' ? name:"";
	}

// 02089052465
	// methods
}


