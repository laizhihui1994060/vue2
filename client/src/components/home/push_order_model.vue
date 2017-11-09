<template>

<!-- Modal -->
    <div class="modal fade" id="push_order_model" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">微信公众号救援链接</h4>
                </div>
                <div class="modal-body">
                    <p>生成系统唯一识别码，可以把此链接放到您公司的微信公众号上，操作步骤：</p>
                    <p>1.完善下面信息</p>
                    <p>2.增加菜单 "快快救援"，并把URL替换成下面的URL</p>
                    <p>3.生成订单后，订单将导入快快救援平台中</p>
                    
                    <div id="formDate" v-if="!isShow">
                        <form-label-input 
                            placeholder="请输入微信APPID"
                            label="APPID" 
                            :after="true"
                            input-width="240px"
                            name="appid"
                            @updata="integrationDate"
                            />

                        <form-label-input 
                            placeholder="请输入微信token"
                            label="token" 
                            input-width="240px"
                            :after="true"
                            name="token"
                            @updata="integrationDate"/>

                        <form-label-input 
                            placeholder="请输入微信AppSecret"
                            label="AppSecret" 
                            input-width="240px"
                            :after="true"
                            name="appSecret"
                            @updata="integrationDate"/>

                        <form-label-input 
                            placeholder="请输入微信消息模板"
                            label="消息模板" 
                            input-width="240px"
                            :after="true"
                            name="orderNotify"
                            @updata="integrationDate"/>

                        <form-label-input 
                            placeholder="请输入微信预审核模板"
                            label="预审核模板" 
                            input-width="240px"
                            :after="true"
                            name="audit_be_reminded"
                            @updata="integrationDate"/>

                        <form-label-input 
                            placeholder="请输入微信审核模板"
                            label="审核模板" 
                            input-width="240px"
                            :after="true"
                            name="audit_results"
                            @updata="integrationDate"/>
                        
                        <div class="text-center"  id="inputfile">
                            <input type="file" name="file" class="inputfile" @change="getName" accept="text/plain"/>
                            <label for="file" @click="trigger" v-text='fileName'>点击上传微信秘钥</label>
                        </div>
                        
                        <!-- <p style="color:red;margin-top:5px;;font-size:12px;text-align: center;">APPID暂不支持修改，请填写时注意核对</p> -->
                    </div>
                    <p v-else v-text="url" class="text-center url" style="color:#d00707"></p>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button class="btn" @click="generateUrl" v-if="!isShow">提交</button>
                        <button type="button" class="btn" data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
                <span id="towOrderId" style="display:none"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import formLabelInput from "../../common_component/form-label-input.vue";

    export default {
        components:{
            formLabelInput
        },
        
        data () {
            return {
               isShow:true,
               fileName:'点击上传微信秘钥',
               file:null,
               formDate:{
                    officialAccountsAppId:'',
                    info:{}
               },
               url:''
            }
        },
        mounted(){
            this.$nextTick(()=>{
                if(global.user_info){
                    if(global.user_info.weChatOrgConf){
                        this.isShow = true;
                        this.url = global.user_info.weChatOrgConf.url;
                    }else{
                        this.isShow = false;
                    }
                    this.isShow = global.user_info.weChatOrgConf ? true:false;
                }else{
                    setTimeout(()=>{
                        if(global.user_info){
                            if(global.user_info.weChatOrgConf){
                                this.isShow = true;
                                this.url = global.user_info.weChatOrgConf.url;
                            }else{
                                this.isShow = false;
                            }
                        }
                    }, 3000);
                }
            });
        },
        methods:{
            trigger(){
                $('#inputfile label').css('backgroundColor','rgb(86, 162, 240)');
                $('#inputfile input').trigger('click');
            },
            getName(e){
                const ev = ev || event;
                const $target =  ev.target;
                let formData = new FormData();
                formData.append('file', $target.files[0]);

                this.file = formData;
                this.fileName = $target.files[0].name;
            },
            uploadKey(e){
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: config.wechat_path + "/upload/key",
                        data: this.file,
                        processData: false,
                        cache: false,
                        async: false,
                        contentType: false,
                        type: "POST",
                        success:function(data){
                            resolve(data);
                        },
                        error:function(err){
                            resolve(`上传秘钥失败${err}`);
                        }
                    });
                });
            },
            generateUrl(){
                const self = this;
                let bool = Array.from($('#formDate').find('input[verify="true"]')).some((el)=>{
                    if(!el.value){
                        el.style.border = `1px solid #f9bcbc`;
                    }
                    return el.value == '';
                }); 

                if(bool){
                    return alert('请完整填写数据!!!');
                }

                if(!this.file){

                    $('#inputfile label').css('backgroundColor','red');
                    return alert('请上传微信秘钥');
                }

                this.uploadKey().then((data)=>{

                    this.formDate.info.filename = data.filename;
                    console.log( this.formDate )
                    send({
                        type:'post',
                        url:'client:/wechat/config',
                        param:this.formDate
                    },function(err,res){
                        console.log( err ,res)
                        if(err){
                            return console.log(err);
                        }
                        if(res.status == 200){
                            self.url = res.content[0].url;
                            self.isShow = true;
                        }else{
                            alert(res.msg);
                        }
                    });    

                }).catch((e)=>alert(e));

            },
            integrationDate(name,value){
                this.formDate.info[name] = value;
                if(name == 'appid')this.formDate.officialAccountsAppId = value;
            }
        }
    }
 

</script>
<style>
    #push_order_model .modal-body{
    }
    #push_order_model .modal-dialog{
        width: 400px;
    }
    #push_order_model .modal-header h4{
        color: #FF6B0E;
   }
   #push_order_model .btns button:nth-child(2){
        margin-left: 50px;
   }
   #push_order_model .modal-body button{
        background: #1785F7;
        padding: 4px 6px;
        min-width: inherit;
        font-size: 12px;
        color: #fff
   }
   #push_order_model label{
        width: 70px;
   }
   #formDate{
    padding-left: 18px;
   }
   #push_order_model .label_value{
    margin-bottom: 10px;
   }
   #push_order_model .inputfile {
        width: 0.1px; 
        height: 0.1px; 
        opacity: 0; 
        overflow: hidden; 
        position: absolute; 
        z-index: -1;
    }
    #push_order_model .inputfile + label {
        font-size: 14px;
        color: white;
        width: initial;
        background-color: rgb(86, 162, 240);
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        padding:6px 10px;
    }
    #push_order_model .inputfile:focus + label,
    #push_order_model .inputfile + label:hover {
        background-color: rgb(23, 134, 247);
        cursor: pointer;
    }

</style>