<template>
    <div class="container-fluid" id="underSingle">
        <div>
            <location-map 
                width="auto"
                input-width="480"
                :isclose="false"
                :showInfoDistribution="true"
                :serverInput="false"
                ref="location_map"
                mapBtnAddress='设为救援地,设为目的地'
                @dispatchTcp="dispatchTcp"
                :paint-circle-number="paintCircleNumber"/>
            
            <div class="rescue-operation">
                <div class="imgs">
                    <a href="javascript:;" class="img xiadan" title="下单" v-show="!currentView" @click="toggleView('orderNav')">
                    </a>
                    <a href="javascript:;" class="img paiche" title="派车" v-show="!currentView" @click="toggleView('sendCarNav')">
                        <span id="notSendOrder"></span>
                    </a>
                    <a href="javascript:;" class="img shouqi" title="收缩" style="margin-top:54px;display:block" v-show="currentView" @click="toggleView('')">
                    </a>
                </div>
                    <operation :message-type="messageType" :view="currentView" :newOrder="newOrder" :jobType="jobType" :shareActionId="shareActionId" @completeOrder="completeOrder"  @toggleView="toggleView('')" ref="operation" @delectMsg="delectMsg"/>
            </div>

            <div id="dispatchCar" v-show="orderId">
            
                <div>
                    <btn-select 
                        name="matchingType"
                        :arr="arr"
                        width="128px"
                        filter="cn" 
                        padding="0"
                        title="我的技师"
                        @updata="integrationDate"/>
                </div>
                <div>
                    <btn-select 
                       :arr="[{cn:'全部',en:'MAINTENANCE'},{cn:'空闲',en:'FREE'},{cn:'忙',en:'BUSY'}]"
                        filter="cn" 
                        padding="0"
                        name="status"
                        @updata="integrationDate"
                        title="全部" 
                        width="128px"
                        />
                </div>
                

                <div>
                    <btn-select 
                        url="client:/helper/tool" 
                        filter="name" 
                        name="rescueTools"
                        @updata="integrationDate"
                        padding="0"
                        title="选择工具" 
                        :isCheckbox="true"
                        width="140px"
                        :hasAll='true'
                        :multi="true"/>
                </div>
                <div>
                    <btn-select 
                        url="client:/insurance/product" 
                        filter="name" 
                        name="insuranceProduct"
                        @updata="integrationDate"
                        padding="0"
                        title="选择车险" 
                        :isCheckbox="true"
                        :hasAll='true'
                        width="180px"
                        :multi="true"/>
                </div>
                <div>
                    <btn-select 
                        url="client:/helper/towtruckcat" 
                        filter="name" 
                        name="towTruckCategory"
                        padding="0"
                        @updata="integrationDate"
                        :title="'选择车辆类型'" 
                        width="140px"
                        :hasAll='true'/>
                </div>

                <div>
                    <btn-select 
                        :arr="[{cn:'全部',en:0},{cn:'10km以内',en:10}, {cn:'20km以内',en:20},{cn:'50km以内',en:50}]"
                        filter="cn" 
                        padding="0"
                        name="distanceRange"
                        @updata="integrationDate"
                        title="全部" 
                        width="92px"/>
                </div>

                <button class='btn shadow' v-if="this.serverURL(['UnderSingle','share_order_operator'])"  data-toggle="modal"  @click="orderShareGetData">分享订单</button>


                <p class="topInfo" style="margin-top:6px;">
                </p>

            </div>

            <div id="car_list" v-show="orderId">
                <div>
                    
                    <!-- h4 默认有text-center类 -->
                    <div class="marching_list">
                        <span v-text=" result.matchingType == 'all_have_gps_and_match' ? '搜索车辆信息成功，当前业务类型：' + matchRescueType(result.jobType) : 
                                       result.matchingType == 'parking_lot_order_taker' ? '搜索服务商驻车地列表成功，当前业务类型：' + matchRescueType(result.jobType):
                                       '搜索服务商技师列表成功，当前业务类型：' + matchRescueType(result.jobType) " class="successOrder"></span>
                        <div style="padding-bottom:8px">
                            <form-label-input
                                input-width="290px"
                                name="fieldSituation"  
                                placeholder="搜索服务商名称，司机名称，车辆号码，驻车点 "
                                :hasClearButton="true"
                                :value="queryKeyWord"
                                @valClear="integrationDate"
                                @inputTrigged="integrationDate"/>
                        </div>
                    </div>
                    
                    
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr  v-if="result.matchingType == 'all_have_gps_and_match'">
                                <th>车牌/司机</th>
                                <th>时间/距离</th>
                                <th></th>
                            </tr>
                            <tr  v-if="result.matchingType == 'parking_lot_order_taker'">
                                <th>服务商名称</th>
                                <th>驻车地名称</th>
                                <th>第一接单人</th>
                                <th>第二接单人</th>
                                <th></th>
                            </tr>
                            <tr  v-if="result.matchingType == 'provider_driver'">
                                <th>服务商名称</th>
                                <th>车牌/司机</th>
                                <th>时间/距离</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody v-if="result.matchingType == 'provider_driver'"  v-for="(item,index) in items">
                            <!-- index不用了 改成原始的，不然对不上地图标记 -->
                            <tr v-if="item.matchingType == 'driver' " @click="openWinInfo(item.gpsLastest ? item.gpsLastest.gpsPoint: '',item.originIndex)">
                                <td v-text="item.partnerInfo ? item.partnerInfo.name :'' "></td>
                                <td v-text="item.towTruck ? item.towTruck.plateNo + '-' +item.employeeName : item.employeeName"></td>
                                <td v-text=" item.gpsLastest && item.gpsLastest.drivingDistance ? item.gpsLastest.drivingTime / 60 + 'min' + '/' +(item.gpsLastest.drivingDistance / 1000 ).toFixed(2) + 'km': '0 / 0'"></td>
                                <td><button class="btn radius-btn" @click="showModel(item)">派车</button></td>
                            </tr>

                        </tbody>
                        <tbody v-if="result.matchingType == 'provider_driver' && !items.length">
                            <tr>
                                <td colspan="3"><h3 class="text-center" style="color:#FF6B0E">暂无服务商技师信息</h3></td>
                            </tr>
                        </tbody>


                        <tbody v-if="result.matchingType == 'all_have_gps_and_match'"  v-for="(item,index) in items">

                            <tr v-if="item.matchingType == 'driver' " @click="openWinInfo(item.gpsLastest ? item.gpsLastest.gpsPoint: '',item.originIndex)">
                                <td v-text="item.towTruck ? item.towTruck.plateNo + '-' +item.employeeName : item.employeeName"></td>
                                <td v-text=" item.gpsLastest && item.gpsLastest.drivingDistance ? item.gpsLastest.drivingTime / 60 + 'min' + '/' +(item.gpsLastest.drivingDistance / 1000 ).toFixed(2) + 'km': '0 / 0'"></td>
                                <td><button class="btn radius-btn" @click="showModel(item)">派车</button></td>
                            </tr>

                            <tr v-if="item.matchingType == 'towtruck' "  @click="openWinInfo({x:item.lnt,y:item.lat},item.originIndex)">
                                <td v-text="item.driver ? item.plateNo + '-' + item.driver.employeeName : item.plateNo"></td>
                                <td v-text=" item.drivingTime ? item.drivingTime / 60  + 'min' + '/' + (item.drivingDistance / 1000 ).toFixed(2) + 'km' : '0 / 0'"></td>
                                <td><button class="btn radius-btn" @click="showModel(item)">派车</button></td>
                            </tr>
                        </tbody>
                        <tbody v-if="result.matchingType == 'all_have_gps_and_match' && !items.length">
                            <tr>
                                <td colspan="3"><h3 class="text-center" style="color:#FF6B0E">暂无技师或车辆信息</h3></td>
                            </tr>
                        </tbody>

                        <tbody v-if="result.matchingType == 'parking_lot_order_taker'"  v-for="(item,index1) in items">
                            <tr v-for="(it,index2) in item.parkingLots"    @click="openWinInfo(it.gps ,item.originIndex,it.originIndex2)">
                                <td  v-text="item.name"></td>
                                <td  v-text="it.name"></td>
                                <td v-html="it.firstOrderTaker ? it.firstOrderTaker.employeeName + '<br/>' + it.firstOrderTaker.workMobile :''  "></td>
                                <td v-html="it.secondOrderTaker ? it.secondOrderTaker.employeeName  + '<br/>' +  it.secondOrderTaker.workMobile : ''"></td>
                                <td><button class="btn radius-btn" @click="showModel(it,'server_provider')">派车</button></td>
                            </tr>
                        </tbody>
                        <tbody v-if="result.matchingType == 'parking_lot_order_taker' && !items.length">
                            <tr>
                                <td colspan="5"><h3 class="text-center" style="color:#FF6B0E">暂无技师或车辆信息</h3></td>
                            </tr>
                        </tbody>

                        <tbody v-if="0 && queryView && !items.length">
                            <tr>
                                <td colspan="3"><h3 class="text-center" style="color:#FF6B0E">暂无搜索结果</h3></td>
                            </tr>
                        </tbody>

                    </table>
                    
                </div>
                <a href="javascript:;" class="shrink" @click="shrink"><img title="展开" src="../../../../assets/suo_right.png" height="64" width="64"></a>
            </div>

          
            <gps-dispatch-list ref="gpsDispatchList"/>

                
            <div class="sent">
                <div v-if="currentSelectCar.length > 0">
                    <p 
                        v-if="rescueType =='commercialVehicle'" 
                        class="text-center" 
                        style="color:#000;margin-bottom:6px;font-weight: bold;">
                        <span v-if="number > 0">剩余需托运车辆{{number}}辆</span>
                        <span v-else>托运车辆已完成</span>
                    </p>
                    <div class="currenCar clearfix">
                        <div class="currenCar-left">
                            <p class="pull-left">已派<span v-text="currentSelectCar.length"></span>辆车：</p>
                        </div>

                        <div class="currenCar-content" style="overflow:scroll">
                             <div class="anime" id="top-buttom" v-if="rescueType == 'commercialVehicle'">
                                <p v-for="item in currentSelectCar">
                                    <span v-text='item.towDriver'></span>-<span v-text="item.plateNo"></span>托运<span v-text="item.number"></span>辆车
                                </p>
                            </div>
                            <div class="anime" id="top-buttom" v-if="rescueType != 'commercialVehicle'">
                                <p v-for="item in currentSelectCar">
                                    <span v-text='item.towDriver'></span>-<span v-text="item.plateNo"></span>
                                </p>
                            </div>
                           <!--  <div class="button-top-buttom">
                                <a href="javascript:;" class='img shouq' @click="prevAnime">
                                </a>   
                                 <a href="javascript:;" class='img zhank' @click="nextAnime">
                                </a>   
                            </div> -->
                        </div>
                        <div class="currenCar-right">
                            <a href="javascript:;" @click="sendCompleted">派遣完成</a>
                        </div>
                    </div>
                </div>
            </div>    
              

            
            <vehicle-info-remind v-if="serverURL(['companyManagement','calendar_index_notice'])" />
            <order-share :orderItem="orderItem"  @completed="sendCompleted" :orderId="orderId"></order-share/>
            <send-completed :surplus="transportNum"/>
            <!-- <cancel @toggleView="toggleView"/> -->
            <send-success :time="time" @clear="clear"/></send-success>
            <select-car 
                @addcar="addcar"
                @completed="sendCompleted"
                :current-info="currentCarInfo" 
                :orderId="orderId"
                :orderCode="orderCode" 
                :rescue-type="rescueType"
                :number = "number"
                :time1="time1"/>
        </div>
    </div>
    
