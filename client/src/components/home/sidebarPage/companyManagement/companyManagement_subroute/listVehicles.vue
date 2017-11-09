<template>
   <vue-table
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url="client:/towtruck/list"
        type='post'
        :params="params"
        :table-iteration-field="tableIterationField"
        :linkBtn="linkBtn"
        :addBtns="addBtns" 
        :rightBtn="rightBtn"
        :enableTimeRange='true'/>
       
</template>
<script>


import vueTable from "../../../../../common_component/vue-table.vue";

 
    let bool = false;
 
    export default {
        created(){
            this.params.pageIndex = Number(this.$route.params.pageIndex);
        },
        data () {
           return {
            params: {
                pageIndex: 1,
                pageSize:10
            },
            startEndTime:{
                startName: 'purchaseBeginTime',
                endName: 'purchaseEndTime'
            },
            filterBtns:[
                {
                    title:'车辆类型',
                    hasAll: true,
                    name:'towTruckCatId',
                    url:"client:/helper/towtruckcat?pageSize=10000&pageIndex=1" ,
                    filter:"name",
                    filterName: 'towTruckCatId'
                },
                {
                    title:'蓝黄牌',
                    hasAll: true,
                    name:'plateColor',
                    arr: [ {name:'蓝牌', code:'BLUE'}, {name:'黄牌',code:'YELLOW'},{name:'其他',code:'OTHER'} ],
                    filter:"name", 
                    filterName: 'code', 
                },
                {
                    title:'驻车点',
                    hasAll: true,
                    name:'parkingLotId',
                    url: 'client:/helper/parkinglot',
                    method: 'post',
                    filter: 'parkingLotName',
                    filterName: 'parkingLotId'

                }
            ],
            filterInput:[
                {
                    url: "client:/search",
                    name:"param",
                    label:'车辆号码',
                    flag: "TOW_TRUCK"
                }
            ],
        
            tableIterationField:[
                {
                    tr:'车牌号码',
                    field:'plateNo',
                    link: {
                         text:'查看',
                         link_name:'listVehicles_add',   //路由名字
                         link_key:"chosen",
                         link_Field:'towTruckId',
                         isCreate:false,
                         model:false,
                     }
                },
                {
                    tr:'司机',
                    field:'driverName'
                },
                {
                    tr:'车辆类型',
                    field:'towTruckCatInfo.name',
                    filter: 'obj'
                },
                {
                    tr:'车辆状态',
                    field:'status',
                    filter: 'carStatus'
                },
                {
                    tr: 'gps终端号',
                    field: 'gpsTerminalId'
                },
                {
                    tr:'驻车点',
                    field:'parkingLotInfo.parkingLotName',
                    filter: 'obj'
                }, 
                {
                    tr:'服务项目',
                    field:'serviceItemResp',
                    filter: 'serviceItemResp'
                }, 
            ],
            linkBtn:[
               // {
               //      text:'查看',
               //      link_name:'listVehicles_add',   //路由名字
               //      link_key:"chosen",
               //      link_Field:'towTruckId',
               //      isCreate:false,
               //      model:false,
               //  }
            ],
            addBtns:[
                 {
                    text:"+添加车辆",
                    link_name:'listVehicles_add',   //路由名字
                    link_key:"chosen",
                    link_Field:'0',
                    isCreate: true,
                },
                
            ]
        }
    },
        components:{
            vueTable
        }
    }
</script>

<style scoped>

</style>