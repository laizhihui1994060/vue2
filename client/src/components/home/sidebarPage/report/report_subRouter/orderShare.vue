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
                    title:'分享类型',
                    name:'type',
                    filter:"SHARE_TY",
                    url:"/item"  
                },
                {
                    title:'单位名称',
                    name:'source',
                    filter:"SVC_NAME",
                    url:"/item"  
                },
                {
                    title:'技师姓名',
                    name:'resTime',
                    filter:"SVC_NAME",
                    url:"/item"  
                },
             
                 {
                    title:'核算状态',
                    name:'settlementMethod',
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
            //["订单编号","分享单位","联系人","联系方式","技师姓名","金额","救援地","目的地","是否结算"]
                {
                    tr:'订单编号',
                    sort:true,
                    field:'orderNo'
                },
                {
                    tr:'分享单位',
                    sort:true,
                    field:'source'
                },
                {
                    tr:'联系人',
                    sort:true,
                    field:'name'
                },
                {
                    tr:'联系方式',
                    sort:true,
                    field:'resTime'
                },
                {
                    tr:'技师姓名',
                    sort:true,
                    field:'type'
                },
                {
                    tr:'金额',
                    sort:true,
                    field:'settlementMethod'
                },
                {
                    tr:'救援地',
                    sort:true,
                    field:'res'
                },
                {
                    tr:'目的地',
                    sort:true,
                    field:'res'
                },
                {
                    tr:'是否结算',
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
            jsToExcel(content,"订单分享",title);
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
  
    .btn-group{
        padding-right: 17px;
    }
  
</style>
