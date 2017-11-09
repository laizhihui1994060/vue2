<template>
    <div class="modal fade" id="table" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel" v-text="informtion.reconciliationCode + '对账单浏览'"></h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered" id='tableId' style="width:5000px">

                        <thead>
                              <tr >
                                    <td colspan="35" class="text-center">大陆上海非事故道路救援清单</td>
                                </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <th>序号</th>
                            <th>救援时间</th>
                            <th>用户姓名</th>
                            <th>客户类别</th>
                            <th>保单号</th>
                            <th>卡号</th>
                            <th>车牌</th>
                            <th>省份</th>
                            <th>城市</th>
                            <th>区县</th>
                            <th>故障地点</th>
                            <th>拖车终点</th>
                            <th>故障原因</th>
                            <th>施救结果</th>
                            <th>求救时间</th>
                            <th>派车时间</th>
                            <th>到达时间</th>
                            <th>完成时间</th>
                            <th>出发公里数</th>
                            <th>到达公里数</th>
                            <th>拖车公里数</th>
                            <th>返回公里数</th>
                            <th>总行驶里程</th>
                            <th>空驶里程</th>
                            <th>自解原因</th>
                            <th>自解时间</th>
                            <th>超范围公里数</th>
                            <th>超公里数费用</th>
                            <th>费用</th>
                            <th>是否有困境</th>
                            <th>困境备注</th>
                            <th>救援厂</th>
                            <th>路桥费</th>
                            <th>备注</th>
                        </tr>  
                         <tr>
                            <td>接单号</td>
                            <td>年/月/日</td>
                            <td>姓名</td>
                            <td>平安非事故</td>
                            <td>不填</td>
                            <td>不填</td>
                            <td>车牌号码</td>
                            <td>省</td>
                            <td>市</td>
                            <td>区县</td>
                            <td></td>
                            <td>拖至终点</td>
                            <td>故障原因</td>
                            <td>完成与取消为同一类型内的区分</td>
                            <td>接单时间</td>
                            <td>车辆发车时间</td>
                            <td>车辆到达时间</td>
                            <td>完成时间</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>完成里程</td>
                            <td></td>
                            <td>取消原因</td>
                            <td></th>
                            <td></td>
                            <td></td>
                            <td>费用</td>
                            <td></td>
                            <td></td>
                            <td>救援厂</td>
                            <td></td>
                            <td></td>
                        </tr>  

                        <tr v-for="item in caseList" >
                            <td v-if="item.towOrderInfo" v-text='item.towOrderInfo.customerCaseNo'></td>
                            <td v-if="item.towOrderInfo" v-text='timeFormat(item.towOrderInfo.orderScheduleTime,"yyyy/MM/dd")'></td>
                            <td v-if="item.towOrderInfo" v-text="item.towOrderInfo.vehicleOwner && item.towOrderInfo.vehicleOwner.length ?item.towOrderInfo.vehicleOwner[0]['carOwnerName'] : ''"></td>
                            <td v-if="item.towOrderInfo"></td>
                            <td></td>
                            <td></td>
                            <td v-if="item.towOrderInfo">
                                <div v-if="item.towOrderInfo.vehicleOwner && item.towOrderInfo.vehicleOwner.length">
                                    <p v-for='i in item.towOrderInfo.vehicleOwner' style="margin:0">
                                        <span v-text='i.vehiclePlateNo'></span>
                                    </p>
                                </div>
                            </td>
                            <td v-if="item.towOrderInfo" v-text='item.towOrderInfo.incidentProvince'></td>
                            <td v-if="item.towOrderInfo" v-text='item.towOrderInfo.incidentCity'></td>
                            <td v-if="item.towOrderInfo" v-text='item.towOrderInfo.incidentDistrict'></td>
                            <td v-if="item.towOrderInfo" v-text='item.towOrderInfo.incidentAddress'></td>
                            <td v-if="item.towOrderInfo" v-text='item.towOrderInfo.destProvince+item.towOrderInfo.destCity+item.towOrderInfo.destDistrict+item.towOrderInfo.destAddress'></td>
                            <td v-if="item.towOrderInfo" v-text='matchJobType(item.towOrderInfo.jobType)'></td>
                            <td v-if="item.towOrderInfo" v-text='rescueResult(item.towOrderInfo.orderStatus)'></td>
                            <td v-if="item.towOrderInfo" v-text='timeFormat(item.towOrderInfo.created,"yyyy/MM/dd hh:mm:ss")'></td>
                            <td v-if="item.towOrderInfo" v-text="item.towOrderInfo.towJobInfo ? timeFormat(item.towOrderInfo.towJobInfo.dispatchTime,'yyyy/MM/dd hh:mm:ss') : ''"></td>
                            <td v-if="item.towOrderInfo">
                                <p v-for=" i in item.towOrderInfo.towDriverActionInfo" v-if="i.towDriverActionType == 'ARRIVE_AT_INCIDENT_SPOT'">
                                    <span v-text="timeFormat(i.towDriverActionType == 'ARRIVE_AT_INCIDENT_SPOT' ? i.actionTime : 0,'yyyy/MM/dd hh:mm:ss') "></span>
                                </p>
                            <td  v-if="item.towOrderInfo" v-text='timeFormat(item.towOrderInfo.completeTime,"yyyy/MM/dd hh:mm:ss")'></td>
                            <td ></td>
                            <td v-if="item.towOrderInfo" v-text="item.towOrderInfo.towJobResultInfo ? item.towOrderInfo.towJobResultInfo.mileageToIncidentSpot : ''"></td>
                            <td v-if="item.towOrderInfo" v-text="item.towOrderInfo.towJobResultInfo ? item.towOrderInfo.towJobResultInfo.mileageTowing : ''"></td>
                            <td v-if="item.towOrderInfo" v-text="item.towOrderInfo.towJobResultInfo ? item.towOrderInfo.towJobResultInfo.mileageBack : ''"></td>
                            <td v-if="item.towOrderInfo" v-text="item.towOrderInfo.towJobResultInfo ? item.towOrderInfo.towJobResultInfo.mileageToIncidentSpot+item.towOrderInfo.towJobResultInfo.mileageTowing+item.towOrderInfo.towJobResultInfo.mileageBack:''"></td>
                            <td></td>
                            <td v-if="item.towOrderInfo" v-text='item.towOrderInfo.jobCancelReason'></td>
                            <td v-if="item.towOrderInfo" v-text='timeFormat(item.towOrderInfo.jobCancelTime,"yyyy/MM/dd hh:mm:ss")'></th>
                            <td></td>
                            <td></td>
                            <td v-if="item.towOrderInfo" v-text='item.towOrderInfo.charge'></td>
                            <td></td>
                            <td></td>
                            <td v-text='orgName'></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr >
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></th>
                            <td></td>
                            <td></td>
                            <td v-text='totalCharge'></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> </td>
                        </tr>  
                        </tbody>
                        
                    </table>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn"  @click="downloadTableExcel">确定下载</button>
                        <button type="button" class="btn" data-dismiss="modal">取消下载</button>
                    </div>
                </div>
                <span id="towOrderId" style="display:none"></span>
            </div>
        </div>
    </div>
