<template>
    <div id='smsTemplate' >
        <template v-if='show'>
            <div class="input-append">

                <div class="pull-right">
                    <button data-toggle="modal"  data-target="#smsTemplateAdd" class='btn groupBtn' style='width: 100px' @click='chooseItem("")'>添加模板</button>
                </div>
            </div>
            <div class="input-append">
                <div class="pull-right" style="margin-right:23px">
                    <button data-toggle="modal"  data-target="#smsTemplateSetting" class='btn groupBtn' style='width: 100px'>短信信息配置</button>
                </div>
            </div>

            <div >
                <vue-table
                    style='float:left'
                    item-url="message:/sms/template"
                    :table-iteration-field="tableIterationField"
                    :linkBtn="linkBtn"
                    ref='table'
                    :isTime="false"
                    :needArr='smsTypeList'
                    :needArr_2='productIdList'
                    :filtrationCondition="false"
                    @updataChosen='updataChosen'
                    />
            </div>


        </template>
        <smsTemplateSetting 
            @updateSetting='updateSetting' 
            @collectSetting='collectSetting' 
            :setting='setting'
            ></smsTemplateSetting>
        <smsTemplateAdd :templateId='templateId' @updateSmsTemplate='updateSmsTemplate' ></smsTemplateAdd>
    </div>
</template>

<script>    
    import smsTemplateSetting from '../modal/smsTemplateSetting.vue'
    import smsTemplateAdd from '../modal/smsTemplateAdd.vue'
    import btnSelect from '../../../../../common_component/btn_select.vue'
    import vueTable from '../../../../../common_component/vue-table.vue'

    export default{
        data(){
            return {
                show: false,
                smsTypeList: [],
                productIdList: [],
                setting: {
                    username: '',
                    password: '',
                    sign: ''
                },
                temps:[],
                res:{},
                templateId: '',


                tableIterationField:[
                    {
                        tr:'模板类型',
                        field:'smsType',
                        filter: 'needArr',
                        filterName: 'sms_type',
                        needName: 'desc'
                    },
                    {
                        tr:'产品类型',
                        field:'productId',
                        filter: 'needArr_2',
                        filterName: 'code',
                        needName: 'desc'
                    },
                    {
                        tr:'模板内容',
                        field:'templateContent',
                        filter:'tooltip'
                    }
                ],
                linkBtn:[
                    {
                        text:'查看模板',
                        fn:function(self, key, value, item_index,item){
                            self.$emit('updataChosen', item)
                            $('#smsTemplateAdd').modal('show');
                        }
                    }
                ]
            }
        },
        mounted(){
            const _this = this;
            _this.updateSetting();
            send({
                url: 'control:/sys/param',
                type: 'post',
                param: ["/sms/template/screen/param"]
            }, function(err, res){
                console.log(res);
                if(res.status == 200){
                    _this.smsTypeList = res.content[0].value.values;
                }
            });

            send({
                url: 'control:/sys/param',
                type: 'post',
                param: ["/sms/product/list"]
            }, function(err, res){

                if(res.status == 200){
                    _this.productIdList = res.content[0].value.values;
                }
            })
        },
        methods: {
            updataChosen(item){
                this.templateId = item.templateId;
            },
            collectSetting(name, item){
                this.setting[name] = item;
            },
            updateSetting(){
                const _this = this;
                send({
                    url: 'message:/sms',
                    type: 'get'
                }, function(err, res){
                    console.log(res);
                    if(res.status !== 200){
                        console.warn(_this.setting)
                        $('#smsTemplateSetting').modal('show');

                    }else{
                        _this.show = true;
                        const content = res.content[0];
                        _this.setting.username = content.username;
                        _this.setting.sign = content.sign;
                        _this.setting.password = content.password;
                    }
                });
            },
            updateSmsTemplate(){
                this.$refs.table.watchDataForm();
            },
            chooseItem(id){
                this.templateId = id;
            }
        },
        components:{
            btnSelect,
            vueTable,
            smsTemplateSetting,
            smsTemplateAdd
        },
    }
    
</script>

<style >
    #smsTemplate .groupBtn{
        width:60px;
    }
    #smsTemplate table td button{
        width: 70px;
    }
</style>