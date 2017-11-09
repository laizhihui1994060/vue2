<template>

<!-- Modal -->
    <div class="modal fade travel" id="viewTravelOrder" tabindex="-1" role="dialog" aria-labelledby="crane" aria-hidden="true">
        <div class="modal-dialog" :style="{marginLeft:marginLeft}">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>

                    <h4 class="modal-title text-center" id="myModalLabel">查看行程订单</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-4">
                            <label>救援类型</label>
                            <span>新车托运</span>
                        </div>
                        <div class="col-xs-4" > 
                            <label>车辆类型</label>
                            <span>小型车</span>
                        </div>
                        <div class="col-xs-4" > 
                            <label>订单状态</label>
                            <span>未接单</span>
                        </div>
                    </div> 

                    <div class="row">
                        <div class="col-xs-4">
                            <label>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</label>
                            <span>普拉多</span>
                        </div>
                        <div class="col-xs-4" >
                            <label>颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</label>
                            <span>红色</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4">
                            <label>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主</label>
                            <span>刘老板</span>
                        </div>
                        <div class="col-xs-4" >
                            <label>车主电话</label>
                            <span>15502019763</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-4">
                            <label>距&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;离</label>
                            <span>1000km</span>
                        </div>
                        <div class="col-xs-4" >
                            <label>救援时间</label>
                            <span>2016.08.08 12:00</span>
                        </div>
                        <div class="col-xs-4" >
                            <label>预计耗时</label>
                            <span>2h</span>
                        </div>
                    </div>


                    <article>救援地址</article>
                    

                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                label="救援地" 
                                placeholder="请输入详细街道信息"
                                input-width="508px"
                                :value="rescue.address"
                                @updata="integrationDate"
                            ></form-label-input>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <form-label-input 
                                label="救援地" 
                                placeholder="请输入详细街道信息"
                                input-width="508px"
                                :value="destination.address"
                                @updata="integrationDate"
                            ></form-label-input>
                        </div>
                    </div>



                    <article>订单价格</article>
                
                    <div class="clearfix "></div>
                    <div class="row" style="padding-bottom:24px;margin-top:0">
                        <div class="col-xs-4">
                            <label>计划方式</label>
                            <span>一口价</span>
                        </div>
                        <div class="col-xs-4" >
                            <label>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</label>
                            <span>3000</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <div class="btns">
                    <button type="button" class="btn">确定</button>
                    <button type="button" class="btn" @click="showMap = false"  data-dismiss="modal" >关闭</button>
                </div>
            </div>

            
        </div>
        <div class="catTaskMap" v-if="showMap">
            <location-map 
                :isshow="showMap"
                :address="address"
                width="500"
                height="549"
                @close="showMap = false"
            ></location-map>
        </div>
    </div>
</template>

<script scoped>

import locationMap from "../../../../../common_component/locationMap.vue";
import formLabelInput from "../../../../../common_component/form-label-input.vue";



    export default {
        components:{
           locationMap,
           formLabelInput
        },
        mounted(){

            let self = this;


            this.$nextTick(function(){
                    
                $(document).click(function(event) {
                    if(event.target.id == "viewTravelOrder"){
                        self.showMap = false;
                    }
                });
            });

            bus.$on('updataAdress',function(type,item){
                console.log(type,item)
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
       
        data () {
            return {
                
                'rescue':  {
                    'Longitude':'',
                    'address':'' 
                },
                'destination':{
                    'Longitude':'',
                    'address':'' 
                },
                'showMap':false,
                'marginLeft':'auto',
            }
        },
        methods:{
            integrationDate(name,item){
                this.res[name]= item;
                console.log(this.res)
                if(name == 'rescueType')this.rescueType.push(item);
            },
        },
        watch:{
           
            showMap(curVal,oldVal){
　　　　　       this.marginLeft = curVal ? ($('#viewTravelOrder .modal-content').offset().left/2 + 'px') : 'auto'
　　　　　　},
        }

    }

   

</script>
<style scoped>
    #viewTravelOrder .catTaskMap{
        position: absolute;
        right: -549px;
        top: 1px;
        background: #fff;
        width: 500px;
        height: 480px;
    }
   
    #viewTravelOrder .col-xs-4{
        padding-right: 0
    }
    #viewTravelOrder .point{
        background: #F6F6F6;
    }
    .splitLine span{
        font-size: 15px
    }
    
 
</style>