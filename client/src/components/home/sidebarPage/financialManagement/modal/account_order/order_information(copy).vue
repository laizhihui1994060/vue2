<template>
	<div class='order_information'>
        <div class='block'>
            <div class='row'>
                <div class='col-sm-4'>
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单编号'
                        :value='informtion.orderCode'
                        inputWidth='3.44rem'
                        @updata = 'integrationDate'
                        :disabled='true' >
                    </form-label-input>
                </div>
                <div class='col-sm-4'>
                    <btn-select 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业务类型' 
                        label-right='12px'
                        url='client:/helper/job'
                        filter="name"
                        filterName='code'
                        width='2.95rem' 
                        btnWidth='0.5rem'
                        :uuid='true'
                        field='code'
                        :value='informtion.jobTypeCode'
                        @updata = 'integrationDate' 
                        :disabled='true'
                        padding='0' >
                    </btn-select>
                </div>
                <div class="col-sm-4">
                    <datetimepicker
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建时间'
                        background="#DCF4FC"
                        width='3.44rem'
                        padding='4px'
                        minView='minute'
                        :value='informtion.orderScheduleTime'
                        @updata = 'integrationDate'
                        :disabled='true'
                    ></datetimepicker>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-4">
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单来源'
                        :value='informtion.sourceType'
                        inputWidth='3.44rem'
                        @updata = 'integrationDate'
                        :disabled='true'>
                    </form-label-input>
                </div>
                <!-- 还没好 -->
                <div class="col-sm-4">
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户名称'
                        :value='informtion.customerInfo ? informtion.customerInfo.name : ""'
                        inputWidth='3.44rem'
                        @updata = 'integrationDate'
                        :disabled='true'
                        name='orderScheduleTime' >
                    </form-label-input>
