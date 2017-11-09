<template>
    <div class="modal fade" id="addReduction" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                 <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">添加减免记录</h4>
                </div>
                <div class="modal-body">
                    <div class="details">
                     
                        <div class="row">
                            <div class="col-xs-12">
                                <form-label-input 
                                    label='减免金额'
                                    @updata='integrationDate'
                                    :disabled='disabled'
                                    type="number"
                                    :after="true"
                                    inputWidth='300px'
                                    :value='information.payPersonName'
                                    name='reliefAmount' />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <input-text
                                    label="减免原因"
                                    input-width="300px"
                                    :value='information.remark'
                                    name='reason'
                                    :after="true"
                                    :disabled='disabled'
                                    @updata="integrationDate" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn"  @click="add" style="margin-right:50px">添加减免</button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import inputText from '../../../../../common_component/inputText.vue'
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    
     export default{
        props:['partnerId','finReconId'],
        components:{
            inputText,
            formLabelInput
        },
        data(){
            return {
                res:{},
                information:{}
            }
        },
        methods:{      
            integrationDate(name,item){
                // if(name == 'handlePersonId'){
                //     this.res['handlePersonName'] = item.empName;
                //     this.res['handlePersonId'] = item.empId;
                //     return ;
                // }
                if(name == 'reliefAmount'){
                    item = Number(item);
                }
                this.res[name]= item;
                
            },

            clearInput(){
                $('[name=reliefAmount],[name=reason]').val('');
            },
            add(){
                const self = this;
                // this.res['isActive'] = true;
                this.res['reliefRecordId'] = global.uuid()//正在寻找减免ID
                console.log("添加减免", this.res);

                let bool = true;
                $('#addReduction').find('[verify="true"]').each(function(index, el) {
                    el.style.border="none"
                    if( !el.value){
                        el.style.border="1px solid rgb(249, 188, 188)";
                        bool = false;
                    };

                    

                });

                if(!bool)return alert('数据不完整，请先完善数据');


                send({
                    url: 'finance:/recon/' + this.finReconId + '/relief',
                    type: 'post',
                    param: self.res
                }, function(err, res){
                    if(res.status == 200){
                        alert('添加成功！', 'success');
                        $('#addReduction').modal('hide');
                        self.clearInput();
                        self.$emit('updata');
                        self.$emit('reductionadded',self.res.reliefAmount,true)

                    }else{
                        console.log("res.msg", res)
                        alert(res.msg ? res.msg : '添加失败，请联系管理员');
                    }
                })
                
            }
        },
        watch:{
            finReconId(newv){
                console.log(newv)
                this.res['finReconciliationId'] = this.finReconId;
            }
        }
    }
</script>

<style scoped>
    #addReduction .modal-dialog{
        width: 425px;

    }
    #addReduction .modal-header,  #addReduction .modal-footer{
        padding: 12px 24px;
    }
    #addReduction .btns button:nth-child(2){
        margin: 0;
    }
    #addReduction .modal-body{
        padding: 10px 25px;
    }
</style>