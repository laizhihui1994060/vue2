<template>
    <div>
        <vue-table
            ref="table"
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="order:/share/orders"
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            type='post'
            :params='params'
            :rightBtn="rightBtn"
            :enableTimeRange='true'
            @updataShareMan="updataShareMan"
            @emitDataForm="emitDataForm"
            :startEndCalss="start_end_calss"/>
        <select-share  @updatakey="updatakey" ref="selectShare"/>
        <cancel-share  @updatakey="updatakey"/>
    </div>
</template>
<script>
import selectShare from "../modal/selectShare.vue";
import cancelShare from "../modal/cancelShare.vue";
import vueTable from "../../../../../common_component/vue-table.vue";
export default {
    components:{
        vueTable,
        selectShare,
        cancelShare
    },
    data(){
        return {
            params:{
                pageSize : 10,
                pageIndex : 1,
                flag :'WEB_SHARE_LIST' ,
                param :{}
            },
            toBeSearched:{},
            start_end_calss:{
                start:'startShareActionTime',
                end:'endShareActionTime'
            },
            filterBtns:[
                {
                    title:'订单状态',
                    name:'orderStatus',
                    filter:"cn",
                    filterName:'en' ,
                    // isCheckbox:true,
                    width:'135px',
                    arr:[{cn:'草稿',en:'DRAFT'},{cn:'新订单',en:'NEW_ORDER'},{cn:'已经审核的新订单',en:'NEW_APPROVED'},{cn:'订单被取消',en:'ORDER_CANCELLED'},{cn:'救援中',en:'WORKING'},{cn:'完成救援',en:'DONE'}],
                    listWidth:'100px'  ,
                    hasAll:true  
                                
                },
                {
                    title:'分享状态',
                    name:'shareStatus',
                    filter:"cn",
                    filterName:'en' ,
                    arr:[{cn:'开始投标',en:'NEW'},{cn:'取消投标',en:'CANCEL'},{cn:'已有投标并等待选择',en:'BIDDING'},{cn:'已经选择投标',en:'BID_CHOOSED'},{cn:'投标超时',en:'BID_TIMEOUTED'},{cn:'拒绝邀请',en:'INVITATION_REJECTED'}],
                    listWidth:'100px'  ,
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
              
            ],
            filterInput:[
                {
                    url: "client:/search",
                    name:"param",
                    label:'救援地址',
                    flag: "SHARED_ORDER",
                }
            ],
            tableIterationField:[
                {
                    tr:'订单编号',
                    sort:true,
                    field:'orderCode',
                    link: {
                        text:'查看详情',
                        link_Field:'orderId',
                        fn:function(self, key, value, item_index,item){
                            self.$router.push({ name: 'shareDetail', params: {shareActionId:item.shareActionId ? item.shareActionId : 0 ,bidId:item.bidId ? item.bidId : 0}});
                        }
                    },
                },
                {
                    tr:'客户名称',
                    sort:true,
                    field:'customerName',
                    fieName:'customerId' 
                },
                {
                    tr:'业务类型',
                    field:'jobType',
                    sort:true,
                    filter:'jobType'
                },
                {
                    tr:'救援时间',
                    sort:true,
                    field:'orderScheduleTime',
                    filter:'date'
                },
                {
                    tr:'订单状态',
                    sort:true,
                    field:'orderStatus' ,
                    filter:'orderStatus_icon'
                },
                {
                    tr:'分享状态',
                    sort:true,
                    field:'shareStatus' ,
                    filter:'shareStatus'
                },
                {
                    tr:'接单公司',
                    sort:true,
                    field:'partnerCompany',
                    fieName:'bidOrgId' ,
                },
                {
                    tr:'救援技师',
                    field:'driverName',
                    fieName:'driverId' ,
                    sort:true
                },
                {
                    tr:'救援地址',
                    filter:'tooltip',
                    sort:true,
                    field:'incidentAddrAddress'
                },
                {
                    tr:'目的地址',
                    sort:true,
                    field:'destinationAddrAddress',
                    filter:'tooltip'
                },
                {
                    tr:'投标人数量',
                    sort:true,
                    field:'bidCount',
                }
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
                    text:'取消分享',
                    matchfield:'shareStatus',
                    matchType:'btnShow',
                    matchContent:"NEW,BIDDING",
                    link_if:true,
                    fn:function(self, key, value, item_index,item){
                        $('textarea[name="cancelRemark"]').val('');
                        $('#shareActionId').text(item.shareActionId);
                        $('#cancelShare').modal('show');
                    }
                },
                {
                    text:'选择投标人',
                    matchfield:'shareStatus',
                    matchType:'btnShow',
                    matchContent:"NEW,CANCEL,BIDDING,BID_TIMEOUTED,INVITATION_REJECTED",
                    link_if:true,
                    fn:function(self, key, value, item_index,item){
                        $('#res_selectShare').modal('show');
                        self.$emit('updataShareMan',item);
                    }
                }
            ],
        }

    },
    methods:{
        updatakey(){
           this.$refs.table.watchDataForm();
        },
        updataShareMan(item){
            console.log(item)
            this.$refs.selectShare.getShareMan(item.shareActionId,{
                shareActionId:item.shareActionId ? item.shareActionId : '',
                shareActionType:item.shareActionType ? item.shareActionType : '',
                orderId:item.orderId ? item.orderId : ''
            });
        },
        emitDataForm(index,hisSearch){
            const self = this;
            const dataForm = hisSearch.condition;
            this.toBeSearched = hisSearch.condition;
            this.$router.push('/LoginFinish/rescueManagement/' + hisSearch.operationUrl);
           
        }
    },
    mounted(){

    }
      
}
</script>
<style scoped>
 
</style>