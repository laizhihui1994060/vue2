<template>
     <div class="accountStatement">
         <vue-table
             :filter-btns="filterBtns"
             :filter-input="filterInput"
             item-url="finance:/recon/list"
             type='post'
             :params='params'
             :table-iteration-field="tableIterationField"
             :linkBtn="linkBtn"
             :addBtns="addBtns"
             :dropdownToggle="dropdownToggle"
             :rightBtn="rightBtn"
             :enableTimeRange='true'/>
    
        <div style="position:absolute;left:-1000px"><span id="forLoadSwf"></span></div>

        <div class="modal fade" id="setpwModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="exampleModalLabel">设置密码</h4>
              </div>
              <div class="modal-body" style="width:200px;margin:0 auto;">
                 <input type="password" id="linkPw"/>
              </div>
              <div class="modal-footer">
                <button type="button" id="setpwSure" class="btn btn-primary" data-dismiss="modal" aria-label="Close">确定</button>
              </div>
            </div>
          </div>
        </div>
        <url-model/>
     </div>

</template>

<script>
import vueTable from "../../../../../common_component/vue-table.vue"
import urlModel from "../modal/url.vue"
export default { 
    components:{ 
        vueTable,
        urlModel
    },
    data(){

        return {
            type:1,
            params: {
                pageIndex:1,
                pageSize:10
            },
            rightBtn:[
                {
                    text:'生成对账单',
                    fn:function(self, key, value, item_index,item){
                        self.$router.push({ name: 'account_statement_check'})
                    }
                }
            ],
            filterBtns:[
                {
                    title:'对账单类型',
                    name:'finReconType',
                    isQuickSeach: true,
                    arr: [ { name: '委派商', code: 'DELEGATE' }, { name: '客户', code: 'CUSTOMER' }, { name: '服务商', code: 'PROVIDER' } ],
                    filter:"name",
                    listWidth:'150px',
                    filterName: 'code',
                    PrimaryKey:true,
                    default:'CUSTOMER',
                    uuid:true,
                    field:'code',
                    isSend:true
                },
                // {
                //     title:'结束时间',
                //     name:'endTime ',  
                //     listWidth:'100px',

                // },
                {
                    title:'客户类型',
                    name:'customerType',  
                    url:"control:/sys/param",
                    method:"post",
                     filterName:'code' ,
                     filter:'desc',
                    params:['/customer/customer_types'],
                    listWidth:'100px',
                    hasAll:true ,
                    show:'CUSTOMER' 
                },
                {
                    title:'客户名称',
                    name:'customerId',
                    filter:"name",
                    filterName:'partnerId' ,
                    url:"client:/helper/partner",
                    method:"post",
                    params:{isCustomer:true,cooperationStatus :'UNDER_CONTRACT'},
                    listWidth:'100px',
                    hasAll:true  ,
                    show:'CUSTOMER' 

                },
                {
                    title:'服务商名称',
                    name:'providerId ',
                    filter:"name",
                    filterName:'partnerId' ,
                    url:"client:/helper/partner",
                    method:"post",
                    params:{isProvider:true,partnershipStatus :'MY_SERIVCE_PROVIDER'},
                    listWidth:'100px',
                    hasAll:true  ,
                    show:'PROVIDER' 
                },
                {
                    title:'结算状态',
                    name:'settleStatus',
                    arr: [ { name: '结清', code: "SQUARE_UP" }, { name: '欠账', code: 'BILLS_DUE' } ],
                    filter:"name",
                    filterName: 'code',
                    hasAll:true  
                },
                // {
                //     title:'救援状态',
                //     name:'source',
                //     arr: [ { name: '救援取消', code: 'ORDER_CANCELLED' }, { name: '救援完成', code: 'DONE' } ],
                //     filter:"name",
                //     filterName: 'code'
                // },
            ],
            filterInput:[
                // {
                //     url: "client:/search",
                //     name:"param",
                //     label:'对账单编号',
                //     flag: "FIN_RECONCILIATION"
                // }
            ],
            tableIterationField:[
                {
                    tr:'对账单编号',
                    sort:true,
                    field:'reconciliationCode',
                    link: {
                        text: '查看',
                        link_name: 'account_statement_edit',
                        fn(self, key, value, item_index,item,type){
                            self.$router.push({ name: 'account_statement_edit', params: {isCreate:true,id:item['sysPartnerId'] + '|' + item['finReconId'],isCustomer:type,isConfirmed:item['confirmedTime'] ? true:false}});
                        }
                    }
                },
                {
                    tr:'往来单位',
                    field:'partnerInfo.finReconType',
                    filter: 'arr.finReconType',
                    link: {
                        link_name: 'customer_add', 
                        link_key:"chosen",
                        link_Field:"sysPartnerId",
                        isCreate: false
                    }
                },
                {
                    tr:'对账类型',
                    field:'finReconType',
                    filter: 'arr.isCustomer'
                },
                {
                    tr:'生成日期',
                    sort:true,
                    field:'created',
                    filter: 'date'
                },
                {
                    tr:'总金额',
                    sort:true,
                    field:'totalAmt' 
                },
                {
                    tr:'应收总金额',
                    sort:true,
                    field:'receivableTotalAmt' 
                },
                {
                    tr:'未收总金额',
                    sort:true,
                    field:'notReceivedTotalAmt',
                    filter: 'notReceivedTotalAmt'
                },
                {
                    tr:'已收总金额',
                    sort:true,
                    field:'receivedTotalAmt'
                },
                {
                    tr:'开票总金额',
                    sort:true,
                    field:'receivedTotalAmt'
                },
                {
                    tr:'结算状态',
                    field:'settleStatus',
                    filter:'settleStatus'
                },
                {

                    tr:'账单外链',
                    text:'账单外链',

                    link: {
                        text: '查看',
                        link_name: 'account_statement_edit',
                        fn(self, key, value, item_index,item,type){
                              var id=item['finReconId'];
                              send({
                                     type:"get",
                                     url:"finance:/recon/"+id+"/chain",
                                     param:null
                                },function(err,res){
                                    if(err)return alert('服务器出错，请联系管理员');
                                    if(res.status == 200){
                                        console.log(res)
                                        var url=res.content[0]['chainUrl'];
                                        var pw=res.content[0]['passwd'];

                                        $('.urlModel_url').val(url)
                                        $('.urlModel_url').click(function(){
                                            $(this).select();
                                            document.execCommand("Copy");
                                        });
                                        $('.urlModel_pas').val(pw);
                                        
                                        $('#urlModel').modal('show');
                                    }else{
                                        alert(res.msg);
                                        console.log(err,res)
                                    }
                                });
                               


                        }
                    }
                },
                {
                    tr:'设置密码',
                    text:'设置密码',
                    link: {
                        text: '查看',
                        link_name: 'account_statement_edit',
                        fn(self, key, value, item_index,item,type){



                           alertInput({
                                title:'设置密码',
                                text:'请设置对账单的密码',
                                InputError:'密码不能为空，请重新输入',
                                tpl:'密码设置成功',
                            },function(val,cb){
                                    console.log(val);
                                var param={
                                    finReconciliationChainId:item['reconChain'][0]['finReconciliationChainId'],
                                    chainKey:item['reconChain'][0]['chainKey'],
                                    passwd:val
                                };

                                send({
                                     type:"put",
                                     url:"finance:/recon/chain",
                                     param:param
                                },function(err,res){
                                    console.log(err,res)
                                    if(err)return alert('服务器出错，请联系管理员');
                                    if(res.status == 200){
                                        alert('设置密码成功','success')
                                    }else{
                                        alert(res.msg);
                                    }
                                });

                            });

                           
                        } 

                    }
                },
                {
                    tr:'对账人员',
                    uuid:'userId',
                    info:'userInfo',
                    field:'createdBy',
                    returnName:'empName',
                    filter: 'arr'

                },
                {
                    tr:'审核时间',
                    sort:true,
                    field:'confirmedTime',
                    filter: 'date'
                }
            ],
            linkBtn:[
                // {
                //     text: '查看',
                //     link_name: 'account_statement_edit',
                //     fn(self, key, value, item_index,item,type){
                //         self.$router.push({ name: 'account_statement_edit', params: {isCreate:true,id:item['sysPartnerId'] + '|' + item['finReconId'],isCustomer:type,isConfirmed:item['confirmedTime'] ? true:false}});
                //     }
                // },  

                // {
                //     text:"开票登记",
                //     link_name: 'account_statement_invoice_register',
                //     fn:function(self, key, value, item_index,item){
                //         self.$router.push({ name: 'account_statement_invoice_register', params: {isCreate:true,id:item['sysPartnerId'] + '|' + item['finReconId'] + '|' + item['reconciliationCode']}})
                //     }
                // },

                // {
                //     text:'收款单登记',
                //     matchfield:'finReconType',
                //     matchType:'btnShow',
                //     matchContent:"CUSTOMER",
                //     link_if:true,
                //     fn(self, key, value, item_index,item){
                //         self.$router.push({ name: 'account_statement_receipt_add', params: {isCreate:true,id:item['finReconId'], partnerId: item['sysPartnerId'] }});
                //     }  
                // }, 
                // {
                //     text:'付款单登记',
                //     link_name:'account_statement_payment_order',   
                //     fn(self, key, value, item_index,item){
                //         self.$router.push({ name: 'account_statement_payment_order', params: {isCreate:true,id:item['finReconId'], partnerId: item['sysPartnerId'] }});
                //     }  
                // }
            ]

        }
    }
}
</script>

<style>

</style>