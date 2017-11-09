<template>
    <div>
    	<vue-table
    	    ref='table'
    	    :filter-btns="filterBtns"
    	    :filter-input="filterInput"
    	    item-url="client:/wechat/user/list"
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

    	  <wechat_contact_detail :data='data' />
    </div>
</template> 
<script>


import vueTable from "../../../../../common_component/vue-table.vue";
import wechat_contact_detail from '../modal/wechat_contact_detail.vue'

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
                    "param": {
						// "checkStatus": 'CHECKED'
					}
                },
                labelLeft:'6px',
                labelColor:'rgb(23, 134, 247)',
                filterBtns:[
                	{
                	    name:"name",
                	    index: '%',
                	    label:'名称',
                	    type: 'input'
                	},
                	{
                	    name:"phone",
                	    index: '%',
                	    label:'手机',
                	    type: 'input',
                        inputType: 'number'
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
	                     arr: [{ name: '个人注册', code: 'PERSONAL' }, { name: '客户注册', code: 'CUSTOMER' }],
	                     hasAll: true
                    },
                    {
	                     title:'审核状态',
	                     name:'checkStatus',
	                     filter:"name",
	                     filterName: 'code',
	                     arr: [{ name: '未审核', code: 'NON_CHECKED' }, { name: '已审核', code: 'CHECKED' }, { name: '已拒绝', code: 'REJECTED' }],
	                     hasAll: true
	                }
                ],
                filterInput:[
                ],
             
                tableIterationField:[
                    {
                        tr:'姓名',
                        field:'name',
                        // link: {
                        // 	fn: function(vue, key, value, item_index,item, ctr_type,e){
                        // 		    vue.$emit('updateInfo', item);
    	                //         	$('#wechat_contact_detail').modal('show');
    	                //         }
                        // }
                    },
                    {
                        tr:'电话',
                        field:'phone'
                    }, 
                    {
                        tr:'公司名称',
                        field:'companyName'
                    }, 
                    {
                        tr:'审核状态',
                        field:'checkStatus',
                        filter: 'checkStatus'
                    },
                    {
                        tr:'类型',
                        field:'type',
                        filter: 'wechat_type'
                    },
                    {
                        tr:'注册时间',
                        field:'registerDate',
                        filter: 'date'
                    },
                    {
                        tr:'审核时间',
                        field:'checkDate',
                        filter: 'date'
                    }
                ],
                linkBtn:[
                ],
                addBtns:[
                    {
                        text:'新的申请',
                        link_name:'weChat_contact_manager',   //路由名字
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
            wechat_contact_detail
        },
        created(){
            // 获取新的申请( 做红点 )
            const _this = this;

            _this.addBtns[0].vIf = !ConfigPage.isExist(['companyManagement', 'wechat_contact_manager']);  

            if(_this.addBtns[0].vIf) return;

            send({
                url: "client:/wechat/user/list",
                type: 'post',
                param:{
                    pageIndex:1,
                    pageSize:10,
                    "param": {
						"checkStatus": 'NON_CHECKED'
					}
                }
            }, function(err, res){
                if(res.status == 200){
                    console.log(res);
                    _this.addBtns[0].number = res.recordSize
                }
            });
        }
    }
</script>

<style scoped>

</style>