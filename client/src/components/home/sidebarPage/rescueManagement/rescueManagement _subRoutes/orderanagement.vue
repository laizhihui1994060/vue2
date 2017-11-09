<template>
    <div id="photo">
        <vue-table
            v-show='isShow'
            ref="table"
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="order:/order/list"
            type='post'
            :params='params'
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            :rightBtn="rightBtn"
            :checkbox="checkbox"
            :excelDate="excelDate"
            :enableTimeRange='true'
            :ExportExcelPage="ExportExcelPage"
            :listDisplayOptions.sync='listDisplayOptions'
            @emitDataForm="emitDataForm"
            @update:tableIterationField="(item) => {tableIterationField = item; isShow = true}"
            @update:params="(item) => params.param.values = item"
            :startEndCalss="start_end_calss"/>
        <cancel  @updatakey="updatakey" :isradio="false"/> 
        <chooseDownloadType/>
    </div> 
</template>

<script>

import vueTable from "../../../../../common_component/vue-table.vue"
import chooseDownloadType from "./../modal/chooseDownloadType.vue"
import cancel from "../modal/cancel.vue"

var arr = [];

export default {
   
    components: {  
        vueTable,
        chooseDownloadType,
        cancel,
    },
    data(){
        return {
            isShow: false,
            listDisplayOptions: {
                path: '/order/order_show_option'
            },
            excelDate:{ 
                url:'order:/order/export/list',
                method:'post',
                filename:"订单导出",
                displayField:[
                    {
                        tr:'订单号',
                        field:'orderCode'
                    },
                    {
                        tr:'案件号',
                        field:'customerCaseNo'
                    },
                    {
                        tr:'客户名称',
                        field:'customerName'
                    },
                    {
                        tr:'业务类型',
                        filter:'jobType',
                        field:'jobType'
                    },
                    {
                        tr:'技师',
                        field:'driver'
                    },
                    {
                        tr:'救援时间',
                        filter:'date',
                        field:'orderScheduleTime'
                    },
                    {
                        tr:'救援地',
                        field:'incidentAddrAddress'
                    },
                    {
                        tr:'目的地',
                        field:'destinationAddrAddress'
                    },
                    {
                        tr:'车主姓名',
                        field:'carOwnerName'
                    },
                    {
                        tr:'车主电话',
                        field:'carOwnerPhone'
                    },
                    {
                        tr:'车型',
                        field:'vehicleName'
                    },
                    {
                        tr:'故障车牌',
                        field:'vehiclePlateNo'
                    },
                    {
                        tr:'收款方式',
                        field:'settleMethod',
                        filter:'payMethod'
                    },
                    {
                        tr:'下单人',
                        field:'createBy'
                    },
                  
                    {
                        tr:'下单时间',
                        field:'created',
                        filter:'date'
                    },
                    {
                        tr:'完成时间',
                        field:'finishOrderTime',
                        filter:'date'
                    },
                    {
                        tr:'救援结果',
                        field:'orderStatus',
                        filter:'orderStatus'
                    },
                    {
                        tr:'签单总金额',
                        field:'charge'
                    },
                    {
                        tr:'现金总金额',
                        field:'cashCharge'
                    },
                    {
                        tr:'是否开票',
                        field:'cashInvoiced'
                    },
                    {
                        tr:'备注',
                        field:'remark',
                        filter:'remark'
                    },
                    {
                        tr:'订单取消原因',
                        field:'orderCancelReason'
                    },
                ]
            },
            checkbox:{
                field:'orderCode',
                fn: function(name,item,status,pageAll,vm){
                    var obj = {};
                    console.log(name, item, status,pageAll, vm );
                    var checkedAll = $('input[name=checkbox_all]')[0].checked;
                    if(name == 'checkbox_all'){
                        if(checkedAll){
                            $('#main_loading').show();
                            console.log('全部checked');
                            var params = JSON.parse(JSON.stringify(vm.dataForm.condition_server));
                            params.pageIndex = 1;
                            params.pageSize = 15*pageAll;
                            console.warn(params);
                            send({
                                url: 'order:/order/list',
                                type: 'post',
                                param: params
                            }, function(err, res){
                                item = res.content;
                                console.log(item);
                                arr = [];
                                if(item && item.length){
                                    arr = item.map( (obj, index) => {
                                        return {
                                            orderId: obj.orderId,
                                            orderCode: obj.orderCode
                                        }
                                    })
                                }
                                
                                vm.checkboxItem = arr;
                                $('#main_loading').hide();
                            });
                        }else{  
                            console.log('全部不  checked')
                            arr = [];
                            $('input[name=checkbox]').each(function(index, el) {
                                el.checked = false;
                            });

                            $('input[name=checkbox_all]')[0].checked = false;
                            vm.checkbox_status = '';
                            vm.checkboxItem = arr;
                        }

                    }
                    if(name == 'checkbox'){
                        // 遍历
                        $('tbody tr').each( function(index, el){
                            var bool = arr.some( (obj, index) => {
                                if( $(el).find('td').eq(1).find('p').text() == obj.orderCode ){
                                    $(el).find('td input').checked = true;
                                    return true;
                                }
                            });
                            if(!bool) $(el).find('td input').checked = false;
                            
                        })
                        console.log(item);
                        if($('#rescueManagement').find("input[value='" + item.orderCode +"']").is(':checked')){
                            for(var i = 0 ;i<arr.length;i++){
                                if(arr[i].orderCode == item.orderCode)return;
                            }
                                console.log(item)

                            obj = {
                                orderId: item.orderId,
                                orderCode: item.orderCode
                            };

                            arr.push(obj);



                        }else{

                            for(var i = 0 ;i<arr.length;i++){
                                if(arr[i].orderCode == item.orderCode){
                                    arr.splice(i,1)
                                }
                            }
                        }
                        console.log(arr.length, vm.recordSize, vm)
                        if(arr.length == vm.recordSize){
                            $('input[name=checkbox_all]')[0].checked = true;
                            vm.checkbox_status = 'checkbox_all';
                            console.log(vm.checkbox_status )
                        }else{
                            $('input[name=checkbox_all]')[0].checked = false;
                            vm.checkbox_status = '';
                        }
                        vm.checkboxItem = arr;
                        console.log(arr)
                    }

                },
                click(){
                    if(!arr.length){
                        return alert('请先选择需要下载照片的订单');
                    }

                    const arr_2 = arr.map( (obj, index) => {
                        return obj.orderId
                    });

                    send({
                        type: 'post',
                        url: 'control:/tow/driver/photo/order',
                        param: arr_2
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            
                            $('#chooseDownloadType').attr('arr', JSON.stringify(arr_2) ).modal('show');
                        }else{
                            alert(res.msg);
                        }
                    });
                }

            },
            params:{
                pageSize : 10,
                pageIndex : 1,
                flag :'WEB_ORDER_MORE_QUERY' ,
                param :{

                }
            },
            toBeSearched:{},
            start_end_calss:{
                start: 'orderStartTime',
                end: 'orderEndTime'
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
                    title:'业务类型',
                    name:'jobType',
                    filter:"name",
                    filterName:'code' ,
                    url:"client:/job/type/grade",
                    listWidth:'100px',
                    hasAll:true  
                },
                { 
                    title:'委派商',
                    name:'delegate',
                    method:'post',
                    params:{isProvider:true,partnershipStatus :'MY_SERIVCE_PROVIDER'},
                    filter:"selfName",
                    filterName:'orgId' ,
                    url:"client:/helper/partner_ref",
                    listWidth:'100px',
                    hasAll:true  
                },
                // { 
                //     title:'服务商',
                //     name:'bidOrgId',
                //     method:'post',
                //     filter:"name",
                //     filterName:'orgIdRef' ,
                //     url:"client:/helper/partner",
                //     params:{isProvider:true,partnershipStatus :'MY_SERIVCE_PROVIDER'},
                //     listWidth:'100px',
                //     hasAll:true  
                // },
                // {
                //     title:'任务状态',
                //     name:'jobStatusDetail',
                //     filter:"cn",
                //     filterName:'en' ,
                //     arr:[{cn:'派单',en:'DISPATCHED'},{cn:'已接受',en:'ACCEPTED'},{cn:'未拒绝',en:'REJECTED'},{cn:'过期',en:'EXPIRED'},{cn:'出发去救援地',en:'DRIVING_TO_INCIDENT_LOCATION'},{cn:'暂停',en:'PAUSED'},{cn:'订单被取消',en:'JOB_CANCELLED'},{cn:' 到达救援地',en:'ARRIVED_AT_INCIDENT_LOCATION'},{cn:'装车中',en:'RSA_WORKING'},{cn:'装车完成',en:'RSA_DONE'},{cn:'行驶去目的地/交车地/卸车地',en:'DRIVING_TO_DESTINATION_LOCATION'},{cn:'到达目的地',en:'ARRIVED_AT_DESTINATION_LOCATION'},{cn:'开始卸车',en:'UNLOADING'},{cn:'已经完工',en:'JOB_DONE'},{cn:'返程中',en:'JOB_FAILED'},{cn:'返程结束',en:'RETURN_DONE'}],
                //     listWidth:'136px'  ,
                //     hasAll:true  
                // },
                {
                    title:'订单状态',
                    name:'orderStatus',
                    filter:"cn",
                    isCheckbox:true,
                    width:'105px',
                    filterName:'en' ,
                    arr:[{cn:'草稿',en:'DRAFT'},{cn:'新订单',en:'NEW_ORDER'},{cn:'已经审核的新订单',en:'NEW_APPROVED'},{cn:'订单被取消',en:'ORDER_CANCELLED'},{cn:'救援中',en:'WORKING'},{cn:'完成救援',en:'DONE'}],
                    listWidth:'100px'  ,
                    hasAll:true              
                },
                {
                    title:'技师',
                    hasAll: true,
                    method: 'post',
                    name:'driverId',
                    filter:"empName",
                    filterName: 'userId',
                    url:"client:/helper/emp",
                    params: { isDriver: true  }
                },
            ],
            filterInput:[
                {
                    url: "client:/search",
                    name:"param",
                    label:'案件号、故障车牌号、救援地址、车主号码、订单编号',
                    flag: "ORDER",
                    width:'300px'
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
                            self.$router.push({ name: 'orderDetails', params: {orderNumber:item['orderId'],jobId:'0'}});
                        }
                    }
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
                {
                    tr:'案件号',
                    sort:true,
                    field:'customerCaseNo'
                },
                {
                    tr:'救援时间',
                    sort:true,
                    field:'orderScheduleTime',
                    filter:'date'
                },
                {
                    tr:'订单状态',
                    field:'orderStatus',
                    sort:true,
                    filter:'orderStatus_icon'

                },
                {
                    tr:'故障车牌',
                    sort:true,
                    fieName:'vehiclePlateNo' ,
                    field:'vehiclePlateNo'
                },
                {
                    tr:'车架号',
                    field:'vehicleId'
                },
                {
                    tr:'下单人',
                    sort:true,
                    field:'createdby'
                },
                {
                    tr:'技师',
                    sort:true,
                    field:'driverId'
                },
                {
                    tr:'救援地',
                    sort:true,
                    field:'incidentAddrAddress',
                    filter:'tooltip'
                },
                {
                    tr:'目的地',
                    sort:true,
                    field:'destinationAddrAddress',
                    filter:'tooltip'
                },
                {
                    tr:'车主号码',
                    field:'carOwnerPhone'
                }
            ],
            linkBtn:[
                {
                    text:'取消订单',
                    matchfield:'orderStatus',
                    matchfield1:'lastDispatchStatus',
                    matchType:'btnShow',
                    matchfield2:"driverId",
                    matchContent:'NEW_ORDER,DRAFT,NEW_APPROVED',
                    matchContent1:'NA',
                    link_if:true,
                    fn:function(self, key, value, item_index,item){
                        $('textarea[name="cancelReason"]').val('');
                        $('#cancel').modal('show');
                        $('#towOrderId').text(item.orderId);
                        $('#myModalLabel').text('是否取消订单');
                    }
                }, 
            ]
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
        }
    },
    mounted(){
        const self = this;
        bus.$on('upDataList',function(){
            self.updatakey();
        });
    },
    created(){
        arr = [];
    }
    
    
}
</script>
<style>
    #photo .checkbox{
        padding: 8px 11px;
        margin: 0;
    }
    #photo .my_checkbox{
        margin-left: -2px !important;
    }
    #photo .checkbox label{
        display: none
    }

    #photo .checkbox input[type="checkbox"]{
        margin: 0;
        position: static !important;
    }
    
</style>