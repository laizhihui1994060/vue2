<template>
    <div>
    <vue-table
        ref="table"
        :filter-btns="filterBtns"
        :filter-input="filterInput"
        item-url="order:/order/job/list"
        :table-iteration-field="tableIterationField"
        :linkBtn="linkBtn"
        type='post'
        :params='params'
        :rightBtn="rightBtn"
        :enableTimeRange='true'
        :excelDate="excelDate"
        
        @emitDataForm="emitDataForm"
        @emitItem="updateNumberOff"
        :startEndCalss="start_end_calss"/>
        
        <number-off ref="numberOffRef" @updatakey="updatakey"/> 
        <cancel-task  @updatakey="updatakey"/>
        <chooseDownloadType/>
    </div>
</template>
<script>
import numberOff from "../modal/numberOff.vue";
import cancelTask from "../modal/cancelTask.vue";
import chooseDownloadType from "./../modal/chooseDownloadType.vue"
import vueTable from "../../../../../common_component/vue-table.vue";
export default {
    components:{
        vueTable,
        numberOff,
        chooseDownloadType,
        cancelTask
    },
    props:{
        currentProp:{
            type: Array,
            default: function(){
                console.log("CURRENTTASK RRRRRENDER")
                return []
            }
        },
        
    },
    data(){
        return {
            excelDate:{
                url:'order:/order/export/list',
                method:'post',
                filename:"任务导出",
                
                displayField:[
                    {
                        tr:"订单编号",
                        field:"orderCode"
                    },
                    {
                        tr:"救援时间", 
                        field:"orderScheduleTime",
                        filter:"date"
                    },
                    {
                        tr:"救援地",
                        field:"incidentAddrAddress"
                    },
                    {
                        tr:"目的地",
                        field:"destinationAddrAddress"
                    },
                    {
                        tr:"车主姓名",
                        field:"carOwnerName"
                    },
                    {
                        tr:"车主电话",
                        field:"carOwnerPhone"
                    },
                    {
                        tr:"车型",
                        field:"vehicleName"
                    },
                    {
                        tr:"业务类型",
                        field:'jobType',
                        filter:'jobType'
                    },
                    {
                        tr:"客户名称",
                        field:"customerName"
                    },
                    {
                        tr:"案件号",
                        field:"customerCaseNo"
                    },
                    {
                        tr:"故障车牌",
                        field:"vehiclePlateNo"
                    },
                    {
                        tr:"收款方式",
                        field:"settleMethod",
                        filter:'settleMethod'
                    },
                    {
                        tr:"下单人",
                        field:"createBy"
                    },
                    {
                        tr:"调度人",
                        field:"dispatchUser"//?
                    },
                    {
                        tr:"救援技师",
                        field:"driver"//?
                    },
                    {
                        tr:"拖车车牌",
                        field:"plateNo"
                    },
                    {
                        tr:"下单时间",//???
                        field:"driverAction",//
                        filter:"arr.status",
                        type:'ACCEPT',
                        returnField:'status',
                        returnName:'actionTime'

                    },
                    {
                        tr:"派遣时间",//派车时间
                        field:"dispatchTime",
                        filter:"date"
                    },
                    {
                        tr:"出发时间",//???
                        field:"driverAction",//
                        filter:"arr.status",
                        type:'SET_OFF_TO_INCIDENT_SPOT',
                        returnField:'status',
                        returnName:'actionTime'
                    },
                    {
                        tr:"到达救援地时间",//???
                        field:"driverAction",//
                        filter:"arr.status",
                        type:'ARRIVE_AT_INCIDENT_SPOT',
                        returnField:'status',
                        returnName:'actionTime'
                    },
                    {
                        tr:"到达目的地时间",//???
                        field:"driverAction",//
                        filter:"arr.status",
                        type:'ARRIVE_AT_DESTINATION_SPOT',
                        returnField:'status',
                        returnName:'actionTime'
                    },
                    // {
                    //     tr:"完成时间",
                    //     field:"finishOrderTime",
                    //     filter:"date"
                    // },
                    {
                        tr:"救援结果",
                        field:"jobStatusOverall",
                        filter:"jobStatusOverall"
                    },
                    {
                        tr:"到达里程",
                        field:"arriveMileage"
                    },
                    {
                        tr:"拖车里程",
                        field:"towMileage"
                    },
                    {
                        tr:"返程里程",
                        field:"backMileage"
                    },
                    {
                        tr:"下单金额",
                        field:"price",
                        filter: 'number'
                    },
                    {
                        tr:"救援金额",
                        field:"rescueCharge",
                        filter: 'number'
                    },
                    {
                        tr:"司机收现金额",
                        field:"cashReceived",
                        filter: 'number'
                    },
                    {
                        tr:"总救援费用-签单",
                        field:"charge",
                        filter: 'number'
                    },
                    {
                        tr:"总救援费用-现金",
                        field:"cashCharge",
                        filter: 'number'
                    },
                    {
                        tr:"总成本费用-签单",
                        field:"chargeCompany",
                        filter: 'number'
                    },
                    {
                        tr:"总成本费用-现金",
                        field:"cashChargeCompany",
                        filter: 'number'
                    },
                    {
                        tr:"是否开票",
                        field:"cashInvoiced"
                    },
                    {
                        tr:"订单备注",
                        field:"remark",
                        filter:"remark"
                    },
                    {
                        tr:"去程报数",//???
                        filter:"setOutExpense"
                    },
                    {
                        tr:"返程报数",//???
                        filter:"returnExpense"
                    },
                    {
                        tr:'任务状态',
                        field:'jobStatusDetail' ,
                        filter:'jobStatus'
                    },
                    {
                        tr:'任务取消原因',
                        field:'jobCancelReason'
                    },
                    {
                        tr:'报数备注',
                        field:'comment'
                    },
                ],
                displayNumberOff:[
                    // format
                    // {
                    //     tr:"",
                    //     object:{}
                    // }
                ],
            },

            params:{
                pageSize : 10,
                pageIndex : 1,
                flag :'WEB_JOB_MORE_QUERY' ,
                param :{}
            },
            toBeSearched:{},
            start_end_calss:{
                start:'orderStartTime',
                end:'orderEndTime'
            },
            filterBtns:[
                {
                    title:'订单来源',
                    name:'source',
                    url:"control:/sys/param" ,
                    params:['/order/book/source_types'],
                    method:'post',
                    listWidth:'100px' ,
                    hasAll:true   
                                
                },
                {
                    title:'选择客户',
                    name:'customerId',
                    filter:"name",
                    filterName: 'partnerId',
                    url:"client:/helper/partner",
                    method:'post',
                    params:{isCustomer:true,cooperationStatus :'UNDER_CONTRACT'},
                    listWidth:'100px' ,
                    hasAll:true                   
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
                },
                {
                    title:'结算方式',
                    name:'settleMethod',
                    filter:"cn",
                    filterName:'en' ,
                    arr:[{cn:'现金',en:'CASH'},{cn:'签单',en:'SIGN'}],
                    listWidth:'136px'  ,
                    hasAll:true  
                },
                {
                    title:'业务类型',
                    name:'jobType',
                    filter:"name",
                    filterName:'code' ,
                    url:"client:/job/type/grade",
                    listWidth:'100px',
                    hasAll:true  
                },
                {
                    title:'任务状态',
                    name:'jobStatusDetail',
                    filter:"cn",
                    filterName:'en' ,
                    arr:[{cn:'未接受',en:'DISPATCHED'},{cn:'已接受',en:'ACCEPTED'},{cn:'已拒绝',en:'REJECTED'},{cn:'过期',en:'EXPIRED'},{cn:'出发去救援地',en:'DRIVING_TO_INCIDENT_LOCATION'},{cn:'暂停',en:'PAUSED'},{cn:'任务被取消',en:'JOB_CANCELLED'},{cn:' 到达救援地',en:'ARRIVED_AT_INCIDENT_LOCATION'},{cn:'路修，或现场施救/装车中',en:'RSA_WORKING'},{cn:'完成施救/装车/路修',en:'RSA_DONE'},{cn:'行驶去目的地/交车地/卸车地',en:'DRIVING_TO_DESTINATION_LOCATION'},{cn:'到达目的地',en:'ARRIVED_AT_DESTINATION_LOCATION'},{cn:'开始卸车',en:'UNLOADING'},{cn:'已经完工',en:'JOB_DONE'},{cn:'返程中',en:'RETURNING'},{cn:'返程结束',en:'RETURN_DONE'}],
                    listWidth:'160px'  ,
                    hasAll:true  
                },
                {
                    title:'任务结果',
                    name:'jobStatusOverall',
                    filter:"cn",
                    filterName:'en' ,
                    arr:[{cn:'未开始',en:'NOT_START'},{cn:'救援中',en:'WORKING'},{cn:'救援成功',en:'SUCCESS'},{cn:'救援失败',en:'FAILED'},{cn:'取消救援',en:'CANCEL_CHARGABLE'},{cn:'取消无费',en:'CANCEL_NOFEE'},{cn:'拒绝',en:'REJECTED'},{cn:'过期',en:'EXPIRED'}],
                    listWidth:'100px'  ,
                    hasAll:true               
                },
            ],
            filterInput:[
                {
                    url: "client:/search",
                    name:"param",
                    label:'救援地址',
                    flag: "CURRENT_JOB",
                    width: '300px'
                }
            ],
            tableIterationField:[
                {
                    tr:'订单编号',
                    sort:true,
                    field:'orderCode',
                    link: {
                        text:'查看详情',
                        link_name:'orderDetails',
                        link_key:"orderNumber",
                        link_Field:'orderId',
                        fn:function(self, key, value, item_index,item){
                            self.$router.push({ name: 'orderDetails', params: {orderNumber:item['orderId'],jobId:item['jobId']}});
                        }
                    },
                },
                {
                    tr:'客户名称',
                    sort:true,
                    field:'customerName',
                    fieName:"customerId"
                },
                {
                    tr:'委派商名称',
                    sort:true,
                    field:'orgName',
                    fieName:"sysOrgId"
                },
                {
                    tr:'业务类型',
                    field:'jobType',
                    sort:true,
                    filter:'jobType'
                },
                // {
                //     tr:'案件号',
                //     sort:true,
                //     field:'customerCaseNo'
                // },
                {
                    tr:'救援时间',
                    sort:true,
                    field:'orderScheduleTime',
                    filter:'date'
                },
                {
                    tr:'任务状态',
                    sort:true,
                    field:'jobStatusDetail' ,
                    filter:'jobStatus'
                },
                {
                    tr:'任务结果',
                    sort:true,
                    field:'jobStatusOverall' ,
                    filter:'jobResult'
                },
                // {
                //     tr:'故障车牌',
                //     sort:true,
                //     field:'vehiclePlateNo'
                // },
                // {
                //     tr:'车架号',
                //     sort:true,
                //     field:'vehicleId'
                // },
                {
                    tr:'派单人',
                    sort:true,
                    field:'dispatchUserId'
                },
                {
                    tr:'救援技师',
                    field:'driverId',
                    sort:true,
                    ilter:'tooltip'
                },
                // {
                //     tr:'服务商名称',
                //     sort:true,
                //     field:'bidOrgId'
                // },
                {
                    tr:'故障车牌',
                    sort:true,
                    field:'vehiclePlateNo'
                },
                {
                    tr:'救援地址',
                    filter:'tooltip',
                    sort:true,
                    field:'incidentAddrAddress'
                },
                // {
                //     tr:'目的地址',
                //     sort:true,
                //     field:'destinationAddrAddress',
                //     filter:'tooltip'
                // }
            ],
            
            linkBtn:[
                // {
                //     text:'查看详情',
                //     link_name:'orderDetails',
                //     link_key:"orderNumber",
                //     link_Field:'orderId',
                //     fn:function(self, key, value, item_index,item){
                //         self.$router.push({ name: 'orderDetails', params: {orderNumber:item['orderId'],jobId:item['jobId']}});
                //     }
                // },
                {
                    text:'报数',
                    matchfield:'jobStatusOverall',
                    matchContent:'WORKING,NOT_START',
                    link_if:[ ['authority', [ 'rescueManagement' ,'order_number_off' ] ] ],
                    fn:function(self, key, value, item_index,item){
                        self.$emit('emitItem',item)
                        // $('input[value="CANCEL_NOFEE"]')[0].checked=true;
                        $('#numberOff').modal('show');
                       
                    }
                },
                {
                    text:'恢复未派',
                    matchfield:'jobStatusOverall',
                    matchType:'btnShow',
                    matchContent:'WORKING,NOT_START',
                    link_if:true,
                    fn:function(self, key, value, item_index,item){
                        $('#cancelTask').modal('show');
                        $('#orderId').text(item.orderId);
                        $('#dispatchActionId').text(item.dispatchActionId);
                        $('#myModal').text('恢复未派');
                    }
                },
            ],
            num:0
        }

    },
    methods:{
        updatakey(){
           this.$refs.table.watchDataForm();
        },
        emitDataForm(index,hisSearch){
            const self = this;
            const dataForm = hisSearch.condition;
            this.toBeSearched = hisSearch.condition;
            this.$router.push('/LoginFinish/rescueManagement/' + hisSearch.operationUrl);
            
        },
        updateNumberOff(item){
            this.$refs.numberOffRef.updateThis(item)
        }
    },
    mounted(){
        const self = this;
        bus.$on('upDataList',function(){
            self.updatakey();
        });
        //请求系统报数类型
        // send({
        //     type:'post',
        //     url:'order:/order/export/list'
        // },(err,res)=>{
        //     if(err) return console.log("error",err);
        //     if(res.status == 200){
        //         console.log("报数类型请求成功",res)
        //         res.content.forEach((item,index)=>{
        //             for(let i = 0; i<item.settleMethod.length; i++){
        //                 let trHead = this.driveRoute==="AB"?"去程:":this.driveRoute==="CD"?"返程:":"其他:";
        //                 let trEnd ="",amount = 0
        //                 switch(item.settleMethod[i]){
        //                     case "CASH":{
        //                         trEnd = "(现金)";
        //                         amount = item.settleMethod[i].amountCash;
        //                     };break;
        //                     case "SIGN":{
        //                         trEnd = "(签单)";
        //                         amount = item.settleMethod[i].amountSign;
        //                     };break;
        //                 }
        //                 this.excelDate.displayNumberOff.push({
        //                     tr: trHead + item.feeName + trEnd,
        //                     field: amount
        //                 })
        //             }

        //         })
        //     } else {
        //         console.log("请求完毕",res)
        //     }
        // })
    }
      
}
</script>
<style scoped>
 
</style>