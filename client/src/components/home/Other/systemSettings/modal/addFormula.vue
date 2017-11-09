<template>
    <div id='add_formula'>
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/systemSettings/quotationFormula',text:'报价公式维护'},{path:'',text: isCreate ? '添加公式' : '查看公式' }]"/>

            <div>
                <article>基本信息<i></i></article>
                <div class='details'> 
                    <div>
                        <span style='margin-right:15px'>公式名称</span>
                        <input type="text" placeholder='请输入公式名称，例：实施地区＋业务类型' v-model='chosen.name' name='name' style='width:85%;background:rgb(231, 242, 254)' />
                    </div>
                    <div>
                        <span style='margin-right:15px'>公式描述</span>
                        <input type="text" placeholder='公式描述' name='des' style='width:85%;background:rgb(231, 242, 254)' v-model='chosen.des'/>
                    </div>
                    <div class='formula'>
                        <span style='vertical-align:top;margin-right:15px'>报价公式</span>
                        <div style='display:inline-block; width:85%;'>
                            <textarea style='width:100%;background:rgb(231, 242, 254)' name='pricingFormulaChinese' placeholder='根据下面操作完成公式' v-model='chosen.pricingFormulaChinese'>
                                
                            </textarea>
                            <div class="row">
                                <div class="col-xs-2">业务：</div>
                                <div class="col-xs-10">
                                    <btn-select 
                                        label-right='12px'
                                        filter="name"
                                        filterName='code' 
                                        url="control:/job/type"
                                        width='2rem'
                                        title='业务类型'
                                        name='业务类型'
                                        :empty='true'
                                        padding='0'/>
                                    <btn-select 
                                        label-right='12px'
                                        filter="name"
                                        filterName='code' 
                                        url="client:/helper/vehiclecat"
                                        width='2rem'
                                        title='车辆类型'
                                        name='车辆类型'
                                        :empty='true'
                                        padding='0'/>
                                    <btn-select 
                                        label-right='12px'
                                        :arr="[{name:'未开始',code:'NOT_START'},{name:'接受',code:'WORKING'},{name:'救援成功',code:'SUCCESS'},{name:'救援失败',code:'FAILED'},{name:'取消救援',code:'CANCEL_CHARGABLE'},{name:'取消无费',code:'CANCEL_NOFEE'}]" 
                                        filter="name"
                                        width='2rem'
                                        title='救援结果'
                                        name='救援结果'
                                        :empty='true'
                                        padding='0'/>
                                    <span class='add img input' @click='inputText($event)'></span>
                                </div>
                            </div>

                            <div class="row" style='margin: 10px -15px;'>
                                <div class="col-xs-2">操作符：</div>
                                <div class="col-xs-3">
                                    <btn-select 
                                        label-right='12px'
                                        :arr="['如果', '再如果', '并且', '或者', '那么', '否则', '大于', '等于', '小于', '大于等于', '小于等于']"
                                        width='2rem'
                                        title='操作符'
                                        padding='0'/>
                                    <span class='add img input' @click='inputText($event)'></span>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-xs-2">里程：</div>
                                <div class="col-xs-3">
                                    <btn-select 
                                        label-right='12px'
                                        :arr="['到达里程', '拖车里程', '返程里程']"
                                        width='2rem'
                                        title='里程'
                                        padding='0'/>
                                    <span class='add img input' @click='mileage($event)'></span>
                                </div>
                            </div>

                            <br />
                            <div class='tips'>
                                <p>例子：</p>
                                <p>如: 拖车里程大于15则200+(拖车里程-15)*18，否则均为200
                                    <br />
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$如果$&nbsp;&nbsp;拖车里程&nbsp;&nbsp;$大于$&nbsp;&nbsp;15&nbsp;&nbsp;$那么$&nbsp;&nbsp;200+(拖车里程-15)*8&nbsp;&nbsp;$否则$&nbsp;&nbsp;200</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class='state'>
                        <span style='margin-right:17px; vertical-align:top;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态</span>
                        <div style='display:inline-block'>
                            <div>
                                <radio name='active' @updata='collectActive' text='启用' value='true' :checked='chosen.active == true' top='0px'></radio>
                                <radio name='active' @updata='collectActive' text='停用' value='false' :checked='chosen.active == false' top='0px'></radio>
                            </div>
                            <div>
                                <checkbox name='orgDefault' @updata='collectActive'  top='0px' text='是否设为默认公式' :checked='chosen.orgDefault'></checkbox>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="modal-footer" style="padding-top:0">
                        <div class="btns">
                            <button type="button" class="btn radius-btn" @click="addModify">{{ isCreate ? '添加' : '修改' }}</button>
                            <button type="button" class="btn radius-btn" @click="test">校验</button>
                            <router-link tag='button' :to = "{ path: '/LoginFinish/systemSettings/quotationFormula' }" class="btn" active-class=' '>取消并返回</router-link>
                        </div>
                    </div>
                </div>

            </div>
                
        </div>
        
    </div>
