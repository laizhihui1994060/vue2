<template>
	<div id='expense_type_add' class="modal fade" data-backdrop="static">
		<div class="modal-dialog"> 
		    <div class="modal-content">
		        <div class="modal-header">
		            <span>添加费用类型</span>
		            <button class='close' data-dismiss="modal" >
		                <span class="glyphicon glyphicon-remove close"></span>
		            </button>
		        </div>
		        <div class="modal-body">
		            <div class='row'>
		                <div class='col-sm-8'>
		                    <btn-select 
	                		    label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 费用名称' 
	                		    url='control:/fee/type/sys'
	                		    filter="feeName"
	                		    width='150px'
	                		    name="feeName"
	                		    labelRight='12px'
	                		    padding='0'
	                		    @updata="integrationDate" />

		                </div>
		                <div class='col-sm-4'>
		                	<span v-show="valueType" v-text="'提示:' + valueType" style="color:orange;font-size:12px;"></span>
		                </div>
		            </div>
		            <div class="row">
		            	<div class='col-sm-12'>
	                		<btn-select 
	                		    label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 结算方式' 
	                		    url='control:/sys/param/org'
	                		    method='post'
	                		    :params="[ '/order/settle_method' ]"
	                		    filter="desc"
	                		    :uuid='true'
	                		    field='code'
	                		    width='150px'
	                		    name="settleMethod"
	                		    labelRight='12px'
				           padding='0'
	                		    @updata="integrationDate" />
	                		<span class='inline-close' v-for='(value, index) in settleMethod'>{{value.desc}}<i @click='delSettleMethod(index)'></i></span>
		                </div>
		            </div>
		            <div class="row">
		            	<div class='col-sm-12'>
		            		<btn-select 
	                		    label='行程分段类型' 
	                		    :arr="[ { name: '去程', code: 'AB' }, { name: '返程', code: 'CD' } ]"
	                		    filter="name"
	                		    filterName='code'
	                		    width='150px'
	                		    name="driveRoute"
	                		    labelRight='12px'
	                		    padding='0'
	                		    @updata="integrationDate" />
		            	</div>
		            </div>
		            <div class="row">
		            	<div class='col-sm-12'>
		            		<btn-select 
	                		    label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 付费对象' 
	                		    :arr="[ { name: '公司', code: 'COMPANY'}, { name: '客户', code: 'CUSTOMER'} ]"
	                		    filter="name"
	                		    filterName='code'
	                		    width='150px'
	                		    name="payTarget"
	                		    labelRight='12px'
	                		    :uuid='true'
	                		    :updataKey='updataKey'
	                		    field='code'
	                		    padding='0'
	                		    :value='res.payTarget'
	                		    @updata="integrationDate" />
		            	</div>
		            </div>
		            <div class="row">
		            	<div class="col-sm-6">
		            		<checkbox :checked='res.needDriverReport' text='需要技师报数' name='needDriverReport' @updata='integrationDate' labelRight='12px'></checkbox>
		            	</div>
		            </div>
					<div class="row">
		            	<div class="col-sm-6">
		            		<checkbox :checked='res.needFull' text=' 　　是否必填' name='needFull' @updata='integrationDate' labelRight='12px'></checkbox>
		            	</div>
		            </div>
		        </div>
		        <!-- asdasd -->
		        <div class="modal-footer">
		            <div class="btns">
		                <input type="button" class="btn radius-btn" value='添加' inputWidth='150px' @click='add' />
		                <input type="button" data-dismiss="modal" class="btn radius-btn" value='取消'  inputWidth='150px' />
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
	import checkbox from '../../../../../common_component/checkbox.vue'
	export default {
	    components:{
	        formLabelInput,
	        btnSelect,
	        radio,
	        checkbox
	    },
	    data () {
	        return {
	            updataKey: 1,	
	            settleMethod: [],
	            res:{
					needDriverReport: false,
					needFull: false,
	            	settleMethod: [],
	            	feeName: '',
	            	feeCode: '',
	            	valueType: '',
	            },
	            valueType: '',
	        }
	    },
	    methods:{
	        integrationDate(name,item){
	        	if(name == 'needDriverReport'){
	        		this.res[name] = Boolean(item);
	        		return ;
	        	}
	        	if(name == 'feeName'){
	        		this.res.feeCode = item.feeCode;
	        		this.res.feeName = item.feeName;
	        		this.res.valueType = item.valueType;
	        		this.res.payTarget = item.payTarget;
	        		this.updataKey++;
	        		switch(item.valueType){
	        			case 'INT': this.valueType = '整数'; break;
	        			case 'NUMERIC_6_2': this.valueType = '保留两位小数'; break;
	        		}
	        		console.log(this.res.valueType)
	        		return ;
	        	}
	        	if(name == 'settleMethod'){
	        		const bool = this.res[name].some( (value ,index) => {
	        			if(value == item.code.toUpperCase()){
	        				alert(`已有${item.desc}！`);
	        				return true;
	        			}
	        		});
	        		if(!bool){
	        			this[name].push(item);
	        			this.res[name].push(item.code.toUpperCase());
	        		}
	        		
	        		return ;
	        	}
	            this.res[name]= item;
	            console.log(this.res);
	        },
	        add(){
	        	const _this = this;
	        	send({
	        		url: 'control:/fee/type/org',
	        		type: 'post',
	        		param: _this.res
	        	}, function(err, res){
	        		console.log(err,res);
	        		if(res.status == 200){
	        			alert('添加成功!', 'success');
	        			$('#expense_type_add').find('button[type]').each(function(index, el) {
	        				el.innerHTML = '';
	        			});
	        			$('#expense_type_add').modal('hide');
	        			let newV = JSON.parse(JSON.stringify(_this.res));
	        			_this.res = {
        					needDriverReport: false,
							needFull: false,
			            	settleMethod: [],
			            	feeName: '',
			            	feeCode: '',
			            	valueType: '',
	        			};
	        			_this.settleMethod = [];
	        			_this.$emit('updataExpenseType', newV);
	        		}else{
	        			alert(res.msg ? res.msg : '添加失败！请联系管理员');
	        		}
	        		
	        	})
	        },
	        delSettleMethod(index){
	        	this.settleMethod.splice(index, 1);
	        	this.res.settleMethod.splice(index, 1);
	        }

	    },
	}
</script>

<style>
    #expense_type_add .modal-dialog{
      width: 450px;
    }
    #expense_type_add .modal-body{
		padding:0 25px;
    }
    #expense_type_add .row{
    	margin:10px -15px;
    }
    #expense_type_add .my_radio input{
      top:-1px;
    }
    #expense_type_add .inline-close{
        background-color: #f6f6f6;
    }
</style>