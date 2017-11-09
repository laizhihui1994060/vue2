<template>
    <div id='salary_reward' class='child_page'>
        <breadcrumb
            :arr="[{path:'/LoginFinish/companyManagement/salary', text: '工资奖惩'},{path:'',text: navText }]"/>
        <article>基本信息</article>

        <div class='details'>
            <div class="details-body">
                <div class="block">
                    <div class="row">
                        <div class='col-sm-3'>
                            <datetimepicker
                                label='登记日期'
                                labelRight='12px'
                                background="#DCF4FC"
                                width='95px'
                                padding='4px'
                                name="registration_time"
                            ></datetimepicker>
                        </div>
                        <div class='col-sm-3'>
                            <btn-select 
                                label='登&nbsp;&nbsp;记&nbsp;人' 
                                label-right='12px'
                                url="/item" 
                                filter="SVC_NAME"
                                width='76px' 
                                name="registered_person" 
                                padding='0'>
                            </btn-select>
                        </div>
                        <div class='col-sm-3'>
                            <btn-select 
                                label='员&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工' 
                                label-right='14px'
                                url="/item" 
                                filter="SVC_NAME"
                                width='76px' 
                                name="name" 
                                padding='0'>
                            </btn-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class='col-sm-3'>
                            <form-label-input 
                                label='员工编号'
                                :value='employee_number' 
                                name='employee_number'>
                            </form-label-input>
                        </div>
                        <div class='col-sm-3'>
                            <form-label-input 
                                label='奖励金额'
                                labelRight='12px'
                                inputWidth='100px'
                                :value='money' 
                                name='money'>
                            </form-label-input>
                        </div>
                        <div class='col-sm-3'>
                            <datetimepicker
                                label='工资月份'
                                labelRight='12px' 
                                background="#DCF4FC"
                                width='95px'
                                padding='4px'
                                name="date"
                            ></datetimepicker> 
                        </div>
                    </div>
                    <div class="reason row">
                        <div class='col-sm-9'>
                            <span>奖励原因</span> 
                            <textarea name="reason" :value="reason" style='width:100%;height:100px;background:#DFF5FD'>我是奖励原因我是奖励原因
                            </textarea>
                        </div>
                    </div>
                    
                    <div class="img row">
                        <div class="col-sm-9">
                            <input-img name='img'  ></input-img>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btns details-footer">
                <button type="button" class="btn" @click="add">{{ isCreate ? '添加' : '修改' }}</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/companyManagement/salary' }" class="btn" active-class=' '>返回</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import inputImg from '../../../../../common_component/inputImg.vue'
import datetimepicker from '../../../../../common_component/datetimepicker.vue'
import formLabelInput from '../../../../../common_component/form-label-input.vue'
import getData from "../../../../../../static/js/getData.js"
import breadcrumb from '../../../../../common_component/breadcrumb.vue'

    export default{

        components:{
            btnSelect,
            inputImg,
            datetimepicker,
            formLabelInput,
            breadcrumb
        },
        data () {
            return {
                chosen: {

                },
                isCreate: true,
                isSalary: true
            }
        },
        computed:{
            navText: {
                get(){
                    if(this.isCreate){
                        if(this.isSalary){
                            return '添加工资奖励'
                        }else{
                            return '添加工资扣除'
                        }
                    }else{
                        if(this.isSalary){
                            return '查看工资奖励'
                        }else{
                            return '查看工资惩罚'
                        }
                    }
                }
            }
        },
        created(){
            this.chosen = this.$route.params.chosen;
            this.isCreate = this.$route.params.isCreate;
            this.isSalary = this.$route.params.isSalary;
        },
        methods:{
            add(){
                //收集
                let data = {};
                data = getData('#salary_reward');
                if(data){
                    $('#salary_reward').modal('hide')
                    this.$emit('add', data);
                }else{
                    alert('某些资料不能为空')
                }
            }
        }
    }
</script>

<style scoped>
    #salary_reward{
        margin-top: 22px;
        margin-left: 38px;
    }

    #salary_reward .details > div{
        margin-bottom: 8px;
    }



</style>