<template>
	<div class='order_information'>
        <div class='block'>
            <div class="row">
                <div class="col-sm-12">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='客户名称'
                        name='customerId'
                        @updata = 'integrationDate'
                        type='btn'
                        :value='informtion.customerInfo ? informtion.customerInfo.name : ""'
                        url='client:/helper/partner'
                        method='post'
                        :params="{isCustomer : true}"
                        fieldName='partnerId'
                        objCode='partnerId'
                        objName='name'
                        /> 
                </div>
            </div>
 
  
            <div class="row">
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='订单来源'
                        name='sourceType'
                        @updata = 'integrationDate'
                        url='control:/sys/param/org'
                        method='post'
                        :params="['/order/book/source_types']"
                        type='btn'
                        :value='informtion.sourceType'
                        />
                </div>
                <div class="col-sm-6">
                      <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                          label='案&nbsp;&nbsp;件&nbsp; 号'
                          name='customerCaseNo'
                          inputMaxWidth='70px'
                          @updata = 'integrationDate'
                          :value='informtion.customerCaseNo'
                          />
                </div>
            </div>
          
            <div class="row">
              
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='业务类型'
                        name='jobType'
                        @updata = 'integrationDate'
                        :searchCode='informtion.jobTypeCode'
                        url='client:/helper/job'
                        type='btn'
                        fieldName='code'
                        objCode='code'
                        objName='name'
                        />
                </div>
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='预订救援时间'
                        dateWidth='125px'
                        name='orderScheduleTime'
                        @updata = 'integrationDate'
                        :value='informtion.orderScheduleTime'
                        type='date'
                        minView='minute'
                        
                        />
                </div>
            </div>
            

            <div class="row">
                  <div class='col-sm-12'>
                          <inputEdit
                            :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                              label='救援地址'
                              name='incidentAddrAddress'
                              type='map'
                              mapId='rescue'
                              diffMapId='rescue'
                              mapText='设为救援地址,设为目的地址'
                              @updata = 'integrationDate'
                              :value='informtion.incidentAddrAddress'
                              />
                  </div>
            </div>
            
            <div class="row">
                <div class='col-sm-12'>
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='目的地址'
                        type='map'
                        mapId='rescue'
                        diffMapId='destination'
                        name='destinationAddrAddress'
                        mapText='设为救援地址,设为目的地址'
                        @updata = 'integrationDate'
                        :value='informtion.destinationAddrAddress'
                        />
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6">
                        <inputEdit
                            :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                            label='委&nbsp;&nbsp;派&nbsp; 人'
                            name='callPersonName'
                            inputMaxWidth='70px'
                            @updata = 'integrationDate'
                            :value='informtion.callPersonName'
                            />
                </div>
                <!-- 还没好 -->
                <div class="col-sm-6">
                        <inputEdit
                            :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                            label='委派电话'
                            inputMaxWidth='70px'
                            inputType='number'
                            name='callPersonContact'
                            @updata = 'integrationDate'
                            :value='informtion.callPersonContact'
                            />
                </div>
            </div>

            <div class='row'>
                <div class='col-sm-6'>
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='车主姓名'
                        inputMaxWidth='70px'
                        name='carOwnerName'
                        @updata = 'integrationDate'
                        :value=' informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].carOwnerName : "" '
                        />
                </div>
                <div class='col-sm-6'>
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='车主电话'
                        inputMaxWidth='110px'
                        inputType='number'
                        name='carOwnerPhone'
                        inputCheck='^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|3|5|6|7|8]|18[0|1|2|3|5|6|7|8|9])\d{8}$'
                        inputCheckTip='请输入正确的电话号码'
                        @updata = 'integrationDate'
                        :value=' informtion.vehicleOwnerList.length > 0  ? informtion.vehicleOwnerList[0].carOwnerPhone : "" '
                        />
                </div>
                
            </div> 
            
            <div class="row">
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='被救车型'
                        name='vehicleCategory'
                        @updata = 'integrationDate'
                        :searchCode='informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].vehicleCategory : "" '
                        url='client:/helper/vehiclecat'
                        type='btn'
                        fieldName='code'
                        objCode='code'
                        objName='name'
                        />
                </div>
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='车辆型号'
                        name='vehicleName'
                        :value='informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].vehicleName : "" '
                        url='client:/helper/vehiclemodel?categoryCode=&vendorCode=&brandCode='
                        type='btn'
                        fieldName='name'
                        objCode='code'
                        objName='name'
                        @updata = 'integrationDate'
                        />
                </div>
            </div>
            
            <div class="row">
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='车牌号码'
                        name='vehiclePlateNo'
                        inputMaxWidth='70px'  
                        @updata = 'integrationDate'
                        :value='informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].vehiclePlateNo : ""'
                        />
                </div>
               <div class="col-sm-6">
                   <inputEdit 
                    :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                       label='车辆颜色'
                       inputMaxWidth='70px'
                       name='vehicleColor'
                       @updata = 'integrationDate'
                       :value='informtion.vehicleOwnerList.length > 0 ? informtion.vehicleOwnerList[0].vehicleColor : "" '
                       />
               </div>
             </div>
            
            <div class='row'>
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME") || ( informtion.upstreamConfirmed == false && informtion.confirmedResult == "ACCEPTED") || (informtion.upstreamConfirmed == true && informtion.upstreamConfirmedResult == "ACCEPTED" )'
                        label='结算方式'
                        name='settleMethod'
                        @updata = 'integrationDate'
                        :searchCode='informtion.settleMethod'
                        url='control:/sys/param/org'
                        method='post' 
                        :params="['/order/settle_method']"
                        type='btn'
                        fieldName='code'
                        objCode='code'
                        objName='desc'
                        />

                </div> 
                <div class='col-sm-6'>
                        <inputEdit
                            :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                            label='报价公式'
                            name='quotationId'
                            @updata = 'integrationDate'
                            :searchCode='informtion.quotationId ? informtion.quotationId : "" '
                            url='control:/quota/quota/list/query'
                            method='post'
                            :params="{ pageIndex: 1, pageSize: 10000 }"
                            type='btn'
                            fieldName='sysQuotationId'
                            objCode='sysQuotationId'
                            objName='name'
                            />
                </div>
            </div>
      
            <div class="row">
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='下单价格'
                        name='price'
                        inputMaxWidth='70px'
                        @updata = 'integrationDate'
                        :value='informtion.price ? informtion.price : 0 '
                        />
                </div>
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='订单状态'
                        name='orderStatus'
                        @updata = 'integrationDate'
                        :searchCode='informtion.orderStatus ? informtion.orderStatus : "" '
                        :arr="[{name:'草稿',code:'DRAFT'},{name:'新订单',code:'NEW_ORDER'},{name:'已经审核的新订单',code:'NEW_APPROVED'},{name:'订单被取消',code:'ORDER_CANCELLED'}, {name:'救援中',code:'WORKING'}, {name:'完成救援',code:'DONE'}]" 
                        type='btn'
                        fieldName='code'
                        objCode='code'
                        objName='name'
                        />
                </div>
            </div>
            <div class="row" v-if='informtion.jobTypeCode == "03"'>
                <div class="col-sm-6">
                    <inputEdit
                        :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                        label='车辆数量'
                        name='qty'
                        inputMaxWidth='70px'
                        @updata = 'integrationDate'
                        :value='informtion.vehicleOwnerList ? informtion.vehicleOwnerList[0].qty : "" '
                        />
                </div>
            </div>
            <template v-if='informtion.remarks'>
                <div class="row">
                    <div class="col-sm-12">
                        <label class='pull-left VOICE' style="margin-top:10px;">录音备注 ：</label>
                        <template v-for="(it,index) in informtion.remarks" v-if="it.commentType == 'VOICE'">
                            <voice
                                :key='it'
                                text=""
                                style="float:left;margin-bottom:0"
                                :src="it.comment"/>
                        </template>
                    </div>
                </div>

                <div class="row" v-for="(it,index) in informtion.remarks" :key='it'>
                    <div class="col-sm-12" v-if="it.commentType == 'TEXT'">
                        <inputEdit
                            :disabled='!(informtion.upstreamConfirmed || informtion.lastDispatchType == "DISPATCH_ME")'
                            label='文本备注'
                            name='comments'
                            :index='index'
                            inputMinWidth='400px'
                            @updata = 'integrationDate'
                            :value='it.comment ? it.comment : "" '
                            />
                    </div>
                </div>
            </template>
        </div>
