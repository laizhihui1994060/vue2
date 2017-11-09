<template>
	<div id="jobTrack">
			<breadcrumb
			    :arr="[{path:'/LoginFinish/financialManagement/accounting_order',text:'核算订单'},{path:'auto',text:orderCode},{path:'',text:jobCode + '的任务轨迹'}]"/>
		        <div style="display:flex">
				<div id="taskNode" class="com-node clearfix" :style="{height:oHeight + 'px'}">
				    <p v-text="text" class="tishiyu"></p>
				    <h3 v-if="!nodes || !nodes.length" class="text-center tishiyu" style="text-align:center;line-height:200px;font-size:26px;">暂无节点信息</h3>
				    <div class="zhixian pull-left" v-else>
				        <div class="circle_wrap" v-for="(node,index) in  nodes" >
				            <div class="circle"></div> 
				            <span v-if="index !== nodes.length-1"></span>
				        </div>
				    </div>
				    <ul class="node pull-right">
				       <li  v-for="node in  nodes">
				           <div class="pull-left taskNode-info">
				                <p class="sp" v-text="node.reportedType == 'AGENT' ? match(node.status) + '（调度员完成报数）': match(node.status)"></p>
				                <span class="ss"  v-text="getLocalTime(node.actionTime)"></span>
				           </div>
				           <div class="pull-right fnbtn">
				                <a href="javascript:;" v-if="node.gpsLocation &&(node.gpsLocation.x != 0 || node.gpsLocation.y != 0)"  @click="addMark([node.gpsLocation.x,node.gpsLocation.y],node.address,match(node.status))">
				                    <i class='img poin'></i>
				                </a>
				           </div>
				       </li>
				    </ul>
				</div>  

				<div id="mweixyi">
				    <location-map 
				        :isclose="false"
				        :height="oHeight"
				        width="auto"
                                    dom='mweixyi'
				        :serverInput = "false"
                                                        :doubleClick='false'
				        :lntlng="lntlng"/>
				</div>
		        </div>
	</div>
</template>