</template>

<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import radio from '../../../../../common_component/radio.vue'
import checkbox from '../../../../../common_component/checkbox.vue'
import getData from "../../../../../../static/js/getData.js"
import breadcrumb from '../../../../../common_component/breadcrumb.vue'
    export default{
        data(){
            return {
                chosen: {
                    active: true,
                    name: '',
                    des:'',
                    orgDefault: false,
                    pricingFormulaChinese: '',
                    filterFormulaChinese: {
                        vehicleType: [
                            ''
                        ],
                        reliefArea: [
                            ''
                        ],
                        destinationArea: [
                            ''
                        ],
                        rescueResult: [
                            ''
                        ],
                    }

                },
                isCreate: true,
                id: '',
            }
        },
        created(){
            this.isCreate = this.$route.params.isCreate;
            if(this.isCreate){
                this.addModify = this.add;
            }else{
                this.addModify = this.modify;
                // 获取数据
                this.chosen = this.$route.params.chosen;
                console.log(this.chosen)

            }
        },
        methods:{
            collectActive(name,item){
                console.log(name, item);
                this.chosen[name]= item;
            },
            addItem(name){
                this.chosen.filterFormulaChinese[name].push('');
            },
            collect(name, fieldName, index){
                this.chosen.filterFormulaChinese[name][index] = fieldName;
                console.log(this.chosen.filterFormulaChinese[name])
            },
            inputText(e){
                const $button = $(e.currentTarget).parentsUntil('.row').parent().find('.setWidth');

                const _this = this;
                let bool = false,
                    length = 0;   // 计算有几个无效值


                $button.each(function(index, ele){
                    const $ele = $(ele),
                          text = $ele.text(),
                          name = $ele.attr('name');
                    
                    if(text != '业务类型' && text != '车辆类型' && text != '救援结果' && text != '操作符'){
                        bool = true;
                    }else{
                        length++;
                        // 三个都没有，则为false
                        if(length == $button.length) bool = false
                    }
                });

                if(!bool) return alert('请先选择一个下拉选项！');

                let chosenLength = $button.length - length,  // 有效值数量
                    chosenIndex = 0;


                const selectionStart = $('#add_formula textarea')[0].selectionStart,
                      prev = this.chosen.pricingFormulaChinese.substr(0, selectionStart),
                      next = this.chosen.pricingFormulaChinese.substr(selectionStart);

                let result = '';

                $button.each(function(index, ele){
                    const $ele = $(ele),
                          text = $ele.text(),
                          name = $ele.attr('name');
                    
                    if(text != '业务类型' && text != '车辆类型' && text != '救援结果' && text != '操作符'){
                        if(name == '业务类型' || name == '车辆类型' || name == '救援结果'){

                            

                            // 多个
                            if(chosenLength > 1){
                                if(chosenIndex == 0){
                                    result += `(  #${name}#  $等于$  '${text}'  $或者$  `;
                                }else if(chosenIndex == chosenLength - 1){
                                    result += `#${name}#  $等于$  '${text}'  )`;
                                }else{
                                    result += `#${name}#  $等于$  '${text}'  $或者$  `;
                                }
                                chosenIndex++
                            }else{
                                result += `#${name}#  $等于$  '${text}'  `;
                            }

                            
                        }else{
                            result += `   $${text}$  `;
                        }
                    }
                });

                _this.chosen.pricingFormulaChinese = prev + result + next;
            },
            mileage(e){
                const text = $(e.target).prev().find('.setWidth').text();

                const selectionStart = $('#add_formula textarea')[0].selectionStart,
                      prev = this.chosen.pricingFormulaChinese.substr(0, selectionStart),
                      next = this.chosen.pricingFormulaChinese.substr(selectionStart);


                if(text != '里程'){
                    this.chosen.pricingFormulaChinese = prev + `  ${text}  ` + next;
                }else{
                    alert('请先选择下拉选项！')
                }
            }, 
            test(){
                let data = {};
                data = getData('#add_formula .details', '.optional');

                if(data){
                    send({
                        url: 'control:/quota/quota/validate',
                        type: 'post',
                        param: data
                    }, function(err, res){
                        console.log(err, res);
                        alert(res.msg, res.status == 200 ? 'success' : 'error');
                    })
                }else{
                    alert('某些资料不能为空');
                }
                
            },
            add(){
                //收集
                let data = {};
                data = getData('#add_formula .details', '.optional');
            
                if(data){


                    data = {
                        des: data.des,
                        filterFormulaChinese: data.filterFormulaChinese,
                        name: data.name,
                        pricingFormulaChinese: data.pricingFormulaChinese,
                        active: this.chosen.active,
                        orgDefault: this.chosen.orgDefault
                    }
                    console.info(data);
                    data.filterFormulaChinese = "#业务类型#$等于$'拖车'";
                    // 验证
                    send({
                        url: 'control:/quota/quota/validate',
                        type: 'post',
                        param: data
                    }, function(err, res){
                        console.log(err, res);
                        // 验证成功则添加
                        if(res.status == 200){ 
                            send({
                                url: 'control:/quota/quota',
                                type: 'post',
                                param: data
                            }, function(err, res){
                                console.log(err, res);
                                if(res.status == 200){
                                    window.history.go(-1);
                                    alert(res.msg, 'success');
                                }else{
                                    alert(res.msg)
                                }
                            })
                        }else{
                            alert(res.msg);
                        }
                    })
                }else{
                    alert('某些资料不能为空')
                }
            },
            modify(){
                console.log('modify');
                let data = {};
                data = getData('#add_formula .details', '.optional');
                data.sysQuotationId = this.chosen.sysQuotationId;

                data.orgDefault = this.chosen.orgDefault;
                data.active = this.chosen.active;

                if(data){
                    send({
                        url: 'control:/quota/quota',
                        type: 'put',
                        param: data
                    }, function(err, res){
                        console.log(err, res);
                        if(res.status == 200){
                            window.history.go(-1);
                            alert(res.msg, 'success');
                        }else{
                            alert(res.msg)
                        }
                    })
                }
                
            },
            addModify(){}
        },
        components:{
            btnSelect,
            radio,
            checkbox,
            breadcrumb
        }
    }
