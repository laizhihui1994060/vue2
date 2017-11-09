<template>

<!-- Modal -->
    <div class="modal fade" id="invoiceBook" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">{{comIscreat? '新增' : '修改'}}发票薄</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-6">
                            <form-label-input 
                                label='发票薄编号'  
                                name='invoiceBookNo'
                                @updata="integrationDate" 
                                input-width="126px"
                                :after="true"
                                :value="currentInvoiceBook.invoiceBookNo"/>
                        </div>
                        <div class="col-xs-6">
                            <form-label-input 
                                label='发票张数'  
                                name='qtyInit'
                                type="number"
                                :after="true"
                                @updata="integrationDate" 
                                input-width="126px"
                                :value="currentInvoiceBook.qtyInit"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <form-label-input 
                                label='起始编号'  
                                name='invoiceBookStartNo'
                                @updata="integrationDate"
                                label-right="26px"
                                input-width="126px"

                                :after="true"
                                :value="currentInvoiceBook.invoiceBookStartNo"/>
                            
                        </div>
                        <div class="col-xs-6">
                            <form-label-input 
                                label='结束编号'  
                                name='invoiceBookEndNo'
                                @updata="integrationDate" 
                                :after="true"
                                input-width="126px"
                                :value="currentInvoiceBook.invoiceBookEndNo"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            
                            <form-label-input 
                                label='最大开票金额'  
                                name='maxAmount'
                                type="number"
                                :after="true"

                                @updata="integrationDate" 
                                input-width="126px"
                                label-right="0"
                                :value="currentInvoiceBook.maxAmount"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <btn-select 
                                label='发票类型' 
                                label-right='27px'
                                :after="true"
                                url='finance:/invoice/type/org'
                                filter="name" 
                                name="invoiceTypeId"
                                @updata="integrationDate"
                                width="300px" 
                                :uuid="true"
                                :updata-key='updataKey'
                                field="invoiceTypeId"
                                :value="currentInvoiceBook.invoiceTypeId"/>

                                <a href="javascript:;" class="newV" style="margin-left:0" @click="newAlue=true">新建</a>
                                <a href="javascript:;" v-if="current.name" class="newV" @click="xiugai=true">修改</a>
                        </div>

                    </div>
                    
                    <div class="row" v-if="newAlue || xiugai">
                        <div class="col-xs-12">
                            <div id="invoiceType">
                                <input type="text" class="add_zhi name"  placeholder="添加发票类型名称"  v-model="current.name"  autofocus="autofocus">
                                <checkbox 
                                    text="是否启用" 
                                    :img-left="true" 
                                    name="active" 
                                    @updata="integrationDate"
                                    :checked="current.active ? 'checked':false"/>
                                <input type="number" max="100" min="0" class="add_zhi taxRate" style="width:65px"  placeholder="税率"  v-model="current.taxRate"  autofocus="autofocus">
                                <input type="button" class="btn add add_weizhi" @click="add" :value="invoiceItemId ? '修改' : '添加'"/>
                            </div>
                        </div>
                    </div>

            

                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn ya" @click="save" v-text="currentInvoiceBook.invoiceBookId ? '修改' :'增加'"></button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formLabelInput from '../../../../../common_component/form-label-input.vue'
