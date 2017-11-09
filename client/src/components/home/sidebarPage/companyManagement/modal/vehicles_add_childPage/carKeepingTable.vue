<template>
	<div class='car_keeping_table'>
		<p>车辆保养：</p>
		<lite-table
			:table_keys='keepingKeys'
			:table_vals='ListDisplay'
			:left_operation="operateLeftOption"
			:convertDepencies="filterFunc"
			@emitedit="editRow"
		></lite-table>
		<div v-if="ListDisplay.length" class="cate-count">共{{cateCount}}种</div>
		<hr>
		<div id='form_keeping' v-if="editable">
			<div class="row">
				<p class="col-xs-1">车辆保养：</p>
				<div class="col-xs-3">
					<btn-select
						label='车辆保养类型'
						:arr='cateREPAIR'
						name='form_keeping_code'
						filter='desc'
						filterName='code'
						placeholder='请选择保养类型'
						width="140px"
						:title="cateSelectValBind"
						verify="true"
						@updata='updateParam'
					/>
				</div>
				<div class="col-xs-2">
					<datetimepicker
						label="保养时间"
						labelRight="4px"
						width="120px"
						name="form_keeping_startTime"
						v-model='form_param.startTime'
                    	minView="form_min_view"
						@updata='updateParam'
					 />
				</div>
				<div class="col-xs-2">
					<form-label-input
						label="有效里程"
					 	labelRight="4px"
					 	inputWidth="70px"
					 	type="number"
					 	name="form_keeping_effectiveMileage"
					 	v-model="form_param.effectiveMileage"
					 	@updata='updateParam'
					 	:min="0"
					 />（公里）
				</div>
				<div class="col-xs-3">
					<datetimepicker
						label="下次保养时间"
						labelRight="4px"
						width="102px"
						name="form_keeping_endTime"
						v-model='form_param.endTime'
                    	minView="form_min_view"
						@updata='updateParam'
						:verify='true'
					 />
				</div>
				<div class="col-xs-1">
					<button :disabled="submit_block" class="btn adding-btn" @click='add_keeping'>提交</button>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-1"></div>
				<div class="col-xs-2">
					<radio 
						:checked='true'
						textDirection='left'
						text='根据时间设置提醒'
						name='form_keeping_noticeType'
						value='TIME'
						@updata='updateParam'
					/>
				</div>
				<div class="col-xs-2">
					<radio 
						:disabled='!gps_bind'
						textDirection='left'
						text='根据时间里程提醒'
						name='form_keeping_noticeType'
						value='MILEAGE'
						@updata='updateParam'
					/>
				</div>
				
				<div class="col-xs-3" v-show='form_param.noticeType === "TIME" '>
					<form-label-input						
						label="提前提醒时间"
					 	labelRight="4px"
					 	inputWidth="70px"
					 	type="number"
					 	name="form_keeping_remindTime"
					 	v-model='form_param.remindTime'
					 	@updata='updateParam'
					 	:min="0"
					 />(天)
				</div>
				<div class="col-xs-3" v-show='form_param.noticeType === "MILEAGE" '>
					<form-label-input
						label="提前提醒里程"
					 	labelRight="4px"
					 	inputWidth="70px"
					 	type="number"
					 	name="form_keeping_remindMileage"
					 	v-model='form_param.remindMileage'
					 	@updata='updateParam'
					 	:min="0"
					/>(公里)
				</div>
				
			</div>
		</div>
	</div>
