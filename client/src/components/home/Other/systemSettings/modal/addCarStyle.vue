    <template>
    <div id='rescuedAddCarStyle' class="child_page">
        <breadcrumb
            :arr="[{path:'/LoginFinish/systemSettings/rescueVehicle',text:'救援车型管理'},{path:'',text: isCreate ? '添加救援车型' : '查看救援车型'}]"/>


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
                            :arr="[ { name: '折叠式平板', code: 'FOLD_FLAT' }, { name: '落地式平板', code: 'FLOOR_FLAT' }, { name: '随车吊平板', code: 'CRANE_FLAT' }, { name: '轻型托吊', code: 'LIGHT_CRANE' }, { name: '中型托吊', code: 'MIDDLE_CRANE' }, { name: '重型托吊', code: 'HEAVY_CRANE' }, { name: '旋转型', code: 'ROTARY_CRANE' }, { name: '斜板拖车', code: 'RAMP_TRAILER' }, { name: '快修小车', code: 'FAST_REPAIR' }, { name: '叉车', code: 'FORKLIFT' }, { name: '其他', code: 'OTHER' } ]"
                            filter="name" 
                            filterName='code'
                            :uuid='true'
                            field='code'
                            :value='res.model'
                            name="model"
                            @updata="integrationDate"
                             :disabled='disabled'
                             :after='true'
                            label-right="12px" />
                    </div>
                    <div class='col-xs-4'>
                        <form-label-input  max='100'  :after='true' type='number' inputWidth='3.43rem' :value='res.weight' @updata="integrationDate" :disabled='disabled' name="weight" label="重量" />
                    </div>
                </div>
                <div class='row'>
                    
                    
                    <div class='col-xs-4'>
                        <form-label-input max='100'  :after='true' inputWidth='3.43rem' :value='res.width'  type='number' @updata="integrationDate" :disabled='disabled' name="width"      class='intege'    label="宽度" />
                    </div>
                    <div class='col-xs-4'>
                        <form-label-input max='100' :after='true' inputWidth='3.43rem' :value='res.length' type='number'  @updata="integrationDate" :disabled='disabled' name="length" label="长度" />
                    </div>
                    <div class='col-xs-4'>
                        <form-label-input max='1000' class='intege' :after='true' inputWidth='3.43rem' :value='res.load' type='number'  @updata="integrationDate" :disabled='disabled' name="load" label="载重" />
                    </div>
                </div>
                <div class='row'>
                    
                    <div class='col-xs-4'>
                        <form-label-input max='10000' class='intege' :after='true' inputWidth='3.43rem' :value='res.maxLoadableCars' type='number'  @updata="integrationDate" :disabled='disabled' name="maxLoadableCars" label="板位数" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <form-label-input  inputWidth='15rem' :value='res.des'  @updata="integrationDate" :disabled='disabled' name="des" label="说明" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-3">
                        <checkbox
                            text='是否可以牵引'
                            name='couldPull'
                            :disabled='disabled'
                            @updata="integrationDate"
                            :checked='res.couldPull'
                            />
                    </div>
                    <div class="col-xs-3">
                        <checkbox
                            text='是否可以起吊'
                            name='couldLift'
                            :disabled='disabled'
                            @updata="integrationDate"
                            :checked='res.couldLift'
                            />
                    </div>
                    <div class="col-xs-3">
                        <checkbox
                            text='是否可以全落地'
                            name='couldFloor'
                            :disabled='disabled'
                            @updata="integrationDate"
                            :checked='res.couldFloor'
                            />
                    </div>
                </div>
            </div>
            <div class="btns details-footer" style="margin-top:20px;" v-if="serverURL(['systemSettings', 'resucedCarManage'])" >
                <button type="button" class="btn radius-btn" @click='addModify' style="margin-right:20px;">{{isCreate ? '添加' : '修改' }}</button>
                <button type="button" class="btn btn-danger radius-btn" @click='deleteCarStyle' style="margin-right:20px;" >删除</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/systemSettings/rescueVehicle' }" class="btn" active-class=' '>返回上一页</router-link>
            </div>
            
        </div>
  </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import inputImg from '../../../../../common_component/inputImg.vue'
import radio from '../../../../../common_component/radio.vue'
import checkbox from '../../../../../common_component/checkbox.vue'
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
                confirm('确定删除该救援车型吗?' , function(){

                    send({
                        url: 'control:/tow_truck_cat/' + _this.code,
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
                    url: 'control:/tow_truck_cat/' + _this.code,
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
                    let bool = true, maxBool = true;
                    $('#rescuedAddCarStyle').find('[verify="true"]').each(function(index,el){

                        el.style.backgroundColor = '#DFF5FD';
                        if(!el.innerHTML && !el.value){

                            el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                            bool = false;
                        }
                    });

                    // 不能太大的数字
                    $('#rescuedAddCarStyle  input[max]').each( function(index, el){
                        const value = parseInt( el.value ),
                                  label = $(el).siblings('label').text(),
                                  maxValue = parseInt( el.getAttribute('max') ),
                                  patt = new RegExp('^[0-9]{1,4}$');
                         console.log(value, maxValue)
                        if(value > maxValue){
                            
                            el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                            maxBool = false;
                            alert(`${label}不能大于${maxValue}`)
                            return false;
                        }
                    })

                    if(!maxBool) return;

                    if(bool){




                        send({
                            url: 'control:/tow_truck_cat/' + _this.code,
                            type: 'put',
                            param: _this.res
                        }, function(err, res){
                            _this.disabled = true;
                            alert(res.msg, res.status == 200 ? 'success' : 'error');
                            if(res.status !== 200) _this.update();
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
                let bool = true, maxBool = true;
                $('#rescuedAddCarStyle').find('[verify="true"]').each(function(index,el){

                    el.style.backgroundColor = '#DFF5FD';
                    if(!el.innerHTML && !el.value){

                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        bool = false;
                    }
                });

                // 不能太大的数字
                $('#rescuedAddCarStyle  input[max]').each( function(index, el){
                    const value = parseInt( el.value ),
                              label = $(el).siblings('label').text(),
                              maxValue = parseInt( el.getAttribute('max') ),
                              patt = new RegExp('^[0-9]{1,4}$');
                     console.log(value, maxValue)
                    if(value > maxValue){
                        
                        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                        maxBool = false;
                        alert(`${label}不能大于${maxValue}`)
                        return false;
                    }
                })

                if(!maxBool) return;



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
                            url: 'control:/tow_truck_cat',
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
            checkbox,
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