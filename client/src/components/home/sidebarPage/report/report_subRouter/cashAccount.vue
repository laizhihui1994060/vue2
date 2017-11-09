<template>
    <div class="right_content">
        <vue-table
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="/falseItem"
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            :rightBtn="rightBtn"/>
    </div>
</template>

<script>
import startEndTime from "../../../../../common_component/startEndTime.vue";
import vueTable from "../../../../../common_component/vue-table.vue";
export default {
   
    components:{
        vueTable      
    },
    data () {
           return {
            filterBtns:[
              
            ],
            filterInput:[
                {
                    name:"orderNo",
                    label:'账目日期'
                }
            ],
            tableIterationField:[
                {
                    tr:'账目日期',
                    sort:true,
                    field:'orderDate'
                },
                {
                    tr:'借',
                    sort:true,
                    field:'lend'
                },
                {
                    tr:'金额',
                    sort:true,
                    field:'lend_money'
                },
                {
                    tr:'贷',
                    sort:true,
                    field:'borrow'
                },
                {
                    tr:'金额',
                    sort:true,
                    field:'borrow_money'
                }
               
            ],
            linkBtn:[
              
            ],
            rightBtn:[
                
            ]
        }
    },
    methods:{
     
    }
    
    
  }
</script>


<style scoped>

</style>
