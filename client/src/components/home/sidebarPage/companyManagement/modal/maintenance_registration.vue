<template>
    <div id='maintenance_registration' >
        <div class="modal-body">

            <breadcrumb
                :arr="[{path: '/LoginFinish/companyManagement/maintenance', text:'维护登记'},{path:'', text: isCreate ? '添加维护记录' : '查看维护记录'}]"/>
            <div class='main'>
                <article>基本信息<i></i></article>
                <div class='details'>
                    <div class="block">
                        <div class="row">
                            <div class='col-sm-3'>
                                <form-label-input 
                                    label='维修单号'  
                                    @updata="integrationDate"
                                    :disabled='disabled'
                                    :value='chosen.code'
                                    name='code'>
                                </form-label-input> 
                            </div>
                            <div class='col-sm-3'>
                                <datetimepicker
                                    background="#DCF4FC"
                                    name="registerTime"
                                    label="登记时间"
                                    :value='chosen.registerTime'
                                    @updata="integrationDate"
                                    :disabled='disabled'/>
                            </div> 
                            <div class='col-sm-3'>  
                                <form-label-input 
                                    label='维修地点'  
                                    :value='chosen.maintPlace'
                                    @updata="integrationDate"
                                    :disabled='disabled'
                                    name='maintPlace'>
                                </form-label-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class='col-sm-3'>
                                <btn-select 
                                    label='车&nbsp;&nbsp;牌&nbsp;号' 
                                    label-right='12px'
                                    url='client:/helper/truck'
                                    method='post'
                                    filter="plateNo"
                                    filterName='id'
                                    :uuid='true'
                                    field='id'
                                    :value='chosen.towTruckId'
                                    name="towTruckId" 
                                    @updata="integrationDate"
                                    :disabled='disabled'   
                                    padding='0'>
                                </btn-select>
                            </div>
                            <div class='col-sm-3'>
                                <form-label-input 
                                    label='维修单位'
                                    @updata="integrationDate"
                                    :disabled='disabled'  
                                    :value='chosen.maintVendor'
                                    name='maintVendor'>
                                </form-label-input>
                            </div>
                            <div class='col-sm-3'>
                                <form-label-input 
                                    label='维&nbsp;修&nbsp;&nbsp;厂'
                                    :value='chosen.workshop'
                                    @updata="integrationDate"
                                    :disabled='disabled'  
                                    name='workshop'>
                                </form-label-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class='col-sm-3'>
                                <btn-select 
                                    label='负&nbsp;&nbsp;责&nbsp;人' 
                                    label-right='12px'
                                    url='client:/emp/basic?'
                                    filter="empName"
                                    filterName='empId'
                                    :uuid='true'
                                    field='empId'
                                    :value='chosen.inchargePersonHrEmployeeId'
                                    :params='{ pageSize: 1000, pageIndex: 1 }'              
                                    name="inchargePersonHrEmployeeId" 
                                    @updata="integrationDate"
                                    :disabled='disabled'   
                                    padding='0'>
                                </btn-select>
                            </div>
                            <div class='col-sm-3'>
                                <btn-select 
                                    label='维修状态' 
                                    label-right='12px'
                                    :arr = "[ { name: '计划', code: 'TODO' }, { name: '维修中', code: 'DOING' }, { name: '完成', code: 'DONE' } ]"
                                    filter="name" 
                                    name="status"
                                    :title='chosen.status'
                                    @updata="integrationDate"
                                    :disabled='disabled'   
                                    padding='0'>
                                </btn-select>
                            </div>
                            <div class='col-sm-3'>
                                <form-label-input 
                                    label='维修金额' 
                                    :value='chosen.amount'
                                    @updata="integrationDate"
                                    :disabled='disabled'
                                    name='amount'>
                                </form-label-input>
                            </div>
                        </div>
                        <div class="row">
                           <div class="col-sm-6">
                               <start-end-time 
                                    width="125px" 
                                    startName='startTime' 
                                    :startValue='chosen.startTime' 
                                    endName='endTime' 
                                    :endValue='chosen.endTime'
                                    @updata="integrationDate"
                                    :disabled='disabled'>
                                    </start-end-time>
                           </div>
                        </div>
                        <div class="row">
                            <div class="reason col-sm-9">
                                <span>维修说明</span>
                                <textarea 
                                    name="comments"
                                    :disabled='disabled'
                                    @change="integrationDate($event.target.getAttribute('name'), $event.target.value)" 
                                    style='width:100%;height:50px;resize: vertical; background:#DFF5FD;padding:5px;'>{{chosen.comments}}</textarea>
                            </div>
                        </div>
                        <div class="row list" >
                            <article style='font-size:14px;margin-left:14px'>维修列表</article>
                            <div class="col-sm-9">
                                <table>
                                    <thead> 
                                        <tr>
                                            <th>项目名</th>
                                            <th>项目类型</th>
                                            <th>数量</th>
                                            <th>单价</th>
                                            <th>金额</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for='item in childItem'>
                                            <td>{{item.name}}</td>
                                            <td>{{item.itemType}}</td>
                                            <td>{{item.qty}}</td>
                                            <td>{{item.unitPrice}}</td>
                                            <td>{{item.amount}}</td>
                                            <td>
                                                <button class="btn" style='padding:2px 10px;font-size:12px' @click='deleteItem(index)'>删除</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class='col-sm-9' style='margin-top:10px;'>
                                <div class="col-sm-3">
                                    <btn-select 
                                        label='维修项目' 
                                        label-right='12px'
                                        url="client:/helper/maintain?pageSize=1000&pageIndex=1" 
                                        filter="name" 
                                        name="itemId"
                                        @updata="projectItems" 
                                        :disabled='disabled'  
                                        padding='0'>
                                    </btn-select>
                                </div>
                                <div class="col-sm-3">
                                    <form-label-input 
                                        label='项目说明'
                                        @updata="changeItems"
                                        :disabled='true'
                                        :value='items.comment'
                                        name='maintenance_amount'>
                                    </form-label-input>
                                </div>
                                <div class="col-sm-2">
                                    <form-label-input
                                        label='数量'
                                        type="number" 
                                        input-width="50px"
                                        name="qty" 
                                        v-model='this.items.qty'
                                        placeholder="数量"
                                        :disabled='disabled'
                                        @updata="changeItems"/>
                                </div>
                                <div class="col-sm-2">
                                    <form-label-input
                                        label='单价'
                                        type="number" 
                                        input-width="50px"
                                        name="unitPrice"  
                                        placeholder="单价"
                                        :value='items.unitPrice'
                                        :disabled='disabled'
                                        @updata="changeItems" />{{items.unit}}
                                </div>
                                <div class='col-sm-2' v-if='!disabled'>
                                    <button class='btn btn-default' @click='addChildItem' style='font-size: 12px;line-height: 12px;background-color: #39B6E5;padding: 5px 24px;'>添加</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <article style='font-size:14px;margin-left:14px'>维修图片</article>
                            <div>
                                <div class="col-sm-12">
                                    <input-img name='imgs' @updata='integrationDate' :disabled='disabled'></input-img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="btn" @click="addModify">{{ isCreate ? '添加' : '修改' }}</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/companyManagement/maintenance' }" class="btn" active-class=' '>返回</router-link>
            </div>
        </div>
  </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue';
