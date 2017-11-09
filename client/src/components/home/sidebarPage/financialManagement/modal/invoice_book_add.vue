<template>
    <div class="child_page" id="invoiceBook">
        <breadcrumb
            :arr="[{path:'/LoginFinish/financialManagement/invoice',text:'发票管理'},{path:'',text:'发票簿入库'}]"/>
        <div class="details-body">
            
            <div class="text-center"  v-if="!invoiceBook.length">暂无发票簿入库记录</div>
            <div style="margin-bottom:50px;" v-else>
                <article>发票薄记录</article>

                <table>
                    <thead>
                        <tr>
                            <th>创建日期</th>
                            <th>发票类型</th>
                            <th>发票薄编号</th>
                            <th>最大金额</th>
                            <th>起始编号</th>
                            <th>结束编号</th>
                            <th>发票张数</th>
                            <th>登记人</th>
                            <th width="120"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(item,index) in invoiceBook" :key="index">
                            <td v-text="getLocalTime(item.receiveDate)"></td>
                            <td v-text="item.invoiceTypeId"></td>
                            <td v-text="item.invoiceBookNo"></td>
                            <td v-text="item.maxAmount"></td>
                            <td v-text="item.invoiceBookStartNo"></td>
                            <td v-text="item.invoiceBookEndNo"></td>
                            <td v-text="item.qtyInit"></td>
                            <td v-text="item.registerPersonName"></td>
                            <td><button type="button" class="btn btn-danger">删除</button><button type="button" class="btn btn-warning" @click="modify(item,index)">修改</button></td>
                        </tr> 
                    </tbody>
                </table>
            </div>
            
            <div class='add_record'> 
                <article>添加修改</article>

                <div class="row">
                    <div class="col-xs-4">
                        <btn-select 
                            label='发票类型' 
                            label-right='10px'
                            url="finance:/invoice/type/org" 
                            filter="name"  :after="true"
                            list-width="106px"
                            name="invoiceTypeId" 
                            @updata="integrationDate" 
                            padding='0'
                            width="105px"
                            uuid="true"
                            field="invoiceTypeId"
                            :title="currentInvoiceBook.invoiceTypeId"/>
                    </div>
                    <div class="col-xs-4">
                        <form-label-input 
                            label='发票薄编号'  
                            name='invoiceBookNo'
                            @updata="integrationDate" 
                            input-width="126px"
                            :value="currentInvoiceBook.invoiceBookNo"/>
                    </div>
                    <div class="col-xs-4">
                        <form-label-input 
                            label='最大开票金额'  
                            name='maxAmount'
                            type="number"
                            @updata="integrationDate" 
                            input-width="126px"
                            :value="currentInvoiceBook.maxAmount"/>
                    </div>
                    <div class="col-xs-4">
                        <form-label-input 
                            label='起始编号'  
                            name='invoiceBookStartNo'
                            @updata="integrationDate" 
                            input-width="126px"
                            :value="currentInvoiceBook.invoiceBookStartNo"/>
                        
                    </div>
                    <div class="col-xs-4">
                        <form-label-input 
                            label='结束编号'  
                            name='invoiceBookEndNo'
                            label-right="26px"
                            @updata="integrationDate" 
                            input-width="126px"
                            :value="currentInvoiceBook.invoiceBookEndNo"/>
                        
                    </div>
                    <div class="col-xs-4">
                        <form-label-input 
                            label='发票张数'  
                            name='qtyInit'
                            type="number"
                            label-right="40px"
                            @updata="integrationDate" 
                            input-width="126px"
                            :value="currentInvoiceBook.qtyInit"/>
                    </div>
                    <div class="col-xs-4">
                        <form-label-input 
                            label='登&nbsp;记&nbsp; 人'  
                            name='registerPersonName'
                            @updata="integrationDate" 
                            input-width="126px"
                            :value="currentInvoiceBook.registerPersonName"/>
                    </div>
                </div>
            </div>
            <div class="btns">
                <button type="button" class="btn ya" v-if="!currentInvoiceBookId" @click="save">增加</button>
                <button type="button" class="btn ya" v-else @click="isModify">{{isCreate ? '保存' : '修改' }}</button>
                <button type="button" class="btn ya" @click="clear">{{currentInvoiceBookId ? '取消' : '清空' }}</button>
                <a type="button" class="setsy" href="javascript:history.go(-1)">返回</a>
            </div>
        </div>
       
    </div>
</template>

