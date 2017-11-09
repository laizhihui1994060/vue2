<template>
    <div id='vehicleStatus' class="modal fade">
            <div class="modal-dialog"> 
                <div class="modal-content">
                    <div class="modal-header">
                        <span>车辆状态设置</span>
                        <button class='close' data-dismiss="modal"  >
                            <span class="glyphicon glyphicon-remove close"></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12" style="text-align: center;">
                                <btn-select
                                    width='128px'
                                    btnWidth='0.5rem'
                                    label='车辆状态' 
                                    label-right='12px'
                                    :arr="[{name:'忙',code:'BUSY'},{name:'空闲',code:'FREE'},{name:'维修中',code:'MAINTENANCE'}]"
                                    filter="name"
                                    filterName='code' 
                                    :noBorder="true"
                                    :uuid='true'
                                    field='code'
                                    :value='vehicleStatus'
                                    name="status" 
                                    @updata="integrationDate"   
                                    :disabled='statusDisabled'
                                    padding='0'/>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btns">
                            <button type="button" class="btn" inputWidth='150px' @click='setStatus'>保存</button>
                            <button type="button" data-dismiss="modal" class="btn" inputWidth='150px'  >关闭</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
</template>

<script>
import btnSelect from '../../../../../../common_component/btn_select.vue'
    export default {
        props:{
            vehicleStatus: {
            		
            }
        },
        components:{
            btnSelect
        },
        data () {
            return {
            		info: {},
            		status: '',
            		statusDisabled: false
            }
        },
        methods:{
        	integrationDate(name,item){
        		this.status = item;
        	},
            	setStatus(name,item){
            	   this.$emit('setStatus', this.status ? this.status : this.vehicleStatus);

            }
        }
    }



</script>
<style scoped>
    .modal .modal-dialog{
        width: 450px;
    }
</style>