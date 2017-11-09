<template>
    <div class='company_information'>
        <div class='edit bianji img' @click='edit'>
            
        </div>
        <h4>公司信息</h4>
        <div class='details'>
            <div >
                <div>
                    <form-label-input :value='myCompany.name' @updata="integrationDate" name="name" label="企业简称" inputWidth='500px' :disabled='disabled' />
                </div>
            </div>
            <div class='account'>
                <div>
                    <btn-select 
                        label='负&nbsp;责&nbsp; 人'
                        url='client:/helper/emp'
                        method='post'
                        filter="empName"
                        filterName='empId'
                        :title='myCompany.chargePersonInfo ? myCompany.chargePersonInfo.empName : ""'
                        width='220px'
                        name="chargePersonId" 
                        @updata="integrationDate"    
                        paddingRight='14px'
                        padding='12px' 
                        :disabled='disabled' />
                </div> 
            </div>
            <div>
                <div>
                    <form-label-input :value='myCompany.chargePersonPhone' @updata="integrationDate" name="chargePersonPhone" label="联系电话" inputWidth='500px' :disabled='disabled' />
                </div>
            </div>
            <div class='address'>
                <div>
                    <form-label-input  :value='myCompany.address' @updata="integrationDate" name="address" label="公司地址" inputWidth='500px' :disabled='disabled' 
                    :data-toggle='!disabled ? "modal" : "" '  data-target='#model_map' />
                    <span class='point' data-toggle='modal' data-target='#model_map' v-if='!disabled'><i></i></span>
                </div>
            </div>
        </div>
        <div class='operate'>
            <div class="btn-group" >
                <input type="button" class="btn btn-primary" value='保存' @click='complete' />
                <input type="button" class="btn btn-primary" value='退出' @click='esc' />
            </div>
        </div>
        <model-map text='设为公司地址'></model-map>
    </div>
</template>

<script>
    import modelMap from '../../../../../common_component/model_map.vue'
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import formLabelInput from '../../../../../common_component/form-label-input.vue'
    export default{
        data(){
            return {
                disabled: true,
                myCompany:{
                    name: '',
                    port: '',
                    phone: '',
                    fixedTelephone: '',
                    email: '',
                    accountNumber: '',
                    address: '',
                    chargePersonInfo: {
                        empName: ''
                    }
                },
                res: {}
            }
        },
        mounted(){
            const _this = this;

            if(global.ourOrgId){
                console.log(global.ourOrgId)
                updata();
            }else{
                var timer = setInterval(function(){
                    if(global.ourOrgId){
                        clearInterval(timer);
                        console.log(global.ourOrgId)
                        updata();
                    }
                }, 500);
            }

            function updata(){
                bus.$on('updataAdress', function(type, addressObj, details){
                    const longitude = addressObj.Longitude;
                    _this.res.address = _this.myCompany.address = addressObj.address;
                    _this.res.lng = longitude.split(',')[0];
                    _this.res.lat = longitude.split(',')[1];
                    $('#model_map').modal('hide');
                    
                });
                
                _this.updateInfo();
            }
        },
        methods:{
            updateInfo(){
                const _this = this;
                // 获取本公司信息
                console.log(ourOrgId)
                send({
                    url: 'client:/org/' + ourOrgId,
                    type: 'get'
                }, function(err, res){
                    console.log(err, res);
                    if(res.status == 200){
                        _this.myCompany = res.content[0];
                    }
                });
            },
            integrationDate(name, item){
                this.res[name]= item;
                console.log(this.chosen);
            },
            edit(event){
                const $company = $(event.target).parentsUntil('.company').parent();
                this.disabled = false;
                $company.find('.company_information .operate, .company_information .point').show();
            },
            complete(event){
                const _this = this;
                send({
                    url: 'client:/org/' + ourOrgId,
                    type: 'put',
                    param: _this.res
                }, function(err, res){
                    _this.updateInfo();
                    alert(res.msg, res.status == 200 ? 'success' : 'error');
                })

                this.disabled = true;
                $('.company_information .operate, .company_information .point').hide();
            },
            esc(evnet){
                this.disabled = true;
                $('.company_information .operate, .company_information .point').hide();            
            },
        },
        components: {
            modelMap,
            btnSelect,
            formLabelInput
        }
    }
</script>

<style>
    .company_information label{
        min-width: 60px !important;
        margin-right: 12px;
    }
    .company_information{
        margin-top: 40px;
    }
    .company_information .point{
        position: relative;
        cursor: pointer;
    }
    .company_information .details{
        border-top:1px solid #999;
        border-bottom:1px solid #999;
    }
    .company_information .details > div {
        margin:15px 0 15px 15px;
    }
    .company_information .details > div > div{
        display:flex;
        margin:5px 0;
    }
    .company_information .details > div > div > span.name{
        width:60px;
        margin-right:20px;
        font-size:12px;
        padding:5px 0;
    }
    .company_information .details input[type='text']{
        background: transparent;
        padding: 5px 10px 5px 5px;
        border: none;
        width:400px;
    }
    .company_information .details  input.abled{
        background-color: #DCF4FC;
    }
    .company_information .address select{
        width:86px;
        height:22px;
        background-color:transparent;
    }
    .company_information .operate{
        text-align:center;
        display:none;
        margin-top: 10px;
    }
    .company_information .operate input[type='button']{
        border:1px solid #39B6E5;
        background-color:#fff !important;
        color:#39B6E5;
        border-radius: 0;
        margin: 0 40px;
    }
    .company_information .edit{
        width:12px;
        height: 12px;
        float:right;
        cursor: pointer;
    }
</style>