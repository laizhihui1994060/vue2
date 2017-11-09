<template>
    <div class="details" id="configTool">
        <div class="details-body clearfix">
            <div class='float'>
                <div class="setpos" v-for="(i,index) in tools" style="margin-bottom:16px;">
                    <div class="inline">
                        <btn-select 
                            width='144px'
                            label-right='12px'
                            url="client:/helper/tool" 
                            filter="name" 
                            :name="index"
                            :title="i.toolName" 
                            @updata="integrationDate"
                            :disabled='disabled'
                            padding='0'/>
                    </div>
                    <div class="inline">
                        <form-label-input
                            type="number" 
                            :min="1"
                            input-width="100px"
                            :name="index" 
                            placeholder="数量"
                            @updata="integrationDate"
                            :disabled='disabled' 
                            :value="i.qty"/>
                    </div>
                    <a v-if="index == tools.length-1" href="javascript:;" title="添加" @click="addTool(index)" class="img addTool"></a>
                    <a v-if="tools.length>1" href="javascript:;" title="删除"  @click="removeTool(index)" class="img remove"></a>
            </div>
            </div>
            <div class="inline float" style="margin-left:200px;">
                <div class="tool">
                    <div v-if="tools.length === 1 && tools[0].toolName == ''">暂无车辆随车工具信息</div>
                    <div v-else v-for="item in tools">
                        <span>{{item.toolName}}</span>
                        <span>{{item.qty}}</span>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="details-footer btns" style='margin-top:20px'>
            <button type="button" class="btn radius-btn" @click="submit" v-text="isModify ? '保存' : '修改'"></button>
            <!-- <button class="btn ya" @click="clear">清空</button> -->
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
            btnSelect,
            datetimepicker,
            formLabelInput,
            inputImg
        },
        data(){
            return{
                disabled: false,
                configuration_tools:[],
                tools:[{
                    toolCode:0,
                    qty:1,
                    toolName:''
                }],
                isModify: true
            }
        },
        methods:{
            integrationDate(index,val){

                if(isNaN(val)){
                    let bool = this.tools.some( (obj, index) => {
                        if(obj.toolCode == val.code) return true;
                    });
                    if(bool){
                        alert('已经拥有了该工具！'); 
                        return ;
                    }
                    this.tools[index].toolCode = val.code;
                    this.tools[index].toolName = val.name;
                }else {
                    this.tools[index].qty = val;
                };
                console.log(this.tools)
            },
            addTool(index){
                if(!this.isModify) {
                    alert('请先按修改按钮'); 
                    return ;
                } else if(!this.tools[index].toolCode){
                    alert('请选择一种工具');
                    return ;
                }
                
                this.tools.push({
                    toolCode:'',
                    qty:1,
                    toolName:''
                });

            },
            removeTool(index){
                if(this.isModify) this.tools.splice(index,1);
                else alert('请先按修改按钮');
            },
            clear(){
                this.tools = [{
                    toolCode:0,
                    qty:null,
                    toolName:''
                }];
                $('#configTool .filter').text('');
                $('#configTool [type="number"]').val('');
            },
            submit(){
                const self = this;
                console.log(self.isModify)
                if(this.isModify){         
                    self.disabled = true;
                    self.isModify = false;
                    console.log(this.towTruckId)
                    if(this.towTruckId == '0') return alert('请先添加车辆');
                    var ar = [];
                    send({
                        type:'post',
                        url:'client:/towtruck/'+ this.towTruckId +'/tool',
                        param: self.tools
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            alert('设置工具成功', 'success');
                        }else{
                            alert('设置工具失败');
                            console.log(res);
                        }
                    });
                    
                }else{
                    self.disabled = false;
                    self.isModify = true;
                };
            }
        },
        mounted(){
            const self = this;
            this.$nextTick(function(){
                self.isCreate = self.$route.params.isCreate;
                if(self.isCreate) return;
            });
        },
        created(){
            console.log(this.towTruckId)
            const bool = this.$route.params.isCreate.toString() === 'true';
            if(this.towTruckId && bool == false){
                
                console.log('aaa')
                const self = this;
                self.disabled = true;
                self.isModify = false;
                send({
                    type:'post',
                    url:'client:/towtruck/tool',
                    param:[{id:this.towTruckId}]
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200 ||res.status == 404  ){
                        self.tools = res.content.length ? res.content[0].tools : [{
                            toolCode:0,
                            qty: null,
                            toolName:''
                        }];
                        if(self.tools.length === 1 && self.tools[0].toolName == ''){
                            // self.disabled = false;
                            // self.isCreate = false;
                        }
                    }else{
                        alert('获取随车工具失败');console.log(res)
                    }
                });
            };
        }
    }
</script>

<style scoped>
    .img{
        display: inline-block;
        margin-top: 4px;
    }
    .float{
        float: left;
    }
    .inline{
        float: left;
        margin-right: 25px;
    }
    .tool{
        background: #DBDFE3;
        padding: 10px;
        font-size: 12px;
        float: left;
        width: 180px;
        height: 190px;
        overflow-y: auto;
    }
    .tool span{
        color: #999;
        width: 72px;
        display: inline-block
    }
    #configTool .addTool[disabled]{
        background-color: #F6F6F6 !important;
        border-color: transparent;
        color: #ccc

    }
</style>