</template>
<script>
    import locationMap  from "../../../../common_component/locationMap.vue";
    import {mapOpenWindinfo,clearMap,addMarkersing,_setMapAllPoiny,_destroy,_getParking,_openParkingInfo} from "../../../../common_component/map.js";
    import formLabelInput from "../../../../common_component/form-label-input.vue";
    import orderShare from "./modal/orderShare";                            //订单分享
    import selectCar from "./modal/selectCar.vue";                           //派车操作
    import sendCompleted from "./modal/sendCompleted.vue";                           //派车操作
    import sendSuccess from "./modal/sendSuccess.vue";                           //派车成功
    import btnSelect from "../../../../common_component/btn_select.vue"; 
    import operation from "./operation.vue";                               //下单操作
    import cancel from "./modal/cancel.vue";                               //取消派单
    import vehicleInfoRemind from "./modal/vehicleInfoRemind.vue";          //年审首页提醒

    import open  from "../../../../assets/suo_right.png";
    import close  from "../../../../assets/suo_left.png";
    import gpsDispatchList  from "./currentView/gpsDispatchList.vue";

    var num = 0;

    export default {
       
        components:{
            orderShare,
            sendCompleted,
            btnSelect,
            operation,
            locationMap,
            selectCar,
            sendSuccess,
            cancel,
            formLabelInput,
            gpsDispatchList,
            vehicleInfoRemind
        },
        
        data () {
            return {
                isOverflow:true,       //切换隐藏
                time:0,
                time1:0,
                currentView:'',         //当前视图
                status:'other',
                arr:[],
                items:[],
                itemsCache:[],
                currentSelectCar:[] ,       //当前选择的车辆
                orderId:'',
                orderCode:'',
                messageType:'',
                paintCircleNumber:10,
                result:{
                    "matchingType":"",
                    "rescueLat": 0,
                    "rescueLng": 0,
                    "distanceRange": 0,
                    "jobType": "",
                    "unit": "km",
                    "rescueTools": [],
                    "insuranceProduct": [],
                    "towTruckCategory": {},
                    "dispatchSearchScope": []
                },
                number:'',       //当前订单剩余托运数量
                currentCarInfo:{} ,
                newOrder:'',
                shareActionId:'',
                jobType:'',
                filterBtnText:['我的技师','全部','选择工具','选择车险','选择车辆类型','全部'],
                orderItem:{orderVehicles:[{}]},
                queryKeyWord:'', 
                queryView:false,
            }
        },
        methods:{
            toggleView(view,data){
                if(view == 'orderNav')this.clear();
                 this.$refs.operation.toggleNav(view,data);
                if(this.currentView === view)return;
                if(view ){
                    if( !this.currentView ){
                        $('.rescue-operation').css({right:0});
                        // $('#locationMap').width(parseInt($('#locationMap').width()) - 483 + 'px')
                    }
                }else{
                    $('.rescue-operation').css({right:'-482px'});
                    this.clear();
                    // $('#locationMap').width('100%');

                }
                this.currentView = view;

            },
            integrationDate(name,item){
                console.log(name,item)
                if(!this.orderId){
                    const self = this;

                    $('#underSingle #dispatchCar .setWidth').each(function(index, el) {
                        el.innerHTML = self.filterBtnText[index];
                        el.style.color="#999"
                    });
                    return alert('请先选择一张订单;')
                }

                switch(name) {
                    case 'rescueTools':
                        this.result.rescueTools = item.map((data,idnex)=>{
                            return data
                        })
                        break;
                    case 'insuranceProduct':

                            this.result.insuranceProduct = item.map((data,idnex)=>{
                                return data
                            })
                        break;
                    case 'towTruckCategory':


 
                        this.result.towTruckCategory = {'code':item.towTruckCatId};
                        break;
                    case 'matchingType':
                        if(this.result.matchingType == item['en'])return;
                        this.result.matchingType = item['en'];
                        // clearMap();
                        break;
                    case 'status':
                        this.status = item.en == 'FREE' ? 'FREE':'other'; 
                        break;
                    case 'distanceRange':
                        if(this.result.distanceRange == item['en'])return;
                        this.result.distanceRange = item['en']; 
                        this.paintCircleNumber = item['en'] ? item['en'] : 10; 

                        break;
                    case 'fieldSituation': 
                        this.queryKeyWord = item;
                        return;
                    default:

                }

                this.dispatchCar();   
            } ,
            //搜索多表
            queryByKeyWord(){
                //搜索条目： 
                //车牌司机下：车牌 item.towTruck.plateNo; 司机 item.employeeName
                //服务商驻车点下：
                //服务商司机下：
                const self = this;
                let kword = new RegExp(this.queryKeyWord,"i");
                let iCache = JSON.parse(JSON.stringify(this.itemsCache));
                if(this.itemsCache.length === 0) return;
                //过滤驻车地
                if(this.result.matchingType === 'parking_lot_order_taker'){
                    let tempItems = iCache.filter(item=>item['name']?(item['name'].match(kword) !== null):false);
                    let anti_tempItems = iCache.filter(item=>item['name']?(item['name'].match(kword) == null):false);
                    //先搜索服务商结果
                    this.items = JSON.parse(JSON.stringify(tempItems));

                    anti_tempItems.forEach(item=>{
                        item.parkingLots = item.parkingLots?item.parkingLots.filter((item2,index2,arr2)=>{
                            return item2['name']?item2['name'].match(kword) !== null:false;
                        }):[];
                        // console.log("parking__________lots",item.parkingLots)
                    })
                    //再把驻车地有该关键字的选上
                    this.items = this.items.concat(anti_tempItems);
                } else {
                    //过滤服务商技师和普通技师
                    this.items = iCache.filter(item=>{

                        let kwInName = true,
                            kwInPlate = true,
                            kwInProviderName = true;

                            kwInName = item.driver ? (item.driver['employeeName'] ? item.driver['employeeName'].match(kword) !== null:false) : 
                                                    (item['employeeName'] ? item['employeeName'].match(kword) !== null:false);

                            kwInPlate = item.towTruck  ? (item.towTruck['plateNo'] ? item.towTruck['plateNo'].match(kword) !== null :false) 
                                                        :(item['plateNo'] ? item['plateNo'].match(kword) !== null:false);

                            kwInProviderName = item.partnerInfo && item.partnerInfo['name'] ?(item.partnerInfo['name'].match(kword) !== null):false;
                            return (kwInName || kwInPlate || kwInProviderName);
                    });
                }
            },
            showModel(item,str){
                if ( (item.matchingType == 'towtruck' && !item.driver )|| (item.matchingType == 'towtruck' && item.driver && !item.driver.userId ) )return alert('此车辆暂无配司机,请先择其他车辆')
                if( item.matchingType == 'driver' && !item.userId )return  alert('此车辆暂无配司机,请先择其他车辆')
                if(str == 'server_provider' && !item.firstOrderTaker && !item.secondOrderTaker)return alert('此驻车点暂无接单人，请选择其他驻车地;','warning');
                this.currentCarInfo = item;
                if(!this.orderId)return alert('请选择一张订单;','warning');
                this.time1++;

                console.log(item)
                if(item.gpsLastest && item.gpsLastest.gpsPoint && item.gpsLastest.gpsPoint.x &&  item.gpsLastest.gpsPoint.y)mapOpenWindinfo([item.gpsLastest.gpsPoint.x,item.gpsLastest.gpsPoint.y],[this.result.rescueLng,this.result.rescueLat]);

                if(item.gps && item.gps.x &&  item.gps.y)mapOpenWindinfo([item.gps.x,item.gps.y],[this.result.rescueLng,this.result.rescueLat]);

                if(item.lnt && item.lat )mapOpenWindinfo([item.lnt,item.lat],[this.result.rescueLng,this.result.rescueLat]);

                $('#selectCar').modal('show');
            },
            addcar(info){

                const self = this;
                if(this.rescueType == 'commercialVehicle'){
                    self.number -= parseInt(info.number);
                };
                this.currentSelectCar.push(info);

            },
            sendCompleted(type){
                if(this.number > 0 && this.rescueType == 'commercialVehicle'  && !this.currentCarInfo.parkingLots && type != 'share'){
                    $('#sendCompleted').modal('show');
                }else{
                    this.time++;
                    this.toggleView('');
                    $('#sendSuccess').modal('show');
                    
                    if(this.msgType)this.$emit('delectMsg', this.msgType);
                    else {
                        let notSendOrder = parseInt($('#notSendOrder').text());
                        if(notSendOrder > 0){
                            $('#notSendOrder').text( --notSendOrder);
                        }
                    };
                    // this.clear();
                }
            },
            delectMsg(type){
                this.$emit('delectMsg', type);
            },
            serverURL(url){
                return ConfigPage.isExist(url);
            },
            prevAnime(){
                if( this.currentSelectCar.length < 2 || num == this.currentSelectCar.length - 2)return;
                num++;
                $('#top-buttom').css({
                    marginTop: -20 * num + 'px'
                });
            },
            nextAnime(){
                if( this.currentSelectCar.length < 2 || num == 0)return;
                num--;
                $('#top-buttom').css({
                    marginTop: -20 * num + 'px'
                });
            },
            // 4575/v1/towtruckmatching/list/matchingtowtruck
            dispatchCar(str,bool){
                const self = this;

                if(!this.result.matchingType){
                    if(this.serverURL(['UnderSingle','dispatch_org_car'])){
                        this.result.matchingType = 'all_have_gps_and_match';
                    }else if(this.serverURL(['UnderSingle','dispatch_service_providers'])){
                        this.result.matchingType = 'parking_lot_order_taker';
                    }else if(this.serverURL(['UnderSingle','dispatch_provider_driver'])){
                        this.result.matchingType = 'provider_driver';
                    }else{
                        return alert('你暂无派车权限');
                    }
                };
                send({
                    type:'post',
                    url:'control:/towtruckmatching/list/taskmatching',
                    param:self.result
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200 || res.status == 404){

                        console.log(res);
                        self.items = res.content ? res.content : [] ;
                        
                        const arr =[];

                        self.items.forEach(function(it,res){

                            it.originIndex = res;
                            if(self.result.matchingType == 'all_have_gps_and_match'){


                                if(it.gpsLastest && it.gpsLastest.gpsPoint && it.gpsLastest.gpsPoint.x &&  it.gpsLastest.gpsPoint.y && it.matchingType=='driver'){

                                    var str = "<div class='map_center'>当前经度:" + it.gpsLastest.gpsPoint.x + '<div>' +
                                                "<div>当前纬度：" +it.gpsLastest.gpsPoint.y + '</div>'+
                                                "<div>当前司机姓名：" + it.employeeName + '</div>'+
                                                "<div>当前司机电话：" + it.workMobile + '</div>'+
                                                "<div>所需时间：" + it.gpsLastest.drivingTime / 60 + "分钟" + '</div>'+
                                                "<div>所需距离：" + it.gpsLastest.drivingDistance / 1000 + '公里</div>';

                                    var chtml = `<div class='amap-icon map_car_img staff'></div>`;

                                    if(it.towTruck){
                                        let status =  it.towTruck.status == 'FREE' ? '空闲' : '忙';
                                        let icon = it.gpsLastest.direction ? it.towTruck.status.toLowerCase() + ( Math.round(it.gpsLastest.direction/40) + 1 ) :it.towTruck.status.toLowerCase() +  1  ;

                                        let towTruckCategory =  it.towTruck.towTruckCategory ? it.towTruck.towTruckCategory.name : '';

                                        str +=  "<div class='map_center'>当前车牌：" + it.towTruck.plateNo + '</div>' + 
                                                "<div>当前状态：" + status + '</div>' + 
                                                "<div>当前车型：" + towTruckCategory + '</div>' + 
                                                "<div class='map_click'><button type='button' class='dispatch' item=" +  JSON.stringify(it) +">派车</button></div>"  + 
                                            "</div>";   

                                    chtml = `<div class='amap-icon map_car_img ${icon}'></div>`;

                                    }else{
                                        str += "<div class='map_click'><button type='button' class='dispatch' item=" +  JSON.stringify(it) +">派车</button></div>"  + 
                                            "</div>";
                                    }

                                    let label = it.towTruck ? it.towTruck.plateNo + '-' + it.employeeName : it.employeeName ;
                                    arr.push({
                                        x:it.gpsLastest.gpsPoint.x,
                                        y:it.gpsLastest.gpsPoint.y,
                                        str:str,
                                        content:chtml,
                                        label:label
                                    });
                                    //&&it.matchingType=='towtruck'
                                }else if(it.lnt && it.lat && it.matchingType == 'towtruck'){
                                    var status = it.status == 'FREE' ? '空闲' : '忙';
                                    let label = it.driver ? it.plateNo + '-' + it.driver.employeeName : it.plateNo ;
                                    let name =  it.driver ?  it.driver.employeeName : '' ;
                                    let workMobile =  it.driver ?  it.driver.workMobile : '' ;
                                    let icon = it.status.toLowerCase() + (Math.round(it.direction/40) + 1 ) ;

                                    arr.push({
                                        x:it.lnt,
                                        y:it.lat,
                                        str:"<div class='map_center'>当前司机姓名：" + name + '</div>'+
                                                "<div>当前司机电话：" + workMobile + '</div>'+
                                                "<div>当前车辆车牌：" + it.plateNo + '</div>'+
                                                "<div>当前车辆状态：" + status + '</div>'+
                                                "<div>车辆类型：" + it.towTruckCategory.name + '</div>'+
                                                "<div>所需时间：" + it.drivingTime / 60 + "分钟" + '</div>'+
                                                "<div>所需距离：" + it.drivingDistance / 1000 + '公里'  + '</div>'+
                                                "<div class='map_click'><button type='button' class='dispatch' item=" +  JSON.stringify(it) +">派车</button></div>"  + 

                                            "</div>",
                                        content:`<div class='amap-icon map_car_img ${icon}'></div>`,
                                        label:label
                                    });
                                }
                            }else if(self.result.matchingType == 'parking_lot_order_taker'){

                                it.parkingLots.forEach(function(data,index){
                                    data.originIndex2 = index
                                    if(data.gps && data.gps.x && data.gps.y){
                                        const firstOrderTakerName = data.firstOrderTaker ? data.firstOrderTaker.employeeName : '' ;
                                        const firstOrderTakerWorkMobile = data.firstOrderTaker ? data.firstOrderTaker.workMobile : '' ;
                                        const secondOrderTakerName = data.secondOrderTaker ? data.secondOrderTaker.employeeName : '' ;
                                        const secondOrderTakerWorkMobile = data.secondOrderTaker ? data.secondOrderTaker.workMobile : '' ;
                                        data.name = data.name.trim();
                                        
                                        arr.push({
                                            x: data.gps.x,
                                            y: data.gps.y,
                                            str:"<div class='map_center'>当前驻车地：" + data.name + '</div>'+
                                                    "<div>服务商名称：" + it.name  + '</div>'+
                                                    "<div>第一接单人姓名：" + firstOrderTakerName   + '</div>'+
                                                    "<div>第一接单人电话：" + firstOrderTakerWorkMobile  + '</div>'+
                                                    "<div>第二接单人姓名：" + secondOrderTakerName  + '</div>'+
                                                    "<div>第二接单人电话：" + secondOrderTakerWorkMobile + '</div>'+
                                                    "<div>所需时间：" +  data.drivingTime / 60 + "分钟" + '</div>'+
                                                    "<div>所需距离：" +  data.drivingDistance / 1000 + '公里'  + '</div>'+
                                                    "<div class='map_click'><button type='button' class='dispatch' item=" +  JSON.stringify(data) +">派车</button></div>"  + 
                                                "</div>",
                                            content:"<div class='amap-icon map_car_img parking'></div>",
                                            label:data.name
                                        });
                                    };
                                });
                            }else if(self.result.matchingType == 'provider_driver'){
                                if(it.matchingType == "driver" && it.gpsLastest && it.gpsLastest.gpsPoint && it.gpsLastest.gpsPoint.x &&  it.gpsLastest.gpsPoint.y ){

                                     const name = it.partnerInfo ? it.partnerInfo.name : '';

                                    let str = "<div class='map_center'>当前服务商名称：" + name + '</div>'+
                                            "<div>当前司机姓名：" + it.employeeName + '</div>'+
                                            "<div>当前司机电话：" + it.workMobile + '</div>'+
                                            "<div>所需时间：" + it.gpsLastest.drivingTime / 60 + "分钟" + '</div>'+
                                            "<div>所需距离：" + it.gpsLastest.drivingDistance / 1000 + '公里</div>';

                                    let chtml = `<div class='amap-icon map_car_img staff'></div>`;



                                    if(it.towTruck){
                                        let status =  it.towTruck.status == 'FREE' ? '空闲' : '忙';
                                        let towTruckCategory =  it.towTruck.towTruckCategory ? it.towTruck.towTruckCategory.name : '';

                                        str +=  "<div class='map_center'>当前车牌：" + it.towTruck.plateNo + '</div>' + 
                                                "<div>当前状态：" + status + '</div>' + 
                                                "<div>当前车型：" + towTruckCategory + '</div>' + 
                                                "<div class='map_click'><button type='button' class='dispatch' item=" +  JSON.stringify(it) +">派车</button></div>"  + 
                                            "</div>";   

                                        chtml = `<div class='amap-icon map_car_img ${it.towTruck.status.toLowerCase() + '0'}'></div>`;


                                    }else{
                                         str += "<div class='map_click'><button type='button' class='dispatch' item=" +  JSON.stringify(it) +">派车</button></div>"  + 
                                            "</div>";
                                    }

                                    let label = it.towTruck ? name + '-' + it.towTruck.plateNo + '-' + it.employeeName : name + '-' + it.employeeName ;

                                    arr.push({
                                        x:it.gpsLastest.gpsPoint.x,
                                        y:it.gpsLastest.gpsPoint.y,
                                        direction:it.gpsLastest ? it.gpsLastest.direction :0,
                                        str:str,
                                        content:chtml,
                                        label:label
                                    });
                                }
                            }
                        });
                        self.itemsCache = res.content ? JSON.parse(JSON.stringify(res.content)) : [] ;
                        if(arr.length)addMarkersing(arr);
                        self.$refs.gpsDispatchList.cancelWatch();     


                    }else{
                        self.items = [];
                        self.itemsCache = [];
                        console.log(res);
                        alert(res.msg);
                    }

                    
                    self.$nextTick(function(){
                        $('#car_list').css({marginTop: -($('#car_list').height()/2) + 'px'});
                        $('.Details_wrap').hide();
                        self.shrink('',true);
                    });
                });
                
            },
            clear(){
                const self = this;
                global.order_opt = null;
                $('.topInfo').text('');
                clearMap();
                this.shrink('',true);


                $('#underSingle #dispatchCar .setWidth').each(function(index, el) {
                    el.innerHTML = self.filterBtnText[index];
                    el.style.color="#999"
                });
                this.currentSelectCar = [];
                this.orderId = '';
                this.result = {
                    "rescueLat": 0,
                    "rescueLng": 0,
                    "distanceRange": 0,
                    "matchingType":"",
                    "jobType": "",
                    "unit": "km",
                    "rescueTools": [],
                    "insuranceProduct": [],
                    "towTruckCategory": {},
                    "dispatchSearchScope": []
                };
                this.number = '';      
                if(JSON.stringify(this.currentCarInfo) !=='{}')this.currentCarInfo = {};   
                this.$refs.gpsDispatchList.cancelWatch();     
               
            },
            completeOrder(result,orderId,orderCode,str){

                const self = this;
                if(this.orderId == orderId)return;
                if(this.orderId) {
                    confirm("你确定替换当前订单:" + this.orderCode ,function(bool){
                        if(bool){
                            self.clear();
                            self.replaceData(result,orderId,orderCode,str,true);
                        }
                    });
                }else{
                    self.replaceData(result,orderId,orderCode,str);
                }
            },
            openWinInfo(point,index1,index2){

                // console.log("originIndex-----",index1,index2)
                if(point && point.x && point.y){

                    if(typeof index2 == "number" ){
                        let num = 0;
                        for(let i = 0 ;i< index1+1 ;i++){
                            for(let j =0 ;j<this.itemsCache[i].parkingLots.length;j++){

                                if( (i == index1) && (j === index2) )break;
                                ++num
                            }
                        }
                        mapOpenWindinfo(num)
                    }else{
                        let num = -1;
                        for(let i = 0 ; i<index1 + 1;i++){

                            if( (this.itemsCache[i].lnt &&this.itemsCache[i].lat) || (this.itemsCache[i].gpsLastest && this.itemsCache[i].gpsLastest.gpsPoint && this.itemsCache[i].gpsLastest.gpsPoint.x &&this.itemsCache[i].gpsLastest.gpsPoint.y) ){
                                ++num;
                            }
                        }
                        mapOpenWindinfo(num)
                    }
                }


            },
            matchRescueType(code){
                return util.matchRescueType(code).cn
            },
            replaceData(result,orderId,orderCode,str,bool){
                console.log(result,orderId,orderCode)
                global.order_opt = {
                    result:result,
                    orderId:orderId,
                    orderCode:orderCode,
                    str:str,
                    bool:bool
                }

                this.toggleView('');

                this.orderId = orderId;
                this.orderCode = orderCode;
                this.rescueType = result.type;
                this.number = result.qtyOfVehicles || result.faultCar.number;
                order_operation.mathResuceType(this,result);
                this.result.jobType = result.jobType;
                this.result.rescueLng  = result.rescueLnt;
                this.result.rescueLat  = result.rescueLat;
                this.msgType=str;
                this.dispatchCar(str,bool);   

                this.$refs.location_map.clearCheckboxed();
            },
            shrink(ev,bool){
                const el = $('#car_list .shrink').find('img');
                if (el.attr('title') == '展开' || bool) {
                    el.attr({'title':'收缩','src':close});
                    $('#car_list').css({left:0})
                }else{
                    el.attr({'title':'展开','src':open});
                    $('#car_list').css({left: - ($('#car_list').width() )+'px'})
                }
            },
            emitImportOrder(jobType,orderId,messageType,shareActionId){
                const type = util.matchRescueType(jobType);

                const data = {
                    el:type.en,
                    orderId:orderId,
                    code:jobType,
                    messageType:messageType,
                    shareActionId:shareActionId
                }
                this.toggleView('orderNav',data);
            },
            orderShareGetData(){
                const self = this;
                send({
                    url:'order:/order/job?orderId=' + this.orderId + '&jobId',
                    type:'get'
                },function(err,res){
                    if(err)return console.log(res);
                    if(res.status == 200){
                        console.log(self.orderId)
                        self.orderItem = res.content[0];
                        $('#orderShare').modal('show');
                        console.log(self.orderItem)
                            // order_operation.form_disabled($('#trailer .trailer-body'),true);
                    }else{
                        console.log(res);
                        alert(res.msg);
                    };
                })
            },
            dispatchTcp(name,status){
                this.$refs.gpsDispatchList.getAllPlatformCars(name,status);
            },
           
        },
        created(){
            self.orderId='';
            if(this.serverURL(['UnderSingle','dispatch_org_car']))this.arr.push({cn:'我的技师',en:'all_have_gps_and_match'});
            if(this.serverURL(['UnderSingle','dispatch_service_providers']))this.arr.push({cn:'服务商驻车点',en:'parking_lot_order_taker'});
            if(this.serverURL(['UnderSingle','dispatch_provider_driver']))this.arr.push({cn:'服务商司机',en:'provider_driver'});


        },
        mounted(){
            const self = this;

            this.$nextTick(function(){
                // if(global.order_opt)self.replaceData(global.order_opt.result,global.order_opt.orderId,global.order_opt.orderCode,global.order_opt.str,global.order_opt.bool)
                // _setMapAllPoiny(global.order_opt  ? true : false );


                window.showModel = self.showModel;


                send({
                    type:'get',
                    url:'order:/order/dispatch/not'
                },function(err,res){
                    if(res.status == 200){
                        const notSendOrder = $('#notSendOrder');
                        if(notSendOrder.length){
                            if( res.content[0]['number']  ){
                                notSendOrder.text(res.content[0]['number']).show();
                            }else{
                                notSendOrder.hide();
                            }
                        }
                    }else{
                        console.log(res);
                    }
                });


                var height =  $(window).height() - 46 ;
                $('#wrap_box').height(height);
                $('#underSingle').height(height - $('.setborderBg').height());
                $('#locationMap').height(height - $('.setborderBg').height());
                $('#poinMap').height(height - $('.setborderBg').height());


            })


            bus.$on('TIME_OUT',function(orderId,jobType){
                self.newOrder = orderId;
                self.jobType = jobType;
                self.messageType = 'TIME_OUT'
                self.emitImportOrder(self.jobType,self.newOrder,self.messageType);
            });
            
            bus.$on('CHECK_ORDER',function(orderId,jobType){
                console.log(orderId,jobType)
                self.newOrder = orderId;
                self.jobType = jobType;
                self.messageType = 'CHECK_ORDER';
                if(!self.jobType)self.jobType = '02';
                self.emitImportOrder(self.jobType,self.newOrder,self.messageType);
            });


            bus.$on('NEW_ORDER',function(orderId,shareActionId,jobType){

                self.newOrder = orderId;
                self.shareActionId = shareActionId;
                self.jobType = jobType;
                self.messageType = 'NEW_ORDER'
                self.emitImportOrder(self.jobType,self.newOrder,self.messageType,self.shareActionId);

            });


            bus.$on('ORDER_IMPORT',function(orderId,jobType){
                console.log("jobTypeeee" ,jobType)

               

                if(jobType == '01' ||jobType == '04' ||jobType == '03' ||jobType == '05' ){
                    self.jobType = jobType;
                }else{
                    self.jobType = '02';
                }

                self.newOrder = orderId;
                self.messageType = 'ORDER_IMPORT';
                self.emitImportOrder(self.jobType,self.newOrder,self.messageType);
         
            });



        },
        beforeDestroy(){
            _destroy();
            this.$refs.gpsDispatchList.cancelWatch();     

        },
        watch:{
            orderId(newv){
                newv ? $('#order_pg_select').find('button').attr('disabled',false):$('#order_pg_select').find('button').attr('disabled',true);
            },
            queryKeyWord(newv,oldv){
                // console.log(this.queryKeyWord)
                if(newv === ''){
                    this.items = JSON.parse(JSON.stringify(this.itemsCache));
                    this.queryView = false;
                    return;
                }
                this.queryView = true;
                this.queryByKeyWord();
            },
            filterCar(newv){
                this.filterCarFn(newv);
            }
        }
       
       
    }

    
    
 
