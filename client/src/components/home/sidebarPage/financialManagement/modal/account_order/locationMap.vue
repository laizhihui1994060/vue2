<template>
    <div id="poinMap" :style="{width:width + 'px',height:  parseFloat(height) + 'px' }">
        <div :id="dom" :style="{width:width + 'px',height: parseFloat(height) + 'px' }">
        </div>
        <button v-show="isclose" type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
        </button>
        <div id="toolTips">
            <div v-show="serverInput">
                <input type="text" class="form-control" :id="dom + 'tipinpu'"  placeholder="输入搜索地址" :style="{width:inputWidth + 'px'}">
            </div>
            <div class="Logbtns">
                <!-- <button class="btn btn-primary point_center"   title="移动居中"></button> -->
            </div>
            <div class="checkboxs" v-if="showInfoDistribution">
                <div>
                    <checkbox 
                        name='towTruck' 
                        @updata='integrationData' 
                        text='车辆分布' 
                        :checked="checkboxed"
                        direction="left"
                        label-left='6px'/>
                </div>
                <div>
                    <checkbox 
                        name='driver' 
                        @updata='integrationData' 
                        text='人员分布' 
                        :checked="checkboxed"
                        direction="left"
                        label-left='6px'/>
                </div>
                <div>
                    <checkbox 
                        name='serviceProvider' 
                        @updata='integrationData' 
                        text='驻车点分布' 
                        :checked="checkboxed"
                        direction="left"
                        label-left='6px'/>
                </div>
                <div>
                    <checkbox 
                        name='order' 
                        @updata='integrationData' 
                        text='订单救援地分布' 
                        :checked="checkboxed"
                        direction="left"
                        label-left='6px'/>
                </div>
            </div>
        </div>
        <div style='z-index:100000000000000000' v-if="(preMileageGoto!=''&&preMileageGoto!=undefined)||(preMileageArrive!=''&&preMileageArrive!=undefined)" class="fix">
            <button class="default-btn btn" id="start" @click="begin">开始动画</button>
            <button class="default-btn btn" @click="stop">结束动画</button>
        </div>
        <div class="location—wrap">
            <div style='z-index:100000000000000000' class="showInfo" v-if="(preMileageGoto!=''&&preMileageGoto!=undefined)||(preMileageArrive!=''&&preMileageArrive!=undefined)">
               <span class="headInfo">预计里程及时间</span>
               <div class="bodyDivInfo">
               前往：{{preMileageGoto ? Math.ceil(preMileageGoto) : 0}}（公里）/预计：{{preMinuteGoto ? Math.ceil(preMinuteGoto):0}}（分钟）<br/>
               <span v-if="preMileageArrive!=undefined && preMileageArrive!=''">拖车：{{preMileageArrive  ? Math.ceil(preMileageArrive) : 0}}（公里）/预计：{{ preMinuteArrive ? Math.ceil(preMinuteArrive): 0}}（分钟）<br/></span>
               </div>
            </div>  

            <div style='z-index:100000000000000000' class="showInfo bottomDiv"  v-if="(mileageGoto!=''&&mileageGoto!=undefined)||(mileageArrive!=''&&mileageArrive!=undefined)">
               <span  class="headInfo">实际里程及时间</span>
               <div class="bodyDivInfo">
               前往：{{mileageGoto ? Math.ceil(mileageGoto) : 0 }}（公里）/实际：{{ minuteGoto ? Math.ceil(minuteGoto) : 0}}（分钟）<br/>
               拖车： {{mileageArrive ? Math.ceil(mileageArrive) : 0 }}（公里）/实际：{{ minuteArrive ?Math.ceil(minuteArrive) : 0}}（分钟）<br/>
               </div>
            </div>  
        </div>
    </div>