import inputImg from '../../../../../common_component/inputImg.vue';
import startEndTime from "../../../../../common_component/startEndTime.vue";
import formLabelInput from '../.././../../../common_component/form-label-input.vue'
import getData from "../../../../../../static/js/getData.js"
import breadcrumb from "../.././../../../common_component/breadcrumb.vue";
import datetimepicker from '../../../../../common_component/datetimepicker.vue'
    export default{
        data(){
            return {
                disabled: false,
                chosen: {

                },
                id: '',
                isCreate: '',
                res: {},
                items: {

                },
                childItem: [

                ]
            }
        },
        created(){
            
            this.isCreate = this.$route.params.isCreate;
            if(this.isCreate){
                this.addModify = this.add;

            }else {
                this.id = this.$route.params.chosen;
                this.disabled = true;
                this.addModify = this.modify;

                const _this = this;
                console.log('client:/maintain/' + _this.id)
                send({
                    url: 'client:/maintain/' + _this.id,
                    type: 'get'
                }, function(err, res){
                    console.log(err, res);
                    if(res.status == 200){
                        const content = res.content[0];
                        _this.chosen = content;
                        _this.childItem = content.items || [];
                    }
                    
                })
            }
        },
        methods:{
            changeItems(name, item){
                this.items[name] = Number( item ) ;
            },  
            projectItems(name, item){
                this.items = item;
                console.log(item);
            },
            integrationDate(name, item){
                this.res[name]= item;
                console.log(this.res)
            },
            addChildItem(){
                if(this.items.qty && this.items.id){
                    // 深度复制
                    let obj = JSON.stringify(this.items);
                    obj = JSON.parse(obj);
                    obj.amount = obj.qty * obj.unitPrice;
                    console.log(obj, this.childItem)
                    this.childItem.push(obj);

                    console.log(this.childItem)
                }else{
                    alert('请完整输入信息')
                }
            },
            deleteItem(index){
                this.childItem.splice(index, 1);
            },
            add(){
                //收集
                let data = {};
                const _this = this;
                data = getData('#maintenance_registration .details .row:not(".list")' );
                
                this.res.towTruckId = 'efaf63a2-543a-4d6b-98de-5bdf1c17419f';
                this.res.status = 'DOING'
                if(data){
                    // ajax('/maintain/add', "POST", this.res, function(code, res){
                    //     console.log(code, res);
                    //     alert(res.message);
                    //     if(code == 200){
                    //         // 增加维修子项目

                    //         const id = res.content[0].id,
                    //               params = _this.childItem;

                    //         console.log(id, params);
                    //         send({
                    //             url: 'client:/maintain/' + id + '/item',
                    //             type: 'post',
                    //             param: params
                    //         }, function(err, res){
                    //             console.log(err, res);
                    //         })
                    //     }
                    // })
                }else{
                    alert('某些资料不能为空')
                }
            },
            modify(){
                const _this = this;
                console.log(_this.res);
                if(this.disabled){
                    this.disabled = false;
                }else{
                    let promise = new Promise( function(resolve, reject){
                        if(Object.keys(_this.res).length !== 0){
                            send({
                                url: 'client:/maintain/' + _this.id,
                                type: 'put',
                                param: _this.res
                            }, function(err, res){
                                if(res.status == 200) resolve();
                                else alert('修改失败~请联系管理员')
                            });
                        }else{
                            resolve();
                        }
                    })
                    
                    //  子项目
                    promise.then(function(){
                        const params = _this.childItem;
                        console.log(params)
                        send({
                            url: 'client:/maintain/' + _this.id + '/item',
                            type: 'post',
                            param: params
                        }, function(err, res){
                            alert('修改成功')
                            _this.disabled = true;
                        })
                    })
                    
                }
            },
            addModify(){

            }
        },
        components:{
            btnSelect,
            inputImg,
            startEndTime,
            formLabelInput,
            breadcrumb,
            datetimepicker      
        }
    }
