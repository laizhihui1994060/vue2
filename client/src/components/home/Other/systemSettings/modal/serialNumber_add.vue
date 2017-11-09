<template>
	<div id='serialNumber_add' class="modal fade" data-backdrop="static">
		<div class="modal-dialog"> 
		    <div class="modal-content">
		        <div class="modal-header">
		            <span v-text='footTxt'></span>
		            <button class='close' data-dismiss="modal" @click='esc'>
		                <span class="glyphicon glyphicon-remove close"></span>
		            </button>
		        </div>
		        <div class="modal-body">
		            <div class='row main'>
		                <div class='col-sm-6'>
		                    <btn-select 
		                        label='使用地方' 
		                        :arr="[ { name: '下单', code: 'ORDER' }, { name: '员工', code: 'EMP' }, { name: '任务', code: 'JOB' }, { name: '车辆', code: 'CAR' }, { name: '租户', code: 'TENANT' }, { name: '对账单号', code: 'RECONCILIATION' }, { name: '付款单号', code: 'PAYMENT' }, { name: '收款单号', code: 'RECEIVABLES' }, { name: '被救车型编号', code: 'RESCUED_CAR_MODEL' }, { name: '救援车型编号', code: 'RESCUE_CAR_MODEL' }, { name: '行程编号', code: 'ROUTE' } ]"
		                        filter="name"
		                        filterName='code'
			           	     :title='information.codeName'
			           	     :uuid='true'
			           	     field='code'
					     :value='information.codeName'
		                        name="codeName"
		                        :disabled='disabled'
		                        width='150px'
		                        labelRight='12px' 
		                        padding='0'
		                        :updataKey='updataKey'
		                        @updata="integrationDate" /> 
		                </div>
		                <div class='col-sm-6'>
	                		<btn-select 
	                		    label='使用范围' 
	                		    :arr="[ { name: '租户', code: 'TENANT' }, { name: '公司', code: 'ORG' } ]"
	                            filterName='code'
	                		    filter="name"
	                		    :title='information.scope'
	                		    :uuid='true'
			           	     field='code'
					     :value='information.	scope'
					     :updataKey='updataKey'
	                		    name="scope"
	                		    :disabled='disabled'
	                		    width='150px'
	                		    padding='0'
	                		    labelRight='12px'
	                		    @updata="integrationDate" />
		                </div>
		            </div>
		            <div class="row main">
		            	<div class='col-sm-6'>
		            		<form-label-input 
		            			@updata="integrationDate" 
		            			name="prefix" 
		            			label="编码前缀" 
		            			:value='information.prefix'
		            			:disabled='disabled'
		            			inputWidth='150px' />
		            	</div>
		            	<div class='col-sm-6'>
		            	    <form-label-input 
		            	    	@updata="integrationDate" 
		            	    	name="seedLength" 
		            	    	label="编码长度" 
		            	    	:value='information.seedLength'
		            	    	:disabled='disabled'
		            	    	type='number'
		            	    	inputWidth='150px' />
		            	</div>
		            </div>
		            <div class='row main'>
		                <div class='col-sm-6'>
		                    <form-label-input 
		                    	@updata="integrationDate" 
		                    	name="defaultSeed" 
		                    	:value='information.defaultSeed'
		                    	label="&nbsp;&nbsp;&nbsp;初始值" 
		                    	:disabled='disabled'
		                    	type='number'
		                    	inputWidth='150px' />
		                </div> 
		                <div class='col-sm-6'>
		                    <template v-if='!isCreate'>
		                    	<form-label-input 
		                    		@updata="integrationDate" 
		                    		name="currentSeed" 
		                    		:value='information.currentSeed'
		                    		label="&nbsp;&nbsp;&nbsp;当前值" 
		                    		:disabled='true'
		                    		type='number'
		                    		inputWidth='150px' />
		                    </template>
		                </div> 
		            </div>
		            <div class="row">
		            	<div class="col-sm-12">
		            		<span style='margin-right:12px;color:rgb(102, 102, 102)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基准</span>
		            		<div style='display: inline-block;'>
		            			<radio 
		            				name='based' 
		            				@updata='integrationDate' 
		            				value='yearBased' 
		            				:checked='information.yearBased ? true : false'
		            				:disabled='disabled'
		            				text='年'></radio>
		            			<radio 
		            				name='based' 
		            				@updata='integrationDate' 
		            				value='yearMonthBased' 
		            				:checked='information.yearMonthBased ? true : false'
		            				:disabled='disabled'
		            				text='年月'></radio>
		            			<radio 
		            				name='based' 
		            				@updata='integrationDate' 
		            				value='yearMonthDayBased' 
		            				:checked='information.yearMonthDayBased ? true : false'
		            				:disabled='disabled'
		            				text='年月日'></radio>
		            		</div>
		            	</div>
		            </div>
		        </div>
		        <div class="modal-footer">
		            <div class="btns">
                        <button type="button" class="btn radius-btn"  v-text="footTxt" @click='addModify' ></button>
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
	import radio from '../../../../../common_component/radio.vue'

	export default {
	    props:{
	        information: {

	        },
	        isCreate: {},
	        disabled: {},
	        number:{},
	        updataKey: {}
	    },
	    components:{
	        formLabelInput,
	        btnSelect,
	        radio
	    },
	    computed:{
	    	footTxt(){
	    		console.log(this.isCreate)
	    		return this.isCreate ? '添加流水号' : '修改流水号';
	    	}
	    },
	    data () {
	        return {
	            res:{
	            	scope: '',
	            	codeName: '',
	            	prefix: '',
	            	yearBased: '',
	            	yearMonthBased: '',
	            	yearMonthDayBased: '',
	            	seedLength: '',
	            	defaultSeed: '',
	            	sysCodingRuleId: ''
	            },
	            index:0
	        }
	    },
	    methods:{
	        integrationDate(name,item){
	        	if(name == 'based'){
	        		this.res['yearBased'] = false;
	        		this.res['yearMonthBased'] = false;
	        		this.res['yearMonthDayBased'] = false;

	        		this.res[item] = true;
	        		return ;
	        	}
	            this.res[name]= item;

	        },
	        addModify(){

	        	const _this = this;
	        	if(_this.isCreate){   // 添加

	        		if(getData('#serialNumber_add')){
	        			delete _this.res.sysCodingRuleId;
		        		send({
		        			url: 'control:/serial_number',
		        			type: 'post',
		        			param: _this.res  
		        		}, function(err, res){
		        			console.log(res);
		        			if(err)return alert('添加失败！请联系管理员')
		        			if(res.status == 200){
		        				alert('添加成功!', 'success');
		        				_this.$emit('updata');
	                            $('#serialNumber_add').modal('hide');
		        			}else{
		        				console.log(res);
		        				alert(res.msg);
		        			}
		        		});
	        		}
	        		
	        	}else{   // 修改
	        		let data = {};
	        		for(let key in _this.res){
	        			if(_this.res[key] !== ''){
	        				data[key] = _this.res[key]; 
	        			}else{
	        				data[key] = _this.information[key];
	        			}
	        		}
	        		console.log(data);
        			send({
        				url: 'control:/serial_number/' + _this.information.sysCodingRuleId,
        				type: 'put',
        				param: data
        			}, function(err, res){
        				console.log(res);	
	        			if(err)return alert('添加失败！请联系管理员')
        				if(res.status == 200){
        					alert('修改成功！', 'success');
        					_this.$emit('updata');
                            $('#serialNumber_add').modal('hide');
        				}else{
        					alert(res.msg);
        				}
        			})
	        	}
	        },
	        esc(){
	        	this.$emit('clear');
	        	this.res = {
	        		scope: '',
	        		codeName: '',
	        		prefix: '',
	        		yearBased: '',
	        		yearMonthBased: '',
	        		yearMonthDayBased: '',
	        		seedLength: '',
	        		defaultSeed: '',
	        		sysCodingRuleId: ''
	        	};
	        }
	    },
	    watch:{
	    	number(val){
	    		this.esc();
                	$("input[name='based']").attr('checked',false);
	    	}
	    }
	}
</script>

<style>
    #serialNumber_add .modal-body{
		padding:0 35px;
    }
    #serialNumber_add .row.main label{
    	display: inline-block;
    	min-width: 60px;
    }
    #serialNumber_add .row{
    	margin:10px -15px;
    }

</style>