<template>
    <div id='smsTemplateAdd' class="modal fade">
        <div class="modal-dialog"> 
            <div class="modal-content">
                <div class="modal-header">
                    <span>{{navTxt}}短信模板</span>
                    <button class='close' data-dismiss="modal" @click='esc' >
                        <span class="glyphicon glyphicon-remove close"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <btn-select 
                                width='400px'
                                label='模板类型' 
                                :after='true'
                                label-right='12px'
                                url='control:/sys/param'
                                method="post"
                                :params='["/sms/template/screen/param"]'
                                filter="desc" 
                                name="smsType" 
                                @updata="integrationDate" 
                                :disabled='templateId != "" '
                                padding='0'
                                :uuid='true'
                                field='sms_type'
                                :value='res.smsType'
                                :updataKey='updataKeyTemplate'
                                /> 
                        </div>
                    </div>
                    <div class="row" style="margin-top:10px">
                        
                        <div class="col-xs-12">
                            <btn-select 
                                width='400px'
                                label='产品类型' 
                                :after='true'
                                label-right='12px'
                                url='control:/sys/param'
                                method="post"
                                :params='["/sms/product/list"]'
                                filter="desc" 
                                filterName='code'
                                name="productId" 
                                @updata="integrationDate" 
                                padding='0'
                                :uuid='true'
                                field='code'
                                :value='res.productId'
                                :updataKey='updataKeyTemplate'
                                /> 
                        </div>
                    </div>
                    <div class="row content">
                        <div class="col-xs-12">
                            <inputText
                                label='模板内容'
                                labelTop='5px'
                                :after='true'
                                labelRight='12px'
                                name='templateContent'
                                @updata="integrationDate" 
                                :value='res.templateContent'
                                inputWidth='400px'
                                inputHeight='100px'
                                :updataKey='updataKey'
                            ></inputText>
                        </div>
                    </div>
                        
                    <div class="row">
                        <div class="col-xs-12" style='margin-left:70px;margin-top:10px'>

                            <btn-select 
                                label='自定义选项'
                                label-right='12px'
                                :arr="screen_list" 
                                width='100px'
                                filter='desc'
                                filterName='code'
                                name='screen_list'
                                @updata="integrationDate" 
                                :updataKey='updataKey'
                                padding='0'/>
                            <span class='add img input' @click='inputText($event)'></span>

                        </div>
                    </div>

                </div>
                <hr />
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn radius-btn" inputWidth='150px' @click='addTemplate' >{{footerTxt}}</button>
                        <button type="button" data-dismiss="modal" class="btn radius-btn" @click='esc' inputWidth='150px'>取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import btnSelect from '../../../../../common_component/btn_select.vue';
import inputText from '../../../../../common_component/inputText.vue'
import formLabelInput from '../../../../../common_component/form-label-input.vue'

    export default {

        components:{
            formLabelInput,
            btnSelect,
            inputText
        },
        props: {
            templateId: {}
        },
        data () {
            return {
                navTxt: '添加',
                footerTxt: '添加',
                res: {
                    smsType: '',
                    productId:'', 
                    templateContent: ''
                }, 
                screen_list: [],
                updataKey: 1,
                updataKeyTemplate: 1,
                nowScreenCode: ''
            }
        },
        watch: {

            templateId(newId){
                const _this = this;

                // 添加模板（清理input等，为空） 
                if(!newId){
                    _this.res = {
                        smsType: '',
                        productId:'', 
                        templateContent: ''
                    }
                    _this.navTxt = '添加';
                    _this.footerTxt = '添加';
                    $('#smsTemplateAdd [name="smsType"], #smsTemplateAdd [name="productId"], #smsTemplateAdd .setWidth' ).html('');

                    // 清空自定义选项
                    _this.nowScreenCode = '';
                    _this.screen_list = [];
                    _this.updataKey++;
                    return false;
                }


                // 查看
                _this.navTxt = '修改';
                _this.footerTxt = '修改';
                

                // 获取详细信息
                send({
                    url: 'message:/sms/template/' + newId,
                    type: 'get'
                }, function(err, res){
                    if(res.status == 200){
                        const content = res.content[0];
                        _this.res = content;
                        _this.updataKeyTemplate++;
                        _this.updataKey++
                    }
                });

            }
        },
        methods:{
            integrationDate(name,item){
                if(name == 'smsType'){
                    this.res[name] = item.sms_type;
                    this.screen_list = item.screen_list ? item.screen_list : [];
                    $(this.$el).find('[name="screen_list"]').text('');
                    this.nowScreenCode = '';
                    this.updataKey++;
                    console.log(name, item);
                    return ;
                }else if(name == 'screen_list'){
                    console.log(item)
                    this.nowScreenCode = item;
                    return ;
                }
                this.res[name] = item;
            },
            // 取消
            esc(){
                
            },
            addTemplate(){
                const _this = this;
                let bool = true;

                // const arr = this.res.templateContent.match(/{(.*?)}/g).map( (value, index) => {
                //     return value.replace(/({|})/g, '');
                // }); 

                // // 验证 自定义选项是否符合规范
                // // arr.forEach( (value, index) => {
                // //     let bool = _this.screen_list.some( (screent) => {

                // //         if(screent.code == value){
                // //             console.log(true, value);
                // //             return true;
                // //         }else{
                // //             console.log(false, value)
                // //         }
                // //     });

                // //     if(!bool){

                // //     }
                // // })
                

                // return ;

                $('#smsTemplateAdd').find('[verify="true"]').each(function(index, ele){
                    ele.style.border = 'none';
                console.log('1',ele.tagName.toLocaleLowerCase())

                    if( ele.tagName.toLocaleLowerCase() == 'button' && ! ele.innerHTML){
                        bool = false;

                        ele.style.border = '1px solid #f9bcbc';
                    }else if(ele.tagName.toLocaleLowerCase() != 'button' && !ele.value){
                        bool = false;
                console.log('2',ele.value)

                        ele.style.border = '1px solid #f9bcbc';
                    }
                });
                if(!bool) return alert('请输入关键信息'); ;


                // 添加或修改
                send({
                    url: 'message:/sms/template/' + ( _this.templateId ?  _this.templateId : '' ),
                    type: _this.templateId ? 'put' : 'post',
                    param: _this.res
                }, function(err, res){
                    console.log(res);
                    if(res.status == 200){
                        alert(res.msg, 'success');
                        $('#smsTemplateAdd').modal('hide');
                        _this.$emit('updateSmsTemplate');
                    }else{
                        alert(res.msg ? res.msg : '操作失败!');
                    }
                });
            },
            inputText(){
                const selectionStart = $('#smsTemplateAdd textarea')[0].selectionStart,
                      prev = this.res.templateContent.substr(0, selectionStart),
                      next = this.res.templateContent.substr(selectionStart);

                if(this.nowScreenCode){
                    this.res.templateContent = prev + `{${this.nowScreenCode}}` + next;
                }
            }
        }
    }



</script>
<style>
    #smsTemplateAdd .modal .modal-dialog{
        width: 650px;
    } 
    #smsTemplateAdd .modal-content{
        padding:20px;
    }
    #smsTemplateAdd .modal-body > div{
        display:flex;
        flex-flow: row wrap;
    }
    #smsTemplateAdd .modal-body > div > div{
/*        display:flex;*/
        justify-content:space-around;
    }
    #smsTemplateAdd .modal-body input{
        background-color: #DFF5FD;
        padding-left:10px;
    }
    #smsTemplateAdd .content label{
        /* vertical-align: top !important; */
    }
    #smsTemplateAdd .add{
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

</style>