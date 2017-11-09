<template>
    <div class="child_page" id="accidentRecord">
        <breadcrumb
            :arr="[{path:'/LoginFinish/financialManagement/invoice',text:'发票管理'},{path:'',text:'发票簿入库'}]"/>
        <div class="details-body">

            <div style="height:10px;position: relative;" class="text-center"  v-if="!insurance_purchase_info.length">暂无维修记录</div>
            <div style="height:250px;" v-if="insurance_purchase_info.length">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>事故日期</th>
                                <th>事故状况</th>
                                <th>责任方</th>
                                <th>详情</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="(item,index) in insurance_purchase_info" :key="index">
                                <td v-text="item.registerDate"></td>
                                <td v-text="item.registerId"></td>
                                <td v-text="item.validStartDate + ' / ' + item.validEndDate"></td>
                                <td v-text="item.status == 'VALID' ? '有效':'无效'"></td>
                            </tr> 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       
    </div>
</template>
<script>

import btnSelect from "../../../../../../common_component/btn_select.vue";
import datetimepicker from "../../../../../../common_component/datetimepicker.vue";
import formLabelInput from "../../../../../../common_component/form-label-input.vue";
import inputImg from "../../../../../../common_component/inputImg.vue";

    export default{
        props:['towTruckId'],
        components:{
        },
        data(){
            return{ 
                insurance_purchase_info:[],
            }
        },
        created(){
            // if(this.towTruckId){
            //     const self = this;

            //     send({
            //         type:'post',
            //         url:'4577/v1/maintain/list',
            //         param:{
            //             'towTruckId':this.towTruckId
            //         }
            //     },function(err,res){
            //         if(err)return console.log(err);
            //         if(res.status == 200 || res.status == 404 ){
            //             alert('获取维修记录成功', 'success');
            //             console.log(res);
            //             self.insurance_purchase_info = res.content ? res.content : [];
            //         }else{
            //             alert('获取维修记录失败');
            //             console.log(res)
            //         };
            //     });

            // }
        },
    }
</script>

<style scoped>

</style>