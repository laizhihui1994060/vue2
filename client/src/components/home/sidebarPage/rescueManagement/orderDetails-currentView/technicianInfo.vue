<template>
    <div>    
        <div class="orderInfo">
            <div class='returnHome'> 
                <a class="pull-right" @click="returnHome" title="返回上一页">
                    <img src="../../../../../assets/returnHome.png" height="90" width="90">
                </a>
            </div>
           
            <div id="mweixyi">
                <location-map 
                    :isclose="false"
                    :height="oHeight"
                    width="auto"
                    :serverInput = "false"
                    :lntlng="lntlng"/>
            </div>
           
        </div>
        <div id="order_info_footer">
            <ul class="nav nav-pills" role="tablist" id="tag">
                <li role="presentation"  :class="{'active':currentView == 'photoInfo'}" @click="currentView = 'photoInfo'">
                    <a href="javascript:;">救援照片</a>
                </li>
                <li role="presentation"  :class="{'active':currentView == 'recordingFile'}" @click="currentView = 'recordingFile'">
                    <a href="javascript:;">录音文件</a>
                </li>
               <!--  <li role="presentation"  :class="{'active':currentView == 'smsFile'}" @click="currentView = 'smsFile'">
                    <a href="javascript:;">短信文件</a>
                </li> -->
                <li role="presentation"  :class="{'active':currentView == 'modifyRecord'}" @click="currentView = 'modifyRecord'">
                    <a href="javascript:;">修改记录</a>
                </li>
                <!-- <li role="presentation"  :class="{'active':currentView == 'modifyRecord'}" @click="print">
                    <a href="javascript:;">截屏</a>
                </li> -->
            </ul>
            <div style="margin-left:2px;background:#fff;box-shadow: rgba(0, 0, 0, 0.5) 4px -2px 4px;position:relative">
                <component :is="currentView" :obj="obj" :orderId='orderId'  :num="num" :jobId='obj.jobId'></component>
            </div>
        </div>
          
    </div>
</template>
<script>
import {addCarMaker,getTrack,search_,addCoordinate,openInfo} from  "../../../../../common_component/map.js";
import  locationMap from "../../../../../common_component/locationMap.vue";
import  smsFile from "./smsFile.vue";
import  modifyRecord from "./modifyRecord.vue";
import  recordingFile from "./recordingFile.vue";
import  photoInfo from "./photoInfo.vue";

    export default{
        props:['orderId','obj','oHeight', 'jobId', 'partnerId'] ,
        components:{
            locationMap,
            photoInfo, 
            recordingFile,
            smsFile,
            modifyRecord
        },
        mounted(){
            const self = this;
            
        },
        data () {
            return {
                showImg:config.img_path,
                gps_gui:[],
                text:'',
                currentView:'photoInfo',
                num:1
            }
        },
        methods:{
            print(){
                window.print();
            },
            returnHome(){
                $('.modal-backdrop').remove();
                history.go(-1);
            },
            canvas(){
                global.canvas($('#orderDetails')[0])
            },
            toggle(user){
                const self = this;
                console.log(user.jobId, 'gps:/gpshistory/mileagebyjob/' + user.jobId)
                if( user &&  user.jobId){
                    send({
                        type: 'get',
                        url: 'gps:/gpshistory/mileagebyjob/' + user.jobId,
                        param: null
                    }, function(err, res) {
                        console.log('!!!!!!!!!!!!!',err,res)
                        if (err) return console.log(err);
                        if (res.status == 200) {
                            var chufa = {
                                lnglat:res.content[0].setoffAction.gpsLocation,
                                address:res.content[0].setoffAction.address
                            };
                            var jiuyuan = {
                                lnglat:res.content[0].arriveIncidentAction.gpsLocation,
                                address:res.content[0].arriveIncidentAction.address
                            };
                            var mudi = res.content[0].arriveDestinationAction ?{
                                lnglat:res.content[0].arriveDestinationAction.gpsLocation,
                                address:res.content[0].arriveDestinationAction.address
                            }:null;


                            var preview={mileageGoto:'',minuteGoto:'',mileageArrive:'',minuteArrive:''};
                            if(chufa.lnglat && jiuyuan.lnglat && chufa.lnglat.x && chufa.lnglat.y && jiuyuan.lnglat.x && jiuyuan.lnglat.y){
                                if (mudi == null) {
                                   search_(chufa, jiuyuan, null,function(status,result){
                                        if(status=="complete"){
                                          preview.mileageGoto=result.routes[0].distance;
                                          preview.minuteGoto=result.routes[0].time;
                                          bus.$emit("setPreviewGoto",preview);
                                        }  
                                    },null);
                                } else {
                                    search_(chufa, jiuyuan, mudi,function(result, status) {
                                        if (status == "complete") {
                                            preview.mileageGoto = result.routes[0].distance;
                                            preview.minuteGoto = result.routes[0].time;
                                        }
                                        bus.$emit("setPreviewGoto",preview);
                                    }, function(status, result) {
                                        if (status == "complete") {
                                            preview.mileageArrive = result.routes[0].distance;
                                            preview.minuteArrive = result.routes[0].time;
                                        }

                                    });
                                    
                                    var actual={
                                        mileageArrive:res.content[0].mileageArrive,
                                        mileageGoto:res.content[0].mileageGoto,
                                        minuteArrive:res.content[0].minuteArrive,
                                        minuteGoto:res.content[0].minuteGoto
                                    };
                                    bus.$emit("setActual",actual);
                                    getTrack(res.content[0].vehicleGpsHistory!=null?res.content[0].vehicleGpsHistory:res.content[0].userAppGpsHistory, function(gps_gui) {
                                        bus.$emit("setGpsGui",gps_gui);
                                    });
                                }
                            }else{
                                self.text="暂无GPS轨迹";
                            }
                            var actual={
                                mileageArrive:res.content[0].mileageArrive,
                                mileageGoto:res.content[0].mileageGoto,
                                minuteArrive:res.content[0].minuteArrive,
                                minuteGoto:res.content[0].minuteGoto
                            };
                            bus.$emit("setActual",actual);

                            getTrack(res.content[0].vehicleGpsHistory!=null?res.content[0].vehicleGpsHistory:res.content[0].userAppGpsHistory, function(gps_gui) {
                                bus.$emit("setGpsGui",gps_gui);
                            });
                        } else if(res.status == 404){ 
                            self.text="暂无GPS轨迹";
                        }else {

                            self.text="暂无GPS轨迹";
                            console.log(res)
                            // alert(res.msg)
                        }

                    });
                   
                }else{
                    self.text="暂无GPS轨迹";
                };
            },
            // getGps(nodes,user,cd){
            //     send({
            //         url:'gps:/gpshistory/vehiclehistoryrecord',
            //         type:'post',
            //         param:{
            //             "startTime": nodes[0].actionTime,
            //             "endTime": nodes[nodes.length-1].actionTime,
            //             "userAppGps": [{"sysUserId": user.driverId}],
            //             "vehicleGps": [{"towTruckId": user.truckId}]
            //         }
            //     },function(err,res){
            //         if(err)return alert('服务器出错，请联系管理员');
            //         cd(res)
            //     });
            // },
            
           
          
          
            parentFn(){
                this.$parent.parentFn();
            }
           
        },
        watch:{
            obj(newv){
                const self = this;
                console.warn(newv)
                this.toggle(newv)
                this.$nextTick(function(){
                        $('.circle_wrap:last').find('span').css({display:'none'});
                });


                if(!newv || !newv.nodes && !newv.nodes.length)return 
                newv.nodes.forEach(function(item,index){
                    if(item.photo && item.photo.length){
                        item.photo.forEach(function(){
                            ++self.num;
                        });
                    }
                });
            }
        }
    }