</template>

<script>
import excel from '../../static/js/excel.js'
import datetimepicker from "./datetimepicker.vue";
export default{
    props:{
        'caseList':{
            type:Array
        },
        'informtion':{
            type:Object
        }

    },
    computed: {
        startString(){
            if(this.startValue) return new Date(this.startValue).toString();
        },
        endString(){
            if(this.endValue) return new Date(this.endValue).toString();
        }
    },
    components:{
        datetimepicker
    },
    data () {
        return {
            color : '#999',
            start_end_time:{
                start:'',
                end:''
            },
            orgName:global.ourOrgName,
            totalCharge:0
        }
    }, 
    methods:{

        matchJobType(status){
            return status ? util.matchRescueType(status).cn : '';
        },
        updata(name,value, $ele, type){
            // 有一个不未空
            if(obj.end || obj.start){
                // type == 'end'
                if(type == 'end'){
                    console.log(obj['start'], value)
                    if(obj['start'] > value){
                        alert('结束时间不能小于开始时间');
                        $ele.val('');
                        return;
                    }
                }else{
                    console.log(obj['end'], value)
                    if(obj['end'] < value){
                        alert('开始时间不能大于结束时间');
                        $ele.val('');
                        return;
                    }
                }
            }
            obj[type] = value;
            this.$emit('updata',name,value)
        },
        downloadTableExcel(){
            console.log("下载");
            excel('tableId');
            
            
        },
        timeFormat(timestamp,format){
            if(null==timestamp || timestamp==0 ){
                return "";
            }
             return (new Date(timestamp)).Format(format);
        },
        rescueResult(type){
            return util.matchOrderStatus(type);
        }
    },
    watch:{
        caseList(data){
            console.log('1111@@',data)
            const self = this;
            self.totalCharge = 0;
            data.forEach(function(it,index){
                if(it.towOrderInfo)self.totalCharge += Number(it.towOrderInfo.charge);
            });
        },
        informtion(data){
            console.log('@@@@@@@@@@@@@@@@@@@@@@',data)
        }
    }    
  }
  var obj = {
      start: 0,  
      end: 0,
  };
</script>
<style scoped>
.modal .modal-dialog{
    width: 100%;
}
.modal .modal-dialog .modal-content{
    overflow-x: scroll;
    
}

</style>
