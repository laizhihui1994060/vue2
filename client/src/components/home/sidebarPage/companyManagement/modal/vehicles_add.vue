<template>
    <div id='vehicles_add' class="child_page">
        <breadcrumb
            :arr="[{path:'/LoginFinish/companyManagement/listVehicles',text:'车辆列表'}, {path:'',text: navText }]"/>

        <article style="cursor:pointer;" @click='showDetails($event)'>
            车辆信息<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
        </article>
        <data-dictionary class='details' :tow-truck-id="towTruckId" @updateId='updateId' @upateHistory='upateHistory'  />
        <!-- 车险到期提醒 -->
        <template v-if='expire_remind.length && serverURL(["companyManagement","calendar_index_notice"])'>
            <table id="exp-remind" class=''>
                <tr>
                    <td>
                        <img class="warning-icon" width="35px" :src="warningPath" alt="">
                    </td>
                    <td>
                        <ul class="remind-list">
                            <li v-for='i in expire_remind' v-text='i'></li>
                        </ul>
                    </td>
                </tr>
            </table>
        </template> 

        <article style="cursor:pointer;" @click='showDetails($event)'>
            配置工具<span class='img up down' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
        </article>
        <config-tool class='details' :tow-truck-id="towTruckId"/>

        <template v-if='showHistory'>
            <article style="cursor:pointer;" @click='showDetails($event)'> 
                绑车历史<span class='img up down' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
            </article>
            <vehicleHistory class='details' :tow-truck-id='towTruckId'  ref='vehicleHistory' />
        </template>

        <!-- new option -->

        <template v-if='query_verification || editable.update_verification'>
            <article style="cursor:pointer;" @click='showDetails($event)'>
                车辆年审<span class='img up down' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
            </article>
            <car-examine-table :editable="editable.update_verification" data_cate="VERIFICATION" :tow-truck-id='towTruckId' class='details' ref='carExamine' />
        </template>
        <template v-if='query_insurance || editable.update_insurance'>
            <article style="cursor:pointer;" @click='showDetails($event)'>
                车辆保险<span class='img up down' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
            </article>
            <car-insurance-table :editable="editable.update_insurance" data_cate="INSURANCE" :tow-truck-id='towTruckId' class='details' ref='carInsurance' />
        </template>
        <template v-if='query_pass || editable.update_pass'>
            <article style="cursor:pointer;" @click='showDetails($event)'>
                通行证<span class='img up down' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
            </article>
            <car-pass-table :editable="editable.update_pass" data_cate="PASS_CHECK" :tow-truck-id='towTruckId' class='details' ref='carPass' />
        </template>
        <template v-if='query_repair || editable.update_repair'>
            <article style="cursor:pointer;" @click='showDetails($event)'>
                车辆保养<span class='img up down' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
            </article>
            <car-keeping-table :editable="editable.update_repair" data_cate="REPAIR" :tow-truck-id='towTruckId' class='details' ref='carKeeping' />
        </template>
         
    </div>
</template>
<script>
 
