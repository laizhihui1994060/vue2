<template>
    <div id='turnover_leave' class='child_page'>
        <breadcrumb
            :arr="[{path:'/LoginFinish/companyManagement/turnover',text:'离职信息'},{path:'',text:isCreate ? '办理离职' : '查看离职信息'}]"/>
        <article>基本信息</article>

        <div class='details'>
            <div class="details-body">
                <div class='block'>
                    <div class="row">
                        <div class='col-sm-3'>
                            <form-label-input 
                                label='员工姓名' 
                                :value='name' 
                                name='name'>
                            </form-label-input>
                        </div>
                        <div class='col-sm-3'>
                            <form-label-input 
                                label='员工编号' 
                                :value='id' 
                                name='id'>
                            </form-label-input>
                        </div>
                        <div class='col-sm-3'>
                            <form-label-input 
                                label='职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位' 
                                :value='tax_registration' 
                                name='position'>
                            </form-label-input>
                        </div>
                    </div>
                    <div class="row">
                        <div class='col-sm-3'>
                            <form-label-input 
                                label='性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别' 
                                :value='sex' 
                                name='sex'>
                            </form-label-input>
                        </div>
                        <div class='col-sm-3'>
                            <datetimepicker
                                label='离职日期'
                                background="#DCF4FC"
                                width='96px'
                                padding='4px'
                                name="leave_date"
                            ></datetimepicker>
                        </div>
                        <div class='col-sm-3'>
                            <form-label-input 
                                label='手机号码' 
                                :value='tax_registration' 
                                name='phone_num'>
                            </form-label-input>
                        </div>
                    </div>
                </div>
                <div class="reason row">
                    <div class='col-sm-12'>
                        <span style='margin-right:12px;vertical-align: top'>离职原因</span>
                        <textarea name="reason" style='width:57%;height:100px; background:#DFF5FD; padding:5px;'>我是离职原因我是离职原因
                        </textarea>
                    </div>
                </div>
                <div class="mask row">
                    <div class='col-sm-12'>
                        <span style='margin-right:12px;vertical-align: top'>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
                        <textarea name="mask" style='width:57%;height:100px; background:#DFF5FD; padding:5px;'>我是备注
                        </textarea>
                    </div>
                </div>
            </div>
            <div class="btns details-footer">
                <button type="button" class="btn" @click="add">{{ isCreate ? '办理' : '修改' }}</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/companyManagement/turnover' }" class="btn" active-class=' '>取消并返回</router-link>
            </div>
        </div>
  </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import datetimepicker from '../../../../../common_component/datetimepicker.vue'
import formLabelInput from '../.././../../../common_component/form-label-input.vue'
import getData from "../../../../../../static/js/getData.js"
import breadcrumb from '../../../../../common_component/breadcrumb.vue'

    export default{
       
        components:{
            btnSelect,
            datetimepicker,
            formLabelInput,
            breadcrumb
        },
        data(){
            return {
                chosen: {

                },
                isCreate: true
            }
        },
        created(){
            this.chosen = this.$route.params.chosen;
            this.isCreate = this.$route.params.isCreate;
        },
        methods:{
            add(){
                //收集
                let data = {};
                data = getData('#turnover_leave');
                if(data){

                }else{
                    alert('某些资料不能为空')
                }
            }
        }
    }
</script>

<style scoped>
    #turnover_leave{
        margin-top: 22px;
        margin-left: 38px;
    }

    #turnover_leave .details > div{
        margin-bottom: 8px;
    }


</style>