</template>
<script scoped>
    import checkbox from "./../../../../../../common_component/checkbox.vue";
    import {initMap,addCoordinate,addCooraddress,pathPlanning,addMarkersinging,clearMap,mapBtnAddress,sort_,LnglatDist,moveTo,stopMove,getCurrentAddress,paintCircle,_getParking,_Autocomplete} from "./map.js"; 

    import jishi from "../../../../../../assets/staff.png";
    import zhuche from "../../../../../../assets/parking.png";
    import order from "../../../../../../assets/destinaton.png";
    import cheliang from "../../../../../../assets/cheliang.png";


    export default {
        components:{
            checkbox
        },
        props:{
            rescue: {
                type: Object,
                default: function () {
                    return {
                        Longitude:'',
                        address:'' ,
                    }
                }
            },
            destination: {
                type: Object,
                default: function () {
                    return {
                        Longitude:'',
                        address:'' ,
                    }
                }
            },
            isclose:{
                default:true
            },
            showInfoDistribution:{
                default:false
            },
            serverInput:{
                default:true
            },
            width:{
                default:500
            },
            height:{
                default:500
            },
            inputWidth:{
                default:266
            },
            close:{
                validator: function (value) {
                    return value == 'false';
                }
            },
            dom:{
                type: String,
                default: 'locationMap'
            },
            doubleClick:{
                type: Boolean,
                default: true
            },
            mapBtnAddress:{
                 type: String,
            },
            paintCircleNumber:{}
        },
        mounted(){
            const self = this;
            console.log(typeof this.height)
            const that = this;
            bus.$on("setGpsGui",function(gps_gui){
               that.gps_gui=gps_gui;
               console.log("emit gps in map",gps_gui);
            })
            bus.$on("setActual",function(actual){
               that.mileageArrive=actual.mileageArrive;
                that.mileageGoto=actual.mileageGoto;
                that.minuteArrive=actual.minuteArrive;
                that.minuteGoto=actual.minuteGoto;
            });
            bus.$on("setPreviewArrive",function(preview){
                that.preMileageArrive=preview.mileageArrive;
                that.preMinuteArrive=preview.minuteArrive;
                console.log(that.preMinuteArrive,that.preMileageArrive,"arrive");
            });
             bus.$on("setPreviewGoto",function(preview){
                that.preMileageGoto=preview.mileageGoto;
                that.preMinuteGoto=preview.minuteGoto;
                console.log(that.preMileageGoto,that.preMinuteGoto,"goto");
            });
            bus.$on('address', function (adress) {
                addCooraddress(adress);
            });
          

            bus.$on('getCurrentAddress', function (successFn,errorFn) {
                getCurrentAddress(successFn,errorFn);
            });

            that.$nextTick(function () {
                initMap(that.dom,that.doubleClick);
                if(self.serverInput){
                    setTimeout(function() {
                        _Autocomplete(self.dom + "tipinpu");
                    }, 300);
                }
            });



            if(this.mapBtnAddress)mapBtnAddress(this.mapBtnAddress);



            
        },
        data(){
            return {
                gps_gui:[],
                time:'',
                preMileageArrive:'',
                preMileageGoto:'',
                preMinuteArrive:'',
                preMinuteGoto:'',
                mileageArrive:'',
                mileageGoto:'',
                minuteArrive:'',
                minuteGoto:'',
                time:'',

                param:{
                    "towTruck": false,
                    "driver": false,
                    "serviceProvider": false,
                    "order": false
                },
                checkboxed:false
            }
        },
        created(){
        },
        watch:{
            paintCircleNumber(newv){
                paintCircle(newv);
            }
        },
        methods:{
            begin() {
                var i = 1;
                var mapInfoArr = this.gps_gui;
                var mapInfoArrLen = this.gps_gui.length;
                this.time="";
                var self = this;
                function setCarMove() {
                    if (i < mapInfoArrLen) {
                        var dist = LnglatDist(mapInfoArr[i - 1].gps.x, mapInfoArr[i - 1].gps.y, mapInfoArr[i].gps.x, mapInfoArr[i].gps.y); //m
                        var tm = mapInfoArr[i].created - mapInfoArr[i - 1].created;
                        var speed =dist *15* 3.6 / (tm * (1.0) / 1000); //km/h ，以150倍的速度播放
                        console.log(dist,tm,speed);
                        var infoArr = new Array();
                        if (mapInfoArr[i - 1].gps.x === mapInfoArr[i].gps.x && mapInfoArr[i - 1].gps.y === mapInfoArr[i].gps.y) {//如果两个点的坐标相同
                            i++;
                            if (i >= mapInfoArrLen) {
                                clearTimeout(self.time);
                            }
                        } else {
                            infoArr.push([mapInfoArr[i - 1].gps.x, mapInfoArr[i - 1].gps.y]);
                            infoArr.push([mapInfoArr[i].gps.x, mapInfoArr[i].gps.y]);
                            moveTo(infoArr,speed);//moveto的速度是千米每小时
                            infoArr = null;
                            i++;
                            if (i >= mapInfoArrLen) {
                                clearTimeout(self.time);
                            }   
                        }
                        self.time = setTimeout(setCarMove,parseInt(tm * (1.0))/15);//以15倍的速度播放

                    }
                }

                setCarMove();


            },
            stop(){
                clearTimeout(this.time);
                stopMove();
            },
            clearCheckboxed(){
                $('.checkboxs').find('input:checkbox').each(function(index, el) {
                    el.checked = false;
                });
                _getParking('clear');

                this.param = {
                    "towTruck": false,
                    "driver": false,
                    "serviceProvider": false, 
                    "order": false
                }
                
            },
            integrationData(name,data){
                this.param[name] = data;
                console.log(this.param)
                send({
                    type:'post',
                    url:'control:/towtruckmatching/list/geographicalDistribution',
                    param:this.param
                },function(err,res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200){
                        console.log(res)
                        let content = res.content[0],
                            url = '',
                            map_data = [];


                        switch(name){
                            case 'towTruck':
                                map_data = content.towTruckDistribution ? content.towTruckDistribution.map((item,index)=>{
                                    let status = item.status == 'FREE' ? '空闲' : '忙';
                                    let icon = item.status.toLowerCase() + 1;


                                    return {
                                        x: item.lng,
                                        y: item.lat,
                                        str:`<div>车辆类型：${item.category ? item.category : ''}</div>
                                                    <div>车牌号码：${item.name ? item.name : ''}</div>
                                                    <div>车辆位置：${item.address ? item.address : ''}</div>
                                                    <div>车辆状态：${status}</div>`,
                                        content:`<div class='amap-icon map_car_img  ${icon}' style='position: absolute;opacity: 1;left:9px'></div>`,
                                        label:item.name
                                    }

                                }):[];

                                let map_data2 = content.partnerTowTruckDistribution ? content.partnerTowTruckDistribution.map((item,index)=>{
                                    let status = item.status == 'FREE' ? '空闲' : '忙';
                                    let icon = item.status.toLowerCase() + 1;


                                    return {
                                        x: item.lng,
                                        y: item.lat,
                                        str:`<div>车辆类型：${item.category ? item.category : ''}</div>
                                                    <div>车牌号码：${item.name ? item.name : ''}</div>
                                                    <div>车辆位置：${item.address ? item.address : ''}</div>
                                                    <div>服务商名称：${item.orgName ? item.orgName : ''}</div>
                                                    <div>车辆状态：${status}</div>`,
                                        content:`<div class='amap-icon map_car_img  ${icon}' style='position: absolute;opacity: 1;left:9px'></div>`,
                                        label:item.orgName + ' | ' + item.name
                                    }

                                }):[];

                                const newArr = map_data.concat(map_data2)

                                _getParking(name,newArr);
                               
                            break;
                            case 'driver':

                                send({
                                    type:'get',
                                    url:'control:/online/heartbeat/org'
                                },function(err,res){
                                    if(err)alert('服务器出错，请联系管理员');
                                    if(res.status == 200){
                                        const data = res.content;
                                        console.log(data)

                                        map_data = content.employeeDistribution ? content.employeeDistribution.map((item,index)=>{

                                            let str = '';


                                            data.forEach(function(it,index){
                                                if(it.uid == item.entityId){
                                                    str = `<div>员工状态:在线</div>
                                                            <div>设备平台：${it.platform == 'ANDROID' ? '安卓' : it.platform == 'IOS' ? '苹果' : '网页'}</div>
                                                            <div>设备名称：${it.deviceName}</div>`;
                                                }
                                            });


                                            return{
                                                x: item.lng,
                                                y: item.lat,
                                                str:`<div>名字：${item.name ? item.name : ''}</div>
                                                            <div>手机号：${item.workmobile ? item.workmobile : ''}</div>
                                                            <div>${str ? str : '员工状态：离线'}</div>`,
                                                content:"<div class='amap-icon map_car_img staff' style='position: absolute;opacity: 1;left:9px'></div>",
                                                label:item.name
                                            };

                                           
                                        }):[];
                                        _getParking(name,map_data);


                                    }else{
                                        alert(res.msg);
                                    }
                                })

                                url = jishi;
                            break;
                            case 'serviceProvider':
                                map_data = content.parkingLotDistribution ? content.parkingLotDistribution.map((item,index)=>{


                                    return {
                                        x: item.lng,
                                        y: item.lat,
                                        str:`<div>服务商名称：${item.name ? item.name : ''}</div>
                                                    <div>驻车点名称：${item.name2 ? item.name2 : ''}</div>
                                                    <div>驻车点位置：${item.address ? item.address : ''}</div>`,
                                        content:"<div class='amap-icon map_car_img  parking' style='position: absolute;opacity: 1;left:9px'></div>",
                                        label:item.name2
                                    }

                                        
                                }):[];
                                _getParking(name,map_data);

                            break;
                            case 'order':
                                map_data = content.orderIncidentDistribution ? content.orderIncidentDistribution.map((item,index)=>{

                                    return {
                                        x: item.lng,
                                        y: item.lat,
                                        str:`<div>救援地：${item.address ? item.address : ''}</div>
                                                    <div>订单号：${item.name ? item.name : ''}</div>`,
                                        content:"<div class='amap-icon map_car_img  destinaton' style='position: absolute;opacity: 1;left:9px'></div>",
                                        label:item.name
                                    }

                                 
                                }):[];
                                _getParking(name,map_data);

                            break;
                        }
                      
                        // map_data = map_data.concat(orderIncidentDistribution,employeeDistribution,towTruckDistribution,towTruckDistribution)

                    }else{
                        alert(res.msg);
                    }
                })
            }
        
        }
     }

