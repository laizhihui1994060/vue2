<template>
    <div class='child_page' id="buyInsurance">
        <breadcrumb
            :arr="[{path:'/LoginFinish/companyManagement/buyInsurance',text:'保险记录'},{path:'',text: isCreate ? '添加保险记录' : '查看保险记录'}]"/>

        <div class="details-body">
           
            <div class='add_record'> 
                <article>购买保险</article>
                <div class="details">
                    <div class='row'>
                        <div class="col-xs-3">
                            <btn-select 
                                label='车&nbsp;牌&nbsp; 号' 
                                label-right='10px'
                                url="client:/helper/truck"
                                method='post'
                                filter="plateNo" 
                                filterName='id'
                                list-width="135px"
                                name="towTruckId" 
                                @updata="integrationDate" 
                                padding='0'
                                width="85px"/>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-3">
                            <form-label-input
                                input-width="109px"
                                label='保&nbsp;单&nbsp; 号'  
                                name="code"
                                :value="result.code"  
                                placeholder="请输入保单号"
                                labelRight='10px'
                                @updata="integrationDate"/>
                        </div>
                        <div class="col-xs-3">
                            <form-label-input
                                label='保险公司'  
                                input-width="109px"
                                name="insurer"  
                                labelRight='10px'
                                :value="result.insurer"  
                                placeholder="请输入保险公司"
                                @updata="integrationDate"/>
                        </div>
                        <div class="col-xs-3">
                            <datetimepicker
                                background="#DCF4FC"
                                name="registerDate"
                                label="登记时间"
                                labelRight='10px'
                                :value="result.registerDate" 
                                placeholder="请输入登记时间"
                                width="109px"
                                @updata="integrationDate"/> 
                        </div>
                        <div class="col-xs-3">
                            <btn-select 
                                label='登&nbsp;记&nbsp; 人' 
                                label-right='10px'
                                :title='result.business_insurance'
                                url="client:/emp/basic?"
                                :params='{ pageSize:10000, pageIndex: 1 }'
                                filter="empName" 
                                filterName='empId'
                                list-width="135px"
                                :value="result.empName" 
                                name="registerId" 
                                @updata="integrationDate" 
                                padding='0'
                                width="85px"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-3">
                            <start-end-time 
                                label="有效时间" 
                                width="89px" 
                                @updata="integrationDate" 
                                minute="" 
                                startName="validStartDate" 
                                endName="validEndDate"
                                :startValue="result.validStartDate"
                                :endValue="result.validEndDate"/>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <btn-select 
                                label='保险类型' 
                                label-right='10px'
                                :title='result.business_insurance'
                                url="client:/insurance/product" 
                                filter="name"
                                filterName='insuranceProductCode'
                                list-width="135px"
                                :value="result.insuranceProductCode" 
                                name="insuranceCode" 
                                @updata="integrationDate" 
                                padding='0'
                                width="85px"/>

                            <form-label-input
                                type="number" 
                                input-width="50px"
                                name="insuranceCost" 
                                placeholder="金额" 
                                :value="result.insuranceCost" 
                                @updata="integrationDate"/>
                            <span>万元</span>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <form-label-input
                                label='保险额度'
                                labelRight='10px'
                                inputWidth='109px'
                                type="number" 
                                input-width="50px"
                                name="insuranceAmount" 
                                placeholder="保险额度" 
                                :value="result.insuranceAmount" 
                                @updata="integrationDate"/>

                        </div>
                        <div class="col-md-6 col-lg-3">
                            <btn-select 
                                label='经&nbsp;手&nbsp; 人' 
                                label-right='10px'
                                :title='result.handlerPersonId'
                                url="client:/emp/basic?"
                                :params='{ pageSize:10000, pageIndex: 1 }'
                                filter="empName" 
                                filterName='empId'
                                list-width="109px"
                                name="handlerPersonId" 
                                @updata="integrationDate"
                                padding='0'
                                width="86px"/>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="btns details-footer">
            <button type="button" class="btn ya" @click="submit" v-text="isCreate ? '购买' : '修改'"></button>
            <button type="button" class="btn ya" @click="clear"  v-text="isCreate ? '清空' : '取消'"></button>
        </div>
    </div>
