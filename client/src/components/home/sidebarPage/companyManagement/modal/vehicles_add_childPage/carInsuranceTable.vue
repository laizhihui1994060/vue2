<template>
    <div class='car_insurance_table'>
        <p>保险记录：</p>
        <lite-table
            :table_keys='insuranceKeys'
            :table_vals='ListDisplay'
            :left_operation="operateLeftOption"
            :convertDepencies="filterFunc"
            @emitedit="editRow"
        ></lite-table>
        <div v-if="ListDisplay.length" class="cate-count">共{{cateCount}}种</div>
        <hr>
        <div id='form_insurance' class='row' v-if="editable">
            <p class="col-xs-1">添加保险：</p>
            <div class="col-xs-2">
                <btn-select
                    label='保险种类'
                    :arr='cateINSURANCE'
                    name='form_insurance_code'
                    filter='name'
                    filterName='code'
                    placeholder='请选择保险种类'
                    width="100px"
                    color="#000"
                    :title="cateSelectValBind"
                    @updata='updateParam'
                    />
            </div>
            <div class="col-xs-2">
                <datetimepicker
                    label="投保时间"
                    labelRight="4px"
                    width="130px"
                    name="form_insurance_startTime"
                    v-model='form_param.startTime'
                    minView="form_min_view"
                    @updata='updateParam'
                 />
            </div>
            <div class="col-xs-2">
                <form-label-input
                    label="投保时效"
                    labelRight="4px"
                    inputWidth="70px"
                    type="number"
                    name="form_insurance_effectiveTime"
                    v-model='form_param.effectiveTime'
                    @updata='updateParam'
                    :min="0"
                 />(天)
            </div>
            <div class="col-xs-2">
                <datetimepicker
                    label="到期时间"
                    labelRight="4px"
                    width="130px"
                    name="form_insurance_endTime"
                    v-model='form_param.endTime'
                    minView="form_min_view"
                    @updata='updateParam'
                    :verify='true'
                 />
            </div>
            <div class="col-xs-2">
                <form-label-input
                    label="提前提醒时间"
                    labelRight="4px"
                    inputWidth="70px"
                    type="number"
                    name="form_insurance_remindTime"
                    v-model='form_param.remindTime'
                    :min="0"
                    :max="form_param.effectiveTime"
                    @updata='updateParam'
                 />(天)
            </div>
            <div class="col-xs-1">
                <button :disabled="submit_block" class="btn adding-btn" @click='add_insurance'>提交</button>
            </div>
        </div>
    </div>
</template>
<script>
    import Multiplexing from './tableMultiplexing.js'
    import liteTable from '../../../../../../common_component/liteTable.vue'
    import formLabelInput from '../../../../../../common_component/form-label-input.vue'
    import datetimepicker from '../../../../../../common_component/datetimepicker.vue'
    import btnSelect from '../../../../../../common_component/btn_select.vue'
    export default{
        components:{
            liteTable,
            formLabelInput,
            datetimepicker,
            btnSelect
        },
        props:{
            data_cate:{
                type: String
            },
            towTruckId: {},
            editable: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                insuranceKeys:['保险种类','投保时间','到期时间','保险时效','提前提醒时间','状态'],
                listINSURANCE:[],
                operateLeftOption:[this.editable],
                cateINSURANCE:[
                    {
                        name: "车辆损失险",
                        code: "001"
                    },
                    {
                        name: "车上人员责任险",
                        code: "002"
                    },
                    {
                        name: "车身划痕损失险",
                        code: "003"
                    },
                    {
                        name: "盗抢险",
                        code: "004"
                    },
                    {
                        name: "第三责任险",
                        code: "005"
                    },
                    {
                        name: "玻璃单独破碎险",
                        code: "006"
                    },
                    {
                        name: "涉水险",
                        code: "007"
                    },
                    {
                        name: "自然损失险",
                        code: "008"
                    },
                    {
                        name: "制定专修特约险",
                        code: "009"
                    },
                    {
                        name: "货运险",
                        code: "010"
                    },
                    {
                        name: "货运三者险",
                        code: "011"
                    }
                ],
                form_param:{},
                ListDisplay:[]
            }
        },
        methods:{
            updateParam(name,item){
                this.updateUtilParam(name.split('_')[2],item, false)
            },
            setKeyVal(name,item){
                this.$set(this.form_param,name,item);//vue无法监听Object中属性值的变化
            },
            getInsuranceCate(){
                send({
                    type:'get',
                    url:'client:/insurance/product'
                }, (err,res)=>{
                    if(err) return alert(err)
                    if(res.status === 200){
                        this.cateINSURANCE = res.content.map(it=>{
                            return {
                                name:it.name,
                                code:it.insuranceProductCode
                            }
                        })
                        console.log("查询保险类型失败失败",res)
                    console.log(this.cateINSURANCE)
                    } else {
                        console.log("查询保险类型失败失败",res)
                    }
                    
                })
            },
            add_insurance(){
                let sendParam = Object.assign({},this.form_param)
                let verification = this.validateParam(this.data_cate, sendParam);
                if( !verification.result ){
                    return alert(verification.msg)
                }
                if( !this.form_param.code ){
                    return alert("请选择保险种类")
                }
                if( !this.form_param.startTime ){
                    return alert("请填写投保时间")
                }
                if( !this.form_param.endTime ){
                    return alert("请填写到期时间")
                }
                sendParam.effectiveTime *= 24*60;
                if( this.remindUnit === "Day" ){    
                    sendParam.remindTime *= 24*60;
                } else if( this.remindUnit === "Minute" ){
                    sendParam.remindTime = (
                        (sendParam.endTime - new Date().setHours(0,0,0,0)) - 
                        ( new Date().getTime() - new Date().setHours(0,0,0,0) ) - 
                        this.form_param.remindTime )/1000/60
                    sendParam.remindTime = parseInt(sendParam.remindTime)
                }
                sendParam.remind = !!sendParam.remindTime
                console.log('你的参数：', sendParam)
                this.doSend(sendParam)
            }
        },
        mounted(){
            //年审 另 保险INSURANCE 通行证PASS_CHECK 保养MAINTAIN 其他OTHER
            const _init_param_  = this.initParam(this.data_cate)
            this.request_record(this.data_cate)
            // this.getInsuranceCate()
        },
        mixins:[Multiplexing]
    }
</script>

<style scoped>
    #vehicles_add .car_insurance_table{
            padding-bottom: 20%;
    }
    #form_insurance .col-xs-2{
        text-align: center;
        padding:0;
        width: 16%;
    }
    #form_insurance .col-xs-1{
        padding-right: 0;
    }
    #form_insurance .adding-btn{
        width: 90%;
        height: 24px;
        line-height: 11px !important;
        background-color: #1785F7;
        color: #fff;
    }
</style>