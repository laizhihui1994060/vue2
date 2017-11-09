<template>
    <div id='company_register_detail' class="modal fade">
            <div class="modal-dialog"> 
                <div class="modal-content">
                    <div class="modal-header">
                        <span>联系人详情</span>
                        <button class='close' data-dismiss="modal" >
                            <span class="glyphicon glyphicon-remove close"></span>
                        </button>
                    </div>
                    <div class="modal-body">
                            <div class="row">
                                <div class="col-xs-6">
                                        <inputEdit
                                            :disabled='disabled'
                                            label='姓　　名'
                                            name='name'
                                            inputMaxWidth='150px'
                                            @updata = 'integrationDate'
                                            :value='data.name ? data.name : ""'
                                            />
                                </div>
                                <div class="col-xs-6">
                                        <inputEdit
                                            :disabled='disabled'
                                            label='手机号码'
                                            name='mobile'
                                            inputCheck='^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|3|5|6|7|8]|18[0|1|2|3|5|6|7|8|9])\d{8}$'
                                            inputCheckTip='请输入11位手机号码'
                                            inputMaxWidth='150px'
                                            @updata = 'integrationDate'
                                            :value='data.mobile ? data.mobile : ""'
                                            />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xs-6">
                                        <inputEdit
                                            :disabled='disabled'
                                            label='所属4s店'
                                            name='partnerId'
                                            @updata = 'integrationDate'
                                            type='btn'
                                            url='client:/helper/partner'
                                            method='post'
                                            fieldName='partnerId'
                                            objCode='partnerId'
                                            objName='name'
                                            :params="{ isCustomer: true }"
                                            :value='data.partnerInfo ? data.partnerInfo.name : ""'
                                            />
                                </div>
                                <div class="col-xs-6">
                                        <switchCheck
                                            :disabled='disabled'
                                            name='isMember'
                                            @updata = 'integrationDate'
                                            :checked='data.isMember'
                                            text='会　　员 ：'
                                            />  
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <inputEdit
                                        :disabled='disabled'
                                        label='登录密码'
                                        name='password'
                                        @updata = 'integrationDate'
                                        :value='data.password  ? data.password  : ""'
                                        />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xs-12">
                                        <inputEdit
                                            :disabled='true'
                                            label='申请备注'
                                            name='registerRemark'
                                            @updata = 'integrationDate'
                                            :value='data.registerRemark  ? data.registerRemark  : ""'
                                            />
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
<!--                         <div class="btns">
                            <button type="button" class="btn" inputWidth='150px'  >保存</button>
                            <button type="button" data-dismiss="modal" class="btn"  inputWidth='150px'  >取消</button>
                        </div> -->
                    </div>
                </div>
            </div>

        </div>
</template>

<script>
    import inputEdit from '../../../../../common_component/inputEdit.vue'
    import switchCheck from '../../../../../common_component/switch.vue'

    export default {
        props: {
            data: {}
            
        },
        components: {
            inputEdit,
            switchCheck
        },
        data () {
            return {
                res:{},
                disabled: true
            }
        },
        watch: {
            data(newV){
                if(newV.checkStatus == 'CHECKED'){
                    this.disabled = false;
                }else{
                    this.disabled = true;
                }
            }
        }, 
        methods:{
            integrationDate(name,item){
                this.data[name]= item;
                console.log(this.data);
                const that = this;
                // 直接修改
                 send({
                     url: "client:/contact_user/" + that.data.contactId,
                     param: that.data,
                     type: 'put'
                }, function(err,response){
                    console.log(response)
                     if(response.status == 200){
                        that.$parent.$refs.table.watchDataForm();
                     }else{
                        alert(response.msg)
                     }
                });
            }
        }
    }



</script>
<style scoped>
    .modal .modal-dialog{
        width: 600px;
    } 


</style>