import breadcrumb from "../.././../../../common_component/breadcrumb.vue";
import accidentRecord from "./vehicles_add_childPage/accidentRecord.vue";
import annualRecord from "./vehicles_add_childPage/annualRecord.vue";
import buyInsurance from "./vehicles_add_childPage/buyInsurance.vue";
import configTool from "./vehicles_add_childPage/configTool.vue";
import dataDictionary from "./vehicles_add_childPage/dataDictionary.vue";
import maintenanceRecord from "./vehicles_add_childPage/maintenanceRecord.vue";
import vehicleHistory from './vehicles_add_childPage/vehicleHistory.vue';
import carExamineTable from './vehicles_add_childPage/carExamineTable.vue';
import carInsuranceTable from './vehicles_add_childPage/carInsuranceTable.vue';
import carKeepingTable from './vehicles_add_childPage/carKeepingTable.vue';
import carPassTable from './vehicles_add_childPage/carPassTable.vue';

    export default{
        data () {
            return {
                towTruckId:'',
                navText: '',
                warningPath:require('../.././../../../assets/warning-yellow.png'),
                showHistory: false ,
                query_repair:false,
                query_pass:false,
                query_insurance:false,
                query_verification:false,
                editable:{
                    "update_verification":false,
                    "update_insurance":false,
                    "update_pass":false,
                    "update_repair":false
                },
                expire_remind:[],//到期提示信息
                param_examine:{
                    pageSize:5,
                    pageIndex:1
                }
            }
        },
        components:{
            accidentRecord,
            buyInsurance,
            annualRecord,
            configTool,
            dataDictionary,
            maintenanceRecord,
            breadcrumb,
            carExamineTable,
            carInsuranceTable,
            carKeepingTable,
            carPassTable,
            vehicleHistory
        },
        created(){
            this.towTruckId = this.$route.params.chosen;
            console.log(this.$route.params)
            const bool = this.$route.params.isCreate.toString() === 'true';
            if(bool){
                this.navText = '添加车辆';
                
            }else{
                this.navText = '查看车辆';
                this.showHistory = true;
            }
        },
        methods:{
            serverURL(url){
               return ConfigPage.isExist(url);
            },
            displayControl(){
                const edtb = this.editable
                this.query_repair = this.serverURL(['companyManagement','query_repair']);
                this.query_pass = this.serverURL(['companyManagement','query_pass']);
                this.query_insurance = this.serverURL(['companyManagement','query_insurance']);
                this.query_verification = this.serverURL(['companyManagement','query_verification']);
                for(let i in edtb){
                    edtb[i] = !!this.serverURL(['companyManagement',i])
                }
                
            },
            showDetails(event){
                $(event.currentTarget).find('span').toggleClass('down');
                $(event.currentTarget).next('.details').slideToggle('fast');
            },
            updateId(id){
                this.towTruckId = id;
            },
            upateHistory(){
                this.$refs.vehicleHistory.$refs.table.watchDataForm();
            },
            receive_remind(text){
                // this.expire_remind.push('您的小型车通行证将于2017-10-10过期，请及时办理缴费！','您的年审将于2017-10-12过期，请及时办理缴费！')
                // this.expire_remind.sort();
            },
            request_remind(){
                // var checkRight = new Set(['query_repair','query_pass','query_insurance','query_verification'])
                send({
                    type: 'post',
                    url: 'client:/calendar/event_type/notices',
                    param:{
                        "pageSize"  : 5,
                        "pageIndex" : 1
                    }
                }, (err,res) => {
                    if(err) return alert(err)
                    if(res.status === 200){
                        console.log("查询提醒记录成功",res)
                        this.expire_remind = res.content.filter(it=>{
                            if(it.truckId !== this.towTruckId){
                                return false;
                            } else if( 0&& !this.serverURL(["companyManagement","calendar_index_notice"]) ){
                                return false;
                            }
                            return true;
                        }).map(it=>{
                            console.log("记录记录记录",it)
                            var recordName = ""
                            switch(it.calendarType){
                                case "VERIFICATION" : recordName = "车辆年审"; break;
                                case "INSURANCE"    : recordName = it.codeName?it.codeName:"车辆保险"; break;
                                case "PASS_CHECK"     : recordName = it.codeName?it.codeName:"车辆通行证"; break;
                                case "MAINTAIN"     : recordName = it.codeName?it.codeName:"车辆保养"; break;
                                case "REPAIR"       : recordName = it.codeName?it.codeName:"车辆保养"; break;
                                
                            }
                            return `当前车辆：${!!it.plateNo?it.plateNo:""}，您的${recordName}将于${new Date(it.endTime).Format('yyyy-MM-dd')}过期，请及时办理缴费！`
                        })
                        
                        
                    } else {
                        console.log("查询提醒记录失败",res) 
                    }
                })
            }
        },
        mounted(){
            console.log("路由",this.$route)
            const self = this;
            this.request_remind();
            this.displayControl();
            this.$nextTick(function(){
                let els =  $('#vehicles_add > article');
                els.each(function(index, el) {
                    if(index == 0)return true;
                    $(el).next('.details').css('display','none');
                });
            })
        },
    }

    
</script>

<style>

#vehicles_add .details{
    padding:20px 30px;
    background: #fff;
}
#vehicles_add article:after{
    left:100px;
}
#vehicles_add{
    margin-top: 22px;
    position: relative;
}
#vehicles_add .addCar{
    position: absolute;
    right: 40px;
    top: 0;
    color: #39b6e5 !important;
}
#vehicles_add .setBackground{
    background: #fff
}
#vehicles_add article{
    cursor: pointer;
}
#vehicles_add .row{
    margin-bottom: 8px;
}

#vehicles_add .btns button{
    margin:0 40px;
}
#vehicles_add .warning-icon{
    /*margin: 0 auto;*/
    text-align: center;
    vertical-align: middle;
    /*padding: 15px;*/
}
#vehicles_add .remind-list li{
    margin: 5px;
    color: #df4616;
}
#vehicles_add .warning-icon:after{
    clear:both;
}
#vehicles_add #exp-remind{
    margin-top: 15px;
    width: 100%;
}
#vehicles_add .warning-wrap{
    height: 100%;
}
#vehicles_add .ya{
    border: 1px solid #39B6E5 ;
    color: #39B6E5;
    text-align: center;
    background: #fff;
    font-size: 12px;
    line-height: 12px;
}

#vehicles_add .right_content{
    min-height: inherit;
}
</style>