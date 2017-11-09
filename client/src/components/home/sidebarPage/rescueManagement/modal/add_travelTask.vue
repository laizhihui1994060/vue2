<template>

<!-- Modal -->
    <div class="modal fade travel" id="add_travelTask" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" :style="{marginLeft:marginLeft}">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"   @click="showMap = false"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">添加行程</h4>
                </div> 
                <div class="modal-body">
                        
                    <div>

                        <div class="row" id="form">
                            <div class="col-xs-5" style="padding-right:0">
                                <form-label-input label="车&nbsp;&nbsp;牌&nbsp;号" value="张国栋" input-width="120px" />
                            </div>
                            <div class="col-xs-7" style="padding:0;" >
                                <start-end-time 
                                    width="132px" 
                                    left="0px"
                                    startPlaceholder="计划出发时间"
                                    endPlaceholder="计划结束时间"
                                    startName="startTime"
                                    endName="endTime"
                                    @updata="integrationDate"
                                    />
                            </div>
                        </div> 

                        <div class="row">
                            <div class="col-xs-12">
                                <label class="control-label">车辆类型</label>
                                <p><span>平板类型</span></p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12" id="insuranceType">
                                <label class="control-label">保险类型</label>
                                <p><span>商业险</span>,<span>商业险</span></p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12" id="taskType">
                                <label class="control-label">任务类型</label>
                                <div class="btn-group" style="padding-right">
                                    <button type="button" class="btn">任务类型</button>
                                    <button type="button" class="btn dropdown-toggle" @click.stop.prevent="showType">
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" noAdd="true" noSS='true'>
                                        <li>
                                            <a href="javascript:;">
                                                <checkbox 
                                                    text="快修" 
                                                    :img-left="true" 
                                                    name="rescueType" 
                                                    value="快修"
                                                    @updata="integrationDate"
                                                ></checkbox>
                                            </a>
                                        </li> 

                                        <li>
                                            <a href="javascript:;">
                                                <checkbox 
                                                    text="拖车" 
                                                    :img-left="true" 
                                                    name="rescueType" 
                                                    value="拖车"
                                                    @updata="integrationDate"
                                                ></checkbox>
                                            </a>
                                        </li> 

                                        <li>
                                            <a href="javascript:;">
                                                <checkbox 
                                                    text="急救" 
                                                    :img-left="true" 
                                                    name="rescueType" 
                                                    value="急救"
                                                    @updata="integrationDate"
                                                ></checkbox>
                                            </a>
                                        </li> 
                                    </ul>
                                </div>
                                <p style="margin-left:24px;">{{ rescueType}}</p>
                            </div>
                        </div>

                        <article>救援地址</article>

                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input 
                                    label="救援地" 
                                    placeholder="请输入详细街道信息"
                                    input-width="536px"
                                    name="rescueAddress"
                                    :value="rescue.address"
                                    @updata="integrationDate"
                                ></form-label-input>
                                <a href="javascript:;" class="toggle_point"   @click="showMap = !showMap">
                                    <img src="../../../../../assets/point.png" height="22" width="18" alt="">
                                </a>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input 
                                    label="救援地" 
                                    placeholder="请输入详细街道信息"
                                    input-width="536px"
                                    name="destinationAddress"
                                    :value="destination.address"
                                    @updata="integrationDate"
                                ></form-label-input>
                                <a href="javascript:;" class="toggle_point"   @click="showMap = !showMap">
                                    <img src="../../../../../assets/point.png" height="22" width="18" alt="">
                                </a>
                            </div>
                        </div>

                        <article>途径地点</article>

                        <div class="row" >
                            <div class="col-xs-12 setBG">
                                <div class="pull-left wayPlace">
                                    <div class="pull-left"  v-for="n in num">
                                        <select class="province" data-first-title="选择地区" style="margin-bottom:15px">
                                            <option value="">请选择</option>
                                        </select>
                                         <button type="button" class="btn dropdown-toggle">
                                            <span class="caret"></span>
                                        </button>
                                    </div>

                                    <div class="btn-group pull-left addTo">
                                        <button type="button" class="btn default-btn" @click="addRecord">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                          
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn">发布</button>
                        <button type="button" class="btn" data-dismiss="modal"   @click="showMap = false">取消</button>
                    </div>
                </div>
                <div id="addTaskMap" v-if="showMap">
                    <location-map 
                        :isshow="showMap"
                        :address="address"
                        width="500"
                        height="549"
                        @close="showMap = false"
                    ></location-map>
                </div>
            </div>
           
        </div>
    </div>