</script>

<style>
    #add_formula .input{
        border-radius: 0;
        padding:1px 5px;
        position: relative;
        top:1px;

    }
    #add_formula .setWidth{
        min-width: auto;
    }
    #add_formula{
        font-size:14px;
    }
    #add_formula .modal-body{
        padding:0px 23px;
    }
    #add_formula .modal-body > div{
        margin-bottom: 40px;
    }
    #add_formula article{
        margin:0;
        float:none;
        font-size:18px;
    }
    #add_formula .add{
        display: inline-block;
        background-color: #fff;
        color:none;
        width: 16px;
        height: 16px;
        margin-right: 0;
        vertical-align: middle;
        min-width: 16px;
        cursor: pointer;
    }
    #add_formula .details{
        padding:10px 50px;
        background:#fff;
    }
    #add_formula .details > div{
        margin:15px 0;
    }
    #add_formula .modal-body .type{
        margin-bottom: 10px;
    }
    #add_formula .modal-body input[type='text'],
    #add_formula .modal-body textarea{
        
        background-color:#DFF5FD;
        border:none;
        padding:3px 0 3px 5px;

    }
    #add_formula .modal-body textarea{
        resize: vertical;
        height: 200px;
    }
    #add_formula .modal-footer input[type='button']{
        width:80px;
        height:24px;
        padding:0;
    }
    #add_formula .modal-body .addType button{

        background-color:#fff !important;
        border:1px solid #39B6E5;
        color:#333;
        outline: none;
        min-width:auto;
    }
    #add_formula .modal-body .formula .tips p {
        color:#999;
        font-size:12px;
        margin:0;
    }
    #add_formula .modal-body .formula .tips p > span{
        color:orange;
    }
    #add_formula .modal-body .state > div > div:first-child{
        margin-bottom:10px;
    }
    #add_formula .modal-body .my_checkbox input{
        top:-1px;
    }
</style>