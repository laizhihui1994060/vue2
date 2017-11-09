    <template>
    <div id='rescuedAddCarStyle' class="child_page">
        <breadcrumb
            :arr="[{path:'/LoginFinish/systemSettings/rescuedCar',text:'被救车型管理'},{path:'',text: isCreate ? '添加被救车型' : '查看被救车型'}]"/>


        <article style="cursor:pointer;" @click='showDetails($event)'>
            基本信息<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
        </article>
        <div class='details'>
            <div class="details-body">
                <div class="row" v-if='!isCreate'>
                    <div class='col-xs-4' >
                        <form-label-input :after='true' inputWidth='3.43rem' :value='res.code' @updata="integrationDate" :disabled='true' name="name" label="车型编号" />
                    </div> 
                </div>
                <div class='row'>
                    <div class='col-xs-4'>
                        <form-label-input :after='true' inputWidth='3.43rem' :value='res.name' @updata="integrationDate" :disabled='disabled' name="name" label="车型名称" />
                    </div> 
                    <div class='col-xs-4'>
                        <btn-select  
                            width="2.95rem" 
                            btnWidth='0.5rem'
                            label="类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
                            padding="0"
                            url="client:/helper/vehiclecat" 
                            filter="name" 
                            filterName='code'
                            :uuid='true'
                            field='code'
                            :value='res.category'
                            name="category"
                            @updata="integrationDate"
                             :disabled='disabled'
                             :after='true'
                            label-right="12px" />
                    </div>
                    <div class='col-xs-4'>
                        <btn-select  
                            width="2.95rem" 
                            btnWidth='0.5rem'
                            label="品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌"
                            padding="0"
                            url="client:/helper/brand?vendorCode=" 
                            filter="name" 
                            filterName='code'
                            :uuid='true'
                            field='code'
                            :value='res.brand'
                            name="brand"
                            :after='true'
                            @updata="integrationDate" :disabled='disabled'
                            label-right="12px" />
                    </div>
                </div>
                <div class='row'>
                    
                    <div class='col-xs-4'>
                        <form-label-input inputWidth='3.43rem' :value='res.tyreModel' @updata="integrationDate" :disabled='disabled' name="tyreModel" label="轮胎型号" />
                    </div>
                    <div class='col-xs-4'>
                        <form-label-input :after='true' inputWidth='3.43rem' :value='res.noFrontTyres'  type='number' @updata="integrationDate" :disabled='disabled' name="noFrontTyres"      class='intege'    label="前胎数量" />
                    </div>
                    <div class='col-xs-4'>
                        <form-label-input class='intege' :after='true' inputWidth='3.43rem' :value='res.noBackTyres' type='number'  @updata="integrationDate" :disabled='disabled' name="noBackTyres" label="后胎数量" />
                    </div>
                </div>
                <div class='row'>
                    
                    <div class='col-xs-4'>
                        <btn-select  
                            width="2.95rem" 
                            btnWidth='0.5rem'
                            label="带板类型"
                            padding="0"
                            :arr= "[ { name: '拖头带板', code: 'TRAIL_HEAD' }, { name: '单头', code: 'SINGLE_HEAD' }, { name: '其他', code: 'OTHER' }  ]"
                            filter="name" 
                            filterName='code'
                            :uuid='true'
                            field='code'
                            :value='res.plateType'
                            name="plateType"
                            @updata="integrationDate" :disabled='disabled'
                            label-right="12px" />
                    </div>
                    <div class='col-xs-4'>
                        <btn-select  
                            width="2.95rem" 
                            btnWidth='0.5rem'
                            label="驱动类型"
                            padding="0"
                            :arr= "[ { name: '前驱', code: 'FRONT' }, { name: '后驱', code: 'BACK' }, { name: '其他', code: 'OTHER' }  ]"
                            filter="name" 
                            filterName='code'
                            :uuid='true'
                            field='code'
                            :value='res.driveType'
                            name="driveType"
                            @updata="integrationDate" :disabled='disabled'
                            label-right="12px" />
                    </div>
                    <div class='col-xs-4'>
                        <form-label-input class='decimal'  :after='true' inputWidth='3.43rem' :value='res.weight' type='number'  @updata="integrationDate" :disabled='disabled' name="weight" label="净重&nbsp;&nbsp;(吨)" />
                    </div>
                </div>
                <div class='row'>
                    
                    <div class='col-xs-4'>
                        <form-label-input  class='decimal' :after='true' inputWidth='3.43rem' :value='res.load' type='number' @updata="integrationDate" :disabled='disabled' name="load" label="吨位&nbsp;(吨)" />
                    </div>
                    <div class='col-xs-4'>
                        <form-label-input  class='decimal'  :after='true' inputWidth='3.43rem' :value='res.length' type='number' @updata="integrationDate" :disabled='disabled' name="length" label="车长&nbsp;(米)" />
                    </div>
                    <div class='col-xs-4'>
                        <form-label-input  class='decimal'  :after='true' inputWidth='3.43rem' :value='res.width' type='number'  @updata="integrationDate" :disabled='disabled' name="width" label="车宽&nbsp;&nbsp;(米)" />
                    </div>
                </div>
                <div class="row">
                    <div class='col-xs-4'>
                        <form-label-input  class='intege'  :after='true' inputWidth='3.43rem' :value='res.noSeats' type='number'  @updata="integrationDate" :disabled='disabled' name="noSeats" label="座位数量" />
                    </div>
                    
                </div>
                <div class="row">
                    <div class='col-xs-12'>
                        <form-label-input  inputWidth='15rem' :value='res.des' @updata="integrationDate" :disabled='disabled' name="des" label="说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明" />
                    </div>
                </div>
            </div>

            
        </div>
        <article style="cursor:pointer;" @click='showDetails($event)'>
            车辆照片<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
        </article>
        <div class='details'>
            <div class="details-body">
                <div class="block">
                    <div class="row">
                        <input-img name='pictures' :arr='res.pictures' @updata="integrationDate" :disabled='disabled'></input-img>
                    </div>
                </div>
            </div>
            <div class="btns details-footer" style="margin-top:20px;" v-if="serverURL(['systemSettings', 'resucedCarManage'])" >
                <button type="button" class="btn radius-btn" @click='addModify' style="margin-right:20px;">{{isCreate ? '添加' : '修改' }}</button>
                <button type="button" class="btn btn-danger radius-btn" @click='deleteCarStyle' style="margin-right:20px;" >删除</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/systemSettings/rescuedCar' }" class="btn" active-class=' '>返回上一页</router-link>
            </div>
        </div>
  </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import inputImg from '../../../../../common_component/inputImg.vue'