<script>
import {addCarMaker,getTrack,search_,addCoordinate,openInfo} from  "./map.js";
import  locationMap from "./locationMap.vue";
import breadcrumb  from "../../../../../../common_component/breadcrumb.vue"

    export default{
        components:{
            locationMap,
            breadcrumb
        },
        data () {
            return {
	            	jobCode: '',
	            	orderCode: '',

	            	jobId: '',

                gps_gui:[],
                text:'',
                num:1,
                oHeight: '',
                nodes: []
            }
        },
        created(){
        	const self = this;
        	this.oHeight = document.body.clientHeight - 150 + 'px';

        	this.jobCode = this.$route.params.jobCode;
        	this.orderCode = this.$route.params.orderCode;
        	this.jobId = this.$route.params.jobId;

        	this.toggle(self.jobId)
        	this.$nextTick(function(){
        	        $('.circle_wrap:last').find('span').css({display:'none'});
        	});

        	// 获取nodes
        	send({
        	    url:'order:/order/job/nodes/' + self.jobId,
        	    type:'get'
        	},function(err,res){
        	    if(err)return console.log(res);
        	    if(res.status == 200 || res.status == 404 ){

        	        var newArr = [];
        	        var nodes = res.content;
        	        nodes.forEach(function(it,index){
        	            nodes[index].photo = [];
        	            newArr.push(it.towDriverActionId);
        	        });

        	        self.nodes = nodes;

        	        console.log(nodes)

        	    }else{
        	        console.log(res);
        	        alert(res.msg);
        	    }
        	});
        },
        methods:{
            toggle(jobId){
                const self = this;
                if(jobId){
                    send({
                        type: 'get',
                        url: 'gps:/gpshistory/mileagebyjob/' + jobId
                    }, function(err, res) {
                        console.log(res)
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
                            var mudi = res.content[0].arriveDestinationAction ? {
                                lnglat:res.content[0].arriveDestinationAction.gpsLocation,
                                address:res.content[0].arriveDestinationAction.address
                            } : null;


                            var preview={mileageGoto:'',minuteGoto:'',mileageArrive:'',minuteArrive:''};
                            if(chufa.lnglat.x && chufa.lnglat.y && jiuyuan.lnglat.x && jiuyuan.lnglat.y){
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
            getLocalTime(ns){
                return util.getLocalTime(ns);
            },
            match(status){
              return util.matchTackNode(status);
            },
            addMark(point,address,status){
                 let info = `<div style="font-size:18px;color:#FF6B0E">${status}</div>
                            <div><b>当前地址:</b>${address}</div>
                            <div><b>当前坐标:</b>${point[0].toFixed(6) + ',' + point[1].toFixed(6)}</div>;`

                // let position = 

                openInfo(info,point)

            },
           
        }
    }
</script>



<style>
	#jobTrack{
        margin-bottom: 0;
        margin-top: 10px;
	}
	#jobTrack #mweixyi{
		position: relative;
	}

	#jobTrack .fix{
		bottom: 40px;
		right: 10px;
        z-index: 1000000000;
	}
	
	#jobTrack .tishiyu{
        color: #FF6B0E;
        text-align: right;
        padding-right: 20px;
        margin: 0;
    }
    #jobTrack #mweixyi{
        flex: 1;
    }
    #jobTrack .tishi{
        color: #FF6B0E;
        position: absolute;
        left: 0;
        top: 1px;
    }
  
    #jobTrack .taskList .userInfo {
        border-bottom: 1px solid #ccc;
        padding-left: 20px;
    }
    
 
   #jobTrack .taskList .shuxian{
        width: 1px ;
        height: 200px;
        background: #EEEEEE;
        margin: 0 12px; 
    }
    #jobTrack .taskList .rightInfo p{
        margin: 0;
        line-height: 14px;
    }
    #jobTrack .taskList .rightInfo label, #jobTrack .taskList .rightInfo span {
        font-size: 12px;
        color: #666666;
        margin-bottom: 0;
    }
    #jobTrack .xiala{
        display: block;
        height: 14px;
        text-align: center;
        border-top: 1px solid #EEEEEE;
        margin-top: 12px;
    }
    #jobTrack .xiala:hover{
        background: #eee;
    }
    #jobTrack .xiala:hover #triangle-down {
        border-top-color: #39B6E5;
        border-bottom-color:#39B6E5 ;
    }
    #jobTrack #triangle-down {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        position: relative;
    }
   #jobTrack .orderInfo{
        display: flex;
    }
    #jobTrack #taskNode{
        position: relative;
        width: 320px;
        padding-top: 7px;
        margin-right: 2px;
        margin-bottom: 0;
        overflow-y: auto;
        border: 1px solid #ccc;
        background: #fff
    }
   #jobTrack .sp,
   #jobTrack .node .Photo-info p{
        margin: 0;
        font-size: 14px;
        color: #333333;
        line-height: 16px;
    }
    #jobTrack .com-node{
        width: 100%;
    }
    #jobTrack .node {
        width: 264px;

    }

    #jobTrack #taskNode .returna{
        text-align: right;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
    }
    #jobTrack #taskNode .returna a{
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50% ;
        text-align: center;
        box-sizing: border-box;
        padding: 6px 0;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
        margin-right: 17px;
        margin-bottom: 10px;
    }
    #jobTrack .node li{
        height: 46px;
        padding-bottom:10px;
        margin-bottom:10px;
        border-bottom: 1px solid #eee;
    }
    #jobTrack #taskNode .fnbtn{
        width: 56px;
        padding-top: 6px;
    }
     #jobTrack #taskNode .fnbtn a{
        display: inline-block;
     }
    #jobTrack #taskNode .fnbtn a:nth-child(1){
        margin-right: 18px;
    }
    #jobTrack .zhixian{
        padding-top: 3px;
        margin-left: 22px;
    }
    #jobTrack .zhixian .circle_wrap{
        text-align: center;
        height: 56px;
        overflow: hidden;
    }
    #jobTrack .zhixian .circle{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #39B6E5;
        border: 1px solid #39B6E5;

    }
    #jobTrack .zhixian span{
        display: inline-block;
        height: 56px;
        width: 1px;
        background: #39B6E5;
    }
    #jobTrack #tag{
        width: 641px;
        padding-left: 2px;
        box-sizing: border-box
    }
     #jobTrack #tag >li:nth-child(1){
        box-shadow:rgba(0, 0, 0, 0.3) 0px 0px 2px;
    }
    #jobTrack #tag >li {
        border: 1px solid #39B6E5;
        margin: 0;
        padding: 5px 12px; 
        cursor: pointer;
        width: 25%;
    }
    #jobTrack #tag >li:last-child{
        border-right-width: 1px; 
    }
    #jobTrack #tag >li >a{
        background-color: transparent;
        text-align: center;
        font-size: 14px;
        color: #666;
        line-height: 14px;
        padding: 0;
        font-weight: normal;
    }
    #jobTrack #tag .active{
        background: #39B6E5;
        box-sizing: border-box;
    }
    #jobTrack #tag .active>a{
        color: #fff
    }
    #jobTrack #order_info_footer{
        height: 255px;
        overflow: hidden;
    }
    #jobTrack .img{
        display: block
    }
</style>