</script>
<style scoped>
    .show_jishi{
        background: #39B6E5 url('../../../../../../assets/jishi.png') no-repeat center;
        width: 36px;
        height: 36px;
        /* border: 1px solid #39B6E5 !important; */
    }
    #toolTips{
        position: absolute;
        z-index: 88;
        left: 24px;
        top: 18px;
    }
    #toolTips div{
        display: inline-block;
        vertical-align: middle;
    }
    #poinMap #toolTips input[type="text"]{
        margin-left: 47px;
        height: auto;
        padding: 8px 13px;
        position: relative;
    }
    #toolTips input,#toolTips button{
        border-radius: 0;
        -webkit-box-shadow:0 0 10px rgba(0, 204, 204, .3);  
        -moz-box-shadow:0 0 10px rgba(0, 204, 204, .3);  
        box-shadow:0 0 10px rgba(0, 204, 204, .3);
        border-width: 0;  
    }
    .input-group-addon{
        background-color: #39B6E5 ;
        padding: 6px 12px;
    }
    .glyphicon-search{
        color: #fff;
        font-size: 20px
    }
    .checkboxs{
        margin-left: 20px;
        background: #fff;
        padding: 6px 13px;
        box-shadow: 0 0 10px rgba(0, 204, 204, .3);
    }
    .checkboxs > div:nth-child(1){
        margin-left: 0
    }
    .checkboxs > div{
        margin-left: 25px;
    }
    #poinMap .close{
        position: absolute;
        right: 0;
        top: 0;
        z-index: 8888888888888888888;
        background: rgba(255,255,255,0.5);
        color: #000;
        font-size: 30px;
        width: 28px;
        height: 28px;
        opacity: 1;
        border: none;
        border-radius: 50%;
        line-height: 28px;
    }
    .topInfo{
        opacity: 0.8;
        background: #FFFFFF;
        box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.12);
        padding: 8px;
    }
    .topInfo p{
        margin: 0;
    }
    .fix{
        position: absolute;
        bottom:20px;
        right:14px;
        color:white; 
    }
    .fix button:nth-child(1){
        margin-right: 20px;
        color: #1786F7
    }
    .fix button:nth-child(2){
        color: red
    }
    .fix button{
        background: #fff;
        border-width:0;
        border-radius: 25px;
        width: 102px;
        box-shadow: 0px 0px 20px rgba(0,0,0,.5);

    }
    .location—wrap{
        bottom:80px;
        right:10px;
        width:260px;
        position:absolute;
        z-index: 9999999999999999999999999999999999999;
    }
    .showInfo{
        background: white;
        border-radius: 6px;
        overflow: hidden;
    }
    .bottomDiv{
        margin-top: 10px;
    }
    .headInfo{
        background:#1786F7;
        width:100%;
        padding:5px;
        color:white;
        display:block;
        text-align: center;
    }
    .bodyDivInfo{
        padding:5px;
    }
    #locationMaptipinpu{
        width:400px !important;
    }
</style>