<!--                     <btn-select 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户名称' 
                        label-right='12px'
                        width='2.95rem' 
                        url='client:/helper/partner'
                        method='post'
                        filter="name"
                        :uuid='true'
                        field='partnerId'
                        :value='information && information.customerInfo ? informtion.customerInfo.name : "" '
                        @updata = 'integrationDate'
                        name="quotationId" 
                        :disabled='true'
                        padding='0' >
                    </btn-select> -->
                </div>
            </div>
            <div class='row'>
                <div class='col-sm-4'>
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;案&nbsp;&nbsp;件&nbsp; 号' 
                        @updata = 'integrationDate'
                        :value='informtion.customerCaseNo'
                        inputWidth='3.44rem'
                        :disabled='true'
                        name='customerCaseNo'>
                    </form-label-input>
                </div>
                <div class='col-sm-4'>
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;委&nbsp;&nbsp;派&nbsp; 人' 
                        @updata = 'integrationDate'
                        :value='informtion.callPersonName'
                        inputWidth='3.44rem'
                        :disabled='true'
                        name='callPersonName'>
                    </form-label-input>
                </div>
                <div class='col-sm-4'>
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;委派电话' 
                        @updata = 'integrationDate'
                        :value='informtion.callPersonContact'
                        inputWidth='3.44rem'
                        :disabled='true'
                        name='callPersonContact'>
                    </form-label-input>
                </div>
                
            </div>
            <div class='row'>
                <div class='col-sm-4'>
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车主姓名' 
                        @updata = 'integrationDate'
                        :value='informtion.orderJobList.length > 0 && informtion.orderJobList[0].towJobConfirmedVehicles.length > 0 ? informtion.orderJobList[0].towJobConfirmedVehicles[0].carOwnerName : "" '
                        inputWidth='3.44rem'
                        :disabled='true'
                        name='carOwnerName'>
                    </form-label-input>
                </div>
                <div class='col-sm-4'>
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车主电话' 
                        @updata = 'integrationDate'
                        :value='informtion.orderJobList.length > 0 && informtion.orderJobList[0].towJobConfirmedVehicles.length > 0 ? informtion.orderJobList[0].towJobConfirmedVehicles[0].carOwnerPhone : "" '
                        inputWidth='3.44rem'
                        :disabled='true'
                        name='carOwnerPhone'>
                    </form-label-input>
                </div>
                <div class="col-sm-4">
                    <btn-select 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;救援结果'
                        label-right='12px'
                        :arr="[{name:'未开始',code:'NOT_START'},{name:'接受',code:'WORKING'},{name:'救援成功',code:'SUCCESS'},{name:'救援失败',code:'FAILED'},{name:'取消未派',code:'CANCEL_CHARGABLE'},{name:'取消无费',code:'CANCEL_NOFEE'}]" 
                        filter="name"
                        width='2.95rem'
                        btnWidth='0.5rem'
                        :uuid='true'
                        field='code'
                        :value='informtion.orderJobList.length > 0 ? informtion.orderJobList[0].jobStatusOverall : "" '
                        title='救援结果'
                        name='救援结果'
                        :disabled='true'
                        padding='0'/>
                </div>
            </div> 

            <div class="row"></div>

            <div class='row'>
                <div class='col-sm-4'>
                    <btn-select 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;被救车型' 
                        label-right='12px'
                        width='2.95rem' 
                        btnWidth='0.5rem'
                        url='client:/helper/vehiclecat'
                        filter="name"
                        :uuid='true'
                        field='code'
                        :value='informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].vehicleCategory : "" '
                        @updata = 'integrationDate'
                        :disabled='true'
                        padding='0' >
                    </btn-select>
                </div>
                <div class='col-sm-4'>
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆品牌' 
                        @updata = 'integrationDate'
                        :value='informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].vehicleBrand : "" '
                        inputWidth='3.44rem'
                        :disabled='true'>
                    </form-label-input>
                </div>
                <div class='col-sm-4'>
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆型号' 
                        @updata = 'integrationDate'
                        :value='informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].vehicleName : "" '
                        inputWidth='3.44rem'
                        :disabled='true'
                        name='vehicleName'>
                    </form-label-input>
                </div>
            </div>
            <div class='row'>
                <div class="col-sm-4">
                	<form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆颜色' 
                        @updata = 'integrationDate'
                        :value='informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].vehicleColor : "" '
                        inputWidth='3.44rem'
                        :disabled='true'
                        name='vehicleColor'>
                    </form-label-input>
                </div>
                <div class="col-sm-4">
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车&nbsp;&nbsp;牌&nbsp;号' 
                        @updata = 'integrationDate'
                        :value='informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].vehiclePlateNo : ""'
                        inputWidth='3.44rem'
                        :disabled='true'
                        name='qty'>
                    </form-label-input>
                </div>
                
            </div>

            <div class="row"></div>

            <div class="row">
            	<div class='col-sm-12'>
            	    <form-label-input 
            	        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;救援地址' 
            	        @updata = 'integrationDate'
            	        :value='informtion.incidentAddrAddress'
            	        inputWidth='18rem'
            	        :disabled='true'
            	        name='incidentAddrAddress'>
            	    </form-label-input>
            	</div> 
            	
            </div>
            <div class="row">
                <div class='col-sm-12'>
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目的地址' 
                        @updata = 'integrationDate'
                        :value='informtion.destinationAddrAddress'
                        inputWidth='18rem'
                        :disabled='true'
                        name='destinationAddrAddress'>
                    </form-label-input>
                </div>
            </div>
            <div class="row"></div>
			<div class='row'>
                <div class='col-sm-4' v-if="accounting && informtion.bidOrgId && informtion.upstreamConfirmed">
                    <form-label-input 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分享佣金' 
                        @updata = 'integrationDate'
                        :value='informtion.commission'
                        inputWidth='3.44rem'
                        unit='元'
                        :disabled='disabled'
                        name='commission'>
                    </form-label-input>
                </div>
			    <div class="col-sm-4">
			    	<btn-select 
			    	    label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结算方式' 
			    	    label-right='12px'
			    	    url='control:/sys/param/org'
                        method='post' 
                        :params="['/order/settle_method']"
			    	    filter="desc"
			    	    filterName='code'
			    	    width='2.95rem' 
                        btnWidth='0.5rem'
			    	    :uuid='true'
			    	    field='code'
			    	    :value='informtion.settleMethod'
			    	    @updata = 'integrationDate'
			    	    name="settleMethod" 
                        :disabled='true'
			    	    padding='0'>
			    	</btn-select>
			    </div> 
                <div class='col-sm-4'>
                    <btn-select 
                        label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报价公式' 
                        label-right='12px'
                        width='2.95rem' 
                        btnWidth='0.5rem'
                        url='control:/quota/quota/list/query'
                        :params="{ pageIndex: 1, pageSize: 10000 }"
                        method='post'
                        filter="name"
                        :uuid='true'
                        field='sysQuotationId'
                        :value='information && information.quotationId ? information.quotationId : "" '
                        @updata = 'integrationDate'
                        name="quotationId"
                        :disabled='true'
                        padding='0' >
                    </btn-select>
                </div>
			</div>
            
            <template v-if='informtion.upstreamConfirmed'>
                <div class="row">
                    <div class="col-sm-12">
                        <article style="font-size:14px;margin-bottom:5px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;派单信息</article>
                    </div>
                </div>

                <div class="row">
                    <div class='col-sm-4'>
                        <btn-select 
                            label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;派单方式' 
                            label-right='12px'
                            width='2.95rem' 
                            btnWidth='0.5rem'
                            :arr="[ { name: '派遣自己的车辆', code: 'DISPATCH_ME' }, { name: '派遣伙伴的车辆', code: 'DISPATCH_PARTNER' }, { name: '一口价分享', code: 'SHARE_FIXED_PRICE' }, { name: '最高限价分享', code: 'SHARE_MAX_PRICE' }, { name: '匹配行程', code: 'MATCH_ROUTE' } ]"
                            filter="name"
                            :uuid='true'
                            field='code'
                            :value='informtion.lastDispatchType'
                            @updata = 'integrationDate'
                            name="quotationId"
                            :disabled='true'
                            padding='0' >
                        </btn-select>
                    </div>

                    <div class="col-sm-4">
                        <form-label-input 
                            label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接单公司' 
                            @updata = 'integrationDate'
                            :value='informtion && informtion.bidOrgInfo ? informtion.bidOrgInfo.name : "" '
                            inputWidth='3.44rem'
                            :disabled='true'>
                        </form-label-input>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <form-label-input 
                            label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接&nbsp;&nbsp;单&nbsp;人' 
                            @updata = 'integrationDate'
                            :value='informtion.orderShareInfo ? informtion.orderShareInfo.invitedInfo.empName : "" '
                            inputWidth='3.44rem'
                            :disabled='true'>
                        </form-label-input>
                    </div>
                    <div class="col-sm-4">
                        <form-label-input 
                            label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接单电话' 
                            @updata = 'integrationDate'
                            :value='informtion.orderShareInfo ? informtion.orderShareInfo.invitedInfo.workMobile : "" '
                            inputWidth='3.44rem'
                            :disabled='true'>
                        </form-label-input>
                    </div>
                    <div class="col-sm-4">
                        <form-label-input 
                            label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接单时间' 
                            @updata = 'integrationDate'
                            :value='informtion.orderShareInfo ? informtion.orderShareInfo.bidAcceptTime : "" '
                            inputWidth='3.44rem'
                            :disabled='true'>
                        </form-label-input>
                    </div>
<!--                     <div class="col-sm-4">
                        <form-label-input 
                            label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结算公式' 
                            @updata = 'integrationDate'
                            :value='informtion.orderShareInfo'
                            inputWidth='3.44rem'
                            :disabled='true'>
                        </form-label-input>
                    </div> -->
                </div>
            </template>
        </div>
</div>
</template>

<script>
	import btnSelect from '../../../../../../common_component/btn_select.vue'
	import formLabelInput from '../../../../../../common_component/form-label-input.vue'
	import datetimepicker from '../../../../../../common_component/datetimepicker.vue'
	import breadcrumb from '../../../../../../common_component/breadcrumb.vue'

	export default {
        props:{
            informtion: {},
            accounting:{},
            disabled:{
            }
        },
		data(){
			return {
                res: {

                }
			}
		},
		components: {
			btnSelect,
			formLabelInput,
			datetimepicker,
			breadcrumb
		},
		methods:{
		    integrationDate(name,item){
                if(name == 'commission')this.$emit('updata', name, item);
		    }
		}
	}
</script>

<style scoped>
    .order_information{
        background: #fff;
    }
    .details{
        padding:20px;
    }
    .order_information label{
        min-width: 105px;
    }
</style>