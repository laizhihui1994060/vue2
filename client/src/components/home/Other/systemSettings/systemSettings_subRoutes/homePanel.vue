<template>
    <div class='homePanel'>
        <div class="input-append date form_datetime">
            <div class="form-group" >
                <btn-select 
                    title='职位'
                    url="/item" 
                    filter="SVC_NAME"
                    width='auto'
                    name="conpamyType" 
                    @updata="integrationDate"   
                     />
            </div>
            <div class="btn-group" >
                  <input type="button" class="btn search" value='搜索' />
            </div>
        </div>
        <div class="btn-group edit pull-right" @click='edit'>
            <a  data-toggle='modal' data-target='#parameterSetting_modal img bianji' ></a>
        </div>
        <div class='table'>
            <table>
                <thead>
                    <tr>
                        <th>显示图标</th>
                        <th>时间切换</th>
                        <th>图标样式</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for='obj in tbody' >
                        <td><i class="img Shape"></i>{{obj.showIcon}}</td>
                        <td>{{obj.timeChange}}</td>
                        <td>{{obj.iconStyle}}</td> 
                        <td>
                           <checkbox :name='obj.checkbox.name' :checked='obj.checkbox.checked' disabled='disabled' ></checkbox>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import checkbox from '../../../../../common_component/checkbox.vue'

    export default {
        data(){
            return {
                options: {
                    disabled: true
                },
                res:{},
                tbody:[{
                    showIcon: '今日数据',
                    timeChange: '默认',
                    iconStyle: '默认',
                    checkbox: {
                        name: '123',
                        checked: false
                    }
                },{
                    showIcon: '订单数据统计',
                    timeChange: '日、周、月',
                    iconStyle: '折线图、条状图',
                    checkbox: {
                        name: '123',
                        checked: true
                    }
                },{
                    showIcon: '客户分类统计',
                    timeChange: '日、周、月',
                    iconStyle: '折线图、条状图',
                    checkbox: {
                        name: '123',
                        checked: true
                    }
                },{
                    showIcon: '业务分类统计',
                    timeChange: '日、周、月',
                    iconStyle: '折线图、条状图',
                    checkbox: {
                        name: '123',
                        checked: true
                    }
                },{
                    showIcon: '坐席下单数量',
                    timeChange: '日、周、月',
                    iconStyle: '折线图、条状图',
                    checkbox: {
                        name: '123',
                        checked: true
                    }
                },{
                    showIcon: '下单渠道统计',
                    timeChange: '日、周、月',
                    iconStyle: '折线图、条状图',
                    checkbox: {
                        name: '123',
                        checked: true
                    }
                },{
                    showIcon: '技师接单数量',
                    timeChange: '日、周、月',
                    iconStyle: '折线图、条状图',
                    checkbox: {
                        name: '123',
                        checked: true
                    }
                },{
                    showIcon: '来电数量统计',
                    timeChange: '日、周、月',
                    iconStyle: '折线图、条状图',
                    checkbox: {
                        name: '123',
                        checked: true
                    }
                },{
                    showIcon: '空闲车辆数量',
                    timeChange: '日、周、月',
                    iconStyle: '折线图、条状图',
                    checkbox: {
                        name: '123',
                        checked: true
                    }
                }]
            }
        },
        methods: {
            edit(){
                const $inputs = $(event.target).parent().siblings('.table').find('input'),
                      _this = this;

                if( $inputs.eq(0).attr('disabled') == false || $inputs.eq(0).attr('disabled') == 'disabled' ){
                    //设置
                    $inputs.attr('disabled', false);
                    $('.homePanel .table td i ').css('display', 'inline-block');
                    //拖动
                    _this.options.disabled = false;
                    console.log(_this.options)

                }else{
                    //保存
                    $inputs.attr('disabled', true);
                    $('.homePanel .table td i ').css('display', 'none');
                    //禁止拖动
                    _this.options.disabled = true;
                
                }
            },
            integrationDate(name, item){
                this.res[name]= item;
                console.log(this.res);
            }
        },
        components:{
            btnSelect,
            checkbox,
        },
    }    
</script>

<style>
    .homePanel .form-group{
        display:inline-block;   
    }
    .homePanel .btn-group{
      padding-right:10px;
    }
   /*  .homePanel .edit > a{
        display:inline-block;
        width:18px;
        height:18px;    
        background:url('../../../../../assets/bianji.png') no-repeat;
        margin-top:10px;
        cursor: pointer;
    } */
    .homePanel .table td{
        position: relative;
    }
    .homePanel .table th:first-child,
    .homePanel .table td:first-child{
        padding-left:50px !important;
    }
    
    .homePanel .table td i{
        width:18px;
        height: 18px;
        display: inline-block;
        position: absolute;
        left:20px;
        margin-right:10px;
        /* background: url('../../../../../assets/Shape.png'); */
        display: none;
    }
    
 
</style>