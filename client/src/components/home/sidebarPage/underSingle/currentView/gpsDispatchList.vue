<template>
    <div id="car_list_realTime"  v-if="num">
        <a href="javascript:;" class="operation" @click="car_list_open_close" title="收缩"><img src="../../../../../assets/cars/shrink.png" height="50" width="50"></a>
        <div class="car_list_realTime-header clearfix">
            <div class="pull-left">
                <p>车辆分布列表（共<span v-text="num"></span>辆）</p>
            </div>
            <div class="pull-right">
                <input type="text" placeholder="请输入车辆号码进行搜索" v-model="filterCar">
            </div>
        </div>
        <div class="car_list_realTime-footer">
            <table class="table table-bordered table-hover text-center">
                <thead>
                    <tr>
                        <th>车牌号码</th>
                        <th>技师反馈</th>
                        <th>系统检测</th>
                        <th>空载/重载</th>
                        <th>订单号</th>
                        <th>当前速度</th>
                        <th>去往地址</th>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in trueMap_data_allPlatformCars"  :key="item.terminal">
                    <tr @click="_openParkingInfo(item.selectionType,item.index,item)">
                        <td v-text="item['carPlate']"></td>
                        <td v-html="item.orderStatus">
                        <td v-html="item.systemCurrentStatus">
                        </td>
                        <td>
                            {{item.loadStatus == -1 ?'不支持':item.loadStatus ? '重载':'空载'}}
                            <button v-show="item.loadStatus != -1" class="btn radius-btn"  @click.self.prevent.stop="changeState(item)">改变</button>
                        </td>
                        <td v-text="item.qrderQuantity ?  (item.qrderQuantity + '正在执行' + item.NewestOQrderNumber) : (item.NewestOQrderNumber ? item.NewestOQrderNumber:'')  ">
                        </td>
                        <td v-text="(item.speed ? item.speed:0) + 'km/h'"></td>
                        <td v-text="item.formatted_address"></td>
                        <!-- <td v-text="item.accStatus ? '开启' :'关闭' "></td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import dispatch_tcp from "../../../../../../static/js/util/map_dispatch_tcp.js";
