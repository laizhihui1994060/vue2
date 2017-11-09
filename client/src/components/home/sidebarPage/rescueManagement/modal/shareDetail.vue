<template>
    <div id='shareDetail' >
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/rescueManagement/shareTask',text:'分享任务'},{path:'',text: '分享详情' }]"/>

            <div>
                <article style="cursor:pointer;" @click='showDetails($event)'>
                    订单信息<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                </article>

                <div class="details">
                    <order-details :orderItem="orderItem" :article="false" input-widht="78%" textInputWidth="78%"/>
                </div>

                <article style="cursor:pointer;margin:20px 0" @click='showDetails($event)'>
                    分享信息<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                </article>

                <div class="details">
                     <div style="padding:0 10px">
                        <div class="row">
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="结束时间"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    disabled="disabled"
                                    input-width="104px"
                                    :value="orderItem.shareDeadline ? getLocalTime(orderItem.shareDeadline): ''"/>            
                            </div>
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="分享范围"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    disabled="disabled"
                                    input-width="104px"
                                    unitRight="11px"
                                    type="number"
                                    unit="KM以内"
                                    :value="orderItem.shareDistanceScope"/>
                            </div>
                            <div class="col-xs-4">
                                <form-label-input 
                                    label="报价方式"
                                    textIndent="3px"
                                    @updata="integrationDate" 
                                    disabled="disabled"
                                    name="shareDistanceScope" 
                                    unit="元"
                                    input-width="104px"
                                    :value="orderItem.shareActionType == 'SHARE_FIXED_PRICE' ? '一口价:' + orderItem.sharePrice : '最高限价' + orderItem.sharePrice "/>  
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input 
                                    input-width="78%"
                                    label="分享公司" 
                                    name="rescueAddress"
                                    @updata="integrationDate"
                                    disabled="disabled"
                                    :value="orderItem.orgName"/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input 
                                    label="保险要求"
                                    textIndent="3px"
                                    @updata="integrationDate" 
                                    name="shareDistanceScope" 
                                    disabled="disabled"
                                    input-width="78%"
                                    type="number"
                                    :value="orderItem.shareInsurancesRequired"/>  
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <input-text
                                    label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"
                                    @updata="integrationDate" 
                                    input-width="78%"
                                    disabled="disabled"
                                    margin-top="0"
                                    :value="orderItem.shareComment"
                                    name="shareComment"/>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <article style="cursor:pointer;margin:20px 0" @click='showDetails($event)'>
                    投标列表<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                </article>

                <div class="details">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th v-if="orderItem.shareStatus=='BIDDING'"></th>
                                <th>公司</th>
                                <th>技师姓名</th>
                                <th>车牌</th>
                                <th>技师电话</th>
                                <th>车辆类型</th>
                                <th>距离/时间</th>
                                <th>投标价</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in shareMan"  @click="selectShareMan(index)">
                                <td  v-if="orderItem.shareStatus=='BIDDING'">
                                    <radio 
                                        name='a'
                                        parent-margin-right="0"
                                        top="-2px"
                                        parent-height="20px"
                                        parent-display="block"
                                        radio-margin-top="0"
                                        :value="item.driverId ? item.driverId : '' + ',' + item.truckId ? item.truckId : ''"/>
                                </td>
                                <td v-text="item.orgName"></td>
                                <td v-text="item.driverName"></td>
                                <td v-text="item.plateNo"></td>
                                <td v-text="item.driverPhone"></td>
                                <td v-text="item.carCategory"></td>
                                <td v-text="item.distance + ' / ' + item.drivingTime"></td>
                                <td v-text="item.bidPrice"></td>
                            </tr>
                        
                        </tbody>
                    </table>
                    <h4 v-if="!shareMan.length" class="text-center">暂无投标人信息</h4>
                </div>


            </div>
            
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="radius-btn" @click="submit" v-if="orderItem.shareStatus=='BIDDING'">选择投标人</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/rescueManagement/shareTask' }" active-class=' ' class='btn radius-btn'>返回</router-link>
            </div>
        </div>
    </div>
</template>


