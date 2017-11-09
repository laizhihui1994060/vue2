<template>

    <div class="child_page visit_information" >
        <breadcrumb
            :arr="[{path:'/LoginFinish/rescueManagement/OrderVisit',text:'订单回访'},{path:'',text:'查看订单'}]"/>

        <article>回访信息<i @click='showDetails'></i></article>
        <div class='details'>
            <div class="row" id="form">

                <div class="col-xs-6">

                <btn-select 
                    label="电话回访"
                    padding="0"
                    label-right="12px" 
                    width="76px"
                    url="/item" 
                    filter="SVC_NAME" 
                    name="Vehicle"
                    @updata="integrationDate"
                    title="电话回访" />
                    
                </div>
                <div class="col-xs-6">

                    <btn-select 
                        label="回&nbsp;访&nbsp;人"
                        padding="0"
                        label-right="12px" 
                        width="76px"
                        url="/item" 
                        filter="SVC_NAME" 
                        name="Vehicle"
                        @updata="integrationDate"
                        title="回访人" />
                    
                </div>
            </div> 

            <div class="row">
                <div class="col-xs-12">
                    <label class="control-label" style="margin-right:12px">回访状态</label>
                    <radio 
                        text="已回访" 
                        :img-left="true" 
                        name="is"
                    ></radio>
                    <radio 
                        text="未回访" 
                        :img-left="true" 
                        name="aaaa"
                    ></radio>
                </div>
            </div>
        </div>

        <article>订单详情<i @click='showDetails'></i></article>
        <div class='details'>
            <div class="row" style="margin-top:24px;">
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="订单来源" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="GW123486"/>
                </div>   
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="订单编号" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="平台分享"/>
                </div>   
            </div>

            <div class="row">
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="客户名称" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="路华救援"/>
                </div>   
                <div class="col-xs-6">

                    <form-label-input 
                        input-width="108px"
                        label="救援单位" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="宁波快捷"/>
                </div>   
            </div>

            <div class="row">
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="救援类型" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="新车托运"/>
                </div>   
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="救援结果" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="救援成功"/>
                </div>   
            </div>


            <div class="row">
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="救援时间" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="2016/08/08"/>
                </div>   
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <form-label-input 
                        label="救援地址" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        input-width="318px"
                        value="广州市。。。。。。。。。。。。。。"/>
                </div>   
            </div>

            <div class="row">
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="技&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="张师傅"/>
                </div>   
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="技师电话" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="15500515454"/>
                </div>   
            </div>

            <div class="row">
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="王某"/>
                </div>   
                <div class="col-xs-6">
                    <form-label-input 
                        input-width="108px"
                        label="车主电话" 
                        name="rescueAddress"
                        @updata="integrationDate"
                        value="15500515454"/>
                </div>   
            </div>
        </div>

        <article>回访结果<i @click='showDetails'></i></article>
        <div class='details'>
            <div class="row">
                <div class="col-xs-12">
                    <label class="control-label resetPadding pull-left">技师及时到达</label>
                    <div class="imgs pull-left">
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                    </div>
                </div>   
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <label class="control-label resetPadding pull-left">技师服务态度</label>
                    <div class="imgs pull-left">
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                    </div>
                </div>   
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <label class="control-label resetPadding pull-left">安全规范操作</label>
                    <div class="imgs pull-left">
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                        <i class='img Hxingxing'></i>
                    </div>
                </div>   
            </div>


            <div class="row">
                <div class="col-xs-12 audios">
                    <label class="control-label resetPadding pull-left" style="line-height:38px;">回&nbsp;访&nbsp;录&nbsp;音</label>
                    <div class="imgs pull-left" >

                        <div class="audio pull-left">
                            <audio>
                                <source src="http://static.wshuttle.com/wechat/img/Good.mp3" type="audio/mp3">
                            </audio>
                            <a href="javascript:; img Group">
                            </a>
                            <span>2016.08.0818.20</span><br>
                            <a href="javascript:; img downup">
                            </a>
                        </div>
                        <div class="audio pull-left">
                            <audio>
                                <source src="http://static.wshuttle.com/wechat/img/Good.mp3" type="audio/mp3">
                            </audio>
                            <a href="javascript:; img Group">
                            </a>
                            <span>2016.08.0818.20</span><br>
                            <a href="javascript:; img downup ">
                            </a>
                        </div>
                     
                    </div>
                </div>   
            </div>
            
            <input-text
                label="备注"
                placeholder="请输入备注信息"
                input-width='88%'/>
        </div>

        <div class="btns">
            <button type="button" class="btn" @click="modify">修改</button>
            <router-link tag='button' :to = "{ path: '/LoginFinish/rescueManagement/OrderVisit' }" class="btn" active-class=' '>取消并返回</router-link>
        </div>
    </div>
</template>

<script>


// import xingxinged from "../../../../../assets/Hxingxing.png";
// import xingxing from "../../../../../assets/Uxingxing.png";
import btnSelect from "../../../../../common_component/btn_select.vue";
import radio from "../../../../../common_component/radio.vue";
import inputText from "../../../../../common_component/inputText.vue";
import formLabelInput from "../../../../../common_component/form-label-input.vue";
import breadcrumb from "../../../../../common_component/breadcrumb.vue";

var input = null;
var button = null;
var textarea = null;
export default {
    mounted(){
        this.$nextTick(function(){
            input = $('.visit_information input').attr('disabled',true);
            button = $('.visit_information button').attr('disabled',true);
            textarea = $('.visit_information textarea').attr('disabled',true);
            
            // $('#checkOrderVisit .imgs img').click(function(){
            //     $(this).attr('src',xingxinged ).prevAll().attr('src',xingxinged );
            //     $(this).nextAll().attr('src',xingxing );
            // });
        });
    },
    components:{
        btnSelect,
        radio,
        inputText,
        formLabelInput,
        breadcrumb
    },
    data () {
        return {
            active:"visit_information",
         
        }
    },
    methods:{
        toggleClass(sclass){
            this.active = sclass
        },
        showDetails(){
            $(event.target).parent().toggleClass('up');
            $(event.target).parent().next('.details').slideToggle('fast');
        },
        modify(){
            input.attr('disabled',false);
            button.attr('disabled',false);
            textarea.attr('disabled',false);
        },
        
        integrationDate(name,item){
            this.res[name]= item;
        },
    },
    watch:{
        disabled(val, oldVal){
            toggleDis(this);
        }
    }
};

</script>
<style scoped>
    img{
        display: block;
    }
    .child_page{
        margin: 24px;
        margin-bottom: 40px;
    }
    .audios {
        margin-top: 6px;
        margin-left: ;
    }
    .imgs{
        margin-left: 24px;
        cursor: pointer;
    }
    .audios .audio{
        width: 62px;
        word-break:break-all;
        text-align: center;
        margin-right: 24px;
    }
    .audios a{
        display: block;
    }
    .audios span{
        font-size: 10px;
        color: #333333;
    } 
</style>