import car_lst_open from "../../../../../assets/cars/open.png";
import car_lst_shrink from "../../../../../assets/cars/shrink.png";
import {_getParking,_openParkingInfo} from "../../../../../common_component/map.js";



    export default {
        data () {
            return {
                falseMap_data_allPlatformCars:{},
                trueMap_data_allPlatformCars:[],
                filterCar:'',
                dispatch_tcp_name:'',
                isAccept:false,
                num:0
            }
        },
        methods:{
            car_list_open_close(ev){
                const eve = ev || event;
                const $el = $(eve.target);
                if ($el.attr('title') == '展开') {
                    $el.attr({'title':'收缩','src':car_lst_shrink});
                    $el.parents('#car_list_realTime').height(280)
                }else{
                    $el.attr({'title':'展开','src':car_lst_open});
                    $el.parents('#car_list_realTime').height(0)
                    
                }
            },
             getAllPlatformCars(name,status){

                let num = 4;
                const self = this;
                if(status){
                    if(this.dispatch_tcp_name){
                        alert('不能创建多个连接');
                        $('#main_loading').hide();

                        if(name === 'all-platform')$('#toolTips').find('[name="all-platform"]')[0].checked = false;
                        else $('#toolTips .checkboxs').find('input')[0].checked = false;
                        return;
                    }else{
                        this.dispatch_tcp_name = name;
                    }
                    $('#main_loading').show();

                    dispatch_tcp.trigger(`gps_data_${name}`);
                    dispatch_tcp.trigger(`car_status_${name}`);
                    dispatch_tcp.trigger(`car_order_${name}`);
                    dispatch_tcp.trigger(`car_load_status_${name}`);


                    dispatch_tcp.sub(`init-car-data`,(data)=>{
                        console.log( `init-car-data`,data)

                        let content = data.content;
                        --num;

                        if(num && JSON.stringify(self.falseMap_data_allPlatformCars) === '{}'){
                            content.forEach((item)=>{
                                self.falseMap_data_allPlatformCars[item.gpsTerminal] = item;
                            });

                        }else{

                            content.forEach((item)=>{
                                self.falseMap_data_allPlatformCars[item.gpsTerminal] ? Object.assign(self.falseMap_data_allPlatformCars[item.gpsTerminal] ,item):  self.falseMap_data_allPlatformCars[item.gpsTerminal] = item;
                            });

                            
                        }

                        if(!num) this.concatDate(name);

                    });

                    dispatch_tcp.sub(`init-car-load`,(data)=>{
                        console.log( `init-car-load`,data)

                        let content = data.content;
                        --num;

                        if(num && JSON.stringify(self.falseMap_data_allPlatformCars) === '{}'){
                            
                            content.forEach((item)=>{
                                self.falseMap_data_allPlatformCars[item.terminal] = item;
                            });

                        }else{

                            content.forEach((item)=>{
                                self.falseMap_data_allPlatformCars[item.terminal] ? Object.assign(self.falseMap_data_allPlatformCars[item.terminal] ,item):  self.falseMap_data_allPlatformCars[item.terminal] = item;
                            });

                            
                        }

                        if(!num)this.concatDate(name);

                    });

                    dispatch_tcp.sub(`init-car-gps`,(data)=>{
                        console.log( `init-car-gps`,data)
                        let content = data.content;
                        --num;


                        if(num && JSON.stringify(self.falseMap_data_allPlatformCars) === '{}'){
                            
                            content.forEach((item)=>{
                                self.falseMap_data_allPlatformCars[item.gpsTerminalNo] = item;
                            });

                        }else{

                            content.forEach((item)=>{
                                self.falseMap_data_allPlatformCars[item.gpsTerminalNo] ? Object.assign(self.falseMap_data_allPlatformCars[item.gpsTerminalNo] ,item):  self.falseMap_data_allPlatformCars[item.gpsTerminalNo] = item;
                            });
                        }
                        if(!num)this.concatDate(name);


                    });

                    dispatch_tcp.sub(`init-car-order`,(data)=>{
                        console.log( `init-car-order`,data)

                        let content = data.content;
                        --num;

                        content.forEach((item,index)=>{
                            item.formatted_address = '';
                            if(self.falseMap_data_allPlatformCars[item.vehicleGpsNo] && self.falseMap_data_allPlatformCars[item.vehicleGpsNo].orderInfo  ){
                                self.falseMap_data_allPlatformCars[item.vehicleGpsNo].orderInfo.push(item);
                            }else{

                                if(!self.falseMap_data_allPlatformCars[item.vehicleGpsNo])return;
                                self.falseMap_data_allPlatformCars[item.vehicleGpsNo]['orderInfo'] = [item];
                            }
                        });

                        if(!num)this.concatDate(name);

                    });




                    dispatch_tcp.sub(`gps_data_${name}`,(data)=>{

                        if(num)return;
                        if(!this.isAccept)return;
                        if(!data.content[0].content)return;

                        data.content[0].content.forEach((item)=>{
                            if(this.falseMap_data_allPlatformCars[item.terminal]){
                                Object.assign(this.falseMap_data_allPlatformCars[item.terminal],item);

                                this.trueMap_data_allPlatformCars.splice(this.falseMap_data_allPlatformCars[item.terminal].index,1,this.falseMap_data_allPlatformCars[item.terminal]);
                                if(this.filterCar)this.filterCarFn();
                                _getParking(name, this.falseMap_data_allPlatformCars[item.terminal] ,true);

                            }

                        });

                    });

                    dispatch_tcp.sub(`car_load_status_${name}`,(data)=>{
                        console.log(`car_load_status_${name}`,data )

                        if(num)return;
                        if(!this.isAccept)return;
                        if(!data.content[0].content)return;
                        console.log(`car_load_status_${name}`,data )

                        data.content[0].content.forEach((item)=>{
                            if(this.falseMap_data_allPlatformCars[item.terminal]){
                                Object.assign(this.falseMap_data_allPlatformCars[item.terminal],item);
                                this.trueMap_data_allPlatformCars.splice(this.falseMap_data_allPlatformCars[item.terminal].index,1,this.falseMap_data_allPlatformCars[item.terminal]);
                                if(this.filterCar)this.filterCarFn();
                                _getParking(name, this.falseMap_data_allPlatformCars[item.terminal] ,true);
                            }

                        });

                    });


                    dispatch_tcp.sub(`car_order_${name}`,(data)=>{
                        console.log(`car_order_${name}`,data )

                        if(num)return;
                        if(!this.isAccept)return;
                        if(!data.content[0].content)return;

                        data.content[0].content.forEach((item)=>{
                            if(this.falseMap_data_allPlatformCars[item.terminal] && this.falseMap_data_allPlatformCars[item.terminal].orderInfo){

                                let isPush = true;

                                this.falseMap_data_allPlatformCars[item.terminal].orderInfo.forEach((item1,index1)=>{
                                    if(item.order.orderCurrentStatus.orderNumber == item1.orderCurrentStatus.orderNumber){

                                        if(item.order.orderCurrentStatus.status == "COMPLETED"){
                                            this.falseMap_data_allPlatformCars[item.terminal].orderInfo.splice(index1,1);
                                            isPush = false;
                                            if(!this.falseMap_data_allPlatformCars[item.terminal].orderInfo.length){
                                                 this.falseMap_data_allPlatformCars[item.terminal].NewestOQrderNumber ='';
                                                 this.falseMap_data_allPlatformCars[item.terminal].currentOrder =  '';
                                                 this.falseMap_data_allPlatformCars[item.terminal].qrderQuantity = '';
                                                 this.falseMap_data_allPlatformCars[item.terminal].formatted_address = '';
                                            }

                                        }else{
                                            Object.assign( item1 ,item.order);
                                            isPush = false;
                                        }
                                    }
                                });

                                if(isPush)this.falseMap_data_allPlatformCars[item.terminal].orderInfo.push(item.order);
                            }else{
                                if( !this.falseMap_data_allPlatformCars[item.terminal])this.falseMap_data_allPlatformCars[item.terminal] = {};
                                this.falseMap_data_allPlatformCars[item.terminal].orderInfo = [item.order];

                            }
                            this.transformationData( this.falseMap_data_allPlatformCars[item.terminal] );



                            this.trueMap_data_allPlatformCars.splice(this.falseMap_data_allPlatformCars[item.terminal].index,1,this.falseMap_data_allPlatformCars[item.terminal]);
                            if(this.filterCar)this.filterCarFn();

                            _getParking(name, this.falseMap_data_allPlatformCars[item.terminal] ,true);

                        });

                    });

                    dispatch_tcp.sub(`car_status_${name}`,(data)=>{

                        if(num)return;
                        if(!this.isAccept)return;
                        if(!data.content[0].content)return;

                        data.content[0].content.forEach((item)=>{
                            if(this.falseMap_data_allPlatformCars[item.terminal]){
                                Object.assign(this.falseMap_data_allPlatformCars[item.terminal],item.status);

                                this.trueMap_data_allPlatformCars.splice(this.falseMap_data_allPlatformCars[item.terminal].index,1,this.falseMap_data_allPlatformCars[item.terminal]);
                                if(this.filterCar)this.filterCarFn();
                                _getParking(name, this.falseMap_data_allPlatformCars[item.terminal] ,true);
                            }

                        });

                    });


                }else{
                   this.cancelWatch();
                }
            },
            concatDate(name){

                for(let i in this.falseMap_data_allPlatformCars){

                    if( !this.falseMap_data_allPlatformCars[i].lng || !this.falseMap_data_allPlatformCars[i].lat)delete this.falseMap_data_allPlatformCars[i];
                }
                

                for(let i in this.falseMap_data_allPlatformCars){

                        this.falseMap_data_allPlatformCars[i].index = this.num++;
                        this.falseMap_data_allPlatformCars[i].selectionType = name;

                        this.transformationData( this.falseMap_data_allPlatformCars[i]  );
                    
                }

               
                for(let i in this.falseMap_data_allPlatformCars ){

                     this.trueMap_data_allPlatformCars.push(this.falseMap_data_allPlatformCars[i]);
                }

                this.$nextTick(()=>{
                    _getParking(name, this.falseMap_data_allPlatformCars,false);
                    this.isAccept = true;
                    $('#main_loading').hide();
                });




            },
            cancelWatch(){
                if(!this.dispatch_tcp_name)return;
                this.isAccept = false;
                this.filterCar = '';
                dispatch_tcp.cancel(`gps_data_${this.dispatch_tcp_name}`);
                dispatch_tcp.cancel(`init-car-data`);
                dispatch_tcp.cancel(`init-car-gps`);
                dispatch_tcp.cancel(`car_status_${this.dispatch_tcp_name}`);
                dispatch_tcp.cancel(`init-car-order`);
                dispatch_tcp.cancel(`init-car-load`);
                dispatch_tcp.cancel(`car_order_${this.dispatch_tcp_name}`);
                dispatch_tcp.cancel(`car_load_status_${this.dispatch_tcp_name}`);
                _getParking(this.dispatch_tcp_name, []);
                this.trueMap_data_allPlatformCars = [];
                this.falseMap_data_allPlatformCars = {};
                this.dispatch_tcp_name = '';
                this.num = 0;

            },
            transformationData(data){
                if(data.orderInfo && data.orderInfo.length){

                    if(data.orderInfo.length === 1){

                        if(data.orderInfo[0].orderCurrentStatus.status === 'COMPLETED'){
                            return data.orderInfo = [];
                        }

                        data.currentOrder = data.orderInfo[0];
                        data.orderStatus  = this.matchTackStatus(data.currentOrder,data);
                        data.systemCurrentStatus =  util.matchTackStatus(data.currentOrder.systemCurrentStatus.status,true);
                        data.NewestOQrderNumber =  data.currentOrder.orderCurrentStatus.orderNumber;

                        data.qrderQuantity = '';
                        data.formatted_address = '';
                  
                        if(data.currentOrder.orderCurrentStatus.status == 'ACCEPTED'
                        || data.currentOrder.orderCurrentStatus.status == 'SETOFFED'
                        ){
                            data.formatted_address = data.currentOrder.rescueAddress;
                        }

                        if( data.currentOrder.destination){

                            if(data.currentOrder.orderCurrentStatus.status == 'ARRIVE_RESCUE'
                            || data.currentOrder.orderCurrentStatus.status == 'TRUCK_LOADING'
                          ){
                                data.formatted_address = data.currentOrder.destinationAddress;
                                
                            }
                        }
                           



                    }else{

                        data.orderInfo = data.orderInfo.filter((item)=>{
                            return  item.orderCurrentStatus.status != 'COMPLETED';
                        });


                        let array = data.orderInfo;
                        let arrayTime = array[0].orderCurrentStatus.time;
                        let currentOrder = array[0];

                        array.forEach((item,index)=>{
                            if(item.orderCurrentStatus.time > arrayTime ){
                                currentOrder = item;
                                arrayTime = item.orderCurrentStatus.time;
                            }
                        });
                        data.NewestOQrderNumber =  currentOrder.orderCurrentStatus.orderNumber;
                        data.currentOrder = currentOrder;
                        data.orderStatus =  this.matchTackStatus(currentOrder,data);
                        data.systemCurrentStatus =  util.matchTackStatus(data.currentOrder.systemCurrentStatus.status,true);


                        data.qrderQuantity = array.filter((item)=>{
                            return item.orderCurrentStatus.orderNumber != data.NewestOQrderNumber ;
                        })

                        data.qrderQuantity = data.qrderQuantity.map((item)=>item.orderCurrentStatus.orderNumber).join('、');

                        
                        data.formatted_address = '';

                        if(data.currentOrder.orderCurrentStatus.status == 'ACCEPTED'
                        || data.currentOrder.orderCurrentStatus.status == 'SETOFFED'
                        ){
                            data.formatted_address = data.currentOrder.rescueAddress;
                        }

                        if( data.currentOrder.destination){

                            if(data.currentOrder.orderCurrentStatus.status == 'ARRIVE_RESCUE'
                            || data.currentOrder.orderCurrentStatus.status == 'TRUCK_LOADING'
                          ){
                                data.formatted_address = data.currentOrder.destinationAddress;
                                
                            }
                        }
                    }

                }else{
                    data.orderStatus  = this.matchTackStatus(data);
                }

            },
           
            matchTackStatus(item,data){
                let trueDate = data ?data : item;
                return util.matchTackStatus(   trueDate.onlineStatus == 1 ? (item.orderNumber && item.orderCurrentStatus ? item.orderCurrentStatus.status: 'FREE') :'offLine'    ,true );
            },
            _openParkingInfo(type,index,item){
                _openParkingInfo(type,index,item);
            },
            changeState(item){
                dispatch_tcp.trigger(
                    {
                        "name": "SERVICE_EVENT_HANDLE",
                        "value":{
                            "className":"loadStatusUpdClassNameHandleService",
                            "terminal":item.gpsTerminal,
                            "status":item.loadStatus ? "0":"1"
                        }
                    }

                );
            },
            filterCarFn(newv){

                let array = [];
                for(let i in  this.falseMap_data_allPlatformCars){
                    if(this.falseMap_data_allPlatformCars[i]['carPlate'].indexOf(newv ? newv : this.filterCar) != -1)array.push( this.falseMap_data_allPlatformCars[i] );
                }

                this.trueMap_data_allPlatformCars = array;
            }
        },
        watch:{
            filterCar(newv){
                this.filterCarFn(newv);
            }
        }
    }
 

