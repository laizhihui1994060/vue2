<template>
    <div id='vehicleDriver' class="modal fade">
            <div class="modal-dialog"> 
                <div class="modal-content">
                    <div class="modal-header">
                        <span>车辆司机绑定</span>
                        <button class='close' data-dismiss="modal"  >
                            <span class="glyphicon glyphicon-remove close"></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12 driver" style="text-align: center;">
                                <btn-select 
                                    width='200px'
                                    label='当前司机' 
                                    empty='解绑'
                                    :noBorder="true"
                                    label-right='12px'
                                    list-width="128px"
                                    url='client:/helper/emp'
                                    method='post'
                                    :params='{ isConfig: 0, isDriver: true, isUser: true  }'
                                    filter="empName" 
                                    @updata="integrationDate"   
                                    :disabled='disabled'
                                    :updataKey='driverUpdataKey'
                                    padding='0'/>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btns">
                            <button type="button" class="btn" inputWidth='150px' @click='setDriver'>保存</button>
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
            vehicleDriver: {
            		
            },
            vehicleDriverUserId:{

            },
            driverUpdataKey: {}
        },
        watch: {
        	driverUpdataKey(newValue){
        		$('#vehicleDriver .driver .setWidth ').text(this.vehicleDriver)
        	}
        },
        components:{
            btnSelect
        },
        data () {
            return {
            		driverObj: '',
            }
        },
        methods:{
        	integrationDate(name,item){
        		console.log(item)
        		this.driverObj = item;
        	},
            	setDriver(name,item){
            		if(!this.driverObj){
            			// 解绑
            			this.$emit('setDriver', { empName: this.vehicleDriver, userId: this.vehicleDriverUserId}, 'remove');
            		}else{
            			this.$emit('setDriver', this.driverObj ? this.driverObj : { empName: this.vehicleDriver, userId: this.vehicleDriverUserId});
            		}
            }
        }
    }



</script>
<style scoped>
    .modal .modal-dialog{
        width: 450px;
    }
</style>