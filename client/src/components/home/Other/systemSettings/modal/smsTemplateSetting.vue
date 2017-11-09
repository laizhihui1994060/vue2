<template>
    <div id='smsTemplateSetting' class="modal fade">
        <div class="modal-dialog"> 
            <div class="modal-content">
                <div class="modal-header">
                    <span>设置短信配置信息</span>
                    <button class='close' data-dismiss="modal" @click='esc' >
                        <span class="glyphicon glyphicon-remove close"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input :after='true' placeholder='第三方短信的账号' @updata="integrationDate" name="username" label="账号" :value='setting.username' inputWidth='150px' autocomplete="new-username" />
                        </div>
                    </div> 
                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input :after='true' type='password' placeholder='第三方短信的密码' @updata="integrationDate"  name="password" label="密码" :value='setting.password' inputWidth='150px' autocomplete="new-password" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input :after='true' placeholder='短信使用的签名' @updata="integrationDate" :value='setting.sign' name="sign" label="签名" inputWidth='150px' />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12" style="margin-left:-14px;">
                            <form-label-input placeholder='测试的手机号码' @updata="integrationDate" :value='testPhone' name="testPhone" label="测试手机" inputWidth='150px' />
                        </div>
                        <div class='col-xs-12' style='font-size: 12px; color: orange;'>
                        	选填测试使用手机号码，配置完成后，如果账号密码都正确的话，会发送一条测试成功的短信到该手机。（该选项对配置信息无任何影响）
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn radius-btn" inputWidth='150px' @click='setSmsSetting' >保存</button>
                        <button type="button" data-dismiss="modal" class="btn radius-btn" @click='esc' inputWidth='150px'>取消</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import btnSelect from '../../../../../common_component/btn_select.vue';
import formLabelInput from '../../../../../common_component/form-label-input.vue'

    export default {

        components:{
            formLabelInput,
            btnSelect
        },
        props: {
        	setting: {

        	}
        },
        data () {
            return {
                testPhone: '',
                index:0
            }
        },
        methods:{
            integrationDate(name,item){
                
                if(name == 'testPhone'){
                	this[name] = item;
                	return ;
                }
                this.$emit('collectSetting', name, item);
            },
            // 取消
            esc(){
               
            },
            setSmsSetting(){
            	const _this = this;
            	let bool = true;
            	$('#smsTemplateSetting input[verify="true"]').each(function(index, ele){
            		const $ele = $(ele);
            		if(!$ele.val()){
            			bool = false;
            			$ele.css('background', 'rgba(255, 0, 0, 0.26)');
            		}else{
            			$ele.css('background', '#DFF5FD');
            		}
            	});

            	if(!bool) return;

                let p1 = new Promise( (resolve, reject) => {
                	send({
                		url: 'message:/sms',
                		type: 'put',
                		param: _this.setting
                	}, function(err, res){
                		if(res.status == 200){
                			$('#smsTemplateSetting').modal('hide');
                			_this.$emit('updateSetting');
                			alert('设置成功！', 'success');
                			if(_this.testPhone){
                				resolve();
                			}
                		}else{
                			alert(res.msg ? res.msg : '设置失败！请重试!');
                			reject();
                		}
                	});
                });

                // 测试手机是否能接受到信息
                p1.then(() => {
                	send({
                		url: 'message:/sms/custom/send',
                		type: 'post',
                		param: {
                			receiver: [_this.testPhone],
                			content: '测试您的短信配置信息是否有误，如果您接收到信息，则能正常使用。'
                		}
                	}, function(err, res){
                		console.log(err, res);
                	})
                })
                
            }
        }
    }



</script>
<style scoped>
    .modal .modal-dialog{
        width: 450px;
    } 
    .modal-body > div{
        display:flex;
        flex-flow: row wrap;
    }
    .modal-body > div > div{
        display:flex;
        justify-content:space-around;
        margin:5px 10px;
    }
    .modal-body input{
        background-color: #DFF5FD;
        padding-left:10px;
    }
    
  

</style>