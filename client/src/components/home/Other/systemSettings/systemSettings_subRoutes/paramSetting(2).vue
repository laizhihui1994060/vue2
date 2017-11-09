<template>
    <div class="parameter_setting">
       

        <div class='order_list_settings'>
            <article @click='downDetails($event)'>订单列表设置</article><span class='tip'><!-- ( 最多11个字段 ) --></span>
            <div class="btn-group edit" @click='changeModalData("order_list_settings")'>
                <a  data-toggle='modal' data-target='#parameterSetting_modal' ></a>
            </div>
            <div class='details'>
                <div v-for='item in order_list_settings' :key='item'>
                    <div class="tag">{{item.pathDesc}}</div>
                    <div class='rightContent'>
                        <template v-if='item.value.values' > 
                            <checkbox 
                                v-for='obj in item.value.values'
                                :key='obj'
                                direction='left'  labelSize='12px' 
                                :text='obj.desc'  disabled='disabled' 
                                :checked='obj.isChoose' top='2px' />
                        </template>
                        <template v-if='item.value.available_columns'>
                            <checkbox
                                v-for='obj in item.value.available_columns'
                                :key='obj'
                                direction='left'  
                                labelSize='12px' 
                                :text='obj.desc'  
                                disabled='disabled'  
                                display='none' 
                                :checked='obj.isChoose' />
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class='data_dictionary'>
            <article @click='downDetails($event)'>数据字典</article>
            <div class="btn-group edit" @click='changeModalData("data_dictionary")'>
                <a  data-toggle='modal' data-target='#parameterSetting_modal' ></a>
            </div>
            <div class='details'>
                <div v-for='item in data_dictionary'>
                    <div class="tag">{{item.pathDesc}}</div>
                    <div class='rightContent'>
                        <template v-if='item.value.values[0]' v-for='obj in item.value.values'>
                            <checkbox direction='left' top='2px'  labelSize='12px' :text='obj.desc'  disabled='disabled' :checked='obj.isChoose' ></checkbox>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class='system_default_parameter_settings'>
            <article @click='downDetails($event)'>系统缺省参数设置</article>
            <div class="btn-group edit"  @click='changeModalData("default_parameter_settings")'>
                <a  data-toggle='modal' data-target='#parameterSetting_modal' ></a>
            </div>
            <div class="details">
                <div v-for='item in default_parameter_settings'>
                    <div class="tag">{{item.pathDesc}}</div>
                    <div class='rightContent'>
                        <template v-if='item.value.type != "radio_options"'>
                            <template v-if='item.value.values[0].code' v-for='obj in item.value.values'>
                                <checkbox direction='left' top='2px' labelSize='12px' :text='obj.desc' disabled='disabled' :checked='obj.isChoose'  ></checkbox>
                            </template>
                        </template>
                        <template v-else>
                            <template v-if='item.value.values[0].code' v-for='obj in item.value.values'>
                                <radio :text='obj.desc' disabled='disabled' top='1px'  :checked='obj.isChoose'  ></radio>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        
        <div class='business_logic_parameter'>
            <article @click='downDetails($event)'>业务逻辑参数设置</article>
            <div class="btn-group edit"  @click='changeModalData("business_logic_parameter_setting")'>
                <a  data-toggle='modal' data-target='#parameterSetting_modal' ></a>
            </div>
            <div class="details"> 
                <div v-for='item in business_logic_parameter_setting'>
                    <div class="tag">{{item.pathDesc}}</div>
                    <div class='rightContent'>
                        <template v-if='item.value.type == "radio_options"'>
                            <!-- radio -->
                            <template v-if='item.value.values[0].code && item.value.values' v-for='obj in item.value.values'>
                                <radio :text='obj.desc' disabled='disabled' top='1px'  :checked='obj.isChoose'  ></radio>
                            </template>
                            <template v-if='item.value.shareObject[0].code && item.value.shareObject' v-for='obj in item.value.shareObject'>
                                <radio :text='obj.desc' disabled='disabled' top='1px'  :checked='obj.isChoose'  ></radio>
                            </template>
                            <template v-if='!item.value.values[0].code' v-for='value in item.value.values'>
                                <radio :text='value' disabled='disabled' top='1px'  :checked='obj.isChoose'  ></radio>
                            </template>
                        </template>
                        
                        <!-- text -->
                        <template v-else-if='item.value.type == "text" '>
                            <template  v-for='obj in item.value.values'>
                                <span>{{obj.code}} {{obj.desc}}</span>
                            </template>
