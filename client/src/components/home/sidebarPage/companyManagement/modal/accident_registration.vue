<template>
    <div id='accident_registration'>
        <div class="modal-body">
             <breadcrumb
                :arr="[{path:'/LoginFinish/companyManagement/accident',text:'事故记录'}, {path:'',text: isCreate ? '事故登记' : '查看事故记录' }]"/>

            <div class='main'>
                <article @click='showDetails'>信息<i></i></article>
                <div class='details'>
                    <div class='block'>
                        <div class='row'>
                            <div>
                                <form-label-input 
                                    label='车&nbsp;牌&nbsp;号&nbsp;'  
                                    name='license'>
                                </form-label-input>
                            </div>
                            <div>
                                <btn-select 
                                    label='责&nbsp;任&nbsp;人&nbsp;' 
                                    label-right='12px'
                                    url="/item" 
                                    filter="SVC_NAME" 
                                    name="person_in_charge" 
                                    @updata="integrationDate"   
                                    padding='0'>
                                </btn-select>
                            </div>
                            <div>
                                <datetimepicker
                                    label='事故日期'
                                    background="#DCF4FC"
                                    width='95px'
                                    padding='4px'
                                    name="date"
                                ></datetimepicker> 
                            </div>
                            <div>
                                <form-label-input 
                                    label='事故损失'  
                                    name='accident_loss'>
                                </form-label-input>
                            </div>
                            <div>
                                <form-label-input 
                                    label='己方车损'  
                                    name='car_damage'>
                                </form-label-input>
                            </div>
                            <div>
                                <form-label-input 
                                    label='人员伤亡'  
                                    name='casualties'>
                                </form-label-input>
                            </div>
                            <div>
                                <form-label-input 
                                    label='三者损失'  
                                    name='three_party_losses'>
                                </form-label-input>
                            </div>
                            <div>
                                <form-label-input 
                                    label='货物损失'  
                                    name='loss_of_goods'>
                                </form-label-input>
                            </div>
                            <div>
                                <form-label-input 
                                    label='其他损失'  
                                    name='ther_losses'>
                                </form-label-input>
                            </div>
                            <div>
                                <datetimepicker
                                    label='理赔时间'
                                    background="#DCF4FC"
                                    width='95px'
                                    padding='4px'
                                    name="settling_time"
                                ></datetimepicker> 
                            </div>
                            <div>
                                <form-label-input 
                                    label='理赔金额'  
                                    name='claim_amount'>
                                </form-label-input>
                            </div>
                        </div>
                    </div>
                    <div class="reason">
                        <span style='vertical-align: top'>事故原因</span>
                        <textarea name="reason" style="width:100%; background:#DFF5FD;resize:vertical;padding:5px; height:100px">
                        </textarea>
                    </div>
                    <div class="improvement">
                        <span style='vertical-align: top'>改进措施</span>
                        <textarea name="improvement_measures" style="width:100%; background:#DFF5FD;resize:vertical;padding:5px; height:100px">
                        </textarea>
                    </div>
                    <div class="img">
                        <input-img name='dsf'></input-img>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="modal-footer">
            <div class="btns">
                <button type="button" class="btn" @click='add'>登记</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/companyManagement/accident' }" class="btn" active-class=' '>返回</router-link>
            </div>
        </div>
  </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import inputImg from '../../../../../common_component/inputImg.vue'
import datetimepicker from  '../../../../../common_component/datetimepicker.vue'
import formLabelInput from '../.././../../../common_component/form-label-input.vue'
import getData from "../../../../../../static/js/getData.js"
import breadcrumb from "../.././../../../common_component/breadcrumb.vue";
    export default{
        data(){
            return {
                chosen: '',
                isCreate: '',
                res: {}
            }
        },
        created(){
            this.chosen = this.$route.params.chosen;
            this.isCreate = this.$route.params.isCreate;
        },  
        methods:{
            integrationDate(name, item){
                this.res[name]= item;
                console.log(this.res);
            },
            add(){
                //收集
                let data = {};
                data = getData('#accident_registration');
                if(data){
                    $('#accident_registration').modal('hide')
                    this.$emit('add', data);
                }else{
                    alert('某些资料不能为空')
                }
            },
            showDetails(){
                $(event.target).parent().toggleClass('up');
                $(event.target).parent().siblings('.details').slideToggle('fast');
            },
        },
        components:{
            btnSelect,
            inputImg,
            datetimepicker,
            formLabelInput,
            breadcrumb
        }
    }
</script>

<style>
#accident_registration .modal-body{
    padding:15px 23px;
}
#accident_registration .modal-body > div{
    margin-bottom: 40px;
}
#accident_registration article{
    margin:0;
    float:none;
    font-size:18px;
}
#accident_registration article:after{
    width:1400px;
    left:70px;
}

#accident_registration .details{
    padding:10px 50px;
    background:#fff;
}
#accident_registration .details > div{
    margin:15px 0;
}
#accident_registration .block{
    margin:15px 0;
}
#accident_registration .row{
    display: flex;
    flex-flow: row wrap;
    margin:0;
}
#accident_registration .row > div{
    width:500px;
    margin:5px 0;
}
/* #accident_registration  article i{
    content:'';
    display:inline-block;
    width:14px;
    height:14px;
    margin-left:10px;
    top:0;
    left:0px;
    cursor: pointer;
    background:url('../../../../../assets/up.png') no-repeat 0 5px;
    
}
#accident_registration  article.up i{
    background:url('../../../../../assets/down.png') no-repeat 0 7px;
}
 */



</style>