</script>
<style scoped>
    
    #mweixyi{
        flex: 1;
    }
   
    .taskList .userInfo {
        border-bottom: 1px solid #ccc;
        padding-left: 20px;
    }
    
 
    .taskList .shuxian{
        width: 1px ;
        height: 200px;
        background: #EEEEEE;
        margin: 0 12px; 
    }
    .taskList .rightInfo p{
        margin: 0;
        line-height: 14px;
    }
    .taskList .rightInfo label,.taskList .rightInfo span {
        font-size: 12px;
        color: #666666;
        margin-bottom: 0;
    }
    .xiala{
        display: block;
        height: 14px;
        text-align: center;
        border-top: 1px solid #EEEEEE;
        margin-top: 12px;
    }
    .xiala:hover{
        background: #eee;
    }
    .xiala:hover #triangle-down {
        border-top-color: #39B6E5;
        border-bottom-color:#39B6E5 ;
    }
    #triangle-down {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        position: relative;
    }
    .orderInfo{
        display: flex;
        position: relative;
    }
    #taskNode{
        position: relative;
        width: 320px;
        padding-top: 7px;
        margin-right: 2px;
        margin-bottom: 0;
        overflow-y: auto;
    }
   
    
    #tag{
        width: 641px;
        padding-left: 2px;
        box-sizing: border-box;
        margin-bottom: 5px;
        position: absolute;
        top: -36px;
        z-index: 888;
    }
    
    #tag >li {
        background: #D9DEE1;
        margin-right:10px;
        width: 160px;
        border-radius: 7px 7px 0 0;
    }
    #tag >li:nth-child(1){
        margin-left: 5px;
    }
    #tag >li >a{
        padding: 7px 0;
        display: block;
        color: #5D677C;
        text-align: center;
    }
    #tag .active{
        background: #1786F7 !important;
        margin-top: -9px;
    }
    #tag .active>a{
        color: #fff;
        padding: 12px 0;
        background: transparent !important;
    }
    #order_info_footer{
        height: 180px;
        position: relative;
    }
    .img{
        display: block
    }
    .returnHome{
        position: absolute;
        z-index: 8888;
        right: 10px;
        top: 10px;
    }
</style>