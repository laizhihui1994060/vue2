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
                    // "checkStatus": 'CHECKED'
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
                   
                ],
                linkBtn:[
                	
                ],
                addBtns:[
                 
                ]
            }
        },
        components:{
            vueTable,
            company_register_detail
        },
        created(){
         
        }
    }
</script>

<style scoped>

</style>