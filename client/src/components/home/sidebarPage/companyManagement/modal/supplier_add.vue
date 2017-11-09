<template> 
    <div id="supplier_add" class='child_page'>
        <breadcrumb
            :arr="[{path:'/LoginFinish/companyManagement/supplier',text:'服务商'},{path:'',text:  '邀请服务商' }]"/>

        <div class='details' style='padding-left:40px;'>
                <div class="row">
                    <div class="col-xs-12" >
                        <form-label-input 
                            style='display:inline-block'
                            label='服务商编码'  
                            name='code'
                            value=''
                            @updata='integrationData'
                            :disabled='disabled'
                            inputWidth='300px' />
                        <div class='btns' style='display:inline-block'>
                            <button type="button" class="btn" @click="searchCode" style="margin-left:20px;">搜索</button>
                        </div>
                    </div>
                </div>
                <template v-if='isShowDetail'>
                    <div class="row" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; margin:20px 0 ; padding:10px 0;">
                        <div class="col-xs-12">
                            <div class="row">
                                <div class="col-xs-4" style='padding-left:0;'>
                                    <p>公司简称：{{info.name}}</p>
                                </div>
                                <div class="col-xs-4">
                                    <p>公司全称：{{info.fullname}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-4" style='padding-left:0;'>
                                    <p>联&nbsp;&nbsp;系 人：{{ info.chargePersonInfo ? info.chargePersonInfo.empName : ""}}</p>
                                </div>
                                <div class="col-xs-4">
                                    <p>联系电话：{{info.chargePersonPhone}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12" style='padding-left:0;'>
                                    <p>公司地址：{{info.address}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="btns details-footer">
                            <button type="button" class="btn" @click="invitation">邀请对方成为我的服务商</button>
                        </div>
                    </div>
                </template>
        </div>


    </div>
</template>
<script>

import breadcrumb from '../../../../../common_component/breadcrumb.vue'
import formLabelInput from '../.././../../../common_component/form-label-input.vue'

    export default{
        data () {
            return {
                code: '',
                currentCode: '',
                prevInvitedCode: '',
                info: {
                    address: '',
                    fullname: '',
                    name: '',
                    chargePersonInfo: {
                        empName: ''
                    },
                    chargePersonPhone: ''
                },

                isShowDetail: false
            }
        },
        created(){
            // 测试， 查询本公司发送的邀请
            send({
                url: 'client:/partnerinvitation/list/invitation',
                type: 'post',
                param:{
                    pageIndex:1,
                    pageSize:100
                }
            }, function(err, res){
                console.log(res);
            });

            // 测试，获取邀请本公司的请求
            send({
                url: 'client:/partnerinvitation/list/invited',
                type: 'post',
                param:{
                    pageIndex:1,
                    pageSize:100
                }
            }, function(err, res){
                console.log(res);
            });
        },
        methods:{
            integrationData(name, item){
                console.log(name, item);
                this[name] = item;
            },
            invitation(){
                const _this = this;

                if(_this.currentCode == _this.prevInvitedCode){
                    alert('刚刚已经邀请过这个公司了');
                    return;
                }

                send({
                    url: 'client:/partnerinvitation/sendinvitation',
                    type: 'post',
                    param: {
                        code:  _this.currentCode
                    }
                }, function(err, res){
                    console.log(res);
                    if(res.status == 200){
                        _this.prevInvitedCode = _this.currentCode;
                        alert('邀请成功', 'success');
                    }else{
                        alert(res.msg);
                    }
                });



            },
            searchCode(){
                const _this = this;
                send({
                    url: 'client:/partnerinvitation/checkinvitation',
                    type: 'post',
                    param: {
                        code: _this.code
                    }
                }, function(err, res){
                    console.log(res);
                    if(res.status == 200){
                        _this.info = res.content[0];
                        _this.isShowDetail = true;
                        _this.currentCode = _this.code;
                    }else{
                        alert(res.msg);
                    }
                })
            }
        },
        components:{
            formLabelInput,
            breadcrumb,
        }
    }
</script>

<style>
#supplier_add label{
    min-width: 72px;
}
#supplier_add article:after{
    width:auto;
    left:105px;
    top:-10px;
}
#supplier_add article i{
    left:92px;
}
#supplier_add .details{
    padding:20px 30px;
}
#supplier_add .contact input[disabled]{
    background:#f6f6f6 !important;
}
#supplier_add{
    margin-top: 22px;
    overflow: visible;
    padding-bottom: 20px;
}
#supplier_add .row{
    margin: 5px 0;
}
</style>