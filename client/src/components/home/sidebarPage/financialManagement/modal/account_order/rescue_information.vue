<template>
    <div class='rescue_information'>
        <template v-if='informtion.orderJobList.length > 0' >
            <div class='orderJob' v-for='(orderJob, orderJobIndex) in informtion.orderJobList' :key='orderJob.towJobId'>
                <div style='color:#45bae3;padding-bottom:10px;font-weight:400;font-size:16px;cursor: pointer;'　@click='showDetails($event)'>
                    <span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px;margin-right:15px;'></span>任务：<span style='color:orange'>{{orderJob.jobCode}}</span>
                    <div class='btns pull-right'>
                        <button class='btn' @click.stop='showPictures(orderJob.driverActions,orderJob.jobCode)'>任务照片</button>
                        <button class='btn' style="margin:0" @click.stop='showRecording(orderJob.towJobId,orderJob.jobCode)'>任务录音</button>
                        <button class='btn' @click.stop='showTrack(orderJob.towJobId,orderJob.jobCode)'>任务轨迹</button>
                    </div>
                </div>
                    <div class='block details' style='border-top:1px solid #999; border-bottom: 1px solid #999;'>
                    <div class="row"> 
                        <div class="col-sm-6">
                            <inputEdit
                                label='技&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师'
                                name='towDriverId'
                                inputMaxWidth="70px"
                                @updata = 'integrationDate'
                                type='btn'
                                url='client:/helper/emp'
                                method='post'
                                :params="{ isUser: true }"
                                :indexTwo='orderJobIndex'
                                objName='empName'
                                :value='orderJob.dispatchAction && orderJob.dispatchAction.driverInfo ? orderJob.dispatchAction.driverInfo.empName : "" '
                                :disabled='!(!informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME") ' />
                        </div>
                        <div class="col-sm-6">
                            <inputEdit 
                                label='技师电话'
                                inputMaxWidth="70px"
                                name='customerCaseNo'
                                @updata = 'integrationDate'
                                :value='orderJob.dispatchAction && orderJob.dispatchAction.driverInfo ? orderJob.dispatchAction.driverInfo.workMobile : "" '
                                :indexTwo='orderJobIndex'
                                :disabled='true'
                                />
                        </div>
                    </div>
                    <div class="row">
                        <div class='col-sm-6'>
                            <inputEdit
                                label='助&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;理'
                                name='assistantDriverId'
                                @updata = 'integrationDate'
                                type='btn'
                                url='client:/helper/emp'
                                method='post'
                                :params="{ isUser: true }"
                                :indexTwo='orderJobIndex'
                                objCode='code'
                                objName='empName'
                                :value='orderJob.dispatchAction && orderJob.dispatchAction.assistantDriverInfo ? orderJob.dispatchAction.assistantDriverInfo.empName : ""'
                                :disabled='!(!informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")' />
                        </div>
                        <div class='col-sm-6'>
                            <inputEdit
                                label='助理电话'
                                name='customerCaseNo'
                                @updata = 'integrationDate'
                                :value='orderJob.dispatchAction && orderJob.dispatchAction.assistantDriverInfo ? orderJob.dispatchAction.assistantDriverInfo.workMobile : "" '
                                :indexTwo='orderJobIndex'
                                :disabled='true'
                                />

                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <inputEdit
                                label='拖车车牌'
                                inputMaxWidth="70px"
                                name='towTruckId'
                                type='btn'
                                url='client:/helper/truck'
                                method='post'
                                @updata = 'integrationDate'
                                :value='orderJob.dispatchAction && orderJob.dispatchAction.towTruckPlantNo ? orderJob.dispatchAction.towTruckPlantNo : "" '
                                :indexTwo='orderJobIndex'
                                objName='plateNo'
                                fieldName='id'
                                :disabled='!(!informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")' />
                        </div>
                        <div class='col-sm-6'>
                            <inputEdit
                                label='指派操作'
                                name='operation'
                                @updata = 'integrationDate'
                                type='btn'
                                inputMaxWidth="70px"
                                :searchCode='orderJob.dispatchAction && orderJob.dispatchAction.operation  ? orderJob.dispatchAction.operation : "" '
                                url='control:/sys/param/org'
                                method='post'
                                :params="['/order/operation_type']"
                                :indexTwo='orderJobIndex'
                                fieldName='code'
                                objCode='code'
                                objName='desc'
                                :disabled='informtion.upstreamConfirmed' />
                        </div>
                    </div>
                    <div class='row'>
                        <div class='col-sm-6'>
                            <inputEdit
                                label='救援结果'
                                name='jobStatusOverall'
                                @updata = 'integrationDate'
                                :arr="[ { name: '救援成功', code: 'SUCCESS' }, { name: '救援失败', code: 'FAILED' }, { name: '取消救援', code: 'CANCEL_CHARGABLE' }, { name: '取消无费', code: 'CANCEL_NOFEE' } ]" 
                                type='btn'
                                :indexTwo='orderJobIndex'
                                fieldName='code'
                                objCode='code'
                                objName='name'
                                :searchCode='orderJob.jobStatusOverall ? orderJob.jobStatusOverall : "" '
                                :disabled='!(!informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME") || informtion.confirmed'  />
                        </div>
                        <div class="col-sm-6">
                            <inputEdit
                                label='到达里程'
                                name='milageTowing'
                                @updata = 'integrationDate'
                                :value='orderJob.jobResultEntity && orderJob.jobResultEntity.milageToIncidentSpot ? orderJob.jobResultEntity.milageToIncidentSpot : 0 '
                                :indexTwo='orderJobIndex'
                                unit='公里'
                                inputType='number'
                                :disabled='true' />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <inputEdit
                                label='拖车里程'
                                name='confirmedmilageTowing'
                                @updata = 'integrationDate'
                                :value='orderJob.jobResultEntity && orderJob.jobResultEntity.milageTowing ? orderJob.jobResultEntity.milageTowing : 0 '
                                :indexTwo='orderJobIndex'
                                unit='公里'
                                inputClass='maxLength'
                                :disabled='true'
                                inputType='number' />
                        </div>
                        <div class="col-sm-6">
                            <inputEdit
                                label='返回里程'
                                name='confirmedmilageBack'
                                @updata = 'integrationDate'
                                :value='orderJob.jobResultEntity && orderJob.jobResultEntity.milageBack ? orderJob.jobResultEntity.milageBack : 0 '
                                :indexTwo='orderJobIndex'
                                unit='公里'
                                inputClass='maxLength'
                                :disabled='true'
                                inputType='number' />

                        </div>
                    </div>
                    
                    <hr style="border-color:#999" />

                    <!-- 结算确认后的车辆信息 -->
                    <div class="row">
                        <div class="col-sm-6">
                            <inputEdit
                                label='车主姓名'
                                name='carOwnerName'
                                @updata = 'integrationDate'
                                :value='orderJob.towJobConfirmedVehicles && orderJob.towJobConfirmedVehicles.length > 0 ? orderJob.towJobConfirmedVehicles[0].carOwnerName : "" '
                                :indexTwo='orderJobIndex' 
                                :disabled='!(!informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")' />
                        </div>
                        <div class="col-sm-6">
                            <inputEdit
                                label='车主电话'
                                name='carOwnerPhone'
                                @updata = 'integrationDate'
                                :value='orderJob.towJobConfirmedVehicles && orderJob.towJobConfirmedVehicles.length > 0 ? orderJob.towJobConfirmedVehicles[0].carOwnerPhone : 0 '
                                :indexTwo='orderJobIndex'
                                inputType='number'
                                :disabled='!(!informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")' />

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <inputEdit
                                label='车牌号码'
                                name='vehiclePlateNo'
                                @updata = 'integrationDate'
                                :value='orderJob.towJobConfirmedVehicles && orderJob.towJobConfirmedVehicles.length > 0 ? orderJob.towJobConfirmedVehicles[0].vehiclePlateNo : "" '
                                :indexTwo='orderJobIndex'
                                :disabled='!(!informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")' />
                        </div>
                        <div class="col-sm-6">
                            <inputEdit
                                label='车辆型号'
                                name='vehicleName'
                                @updata = 'integrationDate'
                                :value='orderJob.towJobConfirmedVehicles && orderJob.towJobConfirmedVehicles.length > 0 ? orderJob.towJobConfirmedVehicles[0].vehicleName : "" '
                                :indexTwo='orderJobIndex'
                                url='client:/helper/vehiclemodel?categoryCode=&vendorCode=&brandCode='  
                                type='btn'
                                fieldName='name'
                                objCode='code'
                                :disabled='!(!informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                                objName='name' />

                        </div>
                    </div>

                    <!-- 有没orderJob.jobResultEntity, 没有orderJob.jobResultEntity修改不了，所以最好不显示出来 -->
                    <template v-if='orderJob.jobResultEntity'>

                        <hr style="border-color:#999" />
                        
                        <div class="row">
                            <div class="col-sm-6">
                                <inputEdit
                                    :disabled='informtion.confirmed'
                                    label='到达里程'
                                    inputMaxWidth="70px"
                                    name='confirmedMilageToIncidentSpot'
                                    @updata = 'integrationDate'
                                    :value='orderJob.jobResultEntity.confirmedMilageToIncidentSpot === null ? (orderJob.jobResultEntity.milageToIncidentSpot ? orderJob.jobResultEntity.milageToIncidentSpot  : 0 ) : ( orderJob.jobResultEntity.confirmedMilageToIncidentSpot ? orderJob.jobResultEntity.confirmedMilageToIncidentSpot : 0 )'
                                    :indexTwo='orderJobIndex'
                                    unit='公里'
                                    inputType='number' />
                            </div>
                            <div class="col-sm-6">
                                <inputEdit
                                    :disabled='informtion.confirmed'
                                    label='返回里程'
                                    inputMaxWidth="70px"
                                    name='confirmedmilageBack'
                                    @updata = 'integrationDate'
                                    :value='orderJob.jobResultEntity.confirmedMilageBack === null  ? (orderJob.jobResultEntity.milageBack ?  orderJob.jobResultEntity.milageBack : 0  ): ( orderJob.jobResultEntity.confirmedMilageBack ? orderJob.jobResultEntity.confirmedMilageBack : 0 )'
                                    :indexTwo='orderJobIndex'
                                    unit='公里'
                                    inputClass='maxLength'
                                    inputType='number' />

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <inputEdit
                                    :disabled='informtion.confirmed'
                                    label='拖车里程'
                                    inputMaxWidth="70px"
                                    name='confirmedmilageTowing'
                                    @updata = 'integrationDate'
                                    :value='orderJob.jobResultEntity.confirmedMilageTowing === null ? (orderJob.jobResultEntity.milageTowing ? orderJob.jobResultEntity.milageTowing : 0) : ( orderJob.jobResultEntity.confirmedMilageTowing ? orderJob.jobResultEntity.confirmedMilageTowing : 0 )  '
                                    :indexTwo='orderJobIndex'
                                    unit='公里'
                                    inputClass='maxLength'
                                    inputType='number' />
                            </div>
                            <template v-if='!informtion.upstreamConfirmed'>
                                <!-- 下游 -->
                                <div class="col-sm-6">
                                    <inputEdit
                                        :disabled='informtion.confirmed'
                                        label='救援收费'
                                        name='charge'
                                        inputMaxWidth="70px"
                                        @updata = 'integrationDate'
                                        :value='calcNum[orderJobIndex] '
                                        :indexTwo='orderJobIndex'
                                        :inputMaxNumber='1000000'
                                        inputCheckTip='最大金额不能大于等于一百万'
                                        inputClass='maxNumber'
                                        inputType='number' />

                                </div>
                            </template>
                            <template v-else>
                                <!-- 上游 -->
                                <div class="col-sm-6">
                                    <inputEdit
                                        :disabled='informtion.confirmed'
                                        label='救援收费'
                                        name='upstreamConfirmedCharge'
                                        inputMaxWidth="70px"
                                        @updata = 'integrationDate'
                                        :value='calcNum[orderJobIndex] '
                                        :indexTwo='orderJobIndex'
                                        :inputMaxNumber='1000000'
                                        inputCheckTip='最大金额不能大于等于一百万'
                                        inputClass='maxNumber'
                                        inputType='number' />

                                </div>
                            </template>
                        </div>

                        <div class="row">
                            
                            <div class="col-sm-12">
                                <inputEdit
                                    :disabled='informtion.confirmed'
                                    label='报价公式'
                                    name='quotationId'
                                    @updata = 'integrationDate'
                                    type='btn'
                                    :searchCode='informtion && informtion.quotationId ? informtion.quotationId : ""'
                                    url='control:/quota/quota/list/querypartnerquotation'
                                    method='post'
                                    :params="{ sysPartnerId: informtion.customerId }"
                                    :indexTwo='orderJobIndex'
                                    fieldName='sysQuotationId'
                                    objCode='sysQuotationId'
                                    objName='name' />
                                </btn-select>

                                <button class='calc' :disabled='disabled' @click='calc(orderJobIndex)'>计算</button>

                            </div>
                        </div>
                        
                        <div class='row' v-if='!informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME"'>
                            <!-- 下游或派给自己才能改，上游隐藏  -->
                            <div class="col-sm-6">
                                <inputEdit
                                    :disabled='informtion.confirmed'
                                    label='业绩金额'
                                    name='performanceAmount'
                                    @updata = 'integrationDate'
                                    :value='orderJob.jobResultEntity.performanceAmount ? orderJob.jobResultEntity.performanceAmount : 0'
                                        inputMaxWidth="70px"
                                    :indexTwo='orderJobIndex'
                                    :inputMaxNumber='1000000'
                                    inputCheckTip='最大金额不能大于等于一百万'
                                    inputClass='maxNumber'
                                    inputType='number' />
                            </div>
                            <div class="col-sm-6">
                                <inputEdit
                                    :disabled='informtion.confirmed'
                                    label='现场收现金额'
                                    name='cashReceived'
                                    @updata = 'integrationDate'
                                    :value='orderJob.jobResultEntity.cashReceived  ? orderJob.jobResultEntity.cashReceived : 0 '
                                    inputMaxWidth="70px"
                                    :indexTwo='orderJobIndex'
                                    :inputMaxNumber='1000000'
                                    inputCheckTip='最大金额不能大于等于一百万'
                                    inputClass='maxNumber'
                                    inputType='number' />
                            </div>
                        </div>
                            
                        <!-- 去程 -->
                        <template  v-if='orderJob.jobResultEntity && orderJob.jobResultEntity.feedBacks_ab && orderJob.jobResultEntity.feedBacks_ab.length > 0 '>   
                            <article>去程</article>
                            <template  v-for='(item, index) in orderJob.jobResultEntity.feedBacks_ab'>
                                    <div class="row" :key='item.sysFeeTypeConfigId'>
                                        <div class="col-sm-6" >
                                            <inputEdit
                                                :disabled='informtion.confirmed'
                                                v-if='item.isSign'
                                                :label='item.feeChinese + "(签单)"'
                                                name='confirmedAmountSign_ab'
                                                @updata = 'integrationDate'
                                                :value='(item.confirmedAmountSign === null ? (item.amountSign > 0 ? item.amountSign : 0) :  (item.confirmedAmountSign > 0 ? item.confirmedAmountSign : 0))'
                                                    inputMaxWidth="70px"
                                                :indexTwo='orderJobIndex'
                                                :index='index'
                                                :unit='item.payTarget == "CUSTOMER" ? "（客户）" : "（公司）"'
                                                :inputMaxNumber='10000'
                                                inputCheckTip='最大金额不能大于等于10000'
                                                inputType='number' />
                                        </div>
                                        <div class="col-sm-6">
                                            <inputEdit
                                                :disabled='informtion.confirmed'
                                                v-if='item.isCash'
                                                :label='item.feeChinese + "(现金)"'
                                                name='confirmedAmountCash_ab'
                                                :inputMaxNumber='10000'
                                                :unit='item.payTarget == "CUSTOMER" ? "（客户）" : "（公司）"'
                                                inputCheckTip='最大金额不能大于等于10000'
                                                @updata = 'integrationDate'
                                                :value='(item.confirmedAmountCash === null ? (item.amountCash > 0 ? item.amountCash : 0) :  (item.confirmedAmountCash > 0 ? item.confirmedAmountCash : 0))'
                                                :indexTwo='orderJobIndex'
                                                inputMaxWidth="70px"
                                                :index='index'
                                                inputType='number' />
                                        </div>
                                    </div>
                            </template>
                        </template>
                        <!--  返程 -->
                        <template  v-if='orderJob.jobResultEntity && orderJob.jobResultEntity.feedBacks_cd && orderJob.jobResultEntity.feedBacks_cd.length > 0 '>   
                            <article>返程</article>
                            <template  v-for='(item, index) in orderJob.jobResultEntity.feedBacks_cd'>
                                    <div class="row" :key='item.sysFeeTypeConfigId'>
                                        <div class="col-sm-6" >
                                            <inputEdit
                                                :disabled='informtion.confirmed'
                                                v-if='item.isSign'
                                                :label='item.feeChinese + "(签单)"'
                                                name='confirmedAmountSign_cd'
                                                @updata = 'integrationDate'
                                                :unit='item.payTarget == "CUSTOMER" ? "（客户）" : "（公司）"'
                                                :value='(item.confirmedAmountSign === null ? (item.amountSign > 0 ? item.amountSign : 0) :  (item.confirmedAmountSign > 0 ? item.confirmedAmountSign : 0))'
                                                inputMaxWidth="70px"
                                                :indexTwo='orderJobIndex'
                                                :index='index'
                                                :inputMaxNumber='10000'
                                                inputCheckTip='最大金额不能大于等于10000'
                                                inputType='number' />
                                        </div>
                                        <div class="col-sm-6">
                                            <inputEdit
                                                :disabled='informtion.confirmed'
                                                v-if='item.isCash'  
                                                :unit='item.payTarget == "CUSTOMER" ? "（客户）" : "（公司）"'
                                                :label='item.feeChinese + "(现金)"'
                                                name='confirmedAmountCash_cd'
                                                :inputMaxNumber='10000'
                                                inputCheckTip='最大金额不能大于等于10000'
                                                @updata = 'integrationDate'
                                                :value='(item.confirmedAmountCash === null ? (item.amountCash > 0 ? item.amountCash : 0) :  (item.confirmedAmountCash > 0 ? item.confirmedAmountCash : 0))'
                                                :indexTwo='orderJobIndex'
                                                inputMaxWidth="70px"
                                                :index='index'
                                                inputType='number' />
                                        </div>
                                    </div>
                            </template>
                        </template>
                            
                        <!-- 总费用 -->
                        <hr>
                        <template  v-if='orderJob.jobResultEntity' >    
                            <div class="row">
                                <div class="col-sm-6" >
                                    <inputEdit
                                        label='总救援费用(签单)'
                                        name='charge' 
                                        @updata = 'integrationDate'
                                        :value='rescueSignAll[orderJobIndex]'
                                        :indexTwo='orderJobIndex'
                                        :index='index'
                                        inputMaxWidth="70px"
                                        :disabled='true'
                                        inputType='number' />
                                </div>
                                <div class="col-sm-6">
                                    <inputEdit
                                        label='总成本费用(签单)'
                                        name='charge'
                                        @updata = 'integrationDate'
                                        :value='signAll[orderJobIndex]'
                                        :indexTwo='orderJobIndex'
                                        inputMaxWidth="70px"
                                        :index='index'
                                        :disabled='true'
                                        inputType='number' />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6" >
                                    <inputEdit
                                        label='总救援费用(现金)'
                                        name='charge' 
                                        @updata = 'integrationDate'
                                        :value='rescueCashAll[orderJobIndex]'
                                        :indexTwo='orderJobIndex'
                                        :index='index'
                                        inputMaxWidth="70px"
                                        :disabled='true'
                                        inputType='number' />
                                </div>
                                <div class="col-sm-6">
                                    <inputEdit
                                        label='总成本费用(现金)'
                                        name='charge'
                                        @updata = 'integrationDate'
                                        :value='cashAll[orderJobIndex]'
                                        :indexTwo='orderJobIndex'
                                        inputMaxWidth="70px"
                                        :index='index'
                                        :disabled='true'
                                        inputType='number' />
                                </div>
                            </div>
                        </template>
                        
                        <template v-if='orderJob.jobResultEntity'>
                            <hr>
                            <div class="row">
                                <div class="col-sm-12"  >
                                    <inputEdit
                                        type='textarea'
                                        label='备注信息'
                                        name='comment'
                                        :indexTwo='orderJobIndex'
                                        inputMinWidth='400px'
                                        @updata = 'integrationDate'
                                        :value='orderJob.jobResultEntity.comment ? orderJob.jobResultEntity.comment : "" '
                                        />
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>

            <div class="row" v-if="! (( informtion.upstreamConfirmed == false && informtion.confirmedResult == 'ACCEPTED') || (informtion.upstreamConfirmed == true && informtion.upstreamConfirmedResult == 'ACCEPTED' ))" >
                <div class="col-sm-12 btns" style='text-align:center'>
                    <button class='btn' type="button" @click='check' :disabled="disabled">核算</button>
                </div>
            </div>
        </template>
        <template v-else>
            <div style="text-align: center">
                暂无任务信息
            </div>
        </template>
    </div>
