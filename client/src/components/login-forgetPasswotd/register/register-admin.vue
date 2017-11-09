<template>
    <div>
        <form class="form_wrap row" id="register1" @submit.stop.prevent="invalidHandler">
           <!--  <div class="form-group col-xs-offset-3 col-xs-6">
                <div class="row">
                    <div class="col-xs-4">
                        <radio 
                            text="服务商"
                            style="display:none"
                            name="typeSysTenant"
                            value="VENDOR"
                            checked="checked"
                            @updata="integrationDate"/>
                    </div>
                    <div class="col-xs-4">
                        <radio 
                            text="客户"
                            style="display:none"
                            name="typeSysTenant"
                            value="CUSTOMER"
                            @updata="integrationDate"/>
                    </div>
                    <div class="col-xs-4">
                        <radio 
                            text="联合体"
                            style="display:none"
                            name="typeSysTenant"
                            value="UNION"
                            @updata="integrationDate"/>
                    </div>
                </div>
            </div>
            <hr> -->
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label after class="control-label">真实姓名</label>
                <input type="text" class="form-control" autofocus="autofocus"  placeholder="输入个人名称" v-model="resule.adminName" required>
            </div>
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label class="control-label">你的昵称</label>
                <input type="text" class="form-control" autofocus="autofocus"  placeholder="输入你的昵称" v-model="resule.adminNickName">
            </div>
<!--             <div class="form-group col-xs-offset-3 col-xs-6">
                <label after class="control-label">登录用户名</label>
                <input type="text" class="form-control" autofocus="autofocus"  placeholder="输入登录用户名" v-model="resule.username" required>
            </div> -->
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label after class="control-label">手机号号码</label>
                <input type='text' class="form-control" maxlength="11" pattern="^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|3|5|6|7|8]|18[0|1|2|3|5|6|7|8|9])\d{8}$" id="adminMobile"   placeholder="输入手机号" name='phone' v-model='resule.adminMobile' oninvalid="check(this, '手机号码格式不对')" >
            </div>
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label after class="control-label">短信验证码</label>
                <input type="tel" class="form-control" v-model='resule.verificationCode' id="YACODE" placeholder="输入短信验证码" required>
                <a tabindex='-1' id="code" class="code" href="javascript:;" @click="sendSms">发送验证码</a>
                <p class="smsInfo">
                    <span v-if="sms_Success == 1">短信发送成功,距离下次发送的间隔时间<i v-text="time" class="time"></i>秒</span>
                    <span v-if="sms_Success == 2">短信发送失败</span>
                </p>
            </div>
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label class="control-label" after>电子邮箱</label>
                <input type="text" pattern="^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$" class="form-control" placeholder="输入电子邮箱"  v-model="resule.adminEmail" oninvalid="check(this, '邮箱格式不对，请修改')" required>
            </div>
            <hr>
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label after class="control-label">企业名称</label>
                <input type="text" class="form-control" autofocus="autofocus"  placeholder="输入企业名称"  v-model="resule.fullname" required>
            </div>
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label after class="control-label">企业简称</label>
                <input type="text" class="form-control" autofocus="autofocus"  placeholder="输入企业名称"  v-model="resule.name" required>
                <div class="float">
                    <checkbox 
                        text="是否对平台可见" 
                        name="isVisible" 
                        direction="left"
                        value='true'
                        @updata="integrationDate"
                        labelLeft="4px"/>
                </div>
            </div>
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label class="control-label">企业域名</label>
                <input type="text" class="form-control" placeholder="输入企业域名"  v-model='resule.domain'>
            </div>
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label after class="control-label">企业联系电话</label>
                <input type="tel" class="form-control" pattern="^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$" placeholder="输入联系方式"  v-model='resule.contact' oninvalid="check(this, '号码格式不对，比如020-1234567')" required>
            </div>
            <div class="form-group col-xs-offset-3 col-xs-6">
                <label after class="control-label">公司地址</label>
                <input type="text" class="form-control" id="password2"  placeholder="建议点击右侧地图坐标定位公司地址" v-model='resule.address'  @focus="focus" required>
            </div>
            <hr>
            <div class="form-group col-xs-offset-3 col-xs-6">
                <input type="submit" class="btn login btn-block" name="register" value="提交"/>
            </div>
        </form>
        <model-map text='设置为公司地址' :doubleClick="true"></model-map>

    </div>
</template>