</script>
<style scoped>
    #locationMap{
        display: flex !important;
        flex-direction: column !important;
        flex: 1 ;
    }
    .shadow{
        color: #fff;
        background: #FF6B0E;
        border: 1px solid #ccc;
    }
    #notSendOrder{
        content: '';
        position: absolute;
        width: 40px;
        height: 24px;
        background: red;
        border-radius: 50%;
        bottom: 4px;
        left: -7px;
        display: none;
        text-align: center;
        color: #fff;
        font-size: 10px;
        transform: scale(0.8);
        line-height: 24px;
    }
    tbody tr{
        cursor: pointer;
    }
    #car_list{
        position: absolute;
        top: 50%;
        left: -400px;
        transition: left .16s;
    }
    #car_list>div{
        background: #fff;
        z-index: 88888888;
        max-height: 450px;
        padding: 8px 15px;
        overflow-y: scroll;
        overflow-x: initial;
        max-width: 500px;
    }
    #car_list .shrink{
        animation:mymove 1s infinite;
        position: absolute;
        right: -70px;
        top: 50%;
        margin-top: -32px;
    }
    @keyframes mymove{
        from {opacity:0;}
        to {opacity:1;}
    }
    #car_list td{
        font-size: 12px;
    }
  
    #dispatchCar > div{
        display: inline-block;
    }
    #dispatchCar{
        position: absolute;
        top: 15px;
        background: #fff;
        z-index: 88;
        left: 40px;
        padding: 8px;
        border: 1px solid #d8d8d8
    }
    .overflow{
        overflow: scroll;
        height: 166px;
    }
    
    .container-fluid{
        position: relative;
        overflow: hidden;
        background: #fff
    }
   
    .car_list{
        background-color: #fff;
        padding: 10px;
        margin: 0;
        height: 210px;
        position: relative;
    }
    .successOrder{
        /*right: 13px;*/
        font-size: 12px;
        color: #FF6B0E;
        line-height: 20px;
    }
    label{
        padding-left: 15px;
        padding-right: 18px;
    }
 
    .right-btn{
        margin-right: 20px;
        color: #fff;
        border-radius: 0;
        border-width: 0;
        background: #39B6E5 ;
        font-size: 12px;
        padding: 5px 20px;
    }
    .right-text{
        margin-right: 20px;
        color: #333;
    }
   
    #list ul{
        clear: both;
        padding-left: 4px;
        margin: 0;
    }
    #list ul li{
        width: 138px;
        margin-right: 4px;
        -webkit-box-shadow:0 0 5px rgba(0, 0, 0, .3);  
        box-shadow:0 0 5px rgba(0, 0, 0, .3);
        box-sizing: border-box;
        display: inline-block;
        position: relative;
    }
    #list ul li a{
        display: block;
        cursor: default
    }
    #list ul li .free{
        border-top: 6px solid #8DCA35 ;
    }
    #list ul li .busy{
        border-top: 6px solid #FF6B0E;
    }
    #list ul li:hover .clearFloat ,#list ul li:hover  .title{
        opacity: .3
    }
    #list ul li a:hover + button,#list ul li button:hover {
        display: block;
    }
    #list ul li button{
        position: absolute;
        bottom: 35px;
        left: 0;
        width: 100%;
        height: 78px;
        opacity: 0.83;
        background: rgba(255, 99, 0, 0.4);
        font-size: 20px;
        color: rgba(0,0,0,.4);
        border-width: 0;
        display: none;
    }
    #list ul .title {
        font-size: 12px;
        color: #333333;
        margin-top: 6px;
        text-align: left;
        padding: 0 6px;
        margin-bottom: 7px;
    }
    #list ul .pull-right{
        margin-right: 6px;
    }
    #list ul .pull-left{
        margin-left: 6px;
        position: relative;
        width: 100%;
    }
    #list ul .pull-left span{
        font-size: 12px;
        color: #333333;
        line-height: 12px;
        display: block
    }
    .mang{
        position: absolute;
        top: 3px;
        left: 30px;
    }
    .yuan{
     
    }
    #list ul  a .ipone{
        text-align: left;
        font-size: 14px;
        color: #999;
        height: 34px;
        margin: 0;
        line-height: 34px;
    }
    .floatd{
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        border-top: 1px solid #f6f6f6;
        margin-top: 4px;
    }
    .clearFloat{
        clear: both;
        overflow: hidden;
        width: 138px;
    }
    .more{
        display: block;
        height: 20px;   
    }
    .more:hover{
        background-color: #d8d8d8
    }
   
    .rescue-operation{
        height: 100%;
        position: absolute;
        width:536px;
        top: 0;
        right: -482px;
        transition: right .16s;
    }
    .rescue-operation .imgs{
        float: left;
        width: 54px;
        position: relative;
        top: 50%;
        margin-top: -93px;
    }
    .imgs a{
        display: block
    }
    .sent{
        position: absolute;
        left: 50%;
        bottom:72px;
        margin-left: -150px;
        z-index: 8888;
    }
    .sent .currenCar{
        background: rgba(255,255,255,.8);
        box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.12);
        padding: 12px ;
        padding-bottom: 0;
    }
    .currenCar .currenCar-left,.currenCar .currenCar-content,.currenCar .currenCar-right{
        float: left;
        font-size: 14px;
        color: #333333;
    }
    .currenCar .currenCar-content{
        padding-right: 10px;
        height: 55px;
        position: relative;
    }
    p{
        margin: 0;
    }
    .currenCar .currenCar-right{
        padding-left: 12px;
        position: relative;
        line-height: 40px;
        border-left:1px solid #c9c9c9;

    }
    .currenCar .currenCar-right a{
        color: #39B6E5;
    }

    .button-top-buttom{
        position: absolute;
        right: 8px;
        top: 0;
    }
    .button-top-buttom a {
        display: block
    }
    .button-top-buttom a img:hover{
        background-color: #ccc
    }
    .anime{
        transition: margin .16s ease
    }
    .blue{
        border-top: 6px solid #39B6E5;
    }
    .marching_list {
        position: relative;
    }
    .marching_list h4{
        display: inline-block;
        margin-bottom: 5px;
        margin-right: 50px;
        vertical-align: -15%;
        font-size: 22px;
    }
    #car_list button{
        background: transparent;
        min-width: inherit;
        font-size: 12px;
        padding:2px 4px;
    }
   
  
</style>