import radio from '../../../../../common_component/radio.vue'
import formLabelInput from '../../../../../common_component/form-label-input.vue'
import getData from "../../../../../../static/js/getData.js"
import breadcrumb from '../../../../../common_component/breadcrumb.vue';

    export default{
        data () {
            return {
                active:"essential_information",
                disabled: true,
                res: {},
                isCreate: false,
                code: ''
            }
        },
        created(){
            console.log(this.$route.params)
            this.isCreate = this.$route.params.isCreate && this.$route.params.isCreate.toString() === 'true';
            const _this = this;
            if(!this.isCreate){
                _this.code = this.$route.params.id;

                _this.update();
                _this.addModify = _this.modify;
            }else{
                this.disabled = false;
                _this.addModify = _this.add;
            }
        },
        methods:{
            toggleClass(sclass){
                this.active = sclass
            },
            serverURL(url){
                return ConfigPage.isExist(url);
            },
            integrationDate(name,item){
                this.res[name]= item;
                console.log(name, item)
            },
            showDetails(){
                $(event.currentTarget).find('span').toggleClass('down');
                $(event.currentTarget).next('.details').slideToggle('fast');
            },
            deleteCarStyle(){
                const _this = this;
                confirm('确定删除该被救车型吗?' , function(){

                    send({
                        url: 'control:/vehicle_model/' + _this.code,
                        type: 'delete'
                    }, function(err, res){
                        console.log(res);
                        alert(res.msg, res.status == 200 ? 'success' : 'error');
                        if(res.status == 200) return window.history.go(-1);
                    })
                }, 'true');
            },
            update(){
                const _this = this;
                send({
                    url: 'control:/vehicle_model/' + _this.code,
                    type: 'get'
                }, function(err, res){
                    if(res.status == 200){
                        console.log(res);
                        _this. res = res.content[0];
                    }else{
                        alert(res.msg);
                    }
                });
            },
            addModify(){

            },
            modify(){
                const _this = this;
                console.log(_this.res);
                if(_this.disabled){
                    _this.disabled = false;
                }else{
                    let bool = true, intege = true, decimal = true;
                    $('#rescuedAddCarStyle').find('[verify="true"]').each(function(index,el){

                        el.style.backgroundColor = '#DFF5FD';
                        if(!el.innerHTML && !el.value){

                            el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                            bool = false;
                        }
                    });

                    // 整数
                    $('#rescuedAddCarStyle .intege input').each( function(index, el){
                        const value = el.value,
                                 patt = new RegExp('^[0-9]{1,4}$');
                        if(!patt.test(value)){
                            el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                            intege = false;
                        }
                    })

                    if(!intege) return alert('前胎、后胎和座位最大为4位整数');


                    // 小数
                    $('#rescuedAddCarStyle .decimal input').each( function(index, el){
                        const value = el.value
                        if(value > 100){
                            el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                            intege = false;
                        }
                    });

                    if(!decimal) return alert('车长，车宽等最大为三位数')

                    if(bool){

                        var promise = new Promise( (resolve, reject) => {
                            console.log(_this.res.pictures )
                            if(_this.res.pictures && _this.res.pictures.length > 0){
                                fileUp(_this.res.pictures, function(res){
                                    _this.res.pictures = res;
                                    resolve();
                                });
                            }else{
                                resolve();
                            }
                        });

                        promise.then( () => {
                            send({
                                url: 'control:/vehicle_model/' + _this.code,
                                type: 'put',
                                param: _this.res
                            }, function(err, res){
                                _this.disabled = true;
                                alert(res.msg, res.status == 200 ? 'success' : 'error');
                                if(res.status !== 200) _this.update();
                            });
                        });
                    }else{
                        alert('某些资料不能为空');
                    }
                }
            },
            //增加
            add(){
                //收集
                const _this = this;
                let bool = true, intege = true, decimal = true;
                $('#rescuedAddCarStyle').find('[verify="true"]').each(function(index,el){

                    el.style.backgroundColor = '#DFF5FD';
                    if(!el.innerHTML && !el.value){

                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        bool = false;
                    }
                });

                // 整数
                $('#rescuedAddCarStyle .intege input').each( function(index, el){
                    const value = el.value,
                             patt = new RegExp('^[0-9]{1,4}$');
                    if(!patt.test(value)){
                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        intege = false;
                    }
                })

                if(!intege) return alert('前胎、后胎和座位最大为4位整数');


                // 小数
                $('#rescuedAddCarStyle .decimal input').each( function(index, el){
                    const value = el.value
                    if(value > 100){
                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        intege = false;
                    }
                });



                if(bool){
                    var promise = new Promise( (resolve, reject) => {
                        console.log(_this.res.pictures )
                        if(_this.res.pictures && _this.res.pictures.length > 0){
                            fileUp(_this.res.pictures, function(res){
                                _this.res.pictures = res;
                                resolve();
                            });
                        }else{
                            resolve();
                        }
                    });

                    promise.then( () => {
                        send({
                            url: 'control:/vehicle_model',
                            type: 'post',
                            param: _this.res
                        }, function(err, res){
                            if(res.status == 200){
                                alert(res.msg, 'success');
                                window.history.go(-1);
                            }else{
                                alert(res.msg);
                            }
                        });
                    })
                    
                }else{
                    alert('某些资料不能为空')
                }
            }
        },
        components:{
            btnSelect,
            inputImg,
            radio,
            formLabelInput,
            breadcrumb
        }
    }
</script>

<style>
    #rescuedAddCarStyle article{
        cursor: pointer;
    }
    #rescuedAddCarStyle article:after{
        left:100px;
        width: 90%;
    }
    #rescuedAddCarStyle .row{
        margin:15px 0;
    }
    #rescuedAddCarStyle .details-body{
        background: #fff;
        padding:20px 30px;
    }
    #rescuedAddCarStyle label{
        min-width: 60px;
    }
</style>