</div>
</template>

<script>
	import btnSelect from '../../../../../../common_component/btn_select.vue'
	import inputEdit from '../../../../../../common_component/inputEdit.vue'
	import datetimepicker from '../../../../../../common_component/datetimepicker.vue'
	import breadcrumb from '../../../../../../common_component/breadcrumb.vue'
    import voice from '../../../../../../common_component/voice.vue'

	export default {
            props:{
                informtion: {},
            },
            watch:{
              informtion(newInfo, oldInfo){
                console.log(newInfo);
                this.res = {
                  id: newInfo.towOrderId,
                  price: newInfo.price,
                  faultCar: {
                    carOwnerName: (newInfo.vehicleOwnerList.length > 0 ) ?  newInfo.vehicleOwnerList[0].carOwnerName : '',
                    carOwnerPhone: (newInfo.vehicleOwnerList.length > 0 ) ?  newInfo.vehicleOwnerList[0].carOwnerPhone : '',
                    vehicleCategory: (newInfo.vehicleOwnerList.length > 0 ) ?  newInfo.vehicleOwnerList[0].vehicleCategory : '',
                    vehicleColor: (newInfo.vehicleOwnerList.length > 0 ) ?  newInfo.vehicleOwnerList[0].vehicleColor : '',
                    vehicleId: (newInfo.vehicleOwnerList.length > 0 ) ?  newInfo.vehicleOwnerList[0].vehicleId : '',
                    qty: (newInfo.vehicleOwnerList.length > 0 ) ?  newInfo.vehicleOwnerList[0].qty : '',
                    vehicleBrand: (newInfo.vehicleOwnerList.length > 0 ) ?  newInfo.vehicleOwnerList[0].vehicleBrand : '',
                    vehicleName: (newInfo.vehicleOwnerList.length > 0 ) ?  newInfo.vehicleOwnerList[0].vehicleName : '',
                    vehiclePlateNo: (newInfo.vehicleOwnerList.length > 0 ) ?  newInfo.vehicleOwnerList[0].vehiclePlateNo : '',
                  },
                  comments: newInfo.remarks
                }
              }
            },
		data(){
			return {
                res:  {

                }
			}
		},
		components: {
			btnSelect,
			inputEdit,
			datetimepicker,
			breadcrumb,
            voice
		},
		methods:{
		    integrationDate(name,item, index){
                   
                  console.log(name, item);
                  const that = this;
                  if(name == 'incidentAddrAddress'){
                    // 救援地址
                    if(item.type != "rescue") return;
                    that.res.incidentAddrAddress = item.address;
                    that.res.rescueLnt = item.gps.lnt;
                    that.res.rescueLat = item.gps.lat;

                  }else if(name == 'destinationAddrAddress' ){
                    // 目的地址
                    if(item.type != "destination") return;
                      that.res.destinationAddrAddress = item.address;
                      that.res.destinationLnt = item.gps.lnt;
                      that.res.destinationLat = item.gps.lat;


                  }else if(name == 'qty' || name == 'carOwnerName' || name == 'carOwnerPhone' || name == 'vehicleName' || name == 'vehicleCategory' || name == 'vehicleColor'  || name == 'vehiclePlateNo'){
                      that.res.faultCar[name] = item;
                  }else if(name =='comments'){
                      console.log(name, item, index)
                      this.res[name][index].comment = item;
                  }else{
                      that.res[name] = item;
                  }
                  

                   // 马上修改订单信息 
                   console.warn(that.res);
                  send({
                      url: 'order:/order',
                      type: 'put',
                      param: that.res
                  }, function(err, res){
                    if(res.status == 200){
                      console.log(res);
                      if(global.listEventIsComplete){
                            global.listEvent.trigger('accounting-order-' + that.informtion.towOrderId);
                        }else{
                            that.$parent.render(true)
                        }
                      
                      // that.res = {
                      //   id: that.informtion.towOrderId
                      // }
                    }else{
                      alert(res.msg);
                    }
                  })
		    }
		}
	}
</script>

<style>
    .order_information{
        background: #fff;
    }
    .order_information.details{
        padding:20px;
    }
    .order_information .form_datetime.time.form_datetime{
        background: #fff !important;
    }
</style>
    