<!--                             <template v-if='!item.value.values[0].code' v-for='value in item.value.values'>
                                <span style='color:rgb(102, 102, 102)'>{{value}}</span>
                            </template> -->
                        </template>

                        <!-- checkbox -->
                        <template v-else>
                            <!-- 特殊处理 order/driver_report -->
                            <template  v-if='item.path == "/order/driver_report" ' v-for='obj in item.value.values'>
                                <div style="width:100%;">
                                    <checkbox direction='left' top='2px' labelSize='12px' :text='obj.desc' disabled='disabled' :checked='obj.isChoose'  ></checkbox>
                                    <span style="margin:5px 10px 0 -20px;min-width:20px;display:inline-block;">{{obj.minCondition}}</span>
                                    <span style='color:rgb(102, 102, 102);font-size:12px; margin-top:5px;'>{{obj.value}} {{obj.unit}}</span>
                                </div>
                            </template>

                            <!-- 正常处理 -->
                            <template v-if='item.path != "/order/driver_report" && item.value.values[0].code' v-for='obj in item.value.values'>
                                <checkbox direction='left' top='2px' labelSize='12px' :text='obj.desc' disabled='disabled' :checked='obj.isChoose'  ></checkbox>
                            </template>
                            <template v-if='!item.value.values[0].code' v-for='value in item.value.values'>
                                <checkbox direction='left' top='2px' labelSize='12px' :text='value' disabled='disabled' :checked='obj.isChoose' ></checkbox>
                            </template>
                        </template>

                    </div>
                </div>
            </div>
        </div>
    
        <div class='expense_type'>
            <article @click='downDetails($event)'>费用报数类型</article>
            <div class="btn-group pull-right" style='cursor:pointer'>
                <a  data-toggle='modal' data-target='#expense_type_add' >添加</a>
            </div>
            <div class="details" style='padding:10px 100px;'>
                <table>
                    <thead> 
                        <tr>
                            <th>名称</th>
                            <th>需要技师报数</th>
                            <th>结算方式</th>
                            <th>行程分段类型</th>
                            <th>付款对象</th>
                            <th>是否必填</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='item in expense_type'>
                            <td>{{item.feeName}}</td>
                            <td>{{item.needDriverReport ? "需要" : "不需要"}}</td>
                            <td>{{item.settleMethod}}</td>
                            <td>{{item.driveRoute == 'AB' ? '去程' : '返程'}}</td>
                            <td>{{item.payTarget == 'COMPANY' ? '公司' : '客户'}}</td>
                            <td>{{item.needFull  ? '是' : '否'}}</td>
                            <td>
                                <button class="btn" style='padding:2px 10px;font-size:12px;background:#c12d17;color:#fff;' @click='deleteExpenseType(item.feeTypeCfgId)'>删除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if='expense_type.length == 0' >
                    <p style='text-align: center; width:100%;'>暂无费用报数类型</p>
                </div>
            </div>
        </div>

        <parameter-setting :modalData='modalData'  @changeKey='changeKey' @updataModal='updataModal' @modifyData='modifyData' @esc='reply'></parameter-setting>
        <expenseTypeAdd @updataExpenseType='updataExpenseType'></expenseTypeAdd>
    </div>
</template>

