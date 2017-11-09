<template>
    <div id='seltDepartment' class="modal fade" >
            <div class="modal-dialog"> 
                <div class="modal-content">
                    <div class="modal-header">
                        <span>部门信息</span>
                        <button class='close' data-dismiss="modal" @click='esc' >
                            <span class="glyphicon glyphicon-remove close"></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input @updata="integrationDate" name="name" label="员工姓名" :value='account.name' inputWidth='150px' :disabled='true' />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input @updata="integrationDate" placeholder='11位手机号' name="loginId" label="登录账号" :value='res.loginId' inputWidth='150px' />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input type='password' @updata="integrationDate" :value='res.password' name="password" label="登录密码" inputWidth='150px' />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btns">
                            <button type="button" class="btn radius-btn" inputWidth='150px' @click='setAccount' >保存</button>
                            <button type="button" data-dismiss="modal" class="btn radius-btn" @click='esc' inputWidth='150px'  >取消</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
</template>

<script>
import btnSelect from '../../../../../common_component/btn_select.vue';
import formLabelInput from '../../../../../common_component/form-label-input.vue'
import getData from '../../../../../../static/js/getData.js'
import "../../../../../../static/js/md5.js";
    export default {
        props:{
            account: {

            },
            orgId: {}
        },
        components:{
            formLabelInput,
            btnSelect
        },
        data () {
            return {
                res:{},
                index:0
            }
        },
        watch: {
            account(newObj){
                this.res.loginId = newObj.loginId;
                this.res.password = '';
            }
        },
        methods:{
            integrationDate(name,item){
                this.res[name]= item;
                console.log(this.res);
            },
            // 取消
            esc(){
                $('[name="password"').val('');
            },
            setAccount(){
                if(getData('#seltDepartment')){
                    const _this = this;

                    if(!this.res.password){
                        alert('请输入密码');
                        $('#seltDepartment input[name="password"]').focus();
                        $('#seltDepartment input[name="password"]').select();
                        return;
                    }

                    const data = {
                        loginId: _this.res.loginId,
                        empId: _this.account.hrEmployeeId,
                        userId: _this.account.sysUserId,
                        passWord: hex_md5(_this.res.password),
                        orgId: _this.orgId
                    }
                    
                    if(!/^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(data.loginId)){
                        alert('账户请输入11位的手机号，日后忘记密码可通过手机验证修改！');
                        return;
                    }

                    console.log(data);
                    send({
                        url: 'client:/user/setting',
                        type: 'put',
                        param: data
                    }, function(err, res){
                        if(err)alert('服务器出错，请联系管理员');
                        if(res.status == 200){
                            _this.$emit('updateList');
                            alert(res.msg, 'success');
                            // $('[name="loginId"]').val('');
                            $('[name="password"').val('');
                            $('#seltDepartment').modal('hide');
                        }else{
                            alert(res.msg ? res.msg : '修改失败，请联系管理员！');
                        }
                    });
                }else{
                    alert('请填写完整！')
                }
                
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