</template>

<script scoped>
import {foo} from "../../../../../../static/js/public.js";
import locationMap from "../../../../../common_component/locationMap.vue";
import startEndTime from "../../../../../common_component/startEndTime.vue"
import formLabelInput from "../../../../../common_component/form-label-input.vue"
import checkbox from "../../../../../common_component/checkbox.vue"



    export default {
        mounted(){

            const self = this;


            this.$nextTick(function(){


                $(document).click(function(event) {
                    if(event.target.id == "add_travelTask")self.showMap = false;
                });

                foo.addressLinkage('add_travelTask');
            });


            bus.$on('updataAdress',function(type,item){

                switch(type){
                    case 'rescue':
                        self.rescue = item;
                    break;
                    case 'destination':
                        self.destination = item;
                    break;
                }

            } )

        },
        components:{
           locationMap,
           startEndTime,
           formLabelInput,
           checkbox
        },
       
        data () {
             return {
                'rescueType':[],
                'showMap':false,
                'rescue':  {
                    'Longitude':'',
                    'address':'' ,
                },
                'destination':{
                    'Longitude':'',
                    'address':'' ,
                },
                'address':'',
                'num':3,
                'marginLeft':'auto',
                'res':{}
            }
        },

        methods:{
            addRecord(){
                this.num++;
                setTimeout(function(){
                    $('.wayPlace').cxSelect({
                        selects: ['province']
                    });
                },200)
            },
            showType(){
                foo.showType($('#add_travelTask #taskType .dropdown-menu'));
            },
            integrationDate(name,item){
                this.res[name]= item;
                console.log(this.res)
                if(name == 'rescueType')this.rescueType.push(item);
            },
        },
        watch:{
            showMap(curVal,oldVal){
　　　　　       this.marginLeft = curVal ? ($('#add_travelTask .modal-content').offset().left/2 + 'px') : 'auto'
　　　　　　},
        }

    };


  


</script>
<style>
    .travel .modal-content{
        width: 650px;
    }
    .travel p{
        margin: 0;
        display: inline-block;
        margin-left: 5px;
        font-size: small;
        font-size: 14px;
        color: #333
    }
    .travel .dropdown-menu{
        min-width: 95px;
        overflow-y: inherit;
    }
    .travel .dropdown-menu li a{
        padding: 5px 14px;
    }
    .travel .btns button:nth-child(1){
        margin-right: 42px;
     }
    #addTaskMap{
        position: absolute;
        right: -500px;
        top: 0px;
        background: #fff;
    }
   
    .travel .row{
        margin-top: 10px;
    }
    .travel .row:nth-child(1){
        margin-top: 0;
    }
    
    .wayPlace select{
        height: 27px;
        background:#DFF5FD;
        border-width:0 ;
        font-size: 12px;
        color: #333333;
        line-height: 12px;
        padding:2px 15px 2px 6px;
        box-sizing: border-box;
        margin-bottom: 4px;
        width: 100px;
        font-size: 14px;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
    }
   
    .travel .setBG .dropdown-toggle{
        padding: 0 6px;
        border-radius: 0;
        background: #39b6e5;
        z-index: 55;
        margin-left: -27px;
        margin-right: 15px;
        font-size: 17px;
    }
    .travel .setBG .dropdown-toggle span{
        color: #fff;
        border-top: 6px dashed;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
    }
    .travel .setBG .addTo button{
        background: #F6F6F6;
        border: 1px solid #39B6E5;
        font-size: 23px;
        padding: 0;
        text-align: center;
        line-height: 23px;
        font-size: 12px;
        color: #333333;
        padding: 0 10px;
    }
    .travel .btn-group{
        padding-right: 0
    }
    
   
    .travel .setBG .dropdown-toggle .caret{
        color: #fff;
        border-top: 6px dashed;
        border-top: 4px solid \9;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
    }
    .travel article:after{
        width: 562px
    }
    input{
        font-size: 12px;
    }
</style>