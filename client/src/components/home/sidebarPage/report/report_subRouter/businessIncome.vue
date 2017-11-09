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
import vueTable from "../../../../../common_component/vue-table.vue";

export default {
    props:{
        
    },
    components:{
      vueTable
    },
     data () {
           return {
            filterBtns:[
                {
                    title:'救援类型',
                    name:'type',
                    filter:"SVC_NAME",
                    url:"/item"  
                },
                {
                    title:'救援名称',
                    name:'source',
                    filter:"SVC_NAME",
                    url:"/item"  
                },
               
            ],
            filterInput:[
                {
                    name:"orderNo",
                    label:'订单编号'
                }
            ],
            tableIterationField:[
            //["订单编号","客户名称","救援类型","金额","车主","联系方式","救援地"]
                {
                    tr:'订单编号',
                    sort:true,
                    field:'orderNo'
                },
                {
                    tr:'客户名称',
                    sort:true,
                    field:'client_name'
                },
                {
                    tr:'救援类型',
                    sort:true,
                    field:'type'
                },
                {
                    tr:'金额',
                    sort:true,
                    field:'money'
                },
                {
                    tr:'车主',
                    sort:true,
                    field:'owner'
                },
                {
                    tr:'联系方式',
                    sort:true,
                    field:'contact_method'
                },
                {
                    tr:'救援地',
                    sort:true,
                    field:'res'
                }
            ],
            linkBtn:[

            ],
            rightBtn:[
              
            ]
        }
    },
   
    methods:{
        toggleText(data){
            this.color = '#333';
            this.text = data;
        },
        saveAsExcel(){
            var data=this.$data.arr;
            var content="";
            for(var i=0;i<data.length;i++){
               for(var item in data[i]){
                  content+=(data[i][item]+",");
               }
               content=content.substring(0,content.length-1);
               content+="\n";
            }
            content=content.substring(0,content.length-1);
            var title=this.$data.title;
            jsToExcel(content,"营业收入",title);
            console.log(content);
        },
        integrationDate(name, item){
            this.res[name]= item;
            console.log(this.res);
        }
        
    },
    filters: {
        
    }
}
  
</script>

<style scoped>
   
  .right_content #table tbody tr td:last-child{
    text-align: left;
  }
   
</style>
