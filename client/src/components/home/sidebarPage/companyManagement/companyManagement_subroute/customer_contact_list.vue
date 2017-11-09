<template>
    <div>
    	<vue-table
    	    ref='table'
    	    :filter-btns="filterBtns"
    	    :filter-input="filterInput"
    	    item-url="client:/contact_user/list"
    	    type='post'
    	    :params='params'
    	    :isTime='false'
    	    :table-iteration-field="tableIterationField"
    	    :linkBtn="linkBtn"
    	    :addBtns="addBtns" 
            :labelColor='labelColor'
            :labelLeft='labelLeft'
    	    :isQuickSearch='false'
    	    @updateInfo = 'updateInfo'
    	    :rightBtn="rightBtn" />

    	  <company_register_detail :data='data' />
    </div>
</template> 
<script>


import vueTable from "../../../../../common_component/vue-table.vue";
import company_register_detail from '../modal/company_register_detail.vue'

    export default {
    	  methods: {
    	  	updateInfo(info){
    	  		console.warn(info);
    	  		this.data = info;
    	  	}
    	  },
        data () {
           return {
           	    data: {

           	    },
                params: {
                    "pageSize": 15,
                    "pageIndex": 1,
                    "checkStatus": 'CHECKED'
                },
                labelLeft:'6px',
                labelColor:'rgb(23, 134, 247)',
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
                           inputType: 'number'
                	  },
                    {
                        title:'会员',
                        name:'isMember',
                        filter:"name",
                        filterName: 'code',
                        arr: [{ name: '是', code: true }, { name: '否', code: false }],
                        hasAll: true
                    },
                    {
                        title:'启用状态',
                        name:'isActive',
                        filter:"name",
                        filterName: 'code',
                        hasAll: true,
                        arr: [{ name: '是', code: true }, { name: '否', code: false }],
                    },
                    {
                        title:'审核状态',
                        name:'checkStatus',
                        filter:"name",
                        filterName: 'code',
                        hasAll: true,
                        arr: [{ name: '已经审核', code: 'CHECKED' }, { name: '拒绝', code: 'REJECTED' }, { name: '未审核', code: 'NON_CHECKED' }],
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
    	                        	$('#company_register_detail').modal('show');
    	                        }
                        }
                    },
                    {
                        tr:'电话',
                        field:'mobile'
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
                    // {
                    //     tr:'所属客户',
                    //     field:'belongCompany'
                    // },
                    {
                        tr:'所属4s店	',
                        field:'partnerInfo.name',
                        filter: 'obj'
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
                		{
                		    text:'启用',
                		    model:false,
                		    link_if: [ [ 'isActive', false ], [ "checkStatus", 'CHECKED' ]   ],
                		    link_if_type: '&&',
                		    fn: function(self, key, value, item_index, item) {

                		             var id = item['contactId'],
                		             	param = {
                		             		isActive: true
                		             	};

                		             send({
                		                 url: "client:/contact_user/" + id +"/status",
                		                 param: param,
                		                 type: 'put'
                		            }, function(err,response){
                		            		console.log(response)
                		                 if(response.status == 200){
                		                    self.watchDataForm();
                		                 }else{
                		                 	alert(response.msg)
                		                 }
                		            });
                		    }
                		}, {
                		    text:'停用',
                		    model:false,
                		    link_if: [ [ 'isActive', true ], [ "checkStatus", 'CHECKED' ]  ],
                		    link_if_type: '&&',
                		    fn: function(self, key, value, item_index, item) {
                		             var id = item['contactId'],
                		             	param = {
                		             		isActive: false
                		             	};
                		             send({
                		                 url: "client:/contact_user/" + id +"/status",
                		                 param: param,
                		                 type: 'put'
                		            }, function(err,response){
                		            		console.log(response)
                		                 if(response.status == 200){
                		                    self.watchDataForm();
                		                 }else{
                		                 	alert(response.msg)
                		                 }
                		            });

                		    }
                		}
                ],
                addBtns:[
                    {
                        text:'新的申请',
                        link_name:'customer_contact_manager',   //路由名字
                        link_key:"0",
                        link_Field:'0',
                        vIf: '',
                        number: 0,
                        isCreate: true,
                    },
                ]
            }
        },
        components:{
            vueTable,
            company_register_detail
        },
        created(){
            // 获取新的申请( 做红点 )
            const _this = this;

            _this.addBtns[0].vIf = !ConfigPage.isExist(['companyManagement', 'customer_contact_manager']);  

            if(_this.addBtns[0].vIf) return;

            send({
                url: "client:/contact_user/list",
                type: 'post',
                param:{
                    pageIndex:1,
                    pageSize:10,
                    checkStatus: 'NON_CHECKED'
                }
            }, function(err, res){
                if(res.status == 200){
                    _this.addBtns[0].number = res.recordSize
                }
            });
        }
    }
</script>

<style scoped>

</style>