import btnSelect from '../../../../../common_component/btn_select.vue'
import checkbox from '../../../../../common_component/checkbox.vue'

    export default {
        props:['id','currentInfo','comIscreat','num'],
        components:{
            btnSelect,
            formLabelInput,
            checkbox
        },
        data(){
            return {
                currentInvoiceBook:{
                    invoiceTypeId:'',
                    invoiceBookNo:'',
                    maxAmount:'',
                    invoiceBookStartNo:'',
                    invoiceBookEndNo:'',
                    qtyInit:''
                },
                newvl:{},
                current:{},
                xiugai:false,
                newAlue:false,
                invoiceTypeId:'',
                updataKey:0
            }
        },
        methods:{
            integrationDate(name,item){
                console.log(name,item)
                if(name == 'invoiceTypeId'){
                    this.current = item;
                    this.currentInvoiceBook[name] = item['invoiceTypeId'];
                    this.invoiceTypeId = item['invoiceTypeId'];
                }else if(name == 'active'){
                    this.current[name]= item
                }else{
                    this.currentInvoiceBook[name] = item;
                }

            },
            add(){

            },
            addType(){
                const self = this;
                
                send({
                    type:'post',
                    url:'finance:/invoice/type',
                    param:this.current
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200){
                        console.log(res);
                        alert(res.msg, 'success');
                        self.current = {
                            name:'',
                            active:false,
                            taxRate:''
                        };
                        $('#invoiceType').find('input[type="checkbox"]')[0].checked=false;
                        ++self.updataKey;
                        self.newAlue = false;
                    }else{
                        console.log(res);
                        alert(res.msg);
                    };
                })
            },
            xiugaiType(){
                if(!this.invoiceTypeId)return alert('请先选择一条发票类型');
                const self = this;
                
                send({
                    type:'put',
                    url:'finance:/invoice/type/' + this.invoiceTypeId,
                    param:{
                        active:$('#invoiceType').find('input[type="checkbox"]').is(':checked'),
                        name:$('#invoiceType .name').val(),
                        taxRate :$('#invoiceType .taxRate').val(),
                    }
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200){
                        alert(res.msg, 'success');
                        self.invoiceItemId = '';
                        self.current = {
                            name:'',
                            active:false,
                            taxRate:''
                        };
                        ++self.updataKey;
                        self.xiugai = false;
                    }else{
                        console.log(res);
                        alert(res.msg);
                    };
                })
            },
            save(){
                var bool = true
                $('#invoiceBook').find('[verify="true"]').each(function(index, el) {
                    el.style.border="none"
                    if( (el.tagName.toLocaleLowerCase() == 'input' ) &&  !el.value){
                        el.style.border="1px solid rgb(249, 188, 188)";
                        bool = false;
                    };

                    if( (el.tagName.toLocaleLowerCase() != 'input' ) && !el.innerHTML){
                        el.style.border="1px solid rgb(249, 188, 188)";
                        bool = false;
                    }

                });

                if(!bool)return alert('数据不完整，请完善数据');

                

                const self = this;

                if(!this.comIscreat){
                    console.log(this.currentInvoiceBook)
                    send({
                        type:'put',
                        url:'finance:/invoice/book/' + this.currentInvoiceBook.invoiceBookId,
                        param:this.currentInvoiceBook
                    },function(err,res){
                        if(err)return console.log(res);
                        if(res.status == 200){
                            console.log(res);
                            alert(res.msg, 'success');
                            self.clear();
                            self.$emit('update');
                            $('#invoiceBook').modal('hide')
                        }else{
                            console.log(res);
                            alert(res.msg)
                        }
                    })

                }else{
                    this.currentInvoiceBook.registerPersonName = global.extNum
                    send({
                        type:'post',
                        url:'finance:/invoice/book',
                        param:this.currentInvoiceBook
                    },function(err,res){
                        if(err)return console.log(res);
                        if(res.status == 200){
                            console.log(res);
                            alert(res.msg, 'success');
                            self.clear();
                            self.$emit('update');
                            $('#invoiceBook').modal('hide')
                        }else{
                            console.log(res);
                            alert(res.msg)
                        }
                    })
                }
            },
            clear(){
                $('#invoiceBook').find('[name="invoiceTypeId"]').text('');

                this.currentInvoiceBook = {
                    invoiceTypeId:'',
                    invoiceBookNo:'',
                    maxAmount:'',
                    invoiceBookStartNo:'',
                    invoiceBookEndNo:'',
                    qtyInit:''
                }

            },
            tihuan(){
                if(!this.newvl.invoiceBookId)return;
                this.currentInvoiceBook = this.newvl;
            }
        },
        watch:{
            currentInfo(newv){
                this.newvl = newv;
            },
            num(){
                this.xiugai = false;
                this.newAlue = false;
                this.current = {
                    name:'',
                    active:false,
                    taxRate:''
                };
                this.comIscreat ? this.clear():this.tihuan();
            },
            newAlue(newv){
                if(newv){
                    this.xiugai = false;
                    this.current = {
                        name:'',
                        active:false,
                        taxRate:''
                    };
                    this.add = this.addType;
                }
            },
            xiugai(newv){
                if(newv){
                    this.newAlue = false;
                    this.add = this.xiugaiType;
                }
            }
        }
    }

</script>
<style scoped>
    .modal-dialog{
        width: 600px;
    }

    .row{
        margin-bottom: 10px;
    }
    .modal-body{
        padding:0  25px;

    }
    .modal-body .col-xs-12{
        margin-bottom: 15px;
    }
     #invoiceType table{
        margin-bottom: 10px;
     }
     #invoiceType .add_zhi:nth-child(1){
        margin-right: 20px
     }
    #invoiceType .add_zhi{
        border: 1px solid #39b6e5;
        font-size: 12px;
        color: #999;
        padding: 4px 6px;
        line-height: 12px;
        float: left;
        width: 110px;
        margin-right: 8px;
        margin-right: 20px
    }
    #invoiceType .add_weizhi{
        background-color: #39B6E5;
        color: #fff;
        border: none;
        font-size: 12px;
        height: 23px;
        padding: 0 ;
        border-radius: 0;
        width: 50px;
        margin-left: 22px;
      
    }
</style>