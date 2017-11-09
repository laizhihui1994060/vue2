<template>
	<div class='car_pass_table'>
		<p>通行证记录：</p>
		<lite-table
			:table_keys='passKeys'
			:table_vals='ListDisplay'
			:left_operation="operateLeftOption"
			:convertDepencies="filterFunc"
			@emitedit="editRow"
		></lite-table>
		<div v-if="ListDisplay.length" class="cate-count">共{{cateCount}}种</div>
		<hr>
		<div id='form_pass' class="row" v-if="editable">
			<p class="col-xs-1">添加通行证：</p>
			<div class="col-xs-2">
				<btn-select
					label='通行证种类'
					:arr='catePASS_CHECK'
					name='form_carpass_code'
					filter='desc'
					filterName='code'
					placeholder='请选择通行证种类'
					width="100px"
					ulistwidth="140px"
					color="#000"
					:title="cateSelectValBind"
					@updata='updateParam'
					/>
			</div>
			<div class="col-xs-2">
				<datetimepicker
					label="起始时间"
					labelRight="4px"
					width="130px"
					name="form_carpass_startTime"
					v-model='form_param.startTime'
					minView="form_min_view"
					@updata='updateParam'
				 />
			</div>
			<div class="col-xs-2">
				<form-label-input
					label="通行证时效"
					labelRight="4px"
					inputWidth="70px"
					type="number"
					name="form_carpass_effectiveTime"
					v-model='form_param.effectiveTime'
					@updata='updateParam'
					:min="0"
				 />(天)
			</div>
			<div class="col-xs-2">
				<datetimepicker
					label="到期时间"
					labelRight="4px"
					width="130px"
					name="form_carpass_endTime"
					v-model='form_param.endTime'
					minView="form_min_view"
					@updata='updateParam'
					:verify='true'
				 />
			</div>
			<div class="col-xs-2">
				<form-label-input
					label="提前提醒时间"
					labelRight="4px"
					inputWidth="70px"
					type="number"
					name="form_carpass_remindTime"
					v-model='form_param.remindTime'
					:min="0"
					:max="form_param.effectiveTime"
					@updata='updateParam'
				 />(天)
			</div>
			<div class="col-xs-1">
				<button :disabled="submit_block" class="btn adding-btn" @click='add_pass'>提交</button>
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

	export default{
		components:{
			liteTable,
			formLabelInput,
			datetimepicker,
			btnSelect
		},
		props:{
			towTruckId: {
				type: String
			},
			data_cate:{
				type:String
			},
			editable: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return {

				passKeys:['通行证种类','缴费时间','到期时间','时效','提前提醒时间','状态'],
				ListCAR_PASS:[],
				operateLeftOption:[this.editable],
				form_param:{},
				catePASS_CHECK:[
					{
						"code": "002",
						"desc": "邮政/快递车辆通行证"
					},
					{
						"code": "003",
						"desc": "绿化/环卫作业车辆通行证"
					},
					{
						"code": "004",
						"desc": "公共服务车辆通行证"
					},
					{
						"code": "005",
						"desc": "货车通行证（含大中型、小型、危险品）"
					},
					{
						"code": "006",
						"desc": "客车通行证（含单位交通车、公路客运、旅游客运）"
					},
					{
						"code": "007",
						"desc": "教练车教学线路通行证"
					},
					{
						"code": "008",
						"desc": "三车”通行证（含渣土车、搅拌车）"
					},
					{
						"code": "009",
						"desc": "临时通行证"
					},
					{
						"code": "001",
						"desc": "工程施救车辆通行证"
					}
				],
				ListDisplay:[],
			}
		},
		methods:{
			updateParam(name,item){
				this.updateUtilParam(name.split('_')[2],item, false)
			},
			setKeyVal(name,item){
				this.$set(this.form_param,name,item);//使defineProperty监听到属性值
			},
			get_record(){
				Object.assign({passCate:''},this.form_param_util)
				let param = {
					pageSize:15,
					pageIndex:1
				}

				setTimeout(()=>{
					this.passList = this.dummyList
				},500)
			},
			getPassCate(){
				send({
					type:'get',
					url:'client:/calendar/event_type/pass_type'
				}, (err,res)=>{
					if(err) return alert(err)
					if(res.status === 200){
						this.catePASS_CHECK = res.content.map(it=>{
							return {
								desc:it.desc,
								code:it.code
							}
						})
					console.log("查询通行证类型成功",res)
					} else {
						console.log("查询通行证类型失败失败",res)
					}
					
				})
			},
			add_pass(){
				let sendParam = Object.assign({},this.form_param)
				let verification = this.validateParam(this.data_cate, sendParam);
				if( !verification.result ){
					return alert(verification.msg)
				}
				if( !this.form_param.code ){
					return alert("请选择通行证种类")
				}
				if( !this.form_param.startTime ){
					return alert("请填写起始时间")
				}
				if( !this.form_param.endTime ){
					return alert("请填写到期时间")
				}
				sendParam.effectiveTime *= 24*60;
				if( this.remindUnit === "Day" ){                   
					sendParam.remindTime *= 24*60;
				} else if( this.remindUnit === "Minute" ){
					sendParam.remindTime = (
						(sendParam.endTime - new Date().setHours(0,0,0,0)) - 
						( new Date().getTime() - new Date().setHours(0,0,0,0) ) - 
						this.form_param.remindTime )/1000/60
					sendParam.remindTime = parseInt(sendParam.remindTime)

				}
				sendParam.remind = !!sendParam.remindTime
				console.log('你的参数：', sendParam)
				this.doSend(sendParam)
			}
		},
		mounted(){
			this.getPassCate()
			const _init_param_  = this.initParam(this.data_cate)
			this.request_record(this.data_cate)
		},
		mixins:[Multiplexing]
	}
</script>

<style scoped>
	#vehicles_add .car_pass_table{
		padding-bottom: 25%;
	}
	#form_pass .col-xs-2{
		text-align: center;
		padding:0;
		width: 16%;
	}
	#form_pass .col-xs-1{
		padding-right: 0;
	}
	#form_pass .adding-btn{
		width: 90%;
		height: 24px;
		line-height: 11px !important;
		background-color: #1785F7;
		color: #fff;
	}
</style>