<script>
    import checkbox from '../../../../../common_component/checkbox.vue'
    import radio from '../../../../../common_component/radio.vue'

    import expenseTypeAdd from '../modal/expense_type_add.vue'
    import parameterSetting from '../modal/parameterSetting.vue'
    export default {
        data(){
            return {
                checked: true,
                modalData:{
                    data: {
                        query_option: {}
                    },
                    key: null,
                    isShow: false
                },
                expense_type: [],
                order_list_settings: {
                    query_option: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    show_option: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    // result_list_columns_order: {
                    //     pathDesc: '',
                    //     value: {
                    //         values: []
                    //     }
                    // },
                },
                // 数据字典
                data_dictionary: {
                    customer_types: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    source_types: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    book_methods: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    operation_type: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    settle_method: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    order_message: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    }
                },
                // 业务逻辑参数设置
                business_logic_parameter_setting: {
                    display_price:{
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    order_approve: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    squeeze_order: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    grab_order: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    dispatch_my_company:{
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    auto_share: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    timeout: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    choosed_first: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    binding_car: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    predict_arrive_time: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    service_provider: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    recording: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    timeout_revert: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    app_photo: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    timeout_interval: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    completion_feedback: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    // 语音催单时间间隔
                    voiceReminderInterval: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    // 语言催单控制设置
                    voiceReminderControl: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    // 技师完工是否要填备注信息
                    jobComment: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    // 技师完工是否要填返程里程数
                    back_mileage: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },

                    // ········································分割线，下面的不统一请求
                    condition: {
                        pathDesc: '',
                        value: {
                            default: '',
                            shareDistanceScope: 0,
                            shareInsurancesRequired: [],
                            shareObject: []
                        }
                    },
                    share_range: {
                        pathDesc: '',
                        value: {
                            default: '',
                            shareDistanceScope: 0,
                            shareInsurancesRequired: [],
                            shareObject: []
                        }
                    },
                    
                    insurance_requirements: {
                        pathDesc: '',
                        value: {
                            default: '',
                            shareDistanceScope: 0,
                            shareInsurancesRequired: [],
                            shareObject: []
                        }
                    },
                    
                    // request_approval_on_share_orders: {
                    //     pathDesc: '',
                    //     value: {
                    //         values: []
                    //     }
                    // },
                    // who_approve_on_share_orders: {
                    //     pathDesc: '',
                    //     value: {
                    //         values: []
                    //     }
                    // },
                },
                
                // 系统缺省参数设置
                default_parameter_settings:{
                    dispatch_default_search_scope: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    serial_number: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    }
                },

                insurance_requirements: []        
            }
        },
        created(){
            let timer = null;
            const _this = this;
            updata();
            
            function updata(){
                // 费用报数类型
                _this.updataExpenseType();


                // 获取保险要求
                send({
                    url: 'client:/insurance/product',
                    type: 'get'
                }, function(err, res){
                    if(res.status == 200){
                        _this.insurance_requirements = res.content.map( (obj, index) => {
                            return {
                                code: obj.insuranceProductCode,
                                desc: obj.name
                            }
                        });
                        _this.updata();

                    }
                });
            }
        },
        methods: {
            updata(){
                const _this = this;

                _this.modalData = {
                    data: {
                        query_option: {}
                    },
                    key: null,
                    isShow: false
                };

                // 业务逻辑参数设置
                _this.business_logic_parameter_setting = {
                    display_price:{
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    order_approve: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    squeeze_order: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    grab_order: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    dispatch_my_company:{
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    auto_share: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    timeout: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    choosed_first: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    binding_car: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    predict_arrive_time: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    service_provider: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    recording: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    timeout_revert: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    app_photo: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    timeout_interval: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    completion_feedback: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    // 语音催单时间间隔
                    voiceReminderInterval: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    // 语言催单控制设置
                    voiceReminderControl: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    // 技师完工是否要填备注信息
                    jobComment: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    // 技师完工是否要填返程里程数
                    back_mileage: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },

                    // ········································分割线，下面的不统一请求
                    condition: {
                        pathDesc: '',
                        value: {
                            default: '',
                            shareDistanceScope: 0,
                            shareInsurancesRequired: [],
                            shareObject: []
                        }
                    },
                    share_range: {
                        pathDesc: '',
                        value: {
                            default: '',
                            shareDistanceScope: 0,
                            shareInsurancesRequired: [],
                            shareObject: []
                        }
                    },
                    
                    insurance_requirements: {
                        pathDesc: '',
                        value: {
                            default: '',
                            shareDistanceScope: 0,
                            shareInsurancesRequired: [],
                            shareObject: []
                        }
                    },
                    
                    // request_approval_on_share_orders: {
                    //     pathDesc: '',
                    //     value: {
                    //         values: []
                    //     }
                    // },
                    // who_approve_on_share_orders: {
                    //     pathDesc: '',
                    //     value: {
                    //         values: []
                    //     }
                    // },
                };
                _this.default_parameter_settings = {
                    dispatch_default_search_scope: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    },
                    serial_number: {
                        pathDesc: '',
                        value: {
                            values: []
                        }
                    }
                };

                /*
                 * 订单列表设置:
                 * 1. 订单查询选项
                 * 2. 订单查询显示结果字段
                 */   
                const order_list_settings_array = ['/order/order_query_option', '/order/order_show_option'];
                _this.mainOrgSystemSend( order_list_settings_array, function(content){
                    Object.keys(_this.order_list_settings).forEach( (key, index) => {
                        
                        _this.order_list_settings[key] = content[index];
                    });
                });

                // 订单查询  列表  显示顺序
                // _this.mainOrgSystemSend('/order/browsing/result_list_columns_order', function(content){
                //     _this.order_list_settings.result_list_columns_order = content.orgParam;
                // }, 'available_columns');


                /*
                 * 数据字典:
                 * 1.客户类型设置 '/customer/customer_types'
                 * 2.订单来源设置 '/order/book/source_types'
                 * 3.下单渠道设置 '/order/book/book_methods'
                 * 4.指派操作设置 '/order/operation_type'
                 * 5.结算方式     '/order/settle_method'
                 * 6.订单短信     '/order/message'
                 * 7.拍照水印标记 '/photo/watermark/mark'
                 */
                const data_dictionary_array = ["/customer/customer_types", "/order/book/source_types", "/order/book/book_methods", "/order/operation_type"
                                            , "/order/settle_method", "/order/message", "/photo/watermark/mark"]
                _this.mainOrgSystemSend(data_dictionary_array, function(content){
                    console.log(content)
                    Object.keys(_this.data_dictionary).forEach( (key, index) => {
                        _this.data_dictionary[key] = content[index];
                    });
                });
                
                /*
                 * 业务逻辑参数设置:
                 * 1.订单价格是否显示给司机                "/towing/display_price"
                 * 2.下单是否需要审核                      "/order/order_approve"
                 * 3.技师是否压单                         "/order/squeeze_order"
                 * 4.技师抢单是否需要审核                   "/order/grab_order"
                 * 5.派遣自有车辆时，派遣搜索方式设置       "/order/dispatch_method/my_company"
                 * 6.订单是否自动分享到平台               "/order/auto_share"
                 * 7.分享时间                           "/order/share/timeout"
                 * 8.分享订单后是否默认选中第一接单人      "/order/share/choosed_first"
                 * 9.配车方式                             "/app/binding_car"
                 * 1.预计里程计算规则                      "/order/predict_arrive_time"
                 * 12.派遣服务商时，派单搜索方式设置         "/order/dispatch_method/service_provider"
                 * 13.录音方式                             "/app/recording"
                 * 14.订单超时未接是否自动恢复成未派        "/order/timeout_revert"
                 * 15.照片是否允许从相册中选取               "/app/photo"
                 * 16.订单接受超时时间(默认)              "/order/timeout_interval"
                 * 17.技师完工是否需要输入实际地址          "/order/driver_report"
                 * 18.语音催单时间间隔                  "/voice/reminder/interval"
                 * 19.语音催单控制设置                  "/voice/reminder/control"
                 * 20.技师完工是否要填备注信息              "/order/jobComment"
                 * 21.技师完工是否要填返程里程数           "/order/back_mileage"
                 */
                const business_logic_parameter_setting_array = [
                    "/towing/display_price", "/order/order_approve", "/order/squeeze_order", "/order/grab_order",
                    "/order/dispatch_method/my_company", "/order/auto_share", "/order/share/timeout", 
                    "/order/share/choosed_first", "/app/binding_car", "/order/predict_arrive_time",
                    "/order/dispatch_method/service_provider", "/app/recording", "/order/timeout_revert",
                    "/app/photo", "/order/timeout_interval", "/order/driver_report", "/voice/reminder/interval",
                     "/voice/reminder/control", "/order/jobComment", "/order/back_mileage"
                ];
                _this.mainOrgSystemSend(business_logic_parameter_setting_array, function(content){
                    Object.keys(_this.business_logic_parameter_setting).forEach( (key, index) => {
                        if( index >= content.length) return;
                        _this.business_logic_parameter_setting[key] = content[index];
                    });
                });
                // 订单自动分享的默认条件
                _this.mainOrgSystemSend('/order/auto_share/condition', function(content){
                    console.log(content);
                    _this.business_logic_parameter_setting.condition = content;
                }, 'shareObject');

                // 分享范围
                _this.mainOrgSystemSend('/order/auto_share/condition', function(content){
                    _this.business_logic_parameter_setting.share_range = content;
                }, 'shareDistanceScope');

                // 保险要求
                _this.mainOrgSystemSend('/order/auto_share/condition', function(content){
                    _this.business_logic_parameter_setting.insurance_requirements = content;
                }, 'shareInsurancesRequired');



                // 平台接单是否需要审核
                // _this.mainOrgSystemSend('/order/request_approval_on_share_orders', function(content){
                //     _this.business_logic_parameter_setting.request_approval_on_share_orders = content;
                // });


                // 审核人按角色设置
                // _this.mainOrgSystemSend('/order/who_approve_on_share_orders', function(content){
                //     _this.business_logic_parameter_setting.who_approve_on_share_orders = content;
                // });

                /*
                 * 系统缺省参数设置
                 * 1.派车缺省查找范围       "/dispatch/dispatch_default_search_scope"
                 * 2.流水号设置             "/sys/sys_coding_permission"
                 */ 

                const default_parameter_settings_array = [
                    "/dispatch/dispatch_default_search_scope", "/sys/sys_coding_permission"
                ]
                _this.mainOrgSystemSend(default_parameter_settings_array, function(content){
                    Object.keys(_this.default_parameter_settings).forEach( (key, index) => {
                        _this.default_parameter_settings[key] = content[index];
                    });
                });

            },
            updataExpenseType(obj){
                const _this = this;
                send({
                    url: 'control:/fee/type/org',
                    type: 'get'
                }, function(err, res){
                    let content = res.content;
                    content.forEach( (obj, index) => {
                        let settleMethod = obj.settleMethod.map( (value, index) => {
                            switch(value){
                                case 'CASH': return '现金'; break;
                                case 'SIGN': return '签单'; break ; 
                                case 'HELPBUY': return '代付'; break ; 
                                default :return ''; break;
                            }
                        });
                        obj.settleMethod = settleMethod.join('、');
                    });
                    _this.expense_type = res.content;
                })
            },
            deleteExpenseType(id){
                const _this = this;

                confirm('确定删除吗？', function(){
                    send({
                        url: 'control:/fee/type/org/' + id,
                        type: 'delete'
                    }, function(err, res){
                        console.log(err, res);
                        if(res.status == 200){
                            alert('删除成功！', 'success')
                            _this.updataExpenseType();
                        }else{
                            alert('删除失败！请联系管理员!');
                        }
                    });
                }, true);
            },
            downDetails(event){
                const target = event.target;
                const nextSibling = $(target).siblings('.details')
                $(target).toggleClass('parameterSettingUp');
                $(nextSibling).toggle('fast');
            },
            changeModalData(param){
                const _this = this;
                this.modalData.data = this[param];
                

                this.modalData.key = Object.keys(this[param])[0];
                this.modalData.isShow = true;
                this.modalData.param = param;
                this.modalData.oldData = JSON.parse( JSON.stringify(this.modalData) );
                console.log(this.modalData)
            },
            changeKey(key){
                this.modalData.key = key;
                console.log(this.modalData);
            },
            // 本地更新
            updataModal(value, index){

                if(this.modalData.data[this.modalData.key].value.type == 'radio_options'){
                    // radio
                    let arr = [],
                        choenObj = {};
                    if(this.modalData.data[this.modalData.key].value.shareObject){
                        arr = this.modalData.data[this.modalData.key].value.shareObject;
                    }else{
                        arr = this.modalData.data[this.modalData.key].value.values;
                    }

                    choenObj = arr[index];
                    arr.forEach( (obj, index) => {
                        if(obj.code != choenObj.code){
                            obj.isChoose = false;
                        }else{
                            obj.isChoose = true;
                        }
                    });
                }else if(this.modalData.data[this.modalData.key].value.type == 'text'){
                    // text
                    this.modalData.data[this.modalData.key].value.values[index].code = value;
                }else{
                    
                    let obj = this.modalData.data[this.modalData.key].value.values[index];
                    /**
                     * 特殊情况
                     * completion_feedback
                     */

                    if(this.modalData.data.completion_feedback){
                        if(typeof value == 'boolean'){
                             obj.isChoose = value;
                        }else if(value == '>' || value == '>=' || value == '<' || value == '<='){
                            obj.minCondition = value;    
                        }else{
                             obj.value = value;
                        }
                        return;
                    }else{
                        obj.isChoose = value;
                    }
                    this.modalData.data[this.modalData.key].value.values.splice(index, 1, obj); 
                }
                console.log(this.modalData.data[this.modalData.key])
                
            },
            // 恢复
            reply(){
                const param = this.modalData.oldData.param;
                this.$set(this, param, this.modalData.oldData.data );
            },
            // 提交修改
            modifyData(){
                const _this = this;
                const maxLength = Object.keys(_this.modalData.data).length;
                let length = 0;
                console.log(_this.modalData.data)
                for(let key in _this.modalData.data){
                    // 特殊情况处理
                    let newObj = null;
                    console.log(key);
                    if(key == 'order_message'){
                        newObj = _this.modalData.data[key];
                        let checked = [];
                        newObj.value.values.forEach( (obj, index) => {
                            if(obj.isChoose){
                                checked.push(obj.code)
                            }
                            delete obj.isChoose
                        });

                        console.warn(checked)

                        newObj.value.checked = checked;
                    }else if(key == 'timeout_interval' || key == 'timeout' || key == 'voiceReminderInterval'){
                        newObj = _this.modalData.data[key];
                        console.warn(JSON.parse(JSON.stringify(newObj)));
                        if(!newObj.value.values[0].code) newObj.value.values[0].code = 0;
                    }else if(key == 'condition' || key == 'share_range' || key == 'insurance_requirements'){
                        // 订单自动分享的默认条件
                        newObj = JSON.parse( JSON.stringify(_this.modalData.data[key]) );

                        if(key == 'condition'){
                            let arr = [];
                            

                            newObj.value.shareObject.forEach( (obj, index) => {
                                if(obj.isChoose){
                                    delete obj.isChoose
                                }else{
                                    arr.push(index);
                                }
                            });
                            let i = 0;
                            arr.forEach( (value, index) =>{
                                newObj.value.shareObject.splice(value - i, 1);
                                i++;
                            });
                            length++;
                            _this.modalData.data.send_condition = newObj;
                            continue;   
                        }else if(key == 'share_range'){
                            // 分享范围 
                            newObj.pathDesc = '订单自动分享的默认条件';
                            console.warn(_this.modalData.data);

                            length++;
                            newObj.value.shareDistanceScope = newObj.value.values[0].code;
                            
                            _this.modalData.data.send_shareDistanceScope = newObj;

                            console.warn(newObj)
                            continue;
                            

                        }else if(key == 'insurance_requirements'){
                            // 保险要求
                            newObj.pathDesc = '订单自动分享的默认条件';
                            let arr;
                            if(newObj.value.values){
                                arr = newObj.value.values.filter( (obj, index) => {
                                    return obj.isChoose;
                                });
                            }
                        
                            newObj.value.shareInsurancesRequired = arr.map( (obj, index) => {
                                return {
                                    code: obj.code,
                                    desc: obj.desc
                                }
                            }) ;
                            newObj.value.shareObject = _this.modalData.data.send_condition.value.shareObject;
                            newObj.value.shareDistanceScope = _this.modalData.data.send_shareDistanceScope.value.shareDistanceScope;
                            newObj.value.type = 'text';
                            delete newObj.value.values;
                            delete newObj.value.default;
                            console.log(newObj);
                        }
                        
                    }else{
                        // 大部分情况的处理
                        const param = key !== 'result_list_columns_order' ? 'values' : 'available_columns';

                        newObj = _this.modalData.data[key];
                        if(key !== 'result_list_columns_order'){
                            newObj = JSON.parse( JSON.stringify(_this.modalData.data[key]) );
                            let arr = [];
                            delete newObj.value.default;
                            console.warn(newObj.value, JSON.parse(JSON.stringify(newObj.value[param])));
                            newObj.value[param].forEach( (obj, index) => {
                                if(obj.isChoose){
                                    
                                    if(key !== 'source_types'){
                                        delete obj.isChoose
                                    }else{
                                        newObj.value[param][index] = obj.desc
                                    }
                                    
                                }else{
                                    arr.push(index);
                                }
                            });
                            let i = 0;
                            arr.forEach( (value, index) =>{
                                newObj.value[param].splice(value - i, 1);
                                i++;
                            });
                        }
                        console.log(newObj);
                    }

                    
                    console.warn(JSON.parse(JSON.stringify(newObj)));
                    modifySend(newObj, function(err, res){
                        if(res.status == 200){
                            length++;
                            console.log(length, maxLength);
                            if(length == maxLength){
                                _this.updata();
                                alert(res.msg, 'success');
                            }
                        }else{
                            alert(res.msg);
                            console.warn(newObj, key, res);
                            return false;
                            // if(length == maxLength) alert('部分参数修改失败');
                        }
                    });
                }
            },


            // 获取
            mainOrgSystemSend(path, callback, param){
                const _this = this;
                param = param || 'values';
                orgSend(path, function(err, res){
                    if(res.content.length != 0 ){
                        
                        const resultArr = res.content.map( (content, content_index) => {
                            // 特殊情况处理  "/order/message" , "/order/driver_report"
                            const path = content.path;
                            if( path == "/order/message"){
                                let content_system = content, values_system = content_system.value[param];
                                let content_org = content.orgParam, values_org = content_org.value[param];

                                const checked = content_org.value['checked'];
                                values_system.forEach( (obj_system, index_system) => {
                                    let boolean = checked.some( (check_value, check_index) => {
                                        if(check_value == obj_system.code){
                                            values_system[index_system] = {
                                                desc: obj_system.desc,
                                                code: obj_system.code,
                                                isChoose: true
                                            }
                                            return true;
                                        }
                                    });
                                    if(!boolean){
                                        values_system[index_system] = {
                                            desc: obj_system.desc,
                                            code: obj_system.code,
                                            isChoose: false
                                        }
                                    }
                                })

                                return content_system;
                            }else if( path == "/order/timeout_interval" || path == '/order/share/timeout' || path == '/voice/reminder/interval' ){
                                // input (text)
                                if(!content.orgParam.value.values || !content.orgParam.value.values.length){
                                    return content;
                                }else{
                                    return content.orgParam
                                }
                                
                            }else if(path == '/order/auto_share/condition'){
                                // "订单自动分享的默认条件"
                                let content_system = content, values_system = content_system.value[param];
                                let content_org = content.orgParam, values_org = content_org.value[param];
                                if(param == 'shareObject'){
                                    content_org.value.type = content_system.value.type = 'radio_options';
                                    resolve(content_system, values_system, content_org, values_org);
                                    return content_system;
                                }else if(param == 'shareDistanceScope'){
                                    // 分享范围
                                    content_org.pathDesc = '分享范围'
                                    content_org.value.type = content_system.value.type = 'text';
                                    content_org.value.values = [{
                                        code: content_org.value.shareDistanceScope,
                                        desc: '千米'
                                    }]
                                    return content_org;
                                }else if(param == 'shareInsurancesRequired'){
                                    // 保险要求
                                    content_org.pathDesc = '保险要求' ;
                                    content_org.value.type = 'checkbox_list';

                                    content_org.value.shareInsurancesRequired.some( (obj_org, index_org) => {
                                        _this.insurance_requirements.forEach( (obj_ins, index_ins) => {
                                            if(obj_ins.code == obj_org.code){
                                                _this.insurance_requirements[index_ins].isChoose = true
                                            }
                                        });
                                    });
                                    content_org.value.values = _this.insurance_requirements;
                                    return content_org;
                                }
                                return ;
                            }else if(path == '/order/driver_report'){
                                let content_system = content, values_system = content_system.value[param];
                                let content_org = content.orgParam, values_org = content_org.value[param];

                                values_system.forEach( (obj_system, index_system) => {
                                    values_org.some( (obj_org, index_org) => {
                                        if(obj_org.code == obj_system.code){
                                            values_system[index_system] = {
                                                desc: obj_system.desc,
                                                code: obj_system.code,
                                                unit: obj_org.unit,
                                                value: obj_org.value,
                                                minCondition: obj_org.minCondition,
                                                isChoose: content_org.value.default ? false : true
                                            }
                                            return true;
                                        }

                                    })
                                });
                                return content_system;
                            }

                            // 正常情况
                            let content_system = content, values_system = content_system.value[param];
                            let content_org = content.orgParam, values_org = content_org.value[param];
                            if(param == 'available_columns'){
                                callback(content_system);
                                return;
                            }
                            
                            resolve(content_system, values_system, content_org, values_org);

                            return content_system
                        });

                        function resolve(content_system, values_system, content_org, values_org){
                            if(content_org.value.default){
                                let orgDefault = content_org.value.default;   // 参数默认,   value 或者 arr

                                if(Object.prototype.toString.call(orgDefault) != '[object Array]'){
                                    orgDefault = [orgDefault];
                                }
                                values_system.forEach( (obj_system, index_system) => {
                                    const bool = orgDefault.some( (value, index) => {
                                        if(JSON.stringify(value) == JSON.stringify(obj_system)){
                                            return true;
                                        }
                                    });

                                    if(  bool || orgDefault.indexOf(obj_system.code) != -1 || (orgDefault == "yes" && obj_system.code == 'true' ) ){

                                        values_system[index_system] = {
                                            desc: obj_system.desc,
                                            code: obj_system.code,
                                            isChoose: true
                                        }
                                    }else{
                                        values_system[index_system] = {
                                            desc: obj_system.desc,
                                            code: obj_system.code,
                                            isChoose: false
                                        }
                                    }
                                });
                            }else{
                                values_system.forEach( (obj_system, index_system) => {
                                    const bool = values_org.some( (obj_org, index_org) => {
                                        if(Object.prototype.toString.call(obj_system) != '[object String]' ){
                                            if(isSame(obj_org, obj_system)){
                                                values_system[index_system] = {
                                                    desc: obj_system.desc,
                                                    code: obj_system.code,
                                                    isChoose: true
                                                }
                                                return true;
                                            }
                                        }else{   //  字符串
                                            if(isSame(obj_org, obj_system)){
                                                values_system[index_system] = {
                                                    desc: obj_system,
                                                    isChoose: true
                                                }
                                                return true;
                                            }else{
                                                values_system[index_system] = {
                                                    desc: obj_system,
                                                    isChoose: false
                                                }
                                            }
                                        }
                                    })
                                    // if(!bool && Object.prototype.toString.call(obj_system) == '[object String]' ){
                                    //     values_system[index_system] = {
                                    //         desc: obj_system,
                                    //         isChoose: false
                                    //     }
                                    // }
                                });
                            }
                        }
                        callback(resultArr.length == 1 ? resultArr[0] : resultArr);
                    }else{
                        callback(res);
                    }
                });
            }
        },
        components:{
            checkbox,
            radio,
            parameterSetting,
            expenseTypeAdd
        }
    }
    // 获取数据 显示

    function orgSend(pathArr, callback){
        send({
            url: 'control:/sys/param/org',
            type: 'post',
            param: Object.prototype.toString.call(pathArr) == "[object Array]" ? pathArr : [pathArr]
        }, callback)
    }
    function isSame(obj_1, obj_2){
        if( Object.prototype.toString.call(obj_1) != '[object String]' ){
            return JSON.stringify(obj_1) === JSON.stringify(obj_2) ? true : false;
        }else{
            return obj_1 == obj_2 ? true : false;
        }
    }
    function modifySend(obj, callback){
        send({
            url: 'control:/sys/param',
            type: 'put',
            param: obj
        }, callback);
    }