</script>

<style>
#maintenance_registration .clearfix{
    margin-bottom: 24px;
}

#maintenance_registration .modal-body{
    padding:15px 23px;
}
#maintenance_registration .modal-body > div{
    margin-bottom: 40px;
}
#maintenance_registration article{
    margin:0;
    float:none;
    font-size:18px;
}
#maintenance_registration article:after{
    width:1400px;
    left:100px;
}
/*#maintenance_registration  article i{
    content:'';
    display:inline-block;
    width:14px;
    height:14px;
    margin-left:10px;
    top:0;
    left:0px;
    cursor: pointer;
    background:url('../../../../../assets/up.png') no-repeat 0 5px;
    
}*/
/* #maintenance_registration  article.up i{
    background:url('../../../../../assets/down.png') no-repeat 0 7px;
} */
#maintenance_registration .details{
    padding:10px 50px;
    background:#fff;
}
#maintenance_registration .details > div{
    margin:15px 0;
}
#maintenance_registration .block .row,
#maintenance_registration .block .list{
    margin:10px 0;
}

#maintenance_registration  table{
    width:100%;
    border-collapse:separate;
    border-spacing:0px 4px;
}
#maintenance_registration .btns button{
    margin:0 40px;
}
#maintenance_registration  table th{
    border-top:1px solid #eee;
    border-bottom: 1px solid #eee;
    padding:5px 10px;
    height:24px;
}
#maintenance_registration  table th:first-child{
    border-left:1px solid #eee;
}
#maintenance_registration  table th:last-child{
    border-right:1px solid #eee;
}
#maintenance_registration  table thead tr{
    height:24px;
}
#maintenance_registration  table th,
#maintenance_registration  table td{
    width:109px;
}
#maintenance_registration  table tbody tr{
    background: #F6F6F6;
    font-size:12px;
}
#maintenance_registration  table tbody tr td{
    padding-left:15px;
    border-top:1px solid #eee;
    border-bottom: 1px solid #eee;
    height:24px;
}
#maintenance_registration  table tbody tr td:first-child{
    padding-left:7px;
    border-left:1px solid #eee;
}
#maintenance_registration  table tbody tr td:last-child{
    border-right:1px solid #eee;
}
#maintenance_registration  table tbody tr td input[type='text']:disabled{
    display:inline-block;
    padding:0px 15px 0px 0px;
    height:24px;
    background-color:transparent;
    width:90px;
}
#maintenance_registration  table tbody tr td input[type='text']{
    background-color: #DFF5FD;
}
#maintenance_registration .details textarea[disabled]{
    background:#f6f6f6 !important; 
}
</style>