<script>
    import radio from "../../../common_component/radio.vue";
    import checkbox from "../../../common_component/checkbox.vue";
    import modelMap from "../../../common_component/model_map.vue";

    window.check = function(i, tip){
        console.log(i)
        if(i.validity.patternMismatch == true){
            i.setCustomValidity(tip);
        }else{
            i.setCustomValidity('');
        }
    }

    export default{
        components: {
            radio,
            modelMap,
            checkbox
        },
        data(){
            return {
                resule:{
                    address:'',     //地址
                    adminName:'',   //管理员名字
                    adminNickName:'',  //管理员简称
                    username:'',         //管理员登陆名
                    adminMobile:'',     //管理员手机号
                    adminEmail:'',         //管理员邮箱
                    fullname:'',           //公司名字
                    isVisible:false,             //是否对平台可见
                    domain:'',       //公司域名公司域名
                    lng:'',           //公司经度
                    lat:'',           //公司纬度
                    province:'',       //公司省
                    city:'',           //公司市
                    district:'',        //公司区
                    town:'',               //公司镇
                    name:'',              //公司简称,
                    key: '',              
                    verificationCode: ''   // 验证码
                },
                Longitude:'',             //公司经纬度
                sms_Success:0,
                time: 60,
                key: ''
            }
        },
        methods:{
            integrationDate(name,item){
                if(name == 'isVisible'){
                    this.resule[name] = Boolean(item);
                    return ;
                }
                this.resule[name] = item;
            },
            invalid(e){
                var e = e || event;
                var par = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                if(par.exec(e.target.value)){
                    this.el.attr('disabled',false);
                }else{
                    this.el.attr('disabled',true);
                }
            },
            checkForm(e){
                // var isvalid = e.target.checkValidity();
                // console.log(isvalid)
                // var pass1 = document.getElementById("password1");
                // var pass2 = document.getElementById("password2");

                // if(pass1.value != pass2.value){
                //     pass1.setCustomValidity("两次输入的密码不匹配");
                // }else{
                //     pass1.setCustomValidity("");

                // }
            },
            focus(){
                $('#model_map').modal('show');
            },
            sendSms(){
                const self = this;

                if(!self.resule.adminMobile){
                    return $('#adminMobile')[0].setCustomValidity("请先填写这字段");
                };
                var param = {
                    receiver:self.resule.adminMobile,
                    template:'VERIFICATION_CODE',
                    businessType: "VERIFICATION_CODE"
                };

                self.el.attr('disabled',true);
                ajax('/message/sms', "post", param, function(res){
                    if(res.status == 200){
                        self.sms_Success = 1;

                        self.el.attr('disabled',true);
                        var time = setInterval(function(){
                            --self.time;
                            if(self.time == 0){
                                self.sms_Success = 0;  // 隐藏
                                self.el.attr('disabled',false);
                                self.time = 60;
                                clearInterval(time);
                            }
                        },1000); 
                    }else{
                        self.sms_Success = 2;
                        console.log(res);
                        alert(res.msg);
                        self.el.attr('disabled',false);
                    }
                });

            },

            invalidHandler(e){

                const self = this;
              
                ajax('/regtenant/register','POST', self.resule, function(res){
                    console.log(res);
                    if(res.status === 200){
                        self.$emit('view',true);
                    }else{
                        alert(res.msg);
                    }
                });
            }
        },
        mounted(){
            const self = this;
            bus.$on('updataAdress' , function (type,item,provincial) {

                self.Longitude = item.Longitude;
                self.resule.address = item.address;
                self.resule.lng = item.Longitude.split(',')[0];
                self.resule.lat = item.Longitude.split(',')[1];
                if(provincial){
                    for(var i in provincial){
                        self.resule[i] = provincial[i];
                    }
                }
                $('#model_map').modal('hide');
            });

            this.$nextTick(function(){
                self.el = $('#code');
                self.el.attr('disabled',true);
            });

        },
        watch:{
            'resule.adminMobile':{
                handler(val,oldVal){
                    val ? this.el.attr('disabled',false) :this.el.attr('disabled',true);
                },
                deep:true
            }
            
        }
    }
</script>
<style scoped>
    .float{
        position: absolute;
        right: -125px;
        top: 30px;
   }
   .smsInfo{
        position: absolute;
        left: 467px;
        top: 31px;
        width: 200px;
   }
    .time{
        color: red
    }
    #code[disabled]{
        color: #f6f6f6
    }
</style>