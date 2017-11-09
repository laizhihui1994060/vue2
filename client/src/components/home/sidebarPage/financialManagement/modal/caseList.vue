<template>
    <div class="modal fade" id="caseList" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="row">
                        <div class="col-xs-12">
                            <div v-if="1" class="case_search_wrap">
                                <h3 class="text-center case_header">选择案件记录</h3>
                                <div class="inline">
                                    <start-end-time  
                                        @updata="integrationDate" 
                                        :startName='startTime' 
                                        :endName='endTime'  
                                        :startValue="startValue"
                                        :endValue="endValue"
                                        :label="false" />
                                    <form-label-input 
                                        name="caseNo" 
                                        @updata="integrationDate" 
                                        :label="'案件号'"
                                        input-width="120px" 
                                        pmarginRight="24px"/>
                                    <form-label-input 
                                        name="plateNo" 
                                        @updata="integrationDate" 
                                        :label="'车牌号'"
                                        input-width="120px" 
                                        pmarginRight="24px"/>
                                    <button class="btn radius-btn" style="background:rgb(23, 134, 247);color:#fff;padding:4px 12px;" @click="conditionSearch">搜索</button>
                                </div> 
                                
                                    
                                
                            </div>
                            
                            <h4 v-if="!caseListAll.length" class="text-center no_case">暂无可选的案件记录</h4>
                            <div class="table_box table-responsive" v-else>
                                <table class="table nor_date_table table-bordered"  style='width:100%;'>
                                    <thead> 
                                        <tr>
                                            <th><input type="checkbox" name="slctAll" @click="selectClearCase($event)">全选</th>
                                            <th>业务类型</th>
                                            <th>订单编号</th>
                                            <th>签单</th>
                                            <th>信息费</th>
                                            <th>案件号</th>
                                            <th>完成时间</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(i,index) in caseListAll">
                                            <td><input type="checkbox" name="addCase" @click="selectCase(index)"></td>
                                            <td v-text="i ? matchJobType(i.jobType) : ''"></td>
                                            <td v-text="i ? i.orderCode : ''"></td>
                                            <td v-text="i ? i.signInvoiceAmount  :0"></td>
                                            <td v-text="i.commission"></td>
                                            <td v-text="i ? i.customerCaseNo : ''"></td>
                                            <td v-text="i ? data(i.completeTime) : '' "></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div> 
                    <template v-if="0">
                        <vue-table
                            :filter-btns="filterBtns"
                            :filter-input="filterInput"
                            item-url="finance:/recon/order/list"
                            type='post'
                            :params='params'
                            :table-iteration-field="tableIterationField"
                            :linkBtn="linkBtn"
                            :addBtns="addBtns"
                            :rightBtn="rightBtn"
                            :checkbox="checkbox"/>

                    </template>
                    


                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn" @click="generateNote"  data-dismiss="modal" v-if="caseListAll.length">增加对账单案件</button>
                        <button type="button" class="btn" @click="clearCase"  data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


    import vueTable from "../../../../../common_component/vue-table.vue";
    import formLabelInput from "../../../../../common_component/form-label-input.vue";
    import startEndTime from "../../../../../common_component/startEndTime.vue";
    let arr = [];

    export default {
   
        components: {  
            vueTable,
            formLabelInput,
            startEndTime
        },
        props:['caseList','matchJobType','data'],
        data(){
            return {
                params:null,
                caseArray:[],
                caseListAll:[],
                checkbox:{
                    field:'orderCode',
                    fn:function(name,item,status){

                        if(status && status === 'clear')return arr = [];

                        var obj = {};
                        if(name == 'checkbox_all'){
                            arr = [];
                            if($('#account_statement_check').find("input[name='checkbox_all']").is(':checked')){
                                item.forEach(function(it,index){
                                    console.log(it)
                                    obj = {
                                        totalAmt:Number(it.charge),
                                        towOrderId:it.towOrderId,
                                        receivableTotalAmt:Number(it.charge) - Number(it.commission),
                                        commissionTotalAmt:Number(it.commission),
                                        settleMethod:it.settleMethod,
                                        orderCode:it.orderCode,
                                        bidOrgId:it.bidOrgId ? it.bidOrgId  : ''
                                    };

                                    it.customerId ? obj.customerId = it.customerId :  obj.orgId = it.orgId;
                                    

                                    arr.push(obj);
                                });
                            }
                           
                        }
                        if(name == 'checkbox'){

                            if($('#account_statement_check').find("input[value='" + item.orderCode +"']").is(':checked')){
                                for(var i = 0 ;i<arr.length;i++){
                                    if(arr[i].orderCode == item.orderCode)return;
                                }
                                    console.log(item)

                                obj = {
                                    totalAmt:Number(item.charge),
                                    towOrderId:item.towOrderId,
                                    receivableTotalAmt:Number(item.charge) - Number(item.commission),
                                    commissionTotalAmt:Number(item.commission),
                                    customerId:item.customerId,
                                    settleMethod:item.settleMethod,
                                    orderCode:item.orderCode,
                                    bidOrgId:item.bidOrgId ? item.bidOrgId  : ''
                                };
                                item.customerId ? obj.customerId = item.customerId :  obj.orgId = item.orgId;

                                arr.push(obj);

                            }else{

                                for(var i = 0 ;i<arr.length;i++){
                                    console.log(arr[i],item)
                                    if(arr[i].orderCode == item.orderCode){
                                        arr.splice(i,1)
                                    }
                                }
                            }
                        }

                            console.log(arr);
                    },
                    text:'生成对账单',
                    click(tableVM){
                        console.log(arr)
                        send({
                            type:'post',
                            url:'finance:/recon',
                            param:arr
                        },function(err,res){
                            if(err)return console.log(err);
                            if(res.status == 200){
                                console.log(res);
                                tableVM.watchDataForm();
                                alert(res.msg, 'success');
                            }else{
                                console.log(res);
                                alert(res.msg)
                            }
                        });
                    }

                },
                filterBtns:[
                  
                ],
                filterInput:[
                    {
                        name:"customerId",
                        label:'客户ID'
                    },
                    {
                        name:"providerId",
                        label:'服务商ID'
                    }
                ],
                tableIterationField:[
                    {
                        tr:'业务类型',
                        field:'jobType'
                    },
                    {
                        tr:'订单编号',
                        field:'orderCode',
                        filter:'date'
                    },
                    {
                        tr:'签单',
                        field:'charge',
                        filter:'arr'
                    },
                    {
                        tr:'信息费',
                        field:'commission'
                    },
                    {
                        tr:'案件号',
                        field:'customerCaseNo',
                        filter:'jobType'
                    },
                    {
                        tr:'救援时间',
                        field:'completeTime',
                        filter:'tooltip'
                    },
                    
                ],
                linkBtn:[
                  
                ]
            }
        },
        methods:{

            selectClearCase(ev){
                if(ev.currentTarget.checked){
                    $('[name=addCase]').prop('checked',true);
                    for(let i = 0; i<$('[name=addCase]').length; i++){
                        this.selectCase(i);
                    }
                } else {
                    this.clearCase();
                }
            },
            clearCase(){
                $('[name=addCase]:checked').prop('checked',false);
                this.caseArray.length = 0;
            },
            conditionSearch(){
                this.requestCaseListChild();
            },
            requestCaseListChild(params){
                const self = this;
                if(params){
                    this.params = params;
                    this.params.settleMethod = 'SIGN'; 
                }
                console.log("查看参数",JSON.stringify(this.params))
                send({
                    type:'post',
                    url:'finance:/recon/order/list',
                    param:this.params
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200){
                        console.log("案件结果")
                        console.log(res);
                        self.$emit('list',res.content);
                        self.caseListAll = res.content;//供选择的案件
                    } else {
                        self.caseListAll = [];
                        console.log("案件结果请求完毕")
                        console.log(self.caseListAll);
                    }
                })
            },
            integrationDate(name,item,cb){
                if(isNaN(item)){
                    item = '';
                }
                if(typeof item === "string" && item.trim() == ''){
                    delete this.params[name];
                    return;
                }

                if(name == 'startTime'){
                    item = new Date(item);
                    item.setHours(23);
                    item.setMinutes(59);
                    item.setSeconds(59);
                    item.setMilliseconds(0);
                    item = item.getTime();
                    this.startValue = item;
                }

                if(name == 'endTime'){
                    item = new Date(item);
                    item.setHours(0);
                    item.setMinutes(0);
                    item.setSeconds(0);
                    item.setMilliseconds(0);
                    item = item.getTime();
                    this.endValue = item;

                }
                this.params[name] = item;
                cb && cb();
            },

            //传送array参数;
            generateNote(){
                if(this.caseArray.length === 0)return alert("您未选择任何案件");

                // let len = this.caseArray.length-1;
                // for(let i = this.caseArray.length-1; i>=0; i--){
                //     if(typeof this.caseArray[i] === "undefined"){
                //         this.caseArray.splice(i,1);
                //         continue;
                //     }
                // }
                this.caseArray = this.caseArray.filter((item)=>typeof item !== 'undefined');
                console.log(this.caseArray);
                this.$emit('generate',this.caseArray)
            },

            //多选案件号
            selectCase(index){
                let _case = this.caseListAll[index];
                console.log("_case", _case)
                if($('[name=addCase]')[index].checked){
                    this.caseArray[index] = {
                        towOrderId: _case.towOrderId, 
                        totalAmt: _case.signInvoiceAmount,
                        commissionTotalAmt: _case.commission
                    }
                    console.log(this.caseArray)
                } else {
                    console.log("取消选择");
                    this.caseArray.splice(index,1);
                }
            }
        },
       created(){
            let startValue = new Date();
            startValue.setHours(0);
            startValue.setMinutes(0);
            startValue.setSeconds(0);
            startValue.setMilliseconds(0);
            startValue = startValue.getTime();
            this.startValue = startValue;

            let endValue = new Date();
            endValue.setHours(23);
            endValue.setMinutes(59);
            endValue.setSeconds(59);
            endValue.setMilliseconds(0);
            endValue = endValue.getTime();
            this.endValue = endValue;
       }
    }
</script>


<style scoped>
     #caseList .modal-dialog{
        margin-top: 100px;
        width: 900px;
        border-radius: 10px;
     }
    #caseList .modal-content{
        padding:20px;
        max-height: 760px;
        overflow: auto;
        width: 900px;
    }
    #caseList .right_content{
        min-height: 500px;
    }
     #caseList .page-bar{
        position: absolute;
        bottom: 9px;
        right: -2px
     }
    #caseList .case_header{

        margin-bottom:20px;
    }
    table{
        table-layout:fixed;
    }
    table td{
        word-break:break-all;
    }
    table th:first-child, table tr:first-child{
        width: 70px;
    }
    table tbody tr:hover{
        background: #dfe6ec !important
    }
    th{
        background: #f4f4f4;
        cursor: pointer;
    }
    .table_a:hover{
        border-bottom: 1px solid;
    }
    .save_condition{
        color:#39B6E5 !important;
        background-color:white !important;
      
    }
    .no_case{
        min-height: 200px;
    }
    .search_condition{
        margin-left:20px;
        height:24px;
    }
    .case_search_wrap{
        margin: 15px 0;
    }
    .case_search_btn{
        padding: 5px 30px;
        font-size: 12px;
        color:#fff;
        border: none;
    }
</style>