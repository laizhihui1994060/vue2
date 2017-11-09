<template>
    <div id='wage_standard'>
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/companyManagement/wageSetting',text:'工资设定'},{path:'',text:'工资标准设置' }]"/>
            <div class="fixed_salary">
                <article @click='showDetails'>基本信息<i></i></article>
                <div class='details'>
                    <table>
                        <thead>
                            <tr>
                                <th>职位</th>
                                <th>基本工资</th>
                                <th>住房补贴</th>
                                <th>餐饮补贴</th>
                                <th>高温补贴</th>
                                <th>全勤奖</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in salary_info">
                                <td><input type="text" :value="item.position" /></td>
                                <td><input type="text" :value="item.basic_salary" /></td>
                                <td><input type="text" :value="item.housing_subsidy" /></td>
                                <td><input type="text" :value="item.meals_subsidy" /></td>
                                <td><input type="text" :value="item.high_temperature_subsidy" /></td>
                                <td><input type="text" :value="item.full_attendance_bonus" /></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="royalty_coefficient">
                <article @click='showDetails'>基本信息<i></i></article>
                <div class='details'>
                    <table>
                        <thead>
                            <tr>
                                <th>员工姓名</th>
                                <th>职位</th>
                                <th>下单基点</th>
                                <th>超标提成</th>
                                <th>超标提成</th>
                                <th>调度基点</th>
                                <th>超标提成</th>
                                <th>低标提成</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in extra_info">
                                <td><input type="text" :value="item.name" /></td>
                                <td><input type="text" :value="item.position" /></td>
                                <td><input type="text" :value="item.order_basic_point"/></td>
                                <td><input type="text" :value="item.exceed_the_criteria_for_order" /></td>
                                <td><input type="text" :value="item.under_the_criteria_for_order" /></td>
                                <td><input type="text" :value="item.schedule_base" /></td>
                                <td><input type="text" :value="item.exceed_the_criteria_for_schedule" /></td>
                                <td><input type="text" :value="item.under_the_criteria_for_schedule" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" data-dismiss="modal" class="btn" @click="save_salary_info">设定</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/companyManagement/wageSetting' }" class="btn" active-class=' '>返回</router-link>
            </div>
        </div>
  </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import breadcrumb from "../.././../../../common_component/breadcrumb.vue";
    export default{
        data () {
            return {
                salary_info:[
                    {
                        position:'调度员',
                        basic_salary:2000,
                        housing_subsidy:2000,
                        meals_subsidy:2000,
                        high_temperature_subsidy:2000,
                        full_attendance_bonus:200//全勤奖
                    },
                    {
                        position:'调度员',
                        basic_salary:2000,
                        housing_subsidy:2000,
                        meals_subsidy:2000,
                        high_temperature_subsidy:2000,
                        full_attendance_bonus:200//全勤奖
                    },
                    {
                        position:'调度员',
                        basic_salary:2000,
                        housing_subsidy:2000,
                        meals_subsidy:2000,
                        high_temperature_subsidy:2000,
                        full_attendance_bonus:200//全勤奖
                    }
                ],
                extra_info:[
                    {
                        name:'张三',
                        position:'调度员',
                        order_basic_point:'50',
                        exceed_the_criteria_for_order:'0.3',//超标提成
                        under_the_criteria_for_order:'0.1',
                        schedule_base:'0.8',//调度基点
                        exceed_the_criteria_for_schedule:'0.3',//超标提成
                        under_the_criteria_for_schedule:'0.1'
                    },
                    {
                        name:'张三',
                        position:'调度员',
                        order_basic_point:'50',
                        exceed_the_criteria_for_order:'0.3',//超标提成
                        under_the_criteria_for_order:'0.1',
                        schedule_base:'0.8',//调度基点
                        exceed_the_criteria_for_schedule:'0.3',//超标提成
                        under_the_criteria_for_schedule:'0.1'
                    },
                    {
                        name:'张三',
                        position:'调度员',
                        order_basic_point:'50',
                        exceed_the_criteria_for_order:'0.3',//超标提成
                        under_the_criteria_for_order:'0.1',
                        schedule_base:'0.8',//调度基点
                        exceed_the_criteria_for_schedule:'0.3',//超标提成
                        under_the_criteria_for_schedule:'0.1'
                    }
                ],
                res:{}
            }
        },
        methods:{
            showDetails(){
                $(event.target).toggleClass('up');
                $(event.target).siblings('.details').slideToggle('fast');
            },
            save_salary_info(){

            }

        },
        components:{
            btnSelect,
            breadcrumb
        },
    }
</script>

<style>

#wage_standard .modal-body{
    padding:15px 23px;
}
#wage_standard .modal-body > div{
    margin-bottom: 40px;
}
#wage_standard article{
    margin:0;
    float:none;
    font-size:18px;
    cursor: pointer;
}
#wage_standard article:after{
    width:1400px;
    left:100px;
}
/* #wage_standard  article i{
    content:'';
    display:inline-block;
    width:14px;
    height:14px;
    margin-left:10px;
    top:0;
    left:0px;
    
    background:url('../../../../../assets/up.png') no-repeat 0 5px;
    
}
#wage_standard  article.up i{
    background:url('../../../../../assets/down.png') no-repeat 0 7px;
} */
#wage_standard .details{
    padding:10px 50px;
    background:#fff;
}

#wage_standard .modal-body  table{
    width:100%;
    border-collapse:separate;
    border-spacing:0px 10px;
}
#wage_standard .modal-body  table th{
    border-top:1px solid #eee;
    border-bottom: 1px solid #eee;
    padding:5px 10px;
    height:24px;
}
#wage_standard .modal-body  table th:first-child{
    border-left:1px solid #eee;
}
#wage_standard .modal-body  table th:last-child{
    border-right:1px solid #eee;
}

#wage_standard .modal-body  table tbody{
    overflow-y:scroll;
}
#wage_standard .modal-body  table th,
#wage_standard .modal-body  table td{
    width:109px;
}
#wage_standard .modal-body  table tbody tr td{
    padding-left:10px;
    border-top:1px solid #eee;
    border-bottom: 1px solid #eee;
}
#wage_standard .modal-body  table tbody tr td:first-child{
    padding-left:7px;
    border-left:1px solid #eee;
}
#wage_standard .modal-body  table tbody tr td:last-child{
    border-right:1px solid #eee;
}
#wage_standard .modal-body  table tbody tr td input[type='text']{
    display:inline-block;
    padding:0px 15px 0px 5px;
    height:24px;
    background-color:rgb(223,245,253);
    width:80px;
}
#wage_standard .modal-body ul li.active{
    background-color:#39B6E5;
}
/*royalty_coefficient*/
#wage_standard .modal-body .royalty_coefficient table tbody{
    overflow-y:auto;
    overflow-x:scroll;
    min-height:300px;
}
#wage_standard .modal-body .royalty_coefficient table th{
    width:82px;
}
#wage_standard .modal-body .royalty_coefficient table td input[type='text']{
    width:60px;
}
#wage_standard .modal-footer button{
    margin:0 50px;
    width:80px;
    height: 24px;
    border:1px solid #39B6E5;
    background-color:#fff;
    padding:0;
    color:#39B6E5;
    font-size:12px;
    border-radius: 0;
    font-size: 14px;
    letter-spacing: 0px;
    line-height: 14px;
    padding: 5px 26px;
}
#wage_standard .modal-footer .btns{
    margin-top:0;
}
#wage_standard .modal-footer .btns button{
    padding:0;
    line-height:10px;
}
</style>