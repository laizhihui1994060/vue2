<template>
    <div id='company_register_new' class='child_page'>
    	  <breadcrumb
    	      :arr="[{path:'/LoginFinish/companyManagement/customer',text:'客户'},{path:'',text: '客户联系人申请列表' }]" />
	<vue-table
	    ref='table'	
	    :filter-btns="filterBtns"
	    :filter-input="filterInput"
	    item-url="client:/contact_user/list"
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

        <company_register_check :data='data' @updateList='updateList' />
    </div>
</template> 

<script>
	import vueTable from "../../../../../common_component/vue-table.vue"
	import company_register_check from './company_register_check.vue'
	import breadcrumb from '../../../../../common_component/breadcrumb.vue'

	export default{
		components:{
		    vueTable,
		    company_register_check,
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
	                 "checkStatus": 'NON_CHECKED'
	             },
	             filterBtns:[
	             	{
	             	    name:"name",
	             	    index: '%',
	             	    label:'姓名',
	             	    type: 'input'
	             	},
	             	{
	             	    name:"mobile",
	             	    index: '%',
	             	    label:'手机',
	             	    type: 'input',
	             	    inputType:'number'
	             	},
	                 {
	                     title:'会员',
	                     name:'isMember',
	                     filter:"name",
	                     filterName: 'code',
	                     arr: [{ name: '是', code: true }, { name: '否', code: false }],
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
	                 	                        	$('#company_register_check').modal('show');
	                 	                        }
	                                     }
	                                 },
	                                 {
	                                     tr:'电话',
	                                     field:'mobile',

	                                 }, 
	                                 {
	                                     tr:'审核状态',
	                                     field:'checkStatus',
	                                     filter: 'checkStatus'
	                                 },
	                                 {
	                                     tr:'申请备注',
	                                     field:'registerRemark',
	                                     filter: 'tooltip',
	                                 },
									{
										tr:'所属客户',
										field:'belongCompany'
									},
	                                 {
	                                     tr:'会员',
	                                     field:'isMember',
	                                     filter: 'whether'
	                                 },
	                                 {
	                                     tr:'启用状态',
	                                     field:'isActive',
	                                     filter: 'whether'
	                                 },
	                                 {
	                                     tr:'申请时间',
	                                     field:'created',
	                                     filter: 'date'
	                                 },
	                                 {
	                                     tr:'审核时间',
	                                     field:'checkDate',
	                                     filter: 'date'
	                                 }
	             ],
	             linkBtn:[

	             ]
	         }
	     },
	     mounted(){
	     		const _this = this;
	     		$("#company_register_new").on("shown.bs.modal",function(){
	     			_this.tableShow = true;
	     		});
	     }
	}
</script>

<style scoped>
	#company_register_new{
		padding-top: 30px;
	}
	#company_register_new .right_content{
		margin-left: 0px;
	}
</style>