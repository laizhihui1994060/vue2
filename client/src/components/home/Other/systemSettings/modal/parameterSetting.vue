<template>
    <div id='parameterSetting_modal' class="modal fade" data-backdrop="static" v-if='this.modalData.isShow'>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span>显示字段设置</span>
                    <button class='close' data-dismiss="modal" @click='esc' >
                        <span class="glyphicon glyphicon-remove close" ></span>
                    </button>
                </div>
                <div class="modal-body clearfix">
                	<ul class="left pull-left">
				<li v-for='(item, key) in modalData.data' @click='change(key)' :class='key == modalData.key ? "active" : "" '>{{item.pathDesc}}</li>
			</ul>
	              <ul class='right pull-right'>
 
                        <!-- radio -->
                        <template v-if='modalData.data[modalData.key].value.type == "radio_options"'>
                            <template v-if='modalData.data[modalData.key].value.values && !modalData.data[modalData.key].value.available_columns' v-for='(obj, index) in modalData.data[modalData.key].value.values'>
                                <li>
                                    <radio :text='obj.desc' :name="index + 'xx'" :checked='obj.isChoose' @updata='updataModal' :index='index' ></radio>
                                </li>
                            </template>
                            
                            <!-- 特殊情况 shareObject -->
                            <template v-if='modalData.data[modalData.key].value.shareObject.length > 0' v-for='(obj, index) in modalData.data[modalData.key].value.shareObject'>
                                <li>
                                    <radio :text='obj.desc' :name="index + 'xx'" :checked='obj.isChoose' @updata='updataModal' :index='index' ></radio>
                                </li>
                            </template>

                            <!-- 特殊情况 available_columns -->
                            <template v-if='modalData.data && modalData.data[modalData.key].value.available_columns' >
                                <li v-for='obj in modalData.data[modalData.key].value.available_columns' :key="obj.code">
                                    <div > 
                                        <button>-<br />-<br />-</button>
                                    </div>
                                    <radio :text='obj.desc' :name='obj.code'  display='none'></radio>
                                </li>  
                            </template>
                        </template> 

                        <!-- text -->
                        <template v-else-if='modalData.data[modalData.key].value.type == "text"'>
                            <template v-if='modalData.data[modalData.key].value && !modalData.data[modalData.key].value.available_columns' v-for='(obj, index) in modalData.data[modalData.key].value.values'>
                                <li>
                                    <form-label-input inputWidth='100%' @updata="updataModal"  name="loginId"  :value='obj.code' :unit='obj.desc'  :index='index'  />
                                </li>
                            </template>
                        </template>

                        <!-- checkbox -->
                        <template v-else>
                            <!-- 特殊情况(完工报数项目检查) -->
                            <template v-if='modalData.key == "completion_feedback"' >
                                    <li class='completion_feedback' v-for='(obj, index) in modalData.data.completion_feedback.value.values'>
                                        <checkbox newStyle='margin-left:0;' @updata="updataModal" direction='left' top='2px' labelSize='12px' :name='obj.code' :text='obj.desc' :checked='obj.isChoose' :index='index'    ></checkbox>
                                        <btn-select 
                                            :arr="[ '>', '>=', '<', '<=' ]"
                                            :value='obj.minCondition'
                                            name="minCondition"
                                            width='50px'
                                            padding='5px'
                                            :index='index'
                                            @updata="updataModal" /> 
                                        <form-label-input type='number' inputWidth='94px' @updata="updataModal"  name="loginId" :value='obj.value'  :unit='obj.unit'  :index='index'  />
                                    </li>
                            </template>
                            <template v-else>
                                <!-- 正常情况 -->
                                <template v-if='modalData.data[modalData.key].value && !modalData.data[modalData.key].value.available_columns' v-for='(obj, index) in modalData.data[modalData.key].value.values'>
                                    <li>
                                        <checkbox top='0px' :text='obj.desc' :name='obj.code' :checked='obj.isChoose' @updata='updataModal' :index='index' ></checkbox>
                                    </li>
                                </template>

                                <template v-if='modalData.data && modalData.data[modalData.key].value.available_columns' >
                                    <li v-for='obj in modalData.data[modalData.key].value.available_columns' :key="obj.code">
                                        <div > 
                                            <button>-<br />-<br />-</button>
                                        </div>
                                        <checkbox top='0px' :text='obj.desc'  display='none'></checkbox>
                                    </li>  
                                </template>
                            </template>
                        </template>
	</ul>
            </div> 
                <div class="modal-footer">
                    <div class="btns">
                        <input type="button" data-dismiss="modal" class="btn radius-btn" value='保存' @click='modify'  />
                        <input type="button" data-dismiss="modal" class="btn radius-btn" value='取消' @click='esc' />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import checkbox from '../../../../../common_component/checkbox.vue'
import radio from '../../../../../common_component/radio.vue'
import btnSelect from '../../../../../common_component/btn_select.vue'
import formLabelInput from '../../../../../common_component/form-label-input.vue'
    export default{
    	props: {
    		modalData: {}
    	},
    	data(){
    		return {

    		}
    	},
    	methods: {
            esc(){
                this.$emit('esc')
            },
    		change(key){
                this.$emit('changeKey', key);
    		},
            updataModal(item, value, index){
                this.$emit('updataModal', value, index);
            },
            modify(param){
                this.$emit('modifyData')
            }
    	},
        components:{
            checkbox,
            radio,
            btnSelect,
            formLabelInput
        }
    }
    
</script>

<style>
    #parameterSetting_modal .modal-dialog{
        width: 500px;
    }
	#parameterSetting_modal .modal-body ul{
		width:170px;
		border:1px solid #C9C9C9;
		height: 350px;
	}
    #parameterSetting_modal .modal-body ul.left{
        overflow-y:auto;
        overflow-x:none;
    }
	#parameterSetting_modal .modal-body ul.right{
		overflow-y:auto;
		overflow-x:none;
		width:280px;
	}
	#parameterSetting_modal .modal-body .left li{
		padding:5px;
		cursor: pointer;
		border:1px solid #eee;
	}
	#parameterSetting_modal .modal-body .left li.active{
		background:#DFF5FD;
		color:#000;
	}
    #parameterSetting_modal .modal-body .right .my_radio{
        width:100%;
    }
    #parameterSetting_modal .modal-body .right .my_radio label{
        width:80%;
    }
	#parameterSetting_modal .modal-body .right > li{
        padding:5px;
		display: flex;
		border-bottom: 1px solid #c9c9c9;
	}
    #parameterSetting_modal .modal-body .right li input[type='radio']{
        float:right;
    }
	#parameterSetting_modal .modal-body .right li button{
		line-height:4px;
		color:#C9C9C9;
		width:22px;
		height: 30px;
		background: #DFF5FD;
		border:none;
	}
	#parameterSetting_modal .modal-body .right > li .my_checkbox{
		width:250px;
		line-height: 2;
		padding:0px 5px;
	}
    
	#parameterSetting_modal .modal-body .right li .my_checkbox label{
		font-size: 14px;
		width:180px;
	}
    #parameterSetting_modal .modal-body .right > li.completion_feedback .my_checkbox{
        width:113px;
    }
    #parameterSetting_modal .modal-body .right li.completion_feedback .my_checkbox label{
        font-size: 14px;
        width:50px;
    }
    #systemManagement .modal-body .setWidth{
        min-width: inherit;
        height: 24px !important;
    }
    #parameterSetting_modal .modal-body .btn-group ul{
        height: inherit;
        
    }
</style>