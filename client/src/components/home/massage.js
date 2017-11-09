const messgae_img = require('../../assets/messgae.png');
let fn;

export class message {
	constructor(el,self) {
		this.el = el;
        this.vue=self
		if(this.el)this.connect(this);
	}  
	connect(self){
        if(isSend){
            watchMessage(self);
        }else{
            setTimeout(function() {
                watchMessage(self);
            }, 500);
        }
        
        
	}

	// methods
}


function watchMessage(self){

    let arr = [];
    let timer = null;


    for ( var i=20; i>0; i-=2 ) {
        arr.push( i, -i );
    }
    arr.push(0);


    if(window.Notification){
        if(window.Notification.permission != 'granted')window.Notification.requestPermission();
    }


    socket.on(socket.id+":message",function(channel,res){
        console.log( channel )
            let num = 0;
          
            var content=JSON.parse(JSON.parse(res));
            console.log(content)


            //解析内容
            var msg_content = content.content[0];
            bus.$emit("socket_message",content)

            if('QUERY_NOT_SENT_ORDER' != msg_content['mtId']){

                $(self.el).find('.Details_wrap').hide();
                $(self.el).find('.notification').text(content.title).show();

                 clearInterval( timer );
                timer = setInterval(function (){
                    $(self.el).css('left',parseFloat( $(self.el).css('left') ) + arr[num] + 'px' );
                    num++;
                    if ( num === arr.length ) {
                        clearInterval( timer );
                    }
                }, 50);



                if(window.Notification){
                    
                    if(window.Notification.permission == 'granted'){
                        popNotice(content);
                    }else if(window.Notification.permission == 'default'){
                        window.Notification.requestPermission(status =>{
                            popNotice(content);
                        });
                    }
                }


            }
            
            fn(msg_content.mtId);
            $(self.el).find('.notification').click(()=>{
                fn(msg_content.mtId);
                $(self.el).find('.Details_wrap').show();

            });
            // $(self.el).on('click',()=>fn(msg_content.mtId));

            if('SERVER_ORDER'== msg_content['mtId']           //新订单语音通知
                || 'CHECK_ORDER'== msg_content['mtId'] ){
                $('#new_task')[0].play();
            };
            if('TIMEOUT_NOT_ACCEPTED'== msg_content['mtId']      //超时未接受 语音提醒 
                || 'SHARE_TIMEOUT'== msg_content['mtId']
                || 'AUTO_SHARE_NOT_ACCEPT' == msg_content['mtId'] ){
                $('#wshuttleNewsCancel')[0].play();
            };



                
           



            //如果属于任务反馈
            if('ACCEPT_NEW_JOB'== msg_content['mtId']
                ||'TECHNICIAN_SET_OUT'== msg_content['mtId']
                ||'AUTO_SHARE_SUCCESS'== msg_content['mtId']
                ||'START_RSA'== msg_content['mtId']
                ||'FINISH_RSA'== msg_content['mtId']
                ||'SET_OFF_TO_DESTINATION_SPOT'== msg_content['mtId']
                ||'START_UNLOADING'== msg_content['mtId']
                ||'FINISH_UNLOADING'== msg_content['mtId']
                || 'REJECT_JOB' == msg_content['mtId']
                ||'SET_OFF_BACK'== msg_content['mtId']
                ||'CHECK_ORDER'== msg_content['mtId']
                ||'DISPATCH_REPORT_JOB'== msg_content['mtId']
                ||'SHARE_TIMEOUT'== msg_content['mtId']
                ||'AUTO_SHARE_NOT_ACCEPT'== msg_content['mtId']
                ||'TIMEOUT_NOT_ACCEPTED'== msg_content['mtId']
                ||'ARRIVED_RESCUE'== msg_content['mtId']
                ||'ACCEPT_SHARE_NOTICE_CREATE_ORDER'== msg_content['mtId']
                ||'JOB_DONE'== msg_content['mtId']
                ||'ARRIVE_AT_RESIDENT_SPOT'== msg_content['mtId']){
               
                self.vue.jobMessages.push({
                        title:content.title,
                        orderId:msg_content['orderId'],
                        jobId:msg_content['jobId'],
                        jobType:msg_content['jobType'],
                        msgType:'JOB',
                        mtId:msg_content['mtId'],
                        msgId:content.msgID,

                        status:'received'
                });
                if(location.hash == '#/LoginFinish/rescueManagement/CurrentTask' || location.hash == '#/LoginFinish/rescueManagement/orderanagement')bus.$emit('upDataList');//刷新当前任务或者订单列表
               
                if(location.hash.indexOf('#/LoginFinish/orderDetails') != -1){ //刷新订单详情

                    if( 'ACCEPT_NEW_JOB' == msg_content['mtId']
                        || 'REJECT_JOB' == msg_content['mtId']
                        || 'TECHNICIAN_SET_OUT' == msg_content['mtId']
                        || 'ARRIVED_RESCUE' == msg_content['mtId']
                        || 'START_RSA' == msg_content['mtId']
                        || 'FINISH_RSA' == msg_content['mtId']
                        || 'SET_OFF_TO_DESTINATION_SPOT' == msg_content['mtId']
                        || 'ARRIVED_DESTINATION' == msg_content['mtId']
                        || 'START_UNLOADING' == msg_content['mtId']
                        || 'FINISH_UNLOADING' == msg_content['mtId']
                        || 'JOB_DONE' == msg_content['mtId']
                        || 'SET_OFF_BACK' == msg_content['mtId']
                        || 'ARRIVE_AT_RESIDENT_SPOT' == msg_content['mtId']
                        || 'TECHNICIAN_CANCEL_JOB' == msg_content['mtId']
                        || 'DISPATCH_REPORT_JOB' == msg_content['mtId']){

                    }{
                       bus.$emit('updateDateils') 
                    }
                }

                if('TIMEOUT_NOT_ACCEPTED'== msg_content['mtId']
                    || 'AUTO_SHARE_NOT_ACCEPT'== msg_content['mtId']
                    || 'SHARE_TIMEOUT'== msg_content['mtId']){
                        ++self.vue.timeoutListNum
                }


            }else if('CALENDAR_EVENTS'== msg_content['mtId']){
                //提醒事件消息
                self.vue.calendarMessages.push({
                                title:content.title,
                                calendarId:msg_content['calendarId'],
                                remark:msg_content['remark'],
                                msgId:content.msgID,
                                msgType:msg_content['mtId'],
                                status:'received'
                });

            }else if('WEB_SETTING_ACCOUNT_NOTICE'== msg_content['mtId']){
                setTimeout(function() {
                    window.location = window.location.origin;
                }, 3000);
            }else if('AUTO_IMPORT_ORDER'== msg_content['mtId']){
                ++self.vue.orderImportListNum;
            }else if('SERVER_ORDER'== msg_content['mtId']){
                ++self.vue.providerListNum;
            }else if('COMPETITION_ORDER' ==  msg_content['mtId']){
                self.vue.shareMessageList.push({
                    title:content.title,
                    orderId:msg_content['orderId'],
                    userId:msg_content['userId'],
                    msgType:'shareMessage',
                    shareActionId:msg_content['shareActionId'],
                    mtId:content['mtId']
                })
            }

            if('QUERY_NOT_SENT_ORDER' == msg_content['mtId']
                || 'CHECK_ORDER' == msg_content['mtId']
                || 'REJECT_JOB' == msg_content['mtId']
                || 'TIMEOUT_NOT_ACCEPTED' == msg_content['mtId']
                || 'SHARE_TIMEOUT' == msg_content['mtId']){          //查询还有多少条未派

                send({
                    type:'get',
                    url:'order:/order/dispatch/not'
                },function(err,res){
                    if(res.status == 200){
                        const notSendOrder = $('#notSendOrder');
                        if(notSendOrder.length){
                            console.log(  res.content[0]['number'],  notSendOrder );
                            if( res.content[0]['number']  ){
                                notSendOrder.text(res.content[0]['number']).show();
                            }else{
                                notSendOrder.hide();
                            }
                        }
                    }else{
                        console.log(res);
                    }
                });
            }

            //接收消息操作
            send({
                url: 'message:/message/receive/' + content.msgID,
                type: 'put',
                param: {
                    msgId: content.msgID,
                    platform: 'towing_platform_web',
                    time: (new Date()).valueOf(),    // 时间戳
                    remark:"浏览器已接收消息"
                }
            }, function(err, res){
                if(err)console.log(err)
            });
    })

    fn = function(mtId) {
        switch(mtId){
            case 'DRAFT_ORDER_TO_DISPATCHER':
                self.vue.type = 'ORDER_IMPORT';
                self.vue.orderImport();
                break;
            case 'SERVER_ORDER':
                self.vue.type = 'PROVIDER_ORDER';
                self.vue.tagProvider();
                break;
            case 'TIMEOUT_NOT_ACCEPTED':
                self.vue.type = 'TIMEOUT_NOT_ACCEPTED';
                self.vue.timeout();
                break;
            case 'AUTO_SHARE_NOT_ACCEPT':
                self.vue.type = 'TIMEOUT_NOT_ACCEPTED';
                self.vue.timeout();
                break;
            case 'SHARE_TIMEOUT':
                self.vue.type = 'TIMEOUT_NOT_ACCEPTED';
                self.vue.timeout();
                break;
            case 'CHECK_TECHNICAL_ACCEPT_SHARE':
                self.vue.type = 'shareMessage';
                self.vue.shareList();
                break;
            case 'COMPETITION_ORDER':
                self.vue.type = 'shareMessage';
                self.vue.shareList();
                break;
            default:
                self.vue.type = 'JOB';
                break
        }


    }
};



        
        // var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        // var onVisibilityChange = function(){
        //     console.log( document[hiddenProperty] )
        //     if (!document[hiddenProperty]) {    
        //         console.log('页2面非激活');
        //     }else{
        //         console.log('页面激活')
        //     }
        // }
        // console.log(visibilityChangeEvent)
        // document.addEventListener(visibilityChangeEvent, onVisibilityChange);
        

var hiddenProperty = 'hidden' in document ? 'hidden' :    
    'webkitHidden' in document ? 'webkitHidden' :    
    'mozHidden' in document ? 'mozHidden' :    
    null;

function popNotice(content){

    if(!document[hiddenProperty])return;

    if(Notification.permission == "granted"){
        var notification = new Notification(config.PlatformName, {  
            body: content.title,  
            icon: messgae_img,
            silent:true
        });  
          
        notification.onclick = function() {
          
            fn(content.content[0].mtId);
            notification.close();      
        };  
    }
};






export default message 
