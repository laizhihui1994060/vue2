<template>
    <div id="inVehicle">
        <div id="inVehicle_map"></div>
        <div class='vehicles'>
            <div class='choose'>
                <btn-select 
                    title='仅显示我的车辆'
                    url="/item" 
                    filter="SVC_NAME"
                    width='auto'
                    name="conpamyName" 
                    @updata="integrationDate"   
                    padding='0'>
                </btn-select>

                <btn-select 
                    title='车辆状态'
                    url="/item" 
                    filter="SVC_NAME"
                    width='auto'
                    name="conpamyName" 
                    @updata="integrationDate"   
                    padding='0'>
                </btn-select>

                <checkbox 
                    name='213' 
                    value='' 
                    text='显示当前任务路线' 
                    direction='left'>
                </checkbox>
                <checkbox 
                    name='21334' 
                    value='' 
                    text='显示当前任务路线' 
                    direction='left'>
                </checkbox>

                <span>共搜索 32 辆车</span>
            </div>
            <div class='vehicle_state'>
                <ul class='clearfix'>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>章国栋</span>
                            <span>粤A33980</span>
                            <span>平板3吨</span>
                            <span>平安拖车</span>
                            <span>广州市海珠区海珠广场新华路</span>
                            <div class="head_portrait"></div>
                        </div>
                        <div class='state'>
                            <span>空闲</span>
                        </div>
                    </li>
                </ul>
                <div class='bar' @click='toggleUp'>
                    <i></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import checkbox from '../../../../../common_component/checkbox.vue'

    export default {
        data(){
            return {
                vehiclesLength:7,
                res:{}
            }
        },
        mounted(){
            this.$nextTick(function(){
                const map = new AMap.Map('inVehicle_map', {
                    zoom:11,
                });
            })
        },
        
        methods: {
            toggleUp(){
                $('#inVehicle .vehicle_state').toggleClass('down');
                $('#inVehicle .bar').toggleClass('down');
            },
            integrationDate(name, item){
                this.res[name]= item;
                console.log(this.res);
            }
        },
        components:{
            btnSelect,
            checkbox
        }
    }
</script>

<style>
#inVehicle{

    margin-left: 23px;
    margin-top: 20px;
    padding-bottom: 50px;
    position: relative;
}
#inVehicle_map{
    width:100%;
    height:445px;
}    
#inVehicle .vehicles{
    padding:15px 20px;
}
#inVehicle .vehicles .choose .setWidth{
    width:110px;
}
#inVehicle .vehicles > .choose > span{
    float:right;
}
#inVehicle .vehicles .vehicle_state{
    margin-top:10px;
    overflow:hidden;
    height:190px;
    position:relative;
}
#inVehicle .vehicles .vehicle_state.down{
    overflow:visible;
    height:auto;
}
#inVehicle .vehicles .vehicle_state li{
    width:129px;
    height:165px;
    box-sizing:border-box;
    border:1px solid #8DCA35;
    border-top-width:6px;
    padding-top:10px;
    float:left;
    margin:10px 1px;
    font-size:12px;
}
#inVehicle .vehicles .vehicle_state li > div:first-child{
    position:relative;
}
#inVehicle .vehicles .vehicle_state .head_portrait{
    width:58px;
    height:58px;
    border-radius:50%;
    background:#ccc;
    position:absolute;
    left:65px;
    top:4px;
}
#inVehicle .vehicles .vehicle_state li span{
    display: block;
    padding-left:5px;
}
#inVehicle .vehicles .vehicle_state .state{
    height:34px;
    background-color:#EAF3DD;
    width:100%;
    font-size:18px;
    color:#8DCA35;
    text-align:center;
    line-height:34px;
    margin-top:15px;
    
}
#inVehicle .vehicles .vehicle_state .bar{
    width:917px;
    height:15px;
    text-align:center;
    position:absolute;
    cursor:pointer;
    top:175px;
}
#inVehicle .vehicles .vehicle_state .bar:hover{
    background:#ccc;
}
#inVehicle .vehicles .vehicle_state .bar i{
    display:inline-block;
    height:15px;
    width:25px;
    background:url('../../../../../assets/img.png') no-repeat 0 -1854px;
}
#inVehicle .vehicles .vehicle_state .bar.down{
    position:static;    
}
#inVehicle .vehicles .vehicle_state .bar.down i{
    background:url('../../../../../assets/img.png') no-repeat 0 -1478px;
}
</style>