</template>

<script>

    import breadcrumb from '../../../../../../common_component/breadcrumb.vue'
    import inputEdit from '../../../../../../common_component/inputEdit.vue'

    export default {
        props: {
            informtion: {

            },
            disabled:{},
            accounting: {},
        },
        data(){
            return {
                res: [],
                ourOrgId: global.ourOrgId,
                calcNum: [],

                // 总救援费用（现金） 
                rescueCashAll: [],
                // 总救援费用（签单）
                rescueSignAll: [],

                // 总成本费用（现金） 
                cashAll: [],
                // 总成本费用（签单） 
                signAll: [],

                picContent: '',
                jobId: '',
                jobTrack: '',

                quotationId: ''
            }
        },

        watch: {
            informtion(newObj){
                const _this = this;
                _this.res = [];
                _this.calcNum = [];
                _this.cashAll = [];
                _this.signAll = [];
                _this.rescueCashAll = [];
                _this.rescueSignAll = [];
                
                if(newObj.orderJobList.length > 0){
                    newObj.orderJobList.map( (obj, index) => {
                        let cashAll = 0, signAll = 0, rescueCashAll = 0 , rescueSignAll = 0;
                        console.log(obj)

                        // 总救援费用、总成本费用。 feedBack
                        if(obj.jobResultEntity && obj.jobResultEntity.feedBack && obj.jobResultEntity.feedBack.length > 0){
                            obj.jobResultEntity.feedBack.forEach( (item, index) => {
                                // 成本
                                if(item.payTarget == 'COMPANY'){
                                    signAll += (item.confirmedAmountSign === null ? (item.amountSign > 0 ? item.amountSign : 0) :  (item.confirmedAmountSign > 0 ? item.confirmedAmountSign : 0));
                                    cashAll += (item.confirmedAmountCash === null ? (item.amountCash > 0 ? item.amountCash : 0) :  (item.confirmedAmountCash > 0 ? item.confirmedAmountCash : 0));
                                }else if(item.payTarget == 'CUSTOMER' ){
                                    // 救援费用（客户付款）
                                    rescueSignAll += (item.confirmedAmountSign === null ? (item.amountSign > 0 ? item.amountSign : 0) :  (item.confirmedAmountSign > 0 ? item.confirmedAmountSign : 0));
                                    rescueCashAll += (item.confirmedAmountCash === null ? (item.amountCash > 0 ? item.amountCash : 0) :  (item.confirmedAmountCash > 0 ? item.confirmedAmountCash : 0));
                                }
                            })
                        }

                        // 救援费用
                        const  price =_this.informtion.upstreamConfirmed ? (obj.jobResultEntity && obj.jobResultEntity.upstreamConfirmedCharge > 0 ? obj.jobResultEntity.upstreamConfirmedCharge : 0 ) :  (obj.jobResultEntity && obj.jobResultEntity.charge > 0 ? obj.jobResultEntity.charge : 0 );

                        _this.calcNum.push( price ? price : _this.informtion.price );

                        /**
                         * 如果订单签单：
                         * 总救援费用(签单) = 救援费用+其他签单费用总和
                         * 总救援费用(现金) = 其他现金费用总和
                         *
                         * 如果订单现金：
                         * 总救援费用(现金) =救援费用+其他现金费用总和
                         * 总救援费用(签单) =其他签单费用总和
                         */
                        
                        // 加上救援费用的总救援费用
                        if(newObj.settleMethod == 'CASH' || newObj.settleMethod == 'HELPBUY'){
                            rescueCashAll +=  _this.calcNum[index];
                        }else if(newObj.settleMethod == 'SIGN'){
                            rescueSignAll +=  _this.calcNum[index];
                        }

                        _this.signAll.push(signAll.toFixed(2));
                        _this.cashAll.push(cashAll.toFixed(2));
                        _this.rescueSignAll.push(rescueSignAll.toFixed(2));
                        _this.rescueCashAll.push(rescueCashAll.toFixed(2));

                        _this.res.push({
                            quotationId: '',
                            milageGoto: obj.jobResultEntity ? obj.jobResultEntity.confirmedMilageToIncidentSpot : 0,
                            milageTowing: obj.jobResultEntity ? obj.jobResultEntity.confirmedMilageTowing : 0,
                            milageBack: obj.jobResultEntity ? obj.jobResultEntity.confirmedMilageBack : 0,
                        });
                    });
                }
            }
        },
        components: {
            breadcrumb,
            inputEdit 
        },
        methods:{
            integrationDate(name,item, index, orderJobIndex){
                this.res[orderJobIndex][name] = item;

                if(name == 'quotationId'){
                    this.quotationId = item;
                    return;
                }
                this.$emit('updata', name, item, index, orderJobIndex, this.signAll, this.cashAll );
            },
            showDetails(){
                $(event.currentTarget).find('span').toggleClass('down');
                $(event.currentTarget).siblings('.details').eq(0).slideToggle('fast');
            },
            calc(orderJobIndex){
                const _this = this;
                let quotationId = _this.quotationId ? _this.quotationId : (_this.res[orderJobIndex].quotationId ? _this.res[orderJobIndex].quotationId : _this.informtion.quotationId);
                if(!quotationId )return alert('没有报价公式，无法计算');
                
                const orderJob = _this.informtion.orderJobList[orderJobIndex],
                    jobResultEntity = orderJob.jobResultEntity;

                console.warn(jobResultEntity)

                const params = {
                    "sysPartnerId": _this.informtion.customerId,
                    "sysQuotationId": quotationId,
                    "businessType": _this.informtion.jobTypeCode,
                    "carType": orderJob && orderJob.towJobConfirmedVehicles && orderJob.towJobConfirmedVehicles[0] ? orderJob.towJobConfirmedVehicles[0].vehicleName : '',
                    "rescueResult": orderJob.jobStatusOverall,
                    "rescueArea": _this.informtion.incidentAddrAddress,
                    "destinationArea": _this.informtion.destinationAddrAddress,
                    "milageGoto": jobResultEntity.confirmedMilageToIncidentSpot === null ?  (jobResultEntity.milageToIncidentSpot ? jobResultEntity.milageToIncidentSpot : 0 ) : ( jobResultEntity.confirmedMilageToIncidentSpot ?  jobResultEntity.confirmedMilageToIncidentSpot : 0),
                    "milageTowing": jobResultEntity.confirmedMilageTowing === null ? (jobResultEntity.milageTowing ? jobResultEntity.milageTowing : 0) : (jobResultEntity.confirmedMilageTowing ? jobResultEntity.confirmedMilageTowing : 0 ),
                    "milageBack": jobResultEntity.confirmedMilageBack === null ? ( jobResultEntity.milageBack ?  jobResultEntity.milageBack : 0 ) : ( jobResultEntity.confirmedMilageBack ? jobResultEntity.confirmedMilageBack : 0 )
                }
                console.log(params);

                send({
                    url: 'control:/quota/quota/getquotabymessage',
                    type: 'post',
                    param: params
                }, function(err, res){
                    console.log(err, res);
                    if(res.status == 200){
                        _this.calcNum.splice(orderJobIndex, 1, res.content[0].quota);
                        _this.$emit('updata', _this.informtion.upstreamConfirmed ?  'upstreamConfirmedCharge' : 'charge', res.content[0].quota, 0, orderJobIndex);
                    }else{
                        alert(res.msg);
                    }   
                })
            },
            check(){
                this.$emit('check', this.signAll, this.cashAll, this.rescueSignAll, this.rescueCashAll);
            },

            showPictures(driverActions,jobCode){
                const that = this;
                
                let arr = []
                console.log(driverActions)
                if(driverActions && driverActions.length > 0){
                    arr = driverActions.map( (obj, index) => {
                        return obj.towDriverActionId;
                    })
                }

                this.$router.push({ name: 'photo_details', params: { param: arr.length ? arr.join('_') : '0' ,jobCode:jobCode, orderCode: that.informtion.orderCode }})
            },
            showRecording(id, jobCode){
                const that = this;
                that.jobId = id;

                this.$router.push({ name: 'job_recording', params: { jobId: id, jobCode:jobCode, orderCode: that.informtion.orderCode  }});
            },
            showTrack(id, jobCode){
                const that = this;
                that.jobId = id;
                this.$router.push({ name: 'job_track', params: { jobId: id, jobCode:jobCode, orderCode: that.informtion.orderCode }});
            }
        }
    }
