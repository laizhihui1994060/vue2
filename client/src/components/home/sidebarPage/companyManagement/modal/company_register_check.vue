<template>
    <div id='company_register_check' class="modal fade" >
            <div class="modal-dialog"> 
                <div class="modal-content">
                    <div class="modal-header">
                        <span>申请联系人详情</span>
                        <button class='close' data-dismiss="modal" >
                            <span class="glyphicon glyphicon-remove close"></span>
                        </button>
                    </div>
                    <div class="modal-body">
                            <div class="row">
                                <div class="col-xs-6">
                                    <form-label-input 
                                        label='姓　　名'  
                                        @updata="integrationDate"
                                        :value='data.name ? data.name : ""'
                                        name='name' />
                                </div>
                                <div class="col-xs-6">
                                    <form-label-input 
                                        label='手机号码'  
                                                    :disabled='true'
                                        @updata="integrationDate"
                                        :value='data.mobile ? data.mobile : ""'
                                        name='mobile' />
                                </div>
                            </div>

                            
                            <div class="row">
                                <div class="col-xs-6">
                                		<btn-select 
                                		    label='所属4s店' 
                                		    label-right='12px'
                                		    url='client:/helper/partner'
                                		    method='post'
                                		    :params="{ isCustomer: true }"
                                		    filter="name"
                                		    :random='Math.random()'
                                		    filterName='partnerId'
                                		    :uuid='true'
                                		    field='partnerId'
                                		    width='71px'
                                		    :updataKey='updataKey'
                                		    :value='data.partnerInfo ? data.partnerId : "" '
                                		    name="partnerId" 
                                		    @updata="integrationDate"
                                		    padding='0'>
                                		</btn-select>
                                </div>
                                <div class="col-xs-6">
                                        <switchCheck
                                            :disabled='disabled'
                                            name='isMember'
                                            @updata="integrationDate"
                                            :checked='data.isMember'
                                            text='会　　员'
                                            />  
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                	<form-label-input 
                                	    label='登录密码'  
                                	    @updata="integrationDate"
                                	    :value='data.password  ? data.password  : "000000"'
                                	    name='password' />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <form-label-input 
                                        label='申请备注' 
                                        :disabled='true'
                                        inputWidth='377px' 
                                        @updata="integrationDate"
                                        :value='data.registerRemark  ? data.registerRemark  : ""'
                                        name='registerRemark' />
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
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    import btnSelect  from '../../../../../common_component/btn_select.vue'
    import switchCheck from '../../../../../common_component/switch.vue'

    export default {
        props: {
            data: {},
            disabled: {}
        },
        components: {
            formLabelInput,
            btnSelect,
            switchCheck
        },
        data () {
            return {
                res:{},
                updataKey: 0
            }
        },
        watch: {
        	data(newV, oldV){
        		console.log(newV);
        		this.res = JSON.parse(JSON.stringify(newV) );
                        if(!this.res.password){
                            this.res.password = '000000';
                        }
        		this.updataKey = Math.random();
        		
        	}
        },
        methods:{
            integrationDate(name,item){
                console.log(name, item);
                this.res[name]= item;
                console.log(this.res);
            },
            changeCheck(item){
            	const that = this;
            	that.res['checkStatus'] = item;

            	console.log(this.res);

            	send({
            		url: 'client:/contact_user/'  + that.res.contactId + '/check',
            		type: 'post',
            		param: this.res 
            	}, function(err, res){
            		console.log(res);
            		that.$emit('updateList');
            		$('#company_register_check').modal('hide');
            		if(res.status == 200){
            		      alert( item == 'REJECTED' ? '拒绝成功' : '通过成功', 'success');
            		}else{
            		      alert(res.msg);
            		}
            	})
            }
        }
    }



</script>
<style scoped>
    .modal .modal-dialog{
        width: 600px;
    } 
	.row{
		margin: 15px 0;
	}

</style>