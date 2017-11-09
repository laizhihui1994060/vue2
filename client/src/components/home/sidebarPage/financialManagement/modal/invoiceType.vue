<template>

<!-- Modal -->
    <div class="modal fade" id="invoiceType" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">发票类型管理</h4>
                </div>
                <div class="modal-body">
                    <!-- <table class="table table-bordered">
                        <tr>
                            <th>发票类型</th>
                            <th>发票税率</th>
                            <th>是否启用</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="i in ar">
                            <td v-text="i.name"></td>
                            <td v-text="i.taxRate"></td>
                            <td v-text="i.active ? '是' : '否'"></td>
                            <td><button type="button" class="btn btn-warning" @click="modify(i)">修改</button></td>
                        </tr>
                    </table>
                    <h4 v-if="!ar.length" class="text-center">暂无发票类型记录</h4>
 -->
                    <div style="margin-top:40px;">
                        <input type="text" class="add_zhi name"  placeholder="添加发票类型名称"  v-model="current.name"  autofocus="autofocus">
                        <checkbox 
                            text="是否启用" 
                            :img-left="true" 
                            @updata="integrationDate"
                            name="active" 
                            :checked="current.active ? 'checked':false"/>
                        <input type="number" class="add_zhi taxRate" style="width:65px"  placeholder="税率"  v-model="current.taxRate"  autofocus="autofocus">
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn" @click="add"  v-text="current.invoiceTypeId ? '修改' : '添加'"></button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import  btnSelect from "../../../../../common_component/btn_select.vue";
import  formLabelInput from "../../../../../common_component/form-label-input.vue";
import  checkbox from "../../../../../common_component/checkbox.vue";

    export default {
        props:['id','currentInfo','comIscreat','num'],
        components:{
            btnSelect,
            formLabelInput,
            checkbox
        },
        
        data () {
           return {
                ar:[],
                newvl:{},
                current:{
                    name:'',
                    taxRate:'',
                    active:false,
                    invoiceTypeId:''
                },
           }
        },
        methods:{
            integrationDate(name,item){
                console.log(name,item)
                if(name == 'active'){
                    this.current[name]= item
                }
            },
            add(){
                const self = this;
                console.log($('#invoiceType .add_zhi').val())
                if(!$('#invoiceType .add_zhi').val())return alert('请输入发票名称!');

                if(this.current.invoiceTypeId){
                    console.log(this.current)

                    send({
                        type:'put',
                        url:'finance:/invoice/type/' + this.current.invoiceTypeId,
                        param:this.current
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            console.log(res)
                            alert(res.msg, 'success');
                            $('#invoiceType').find('input[type="checkbox"]')[0].checked=false;
                            self.$emit('update');
                            $('#invoiceType').modal('hide');
                            self.clear();

                        }else{
                            console.log(res);
                            alert(res.msg);
                        };
                    })
                }else{

                    send({
                        type:'post',
                        url:'finance:/invoice/type',
                        param:{
                            active:$('#invoiceType').find('input[type="checkbox"]').is(':checked'),
                            name:$('#invoiceType .name').val(),
                            taxRate :$('#invoiceType .taxRate').val(),
                        }
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            alert(res.msg, 'success');
                            $('#invoiceType').find('input[type="checkbox"]')[0].checked=false;
                            $('#invoiceType').modal('hide');
                            self.$emit('update');
                            self.clear();
                        }else{
                            console.log(res);
                            alert(res.msg);
                        };
                    })
                }

            },
            clear(){
                this.current = {
                    name:'',
                    taxRate:'',
                    invoiceTypeId:'',
                    active:false
                }
            },
            tihuan(){
                if(!this.newvl.invoiceTypeId)return;
                this.current = this.newvl;
            }
        },
        watch:{
            currentInfo(newv){
                console.log(newv)

                this.newvl = newv;
            },
            num(newv){
                this.comIscreat ? this.clear():this.tihuan();
            }
        }
    }
 

</script>
<style scoped>
    #invoiceType .modal-body{
        margin: 0;
    }
    .modal-dialog{
        width: 378px;
    }
    .modal-body{
        padding: 25px;
        padding-top: 0;
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
        margin-right: 50px
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
        margin-left: 65px;
      
    }
     body .modal-footer{
        border-width: 1px
    }
    th{
        padding: 4px;
    }
    td{
        padding: 4px;
    }
    tr{
        border: 1px solid #999;
        padding: 10px;
    }
    td button{
        border-radius: 0;
        font-size: 12px;
        padding: 3px 12px;

    }
   
</style>