</template>
<script>
import breadcrumb from '../../../../../../common_component/breadcrumb.vue'
import btnSelect from "../../../../../../common_component/btn_select.vue";
import startEndTime from "../../../../../../common_component/startEndTime.vue";
import formLabelInput from "../../../../../../common_component/form-label-input.vue";
import inputImg from "../../../../../../common_component/inputImg.vue";
import datetimepicker from "../../../../../../common_component/datetimepicker.vue";

    export default{
        components:{
            btnSelect,
            startEndTime,
            formLabelInput,
            inputImg,
            datetimepicker,
            breadcrumb
        },
        data(){
            return{
                insurance_purchase_info: [],
                result:{

                },
                isCreate:false,
                currentIndex:'',
                oInput:null,
                oButton:null,
                isModify:false
            }
        },
        methods:{
            integrationDate(name, val){
                this.result[name] = val;
                console.log(this.result);
            },
            submit(){},
            clear(){
                this.result = {
                    insurancePurchaseId:'',
                    code:'',
                    insurer:'',
                    registerDate:'',
                    registerId:'',
                    validStartDate:'',
                    validEndDate:'',
                    insuranceProductCode:'',
                    amount:''
                };
                $('#buyInsurance .filter').text('');
                $('#buyInsurance [type="number"]').val('');
                $('#buyInsurance [type="text"]').val('');
            },
            add(){
                send({
                    url:'client:/insurance/'+ this.result.towTruckId,
                    type:'post',
                    param:this.result
                },function(err,res){
                    if(res.status){
                        alert(res.message, 'success');
                    }else{
                        alert('添加失败');
                    }
                });
            },
            modify(){
                console.log(this.towTruckId)
                send({
                    type:'put',
                    url:'client:/towtruck/'+  this.towTruckId,
                    param:this.result
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200){
                        this.insurance_purchase_info.push(this.result);
                        alert(res.message, 'success');
                    }else{
                        alert('新增保险记录失败');
                        console.log(res)
                    }
                })
            }
            // del(item,index){
            //     const self = this;
            //     send({
            //         type:'delete',
            //         url:'client:/towtruck/insurance/' + item.insurancePurchaseId
            //     },function(err,res){
            //         if(err)return console.log(err);
            //         if(res.status == 200){
            //             alert('删除成功', 'success');
            //             self.insurance_purchase_info.splice(self.currentIndex,1)
            //         }else{
            //             alert('删除失败')
            //         };
            //     });
            // }
        },
        created(){
            this.isCreate = this.$route.params.isCreate
            this.submit = $(this).isCreate === false ? this.modify : this.add;
            if(this.towTruckId && this.$route.params.isCreate === false){
                const self = this;
                send({
                    type:'post',
                    url:'client:/towtruck/insurance/list',
                    param:{
                        "towTruckList": [{'id':this.towTruckId}]
                    }
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200 || res.status == 404){
                        alert('获取成功', 'success');
                        console.log(res)
                        self.insurance_purchase_info = res.content ? res.content : [];
                        if(!self.insurance_purchase_info.length){
                            self.isCreate = true;
                            self.isModify = true;
                            self.$nextTick(function(){
                                self.oInput.attr('disabled',false);
                                self.oButton.attr('disabled',false);
                            });
                        }
                    }else{
                        console.log(res)

                        alert('获取失败')
                    };
                });
            }
            
        },

    }
</script>

<style scoped>
    #buyInsurance{
        margin-top: 22px;
        margin-left: 38px;
        min-height:600px;
    }

    #buyInsurance .row > div{
        margin-bottom: 8px;
    }
    .details{
        padding:50px 20px;
    }
    .add_record > div{
        margin-bottom: 8px;
    }
    .ime-inline{
        margin-left: 35px;
        display: inline-block;
    }
    .group{
        overflow: hidden;
    }
    .group button{
        font-size: 12px;
        float: left;
    }
</style>