<script>
    import inputText from '../../../../../common_component/inputText.vue'
    import breadcrumb from '../../../../../common_component/breadcrumb.vue'
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    import radio from '../../../../../common_component/radio.vue'

    import orderDetails from "../../../../../common_component/orderDetails.vue";

    export default{
        components:{
            inputText,
            breadcrumb,
            formLabelInput,
            orderDetails,
            radio
        },
        data(){
            return {
                disabled: true,
                orderItem:{orderVehicles:[{}]},
                shareActionId:'',
                bidId:'',
                shareMan:[],
                el : null,

            }
        },
        created(){
            this.shareActionId = this.$route.params.shareActionId;
            this.bidId = this.$route.params.bidId;
            this.getShareMan(this.shareActionId);

            this.getDateil();

        },
        methods:{      
            integrationDate(name,item){
                if(name == 'handlePersonId'){
                    this.res['handlePersonId'] = item.empId;
                    this.res['handlePersonName'] = item.empName;
                    return ;
                }
                this.res[name]= item;
                console.log(this.res);
            },
            showDetails(){
                $(event.currentTarget).find('span').toggleClass('down');
                $(event.currentTarget).next('.details').slideToggle('fast');
            },
            getLocalTime(ns){
                return util.getLocalTime(ns);
            },
            getDateil(){
                
                const self = this;

                send({
                    type:'get',
                    url:'order:/share/order?shareActionId=' + this.shareActionId  +'&bidId=' +  this.bidId
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200){
                        self.orderItem = res.content[0];
                        console.log(res);
                    }else{
                        console.log(res);
                        alert(res.msg);
                    }
                });
            },
            getShareMan(id){
                const self = this;

                send({
                    type:'post',
                    url:'order:/share/bid/drivers',
                    param:{
                        "id": id,
                        "pageSize": 10000,
                        "pageIndex": 1
                    }
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200 || res.status == 404 ){
                        console.log(res.content)
                        self.shareMan = res.content ? res.content : [];
                    }else{
                        alert(res.msg);
                        console.log(res);
                    }
                });
            },
            selectShareMan(index){
                if(this.orderItem.shareStatus != 'BIDDING')return ;
                const el = $('#shareDetail tbody').find('tr')[index];

                $('#shareDetail tbody').find('tr').css({backgroundColor:'#fff'})

                el.style.backgroundColor="#dfe6ec";

                this.el = el.querySelector('input');
                this.el.checked = true;
            },
            submit(){
                if(!this.el)return alert('请先选择一个投标人');

                const self = this;

                const ids = this.el.value.split(',');

                this.res.dispatchEntity.driverId = ids[0];
                this.res.dispatchEntity.towTruckId = ids[1];
                console.log(this.res);


                send({
                    type:'post',
                    url:'order:/share/choose',
                    param:this.res
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200){
                        self.res = {
                            "shareActionId": "string",
                            "bidId": "string",
                            "responseComment": "",
                            "dispatchEntity": {
                                "id": "string",
                                "driverId": "string",
                                "towTruckId": "string",
                                "dispatchMethod": "WEB",
                                "dispatchActionType": "string",
                            }
                        }
                        self.shareMan = [];

                        alert(res.msg,'success');
                        $('#shareDetail tbody').find('tr').css({backgroundColor:'#fff'})
                        self.el.checked = false;
                        self.el = null;
                        alert(res.msg);
                    }else{
                        alert(res.msg);
                    }
                        console.log(res);

                })
            }
        }
    }
</script>
<style>
  
    #shareDetail .modal-body{
        padding:15px 23px;
    }
    #shareDetail .modal-body > div{
        margin-bottom: 40px;
    }
    #shareDetail .modal-footer button{
        margin:0 50px;
    }
    #shareDetail article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #shareDetail article:after{
        width:1400px;
        left:100px;
    }
    #shareDetail .details{
        padding:10px 50px;
        background:#fff;
    }

    #shareDetail .row{
        margin-bottom: 10px;
    }
    #shareDetail .btn-primary{
        color: #fff;
        background-color: #39B6E5;
        border-radius: 0;
        padding: 3px 12px;
        border-width: 0
    }

    #shareDetail .modal-footer button{
        margin:0 50px;
    }
</style>