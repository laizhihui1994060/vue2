<template>
    <div id='wechat_contact_manager' class='child_page'>
    	<breadcrumb
    	    :arr="[{path:'/LoginFinish/companyManagement/customer',text:'公众号企业用户'},{path:'',text: '公众号企业用户申请列表' }]" />
		<vue-table
			ref='table'	
			:filter-btns="filterBtns"
			:filter-input="filterInput"
			item-url="client:/wechat/user/list"
			type='post'
			:params='params'
			:isTime='false'
			:historySearch='false'
			:table-iteration-field="tableIterationField"
			:linkBtn="linkBtn"
			:addBtns="addBtns" 
			:isQuickSearch='false'
			@updateInfo = 'updateInfo'
			:rightBtn="rightBtn" />

        <wechat_contact_check :data='data' @updateList='updateList' />
    </div>
</template> 

<script>
	import vueTable from "../../../../../common_component/vue-table.vue"
	import wechat_contact_check from './wechat_contact_check.vue'
	import breadcrumb from '../../../../../common_component/breadcrumb.vue'

	export default{
		components:{
		    vueTable,
		    wechat_contact_check,
		    breadcrumb
		},
		methods: {
			updateInfo(info){
				this.data = info;
			},
			updateList(){
				console.log(this.$refs.table);
				this.$refs.table.watchDataForm();
			}
		},
	    	data () {
	         return {
	         	data: {},

	         	tableShow: false,

	             params: {
					"pageSize": 15,
					"pageIndex": 1,
					"param": {
						"checkStatus": 'NON_CHECKED'
					}
	             },
	             filterBtns:[
	             	{
	             	    name:"name",
	             	    index: '%',
	             	    label:'姓名',
	             	    type: 'input'
	             	},
	             	{
	             	    name:"phone",
	             	    index: '%',
	             	    label:'手机',
	             	    type: 'input',
	             	    inputType:'number'
					 },
					 {
	             	    name:"companyName",
	             	    index: '%',
	             	    label:'公司名字',
	             	    type: 'input',
	             	},
	                {
	                     title:'注册类型',
	                     name:'type',
	                     filter:"name",
	                     filterName: 'code',
	                     arr: [{ name: '个人注册', code: 'PERSONAl' }, { name: '客户注册', code: 'CUSTOMER' }],
	                     hasAll: true
	                }
	             ],
	             filterInput:[

	             ],
	         
	             tableIterationField:[
					{
						tr:'姓名',
						field:'name',
						link: {
							fn: function(vue, key, value, item_index,item, ctr_type,e){
								vue.$emit('updateInfo', item);
								console.log($('#wechat_contact_check'))
								$('#wechat_contact_check').modal('show');
							}
						}
					},
					{
						tr:'电话',
						field:'phone',
					}, 
					{
						tr:'公司名称',
						field:'changeInfo.companyName',
						filter: 'arr.company',
						
					},
					{
						tr:'审核状态',
						field:'checkStatus',
						filter: 'checkStatus'
					},
					{
						tr:'注册时间',
						field:'registerDate',
						filter: 'date'
					},
	             ],
	             linkBtn:[
	             ]
	         }
	     },
	     mounted(){
	     		const _this = this;
	     		$("#wechat_contact_new").on("shown.bs.modal",function(){
	     			_this.tableShow = true;
	     		});
	     }
	}
</script>

<style scoped>
	#wechat_contact_manager{
		padding-top: 30px;
	}
	#wechat_contact_manager .right_content{
		margin-left: 0px;
	}
</style>