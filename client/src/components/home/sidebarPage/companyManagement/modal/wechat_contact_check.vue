<template>
    <div id='wechat_contact_check' class="modal fade" >
            <div class="modal-dialog"> 
                <div class="modal-content">
                    <div class="modal-header">
                        <span>申请人详情</span>
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
                                        :value='switchType("CUSTOMER")'
                                        />
                                </div>
                                <div class="col-xs-6">
                                    <inputEdit
                                        :disabled='disabled'
                                        label='注册时间'
                                        name='registerDate'
                                        inputMaxWidth='150px'
                                        @updata = 'integrationDate'
                                        :value='moment(data.registerDate).format("YYYY-MM-DD HH:mm")'
                                        />
                                </div>
                                
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <inputEdit
                                        :disabled='disabled'
                                        label='当前公司'
                                        name='companyName'
                                        inputMaxWidth='150px'
                                        @updata = 'integrationDate'
                                        :value='data.companyName ? data.companyName : ""'
                                        />
                                </div>
                                <div class="col-xs-6">
                                    <inputEdit
                                        :disabled='disabled'
                                        label='修改后的公司'
                                        name='companyName'
                                        inputMaxWidth='150px'
                                        @updata = 'integrationDate'
                                        :value='data.changeInfo ? data.changeInfo[0].companyName : ""'
                                        />
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6'>
                                    <radio 
                                        text="新增客户" 
                                        :checked="true"
                                        name="isCustomer"
                                        value="false"
                                        @updata="integrationDate" />
                                    <radio 
                                        text="已签约客户" 
                                        :checked="false"
                                        name="isCustomer"
                                        value="true"
                                        @updata="integrationDate" />
                                </div>
                                <div class='col-xs-6' v-show = "isCustomer">
                                    <inputEdit
                                        label='归并客户'
                                        name='partnerId'
                                        @updata = 'integrationDate'
                                        type='btn'
                                        url='client:/helper/partner'
                                        method='post'
                                        fieldName='partnerId'
                                        objCode='partnerId'
                                        objName='name'
                                        :params="{ isCustomer: true }"
                                        value=''
                                        />
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btns">
                            <button type="button" class="btn" inputWidth='150px' @click='changeCheck("CHECKED")'  >通过</button>
                            <button type="button" class="btn" inputWidth='150px'  @click='changeCheck("REJECTED")'>拒绝</button>
                            <button type="button" data-dismiss="modal" class="btn"  inputWidth='150px'  >取消</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
</template>

<script>
    import inputEdit from '../../../../../common_component/inputEdit.vue'
    import radio from '../../../../../common_component/radio.vue'

    export default {
        props: {
            data: {}
        },
        components: {
            inputEdit,
            radio
        },
        data () {
            return {
                res:{},
                disabled: true,
                isCustomer: false
            }
        },
        methods:{
            integrationDate(name,item){
                if(name == 'isCustomer'){
                    this[name] = item;
                    return;
                }
                console.log(name, item);
                this.res[name]= item;
                console.log(this.res);
            },
            changeCheck(item){
            	const that = this;
            	that.res = {
                    weChatOpenId: that.data.weChatOpenId,
                    weChatOrgConfId: that.data.weChatOrgConfId,
                    checkStatus: item,
                    partnerId: that.res.partnerId
                } 
                console.log(this.res);
            	send({
            		url: 'client:/wechat/user/check',
            		type: 'post',
            		param: that.res 
            	}, function(err, res){
            		console.log(res);
            		that.$emit('updateList');
            		
            		if(res.status == 200){
            		      alert( item == 'REJECTED' ? '拒绝成功' : '通过成功', 'success');
                          $('#wechat_contact_check').modal('hide'); 
            		}else{
            		      alert(res.msg);
            		}
            	})
            },
            switchType(type){
                switch(type){
                    case 'PERSONAL': return "个人";
                    case 'CUSTOMER': return '客户';
                    default : return ""
                }
            },
            moment(date){
                return moment(date)
            }
        }
    }



</script>
<style scoped>
    .modal .modal-dialog{
        width: 700px;
    } 
	.row{
		margin: 15px 0;
	}

</style>