<script>
import datetimepicker from '../../../../../common_component/datetimepicker.vue'
import formLabelInput from '../../../../../common_component/form-label-input.vue'
import breadcrumb from '../../../../../common_component/breadcrumb.vue'
import btnSelect from '../../../../../common_component/btn_select.vue'
    export default {
        components:{
            datetimepicker,
            formLabelInput,
            breadcrumb,
            btnSelect
        },
        data(){
            return {
                invoiceBook:[],
                currentInvoiceBook:{
                    invoiceTypeId:'',
                    invoiceBookNo:'',
                    maxAmount:'',
                    invoiceBookStartNo:'',
                    invoiceBookEndNo:'',
                    qtyInit:''
                },
                currentIndex:'',
                currentInvoiceBookId:'',
                isCreate:false,
                text_b:null,
                dis_b:null,
                dis_i:null
            }
        },
        mounted(){
            const self = this;
            this.$nextTick(function(){
                self.text_b =  $('#invoiceBook .add_record').find('.setWidth');
                self.dis_b =  $('#invoiceBook .add_record').find('button');
                self.dis_i =  $('#invoiceBook .add_record').find('input');
            });
        },
        methods:{
            integrationDate(name,item){
                if(name == 'invoiceTypeId'){
                    this.currentInvoiceBook[name] = item['invoiceTypeId']
                }else{
                    this.currentInvoiceBook[name] = item;
                }
            },
            modify(item,index){
                this.currentInvoiceBook = JSON.parse(JSON.stringify(item));
                this.currentIndex = index;
                this.currentInvoiceBookId = item.invoiceBookId;
                this.dis_b.attr('disabled',true);
                this.dis_i.attr('disabled',true);
            },
            isModify(){

                const self = this;

                if(!this.isCreate){
                    this.dis_i.attr('disabled',false);
                    this.dis_b.attr('disabled',false);
                }else{
                    send({
                        type:'put',
                        url:'finance:/invoice/book/' + this.currentInvoiceBookId,
                        param:this.currentInvoiceBook
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            alert('修改成功', 'success');
                            self.clear();
                        }else{
                            console.log(res);
                            alert(res.msg)
                        }
                    })
                }
                this.isCreate = !this.isCreate;
            },
            clear(){
                this.dis_i.val('');
                this.text_b.text('');
                this.currentInvoiceBookId = '';
                this.currentIndex = '';
                this.currentInvoiceBook = {
                    invoiceTypeId:'',
                    invoiceBookNo:'',
                    maxAmount:'',
                    invoiceBookStartNo:'',
                    invoiceBookEndNo:'',
                    qtyInit:''
                };
            },
            isNull(){
                var bool = false
                this.dis_i.each(function(index, el) {
                    if(!el.value){
                        console.log(el)
                        if(el.parentNode.className == 'special')return false;
                        bool = true;
                        return false;
                    }   
                });
                this.text_b.each(function(index, el) {
                    if(!el.innerHTML){
                        bool = true;
                        return false;
                    }   
                });

                return bool

            },
            save(){
                if(this.isNull())return alert('请正确填写信息');
                console.log(this.currentInvoiceBook);
                const self = this;
                send({
                    type:'post',
                    url:'finance:/invoice/book',
                    param:this.currentInvoiceBook
                },function(err,res){
                    if(err)return console.log(res);
                    if(res.status == 200){
                        console.log(res);
                        alert(res.msg, 'success');
                        self.ajax();
                    }else{
                        console.log(res);
                        alert(res.msg)
                    }
                })
            },
            ajax(){
                const self = this;
                send({
                    type:'post',
                    url:'finance:/invoice/book/list',
                    param:{
                        pageSize:10,
                        pageIndex:1
                    }
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200){
                        self.invoiceBook = res.content;
                        console.log(res)
                    }else{
                        console.log(res);
                        alert(res.msg);
                    }
                })
            },
            getLocalTime(ns){
                return ( new Date(ns) ).toString().split(' ')[0];
            }
        },
        created(){
            this.ajax()
        }
    }
</script>

<style scoped>
    .details-body{
        background: #fff;
        padding: 20px;
    }
    .child_page{
        margin: 20px;
    }
    .add_record .col-xs-4{
        margin-bottom: 15px;
    }
    .setsy{
        font-size: 12px;
        color: #39B6E5;
        border-radius: 0;
        border: 1px solid #39B6E5;
        text-align: center;
        background: #fff;
        display: inline-block;
        line-height: 12px;
        padding: 6px 12px;
    }
    .btns{
        padding: 20px;
    }
    .child_page .btns button:nth-child(2){
        margin: 0 90px;
    }
    .child_page .btns button:nth-child(1){
        margin: 0;
    }
    .child_page article{
        margin-bottom: 18px;
    }
    table{
        width: 100%;
        max-width: 100%;
    }
    table  > thead > tr > th:last-child{
        border-right: 1px solid #d8d8d8
    }
    table  > thead > tr > th:first-child{
        border-left: 1px solid #d8d8d8;
    }
    table th{
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd !important;
        padding: 8px;
    }
    td button{
        border-radius: 0;
        font-size: 12px;
    }
    td{
        font-size: 14px;
        line-height: 14px;
        color: #333333;
        padding: 0 8px;
        border-top-width: 0 !important;
    }
    table{
        border-collapse: separate;
        border-spacing: 0 6px;
    }
   
</style>