</script>

<style>
    #businessAccounting .rescue_information article:after{
        left: 40px;
    }
    #businessAccounting .content{
        min-width: 70px;
    }
    .rescue_information .btn{
        background: #1785F7;
        color: #fff;
    }
    .rescue_information .orderJob{
        background: #fff;
        margin-bottom: 30px;
    }
    .rescue_information .calc{
        background: #FFFFFF;
        padding:2px 4px;
        font-size:12px;
        margin:0 5px;
        border: 1px solid #39B6E5;
        color:#39B6E5;
        border-radius: 0;
    }
    .rescue_information .calc[disabled='disabled']{
        background:#f6f6f6;
        color:#999;
        border-color:#999;
    }
    .rescue_information .calc:active{
        background:#39B6E5;
        color:#fff;
    }

    .rescue_information  table{
        width:100%;
        border-collapse:separate;
        border-spacing:0px 4px;
    }
    .rescue_information  table th{
        border-top:1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding:5px 10px;
        height:24px;
        font-size:12px;
    }
    .rescue_information  table th:first-child{
        border-left:1px solid #ccc;
    }
    .rescue_information  table th:last-child{
        border-right:1px solid #ccc;
    }
    .rescue_information  table thead tr{
        height:24px;
    }
    .rescue_information  table th,
    .rescue_information  table td{
        text-align: center;
    }
    .rescue_information  table tbody tr{
        background: #F6F6F6;
        font-size:12px;
    }
    .rescue_information  table tbody tr td{
        border-top:1px solid #ccc;
        border-bottom: 1px solid #ccc;
        height:24px;
    }
    .rescue_information  table tbody tr td:first-child{
        padding-left:7px;
        border-left:1px solid #ccc;
    }
    .rescue_information  table tbody tr td:last-child{
        border-right:1px solid #ccc;
    }
    .rescue_information  table tbody tr td input[type='text']:disabled{
        display:inline-block;
        padding:0px 15px 0px 0px;
        height:24px;
        background-color:transparent;
        width:90px;
    }
    .rescue_information  table tbody tr td input[type='text']{
        background-color: #DFF5FD;
    }
    .rescue_information  table tbody input[type='text']{
        text-align: center !important;
    }


    #jobTrack .fix{
        bottom: 40px;
        right: 10px;
                        z-index: 9999999999999999 !important;
    }
    .rescue_information .jobRecord{
        overflow: hidden;
    }
    .rescue_information .jobRecord:after{

        left: 100px !important;
        width: 100% !important;
    }
</style>