<template>
    <div>
        <p>年审记录：</p>
        
        <lite-table
            :table_keys='examineKeys'
            :table_vals='ListDisplay'
            :left_operation="operateLeftOption"
            :convertDepencies="filterFunc"
            :last_edit_only="true"
            @emitedit="editRow"
        ></lite-table>
        <hr>
        <div id='form_examine' class='row' v-if="editable">
            <p class="col-xs-1">登记年审：</p>
            <div class="col-xs-3">
                <datetimepicker
                    label="年审时间"
                    labelRight="4px"
                    width="130px"
                    name="form_examine_startTime"
                    v-model='form_param.startTime'
                    minView='form_min_view'
                    @updata='updateParam'
                 />
            </div>
            <div class="col-xs-2">
                <form-label-input
                    label="年审时效"
                    labelRight="4px"
                    inputWidth="70px"
                    type="number"
                    name="form_examine_effectiveTime"
                    v-model='form_param.effectiveTime'
                    @updata='updateParam'
                    :min="0"
                 />(天)
            </div>
            <div class="col-xs-3">
                <datetimepicker
                    label="到期时间"
                    labelRight="4px"
                    width="130px"
                    name="form_examine_endTime"
                    v-model='form_param.endTime'
                    minView='form_min_view'
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
                    name="form_examine_remindTime"
                    v-model='form_param.remindTime'
                    :min="0"
                    :max="form_param.effectiveTime"
                    @updata='updateParam'
                    @focus='setDefaultRemind("remindTime")'
                    
                 />(天)
            </div>
            <div class="col-xs-1">
                <button :disabled="submit_block" class="btn add-examine" @click='add_examine'>提交</button>
            </div>          
        </div>
    </div>
</template>
<script>
    import Multiplexing from './tableMultiplexing.js'
    import liteTable from '../../../../../../common_component/liteTable.vue'
    import formLabelInput from '../../../../../../common_component/form-label-input.vue'
    import datetimepicker from '../../../../../../common_component/datetimepicker.vue'
    export default{
        components: {
            liteTable,
            formLabelInput,
            datetimepicker,
        },
        props: {
            towTruckId: {
                type: String
            },
            data_cate: {
                type: String
            },
            editable: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                examineKeys: ['年审时间','到期时间','年审时效','提前提醒时间','状态'],
                ListVERIFICATION: [],
                ListDisplay: [],
                form_param: {},
                operateLeftOption:[this.editable],
                dummy_list: [
                   ]
            }
        },
        methods:{
            
            updateParam(name, item){
                this.updateUtilParam(name.split('_')[2],item, false)
            },
            setKeyVal(name,item){
                console.log("处理检测属性 key:", name, "   val:", item)
                this.$set(this.form_param,name,item);//vue无法监听Object中属性值的变化，故调用$set
            },
            
            fooSend(param,cb){
                //模拟发送请求
                // let err = null;
                // let res = {
                //     status:200,
                //     content:[],
                //     msg:"waojfwoej"
                // }
                // cb(err,res)
            },
            updateView(param){
                // //请求后更新视图
                // let list = this.ListVERIFICATION;
                // if(!!list.length){
                //     list[list.length-1].status = "CHECKED";
                // }
                // list.push(param)
            },

            add_examine(){
                let sendParam = Object.assign({},this.form_param)
                let verification = this.validateParam(this.data_cate, sendParam, !this.ListVERIFICATION.length);
                let minuteOffset = 0;
                if( !verification.result ){
                    return alert(verification.msg)
                }
                sendParam.effectiveTime *= 24*60;
                if(this.remindUnit === "Day"){
                    sendParam.remindTime *= 24*60;
                } else if( this.remindUnit === "Minute" ){
                    sendParam.remindTime = (
                        (sendParam.endTime - new Date().setHours(0,0,0,0)) - 
                        ( new Date().getTime() - new Date().setHours(0,0,0,0) ) - 
                        this.form_param.remindTime )/1000/60
                    sendParam.remindTime = parseInt(sendParam.remindTime)
                }
                
                // sendParam.remindTime = Number(sendParam.remindTime)
                sendParam.remind = !!sendParam.remindTime
                console.log('你的参数：', sendParam)
                console.log('时间校验',
                    `开始时间-现在时间戳=${sendParam.startTime - Date.now()}\n` + 
                    `提醒时间：${sendParam.remindTime}*60= ${sendParam.remindTime*60}` + 
                    `(开始时间-现在时间戳)÷1000 - 提醒时间*60=` + 
                     ` ${( sendParam.startTime - Date.now() )/1000 - sendParam.remindTime*60}`
                            )

                this.doSend(sendParam)

            }
        },
        mounted(){
            this.initParam(this.data_cate)
            this.request_record(this.data_cate)
        },
        mixins:[Multiplexing]
    }
</script>
<style scoped>

    #form_examine .col-xs-3{
        width:22%;
    }
    #form_examine .col-xs-2{
        width:18%;
    }
    #form_examine .col-xs-1{
        padding-right: 0;
    }
    #form_examine .add-examine{
        width: 90%;
        height: 24px;
        line-height: 11px !important;
        background-color: #1785F7;
        color: #fff;
    }

</style>