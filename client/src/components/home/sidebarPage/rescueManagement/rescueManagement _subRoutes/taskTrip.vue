<template>
    <div class='taskTrip' v-if='isShow'>
        <vue-table
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="client:/route/list"
            type='post'
            :table-iteration-field="tableIterationField"
            :params='param'
            :addBtns="addBtns"
            :linkBtn="linkBtn"
            ref='table'
            :startEndCalss='start_end_class'
            :enableTimeRange='true'
            :rangeConfigP='rangeConfig'
            :defaultTimeRange="'TODAY'"
            :rightBtn="rightBtn" 
            @emitDataForm="emitDataForm"
            />

    </div>
</template>

<script>
import vueTable from "../../../../../common_component/vue-table.vue";

export default {
    components:{
        vueTable,
    },
    data () {
        return {
            isShow: false,
            param:{
                pageSize : 10,
                pageIndex : 1,
                flag :'WEB_ROUTE_LIST',
                param:{
                    orgId: ''
                }
            },
            toBeSearched:{},
            start_end_class:{
                start:'startScheduleTimeSetOff',
                end:'endScheduleTimeSetOff'
            },
            rangeConfig:[
                {text:'当日',param:'TODAY'},              
                {text:'未来一周',param:'NXWEEK'},
                {text:'过去一周',param:'PREWEEK'},
            ],
            filterBtns:[
                {
                    title:'本公司',
                    isQuickSeach: true,
                    name:'orgId',
                    arr: [],
                    filter:"name",
                    width:'100px',
                    filterName: 'orgId',
                    hasAll:true ,
                    ourOrg: true,  
                    isEmpty: false,
                    bgColor: '#fff'             
                },
                {
                    title:'选择技师',
                    name:'driverId',
                    filter:"empName",
                    filterName: 'userId',
                    url:"client:/helper/emp",
                    method:'post',
                    params:{isDriver :true},
                    listWidth:'100px' ,
                    hasAll:true                   
                }
            ],
            filterInput:[
                {
                    url: "client:/search",
                    name:"param",
                    label:'车牌号、发车地点',
                    flag: "ROUTE_SCHEDULE"
                }
            ],
            tableIterationField:[
                {
                    tr:'行程编号',
                    sort:true,
                    field:'routeScheduleCode',
                    link: {
                        link_name:'taskTrip_add',
                        link_key:"id",
                        link_Field:'routeId',
                        isCreate: false
                    }
                },
                {
                    tr:'行程状态',
                    field:'status',
                    sort:true,
                    filter: 'taskTripStatus'
                },
                {
                    tr: '公司名称',
                    field: 'orgName',
                    fieName:'sysOrgId' ,
                    sort:true,
                    filter: 'tooltip'
                },
                {
                    tr:'发布时间',
                    field:'created',
                    sort:true,
                    filter:'date'
                },
                {
                    tr:'车牌号',
                    sort:true,
                    fieName:'vTowtruckId' ,
                    field:'plateNo'
                },
                {
                    tr:'计划出发时间',
                    field:'scheduleTimeSetOff',
                    fieName:'scheduleTimeSetoff',
                    sort:true,
                    filter:'date'
                },
                {
                    tr:'发车地点',
                    filter:'tooltip',
                    sort:true,
                    field:'setOffAddrAddress'
                },
                {
                    tr:'目的地点',
                    filter:'tooltip',
                    sort:true,
                    field:'destinationAddrAddress'
                }
            ],
            linkBtn:[
                {
                    text:'审核',
                    model:false,
                    link_if: [ [ 'orgId', 'ourId' ], ['status', 'PUBLISHED'] ],
                    fn: function(self, key, value, item_index, item) {
                        confirm('是否审核？', function(){
                             var id = item['routeId'];
                             var param = {routeId:id, status:"PUBLISHED", isActive:true};
                             send({
                                 url: "client:/route/status",
                                 param: param,
                                 type: 'put'
                            }, function(err,response){
                                 if(response.status==200){
                                    self.watchDataForm();
                                     alert("行程审核通过！", "success");
                                 }
                            });
                         }, true);
                    }
                },
                {
                    text:'取消',
                    model:false,
                    link_if: [ [ 'orgId', 'ourId' ] ],
                    fn: function(self, key, value, item_index, item) {
                        confirm('是否确定取消？', function(){
                             var id = item['routeId'];
                             var param = {routeId:id, status:"CANCELED", isActive:false};
                             send({
                                 url:"client:/route/status",
                                 param:param,
                                 type:'put'
                            }, function(err,response){
                                 if(response.status==200){
                                    self.watchDataForm();
                                     alert("行程已取消！", "success");
                                 }
                            });
                         }, true);
                    }
                },
            ],
            addBtns:[
                 {
                    text:"+行程计划",
                    link_name:'taskTrip_add',   //路由名字
                    link_key:"id",
                    link_Field:'{}',
                    isCreate: true,
                }
            ]
        }
    },
    methods:{
        emitDataForm(index,hisSearch){
            console.log("行程任务监听")
            const self = this;
            const dataForm = hisSearch.condition;
            this.toBeSearched = hisSearch.condition;
            this.$router.push('/LoginFinish/rescueManagement/' + hisSearch.operationUrl);

        }
    },
    created(){
        const _this = this;
        var timer;
        if(global.ourOrgId){
            _this.param.param.orgId = global.ourOrgId;
            _this.isShow = true;
        }else{
             timer = setInterval(function(){
                if(global.ourOrgId){
                    clearInterval(timer);
                    _this.param.param.orgId = global.ourOrgId;
                    _this.isShow = true;
                }
            }, 500);
        }
    }
    
    
  }
</script>
<style >
    .taskTrip table td button{
        width: 70px;
    }
</style>