</script>
<style scoped>
  
    #car_list_realTime .operation{
        position: absolute;
        left: 50%;
        margin-left: -25px;
        top: -50px;

    }
    .car_list_realTime-footer{
        overflow: auto;
        height: 253px;
    }
    .car_list_realTime-header{
        padding: 10px 0;
        height: 44px;
    }
    .car_list_realTime-header input{
        width: 200px;
        background-color: rgb(207, 228, 251);
        margin-right: 0px;
        text-indent: 5px;
        border-radius: 3px;
        border-width: 0;
        color: #333333;
        padding: 5px;
        height: 24px;
        font-size: 12px
    }
    #car_list_realTime .table{
        table-layout:fixed;
    }
    #car_list_realTime button{
        background: transparent;
        min-width: inherit;
        font-size: 12px;
        padding:2px 4px;
    }
    #car_list_realTime th{
        text-align: center;
        border-bottom-width:1px;
    }
    #car_list_realTime > .table > thead > tr > th, .table > tbody > tr > td{
        border: 1px solid #ddd;
    }
    #car_list_realTime .table > tbody > tr > td{
        border-top-width: 0
    }
    #car_list_realTime .table>tbody+tbody{
        border-top:1px solid #ddd;
    }
    #car_list button{
        background: transparent;
        min-width: inherit;
        padding: 4px 8px;
        font-size: 12px;
    }
     #car_list_realTime{
        position: absolute;
        z-index: 88888;
        width: 100%;
        bottom: 0;
        height: 280px;
        background: #fff;
        padding:0 10px;
        transition: height ease .5s;
        box-shadow: 0 0 3px rgba(0,0,0,.5)
    }

    .table>tbody>tr>td, .table>tbody>tr>th, .table>thead>tr>td, .table>thead>tr>th{
        padding:2px;
    }
</style>