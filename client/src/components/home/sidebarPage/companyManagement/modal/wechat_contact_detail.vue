<template>
    <div id='wechat_contact_detail' class="modal fade">
            <div class="modal-dialog"> 
                <div class="modal-content">
                    <div class="modal-header">
                        <span>用户详情</span>
                        <button class='close' data-dismiss="modal" >
                            <span class="glyphicon glyphicon-remove close"></span>
                        </button>
                    </div>
                    <div class="modal-body">
                            <div class="row">
                                <div class="col-xs-6">
                                    <inputEdit
                                        :disabled='disabled'
                                        label='名　　称'
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
                                        name='phone'
                                        inputCheck='^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|3|5|6|7|8]|18[0|1|2|3|5|6|7|8|9])\d{8}$'
                                        inputCheckTip='请输入11位手机号码'
                                        inputMaxWidth='150px'
                                        @updata = 'integrationDate'
                                        :value='data.phone ? data.phone : ""'
                                        />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xs-6">
                                    <inputEdit
                                        :disabled='disabled'
                                        label='类　　型'
                                        name='type'
                                        @updata = 'integrationDate'
                                        type='btn'
                                        :arr="[{ name: '个人注册', code: 'PERSONAL' }, { name: '客户注册', code: 'CUSTOMER' }]"
                                        method='post'
                                        fieldName='code'
                                        objCode='code'
                                        objName='name'
                                        :params="{ isCustomer: true }"
                                        :value='switchType(data.type)'
                                        />
                                </div>
                                <div class="col-xs-6">
                                    <inputEdit
                                        :disabled='disabled'
                                        label='公司名称'
                                        name='companyName'
                                        inputMaxWidth='150px'
                                        @updata = 'integrationDate'
                                        :value='data.companyName ? data.companyName : ""'
                                        />
                                </div>
                            </div>
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
            // data(newV){
            //     if(newV.checkStatus == 'CHECKED'){
            //         this.disabled = false;
            //     }else{
            //         this.disabled = true;
            //     }
            // }
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
            },
            switchType(type){
                switch(type){
                    case 'PERSONAL': return "个人";
                    case 'CUSTOMER': return '客户';
                    default : return ""
                }
            }
        }
    }



</script>
<style scoped>
    .modal .modal-dialog{
        width: 600px;
    } 


</style>