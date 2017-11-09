<template>

<!-- Modal -->
    <div class="modal fade" id="invoiceItem" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">发票项目管理</h4>
                </div>
                <div class="modal-body">
                    <!-- <table class="table table-bordered">
                        <tr>
                            <th>发票项目</th>
                            <th>是否启用</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="i in ar">
                            <td v-text="i.name"></td>
                            <td v-text="i.active ? '是' : '否'"></td>
                            <td><button type="button" class="btn btn-warning" @click="modify(i)">修改</button></td>
                        </tr>
                    </table> -->
                    <div>
                        <input type="text" class="add_zhi"  placeholder="输入发票项目名称"  v-model="current.name"  autofocus="autofocus">
                        <checkbox 
                            text="是否启用" 
                            :img-left="true" 
                            @updata="integrationDate"
                            name="active" 
                            :checked="current.active "/>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn" @click="add" v-text="current.invoiceItemId ? '修改' : '添加'"></button>
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
                current:{
                    name:'',
                    active:false,
                    invoiceItemId:''
                },
                invoiceItemId:''  ,
                newvl:{}              
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

                let add_zhi = $('#invoiceItem .add_zhi');
                add_zhi.css({border:'1px solid #39b6e5'});
                if(!add_zhi.val()){
                    add_zhi.css({border:'1px solid rgb(249, 188, 188)'});
                    return alert('请输入发票名称!');
                }
                console.log(this.comIscreat)
                if(!this.comIscreat){

                    send({
                        type:'put',
                        url:'finance:/invoice/item/' + this.current.invoiceItemId,
                        param:this.current
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            self.clear();
                            self.$emit('update');
                            $('#invoiceItem').modal('hide');
                            $('#invoiceItem').find('input[type="checkbox"]')[0] = false;
                            self.clear();
                            alert(res.msg, 'success');
                           
                        }else{
                            console.log(res);
                            alert(res.msg);
                        };
                    })
                }else{
                    console.log( this.current);
                    delete this.current.invoiceItemId
                    send({
                        type:'post',
                        url:'finance:/invoice/item',
                        param:this.current
                    },function(err,res){
                        if(err)return console.log(err);
                        if(res.status == 200){
                            console.log(res);
                            alert(res.msg, 'success');
                            self.clear();
                            $('#invoiceItem').find('input[type="checkbox"]')[0] = false;
                            self.clear();
                            self.$emit('update');
                            $('#invoiceItem').modal('hide');

                        }else{
                            console.log(res);
                            alert(res.msg);
                        };
                    })
                }

            },
            ajax(){
                const self = this;
                send({
                    type:'get',
                    url:'finance:/invoice/item/org'
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200){
                        self.ar = res.content;
                    }else{
                        console.log(res);
                        alert(res.msg);
                    };
                })
            },
            modify(item,index){
                this.current = JSON.parse(JSON.stringify(item));
                this.invoiceItemId = item.invoiceItemId;

            },
            clear(){
                this.current = {
                    name:'',
                    active:false,
                    invoiceItemId:'',
                }
            },
            tihuan(){
                if(!this.newvl.invoiceItemId)return;
                this.current = this.newvl;
            }
        },
        watch:{
            currentInfo(newv){
                this.newvl = newv;
            },
            num(newv){
                this.comIscreat ? this.clear():this.tihuan();
            }
        }
    }
 

</script>
<style scoped>
    #invoiceItem .modal-body{
        margin: 0;
    }
    body .modal-header, body .modal-footer{
        border-width: 1px
    }
    .modal-dialog{
        width: 343px;
    }
    .modal-body{
        padding: 25px;
    }
    #invoiceItem .add_zhi{
        border: 1px solid #39b6e5;
        font-size: 12px;
        color: #999;
        padding: 4px 6px;
        line-height: 12px;
        float: left;
        width: 160px;
        margin-right: 40px;
    }
    #invoiceItem .add_weizhi{
        background-color: #39B6E5;
        color: #fff;
        border: none;
        font-size: 12px;
        height: 23px;
        padding: 0 ;
        border-radius: 0;
        width: 50px;
        margin-left: 70px;
      
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