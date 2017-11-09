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
                    title:'技师姓名',
                    name:'type',
                    filter:"SVC_NAME",
                    url:"/item"  
                },
              
            ],
            filterInput:[
                {
                    name:"documentNo",
                    label:'记录编号'
                }
            ],
            tableIterationField:[
            //["记录编号","订单编号","技师姓名","回访类型","规范安全操作","救援及时性","工作态度","备注"],
                {
                    tr:'记录编号',
                    sort:true,
                    field:'recordNo'
                },
                {
                    tr:'订单编号',
                    sort:true,
                    field:'orderNo'
                },
                {
                    tr:'技师姓名',
                    sort:true,
                    field:'name'
                },
                {
                    tr:'回访类型',
                    sort:true,
                    field:'return_type'
                },
                {
                    tr:'规范安全操作',
                    sort:true,
                    field:'operation'
                },
                {
                    tr:'救援及时性',
                    sort:true,
                    field:'timeliness'
                },
                {
                    tr:'工作态度',
                    sort:true,
                    field:'attitude'
                },
                {
                    tr:'备注',
                    sort:true,
                    field:'remark'
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
            jsToExcel(content,"客户单位业绩",title);
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
   
   
    
</style>