</template>
<script>
    import Multiplexing from './tableMultiplexing.js'
	import liteTable from '../../../../../../common_component/liteTable.vue'
	import formLabelInput from '../../../../../../common_component/form-label-input.vue'
	import datetimepicker from '../../../../../../common_component/datetimepicker.vue'
	import btnSelect from '../../../../../../common_component/btn_select.vue'
	import radio from '../../../../../../common_component/radio.vue'

	export default{
		components:{
			liteTable,
			formLabelInput,
			datetimepicker,
			btnSelect,
			radio

		},
		props:{
			towTruckId: {
                type: String
            },
			data_cate:{
				type:String
			},
			gps_bind:{
				type:Boolean,
				default:true
			},
			editable: {
                type: Boolean,
                default: false
            }
		},
		data () {
			return {
				remindBy:'TIME',
				form_param:{},
				operateLeftOption:[this.editable],
				cateREPAIR:[
				    {
				        "code": "001",
				        "desc": "机油保养"
				    },
				    {
				        "code": "002",
				        "desc": "刹车保养"
				    },
				    {
				        "code": "003",
				        "desc": "发动机进气系统保养"
				    },
				    {
				        "code": "004",
				        "desc": "燃油管路保养"
				    },
				    {
				        "code": "005",
				        "desc": "发动机外围附件检查"
				    },
				    {
				        "code": "006",
				        "desc": "门边铰链保养"
				    },
				    {
				        "code": "007",
				        "desc": "检查底盘"
				    },
				    {
				        "code": "008",
				        "desc": "检查方向系统"
				    },
				    {
				        "code": "009",
				        "desc": "检查照明系统"
				    },
				    {
				        "code": "010",
				        "desc": "检查空调系统"
				    },
				    {
				        "code": "011",
				        "desc": "检查车内照明和仪表系统"
				    }
				]
				,
				keepingKeys:['车辆保养种类','保养时间','下次保养时间','有效里程','提前提醒时间','提前提醒里程','状态'],
				ListREPAIR:[],
				ListDisplay:[],
			}
		},
		methods:{
			updateParam (name, item) {
				if (name === "form_keeping_noticeType" && item === "MILEAGE") {
					this.setKeyVal('remindTime',0)
					this.setKeyVal('remindMileage',parseInt(this.form_param.effectiveMileage/10))
				} else if (name === "form_keeping_noticeType" && item === "TIME") {
					this.setKeyVal('remindMileage',0)
				} else if (name === "form_keeping_effectiveMileage") {
					console.log("绑定历程")
					this.$nextTick(()=>{
						this.setKeyVal('remindMileage',parseInt(this.form_param.effectiveMileage/10))
					})
				}
				this.updateUtilParam(name.split('_')[2],item, false)
				
			},
			getKeepingCate () {
                send({
                    type:'get',
                    url:'client:/calendar/event_type/repair_type'
                }, (err,res)=>{
                    if (err) return alert(err)
                    if (res.status === 200) {
                        this.cateREPAIR = res.content.map(it=>{
                            return {
                                desc:it.desc,
                                code:it.code
                            }
                        })
                    console.log("查询保养类型成功",res)
                    } else {
                        console.log("查询保养失败失败",res)
                    }
                    
                })
            },
            setKeyVal (name, item) {
                this.$set(this.form_param,name,item);//使vue监听Object属性
            },
			add_keeping () {
				let sendParam = Object.assign({},this.form_param)
				let verification = this.validateParam(this.data_cate, sendParam);
				console.log("验证结果",verification)
                if ( !verification.result ) {
                    return alert(verification.msg)
                }
                if ( !this.form_param.code ) {
                    return alert("请选择保养种类")
                }
                if ( !this.form_param.startTime ) {
                    return alert("请填写保养时间")
                }
                if ( !this.form_param.effectiveMileage ) {
                	return alert("请填写有效里程")
                }
                if ( !this.form_param.endTime && this.form_param.noticeType === "TIME" ) {
                    return alert("请填写到期时间")
                }
                if ( this.form_param.effectiveTime < this.form_param.remindTime ) {
                	return alert("提醒时间不能超过持续时间")
                }
                sendParam.effectiveTime *= 24*60;
                if ( this.remindUnit === "Day" ) {    
                    sendParam.remindTime *= 24*60;
                } else if ( this.remindUnit === "Minute" ) {
                    sendParam.effectiveTime = parseInt(sendParam.effectiveTime);
                    sendParam.remindTime = (
                    	( sendParam.endTime - new Date().setHours(0,0,0,0) ) - 
                    	( new Date().getTime() - new Date().setHours(0,0,0,0) ) - 
                    	this.form_param.remindTime )/1000/60
                    sendParam.remindTime = parseInt(sendParam.remindTime)
                }
                sendParam.effectiveMileage = parseInt(sendParam.effectiveMileage)
                if (sendParam.noticeType === "TIME") {
					sendParam.remindMileage = 0
                } else if (sendParam.noticeType === "MILEAGE") {
					sendParam.remindTime = 0                	
                }
                sendParam.remind = !!sendParam.remindTime
                console.log('你的参数：', sendParam)
                this.doSend(sendParam)
			}
		},
		mounted () {
			this.getKeepingCate()
			this.initParam(this.data_cate)
            this.request_record(this.data_cate)
		},
        mixins:[Multiplexing]
	}
</script>

<style scoped>
	#vehicles_add .car_keeping_table{
		padding-bottom: 20%;
	}
	#form_keeping .col-xs-1{
		padding-right: 0;
	}
	#form_keeping .col-xs-2{
		padding: 0;
	}
	#form_keeping .col-xs-3{
		width: 22%;
		padding: 0;
		margin-right: 15px;

	}

	#form_keeping .adding-btn{
		width: 90%;
		height: 24px;
		line-height: 11px !important;
		background-color: #1785F7;
		color: #fff;
	}
</style>