<template>
    <div>
            <vue-table
                :filter-btns="filterBtns"
                :filter-input="filterInput"
                item-url="client:/partner/provider/list"
                type='post'
                :params='params'
                :isTime='false'
                :table-iteration-field="tableIterationField"
                :linkBtn="linkBtn"
                :addBtns="addBtns" 
                :rightBtn="rightBtn" />
            <supplier_mineInvited></supplier_mineInvited>
            <supplier_invitedUs></supplier_invitedUs>

    </div>
</template>
<script>

    import vueTable from "../../../../../common_component/vue-table.vue"
    import supplier_mineInvited from '../modal/supplier_mineInvited.vue'
    import supplier_invitedUs from '../modal/supplier_invitedUs.vue'

    export default { 
        components:{
            vueTable,
            supplier_mineInvited,
            supplier_invitedUs
        },
       data () {
            return {
                params: {
                    "pageSize": 10,
                    "pageIndex": 1,
                },
                filterBtns:[
                    {
                        title:'结算方式',
                        hasAll: true,
                        url:'control:/sys/param/org',
                        method:'post',
                        params:[ '/order/settle_method' ],
                        filter:"desc",
                        filterName:'code',
                        name:"settlementMethod" 
                    },
                    {
                        title:'伙伴关系状态',
                        name:'partnershipStatus',
                        filter:"name",
                        filterName: 'code',
                        hasAll: true,
                        arr: [ { name: '未建立', code: 'NONE' }, { name: '解除伙伴关系', code: 'BROKEN' },  { name: '我方的服务商', code: 'MY_SERIVCE_PROVIDER' }, { name: '对方的服务商', code: 'PEERS_SERVICE_PROVIDER' }, { name : '双方的服务商', code: 'PARTNER' } ]
                    },
                    {
                        title:'归属员工',
                        hasAll: true,
                        name:'hrEmployeeIdOwner',
                        url: 'client:/helper/emp',
                        method:'post',
                        filter: 'empName',
                        filterName: 'empId'
                    },
                ],
                filterInput:[
                    {
                        url: "client:/search",
                        name:"param",
                        label:'服务商名称',
                        flag: "SERVICE_PROVIDER"
                    }
                ],
            
                tableIterationField:[
                    {
                        tr:'伙伴名称',
                        field:'name',
                        link: {
                            text:'查看',
                            link_name:'supplier_detail',   //路由名字
                            link_key:"chosen",
                            link_Field:'sysPartnerId',
                            isCreate:false,
                            model:false
                        }
                    },
                    {
                        tr:'伙伴状态',
                        field:'partnershipStatus',
                        filter: 'partnershipStatus'
                    },
                    {
                        tr:'结算方式',
                        field:'settlementMethod',
                        filter: 'settleMethod',
                    },
                    {
                        tr:'业务归属',
                        field:'append.empName',
                        filter: 'obj',
                        // link: {
                        //     link_name: 'employee_add', 
                        //     link_key:"chosen",
                        //     link_Field:'hrEmployeeIdOwner',
                        //     isCreate: false
                        // }
                    },
                    {
                        tr:'公司地址',
                        field:'address',
                        filter: 'tooltip'
                    }
                ],
                linkBtn:[
                    
                ],
                addBtns:[
                    { 
                        text:'我的邀请',
                        id: '#mineInvited',   //路由名字
                        model: true
                    },
                    {
                        text:'邀请我的',
                        id:'#invitedUs',
                        number: 0,  
                        model: true
                    },
                    {
                        text:'邀请服务商',
                        link_name:'supplier_add',   //路由名字
                        link_key:"chosen",
                        link_Field:'type',
                        isCreate: true,
                    }
                ]
            }
        },
        created(){
            // 获取邀请本公司的请求( 做红点 )
            const _this = this;
            send({
                url: 'client:/partnerinvitation/list/invited',
                type: 'post',
                param:{
                    pageIndex:1,
                    pageSize:10,
                    status: 'UNTREATED'
                }
            }, function(err, res){
                if(res.status == 200){
                    _this.addBtns[1].number = res.recordSize
                }
            });
        }
    }
</script>

<style scoped>

</style>