</script>

<style>
    .parameter_setting{
        margin-top:-20px;
        margin-left: 20px;
    }
    .parameter_setting .edit{
        float:right;
    }
    .parameter_setting .business_logic_parameter .my_radio,
    .parameter_setting .system_default_parameter_settings .my_radio{
        margin-top:-3px;
    }
    .parameter_setting .business_logic_parameter .my_radio label,
    .parameter_setting .system_default_parameter_settings .my_radio label{
        font-size:12px;
    }
    .parameter_setting .my_checkbox label{
        min-width:70px;
    } 
    .parameter_setting .my_checkbox input[disabled]{
        cursor: default;
    }
    .parameter_setting .tip{
        color:#FF6B0E;
        font-size:12px;
    }
    .parameter_setting .edit > a{
        display:inline-block;
        width:18px;
        height:13px;    
        background:url('../../../../../assets/img.png') no-repeat 0 -146px;
        margin-top:10px;
        cursor: pointer;
    }
    .parameter_setting > div{
        margin:50px 0;
    }
    .parameter_setting > div:first-child{
        margin: 0;
    }
    .parameter_setting > div.order_list_settings{
        clear:both;
        margin:0;
        margin-top: 60px;
    }
    .parameter_setting  article{
        color:#333;
        font-size:14px;
        float:none;
        margin:0;
        margin-bottom:10px;
        cursor:pointer;
        display: inline-block;
    }
    .parameter_setting  article:after{
        content:'';
        display:inline-block;
        width:8px !important;
        height:6px;
        margin-left:10px;
        top:0;
        left:0px;

        background:url('../../../../../assets/img.png') no-repeat 0 -45px;
    }
    .parameter_setting  article.parameterSettingUp:after{
        background:url('../../../../../assets/img.png') no-repeat 0 -27px;
    }
    .parameter_setting  .details{
        padding:10px 0;
        border-top:1px solid #999;
        border-bottom:1px solid #999;
        display:none;
    }
    .parameter_setting  .details > div{
        display:flex;
        margin:15px 0;
    }
    .parameter_setting  .details > div > .tag{
        width:140px;
        font-size:12px;
        margin-right: 20px;
        text-align: right;
        line-height: 20px;
    }
    .parameter_setting  .details > div > .rightContent{
        flex:1;
        display:flex;
        flex-flow:row wrap;
        border-bottom:1px solid #E0E0E0;
        margin-top:-2px;
        justify-content: flex-start;
    }
    .parameter_setting  .details > div:last-child > .rightContent{
        border:none;
    }
    .parameter_setting  .details > div > .rightContent  .my_checkbox{
        margin-right:20px;
    }
    .parameter_setting  table{
        width:100%;
        border-collapse:separate;
        border-spacing:0px 4px;
    }
    .parameter_setting  table th{
        border-top:1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding:5px 10px;
        height:24px;
        font-size:12px;
    }
    .parameter_setting  table th:first-child{
        border-left:1px solid #ccc;
    }
    .parameter_setting  table th:last-child{
        border-right:1px solid #ccc;
    }
    .parameter_setting  table thead tr{
        height:24px;
    }
    .parameter_setting  table th,
    .parameter_setting  table td{
        width:109px;
    }
    .parameter_setting  table tbody tr{
        background: #F6F6F6;
        font-size:12px;
    }
    .parameter_setting  table tbody tr td{
        padding-left:15px;
        border-top:1px solid #ccc;
        border-bottom: 1px solid #ccc;
        height:24px;
    }
    .parameter_setting  table tbody tr td:first-child{
        padding-left:7px;
        border-left:1px solid #ccc;
    }
    .parameter_setting  table tbody tr td:last-child{
        border-right:1px solid #ccc;
    }
    .parameter_setting  table tbody tr td input[type='text']:disabled{
        display:inline-block;
        padding:0px 15px 0px 0px;
        height:24px;
        background-color:transparent;
        width:90px;
    }
    .parameter_setting  table tbody tr td input[type='text']{
        background-color: #DFF5FD;
    }
</style>