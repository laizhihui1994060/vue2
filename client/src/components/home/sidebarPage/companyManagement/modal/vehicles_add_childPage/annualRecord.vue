<template>
    <div class="child_page" id="annualRecord">
        <breadcrumb
            :arr="[{path:'/LoginFinish/companyManagement/annualRecord',text:'保险记录'},{path:'',text: isCreate ? '添加年审记录' : '查看年审记录'}]"/>

        <div class="details-body">
            <div class='add_record'> 
                <article>添加记录</article>
                <div class="details">
                    <div class="row">
                        <div class="col-xs-3">
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
                        <div class="col-xs-3">
                            <datetimepicker
                                background="#DCF4FC"
                                name="registerDate"
                                label="登记时间"
                                :value="result.registerDate" 
                                placeholder="请输入登记时间"
                                width="106px"
                                @updata="integrationDate"/> 
                        </div>
                        <div class="col-xs-3">
                            <btn-select 
                                label='登&nbsp;记&nbsp; 人' 
                                label-right='10px'
                                :title='result.registerId'
                                url="/insproduct" 
                                filter="name" 
                                list-width="106px"
                                name="business_insuranc" 
                                @updata="integrationDate" 
                                padding='0'
                                width="86px"/>
                        </div>
                        <div class="col-xs-3">
                          <btn-select 
                            label='状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态' 
                            label-right='10px'
                            :title='result.registerId'
                            :arr="[{cn:'有效',en:'VALID'},{cn:'失效',en:'EXPIRED'}]"
                            filter="cn" 
                            list-width="106px"
                            name="status" 
                            @updata="integrationDate" 
                            padding='0'
                            width="86px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=" details-footer btns">
            <button type="button" class="btn ya" @click="submit">{{isCreate ? '增加' : '清空' }}</button>
            <router-link tag='button' :to = "{ path: '/LoginFinish/companyManagement/annualRecord' }" class="btn ya" @click="clear">取消</router-link>
        </div>
    </div>
</template>
<script>
import breadcrumb from '../../../../../../common_component/breadcrumb.vue'
import btnSelect from "../../../../../../common_component/btn_select.vue";
import startEndTime from "../../../../../../common_component/startEndTime.vue";
import datetimepicker from "../../../../../../common_component/datetimepicker.vue";
import formLabelInput from "../../../../../../common_component/form-label-input.vue";
import inputImg from "../../../../../../common_component/inputImg.vue";

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
            return {
                result:{
                    yearlyAuditId :'',       //年审ID
                    towTruckId :'',          //拖车ID                   
                    registerDate:'',         //登记时间
                    registerId:'',           //登记人ID
                    validStartDate:'',        //开始时间
                    validEndDate:'',          //结束时间
                    status:''                 //状态
                },
                isCreate:true,
                insurance_purchase_info:[],
                oInput:null,
                oButton:null,
                isModify:false
            }
        },
        mounted(){
            const self = this;
            this.$nextTick(function(){
                self.isModify = self.$route.params.isCreate;
                self.isCreate = self.$route.params.isCreate;
                self.oInput = $('#annualRecord .details-body input[type!="file"]');
                self.oButton = $('#annualRecord .details-body button');
                if(self.isCreate)return;
               
                self.oInput.attr('disabled',true);
                self.oButton.attr('disabled',true);
            });
        },
        created(){

            if(this.towTruckId && this.$route.params.isCreate === false){
                const self = this;

                send({
                    type:'post',
                    url:'4577/v1/towtruck/yearlyaudit/list',
                    param:{
                        towTruckList:[{'id':this.tow_truck_id}]
                    }
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200 || res.status == 404 ){
                        alert('获取年审记录成功', 'success');

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
                        alert('获取年审记录失败');
                        console.log(res)
                    };
                });

            }
        },
        methods:{
            integrationDate(name,val){
                console.log(name,val)
                 if(name == 'status'){
                    this.result[name] = val.en;
                }else{
                    this.result[name] = val;
                }
            },
            submit(){
                if(!this.towTruckId){
                    $('body,html').animate({scrollTop:0},500);
                    return alert('请先填写基本信息');
                }

                

                const self = this;

                if(this.isCreate){
                    this.oInput.attr('disabled',true);
                    this.oButton.attr('disabled',true);
                    this.isCreate = false;

                    if(this.isModify){
                        send({
                            type:'post',
                            url:'4577/v1/towtruck/' + this.tow_truck_id +'/yearlyaudit',
                            param:this.result
                        },function(err,res){
                            if(err)return console.log(err);
                            if(res.status == 200){
                                this.insurance_purchase_info.push(this.result);
                                this.clear();
                                alert('新增车辆年审记录成功', 'success');
                            }else{
                                alert('新增车辆年审记录失败');
                                console.log(res);
                            }
                        });
                    }else{

                        send({
                            type:'put',
                            url:'4577/v1/towtruck/' + tow_truck_id +'/yearlyaudit',
                            param:this.result
                        },function(err,res){
                            if(err)return console.log(err);
                            if(res.status == 200){
                                alert('更新车辆年审记录成功', 'success');
                                self.insurance_purchase_info.splice(self.currentIndex,1,self.result);
                            }else{
                                alert('更新车辆年审记录失败');
                                console.log(res);
                            }
                        });
                    }
                }else{
                    this.oInput.attr('disabled',false);
                    this.oButton.attr('disabled',false);
                    this.isCreate = true;

                }
            },
            modify(item,index){
                this.result = item;
                this.isCreate = false;
                this.currentIndex = index;
            },
            clear(){
                this.result ={
                    yearlyAuditId :'',       //年审ID
                    towTruckId :'',          //拖车ID                   
                    registerDate:'',         //登记时间
                    registerId:'',           //登记人ID
                    validStartDate:'',        //开始时间
                    validEndDate:'',          //结束时间
                    status:''                 //状态
                },
                $('#annualRecord .filter').text('');
                $('#annualRecord [type="number"]').val('');
                $('#annualRecord [type="text"]').val('');
            },
            del(){
                
            }
        }
    }
</script>

<style scoped>
    #annualRecord{
        margin-top: 22px;
        margin-left: 38px;
        min-height:600px;
    }

    #annualRecord .row > div{
        margin-bottom: 8px;
    }
    .details{
        padding:50px 20px;
    }
    .add_record > div{
        margin-bottom: 8px;
    }
      .group{
        overflow: hidden;
        text-align: right;
        padding-right: 20px;
    }
    .group button{
        font-size: 12px;
    }
</style>