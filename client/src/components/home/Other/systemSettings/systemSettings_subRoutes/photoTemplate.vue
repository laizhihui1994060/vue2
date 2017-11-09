<template>
    <div id='phone_bill'>
        <div class="input-append">
            <div class="pull-right">
                <router-link :to = "{ name: 'photoTemplate_add', params: { id: 0, isCreate: true  } } "  tag='button' type="button" class="btn groupBtn pull-right" style='width: 2rem' >
                    添加模板
                </router-link>

            </div>
        </div>
        <vue-table
            style='float:left'
            item-url="control:/photo_template/org"
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            ref='table'
            :isTime='false'
            :filtrationCondition="false"
            />
    </div>
</template>

<script>

    import btnSelect from '../../../../../common_component/btn_select.vue'
    import vueTable from '../../../../../common_component/vue-table.vue'
    export default{
        data(){
            return {
                temps:[],
                res:{},


                tableIterationField:[
                    {
                        tr:'名称',
                        field:'templateName',
                        link: {
                             text:'查看',
                             link_name:'photoTemplate_add',   //路由名字
                             link_key:"id",
                             link_Field:'templateId',
                             isCreate:false,
                             model:false,
                         }
                    },
                    {
                        tr:'业务类型',
                        field:'jobTypeName',
                    },
                    {
                        tr:'是否系统缺省',
                        field:'standard',
                        filter: 'whether'
                    },
                    {
                        tr:'说明',
                        field:'templateDesc',
                    },
                    {
                        tr:'修改时间',
                        field:'created',
                        filter: 'date'
                    },
                    {
                        tr:'修改人',
                        field:'createdByName',
                    },
                    {
                        tr:'状态',
                        field:'active',
                        filter: 'status'
                    }
                ],
                linkBtn:[
                    {
                        text:'启用',
                        link_if: [['active', false]],
                        fn:function(self, key, value, item_index,item){
                            send({
                                type:'post',
                                url:'control:/photo_template/'+ item.templateId,
                            },function(err,res){
                                if(err)return console.log(err);
                                if(res.status == 200){
                                    console.log(res);
                                    self.watchDataForm();
                                    alert('启用成功！', 'success');
                                }else{
                                    console.log(res);
                                    alert(res.msg);
                                }
                            });
                        }
                    },
                    {
                        text:'停用',
                        link_if: [['active', true]],
                        fn:function(self, key, value, item_index,item){
                            send({
                                type:'delete',
                                url:'control:/photo_template/'+ item.templateId,
                            },function(err,res){
                                if(err)return console.log(err);
                                if(res.status == 200){
                                    console.log(res);
                                    self.watchDataForm();
                                    alert('停用成功！', 'success');
                                }else{
                                    console.log(res);
                                    alert(res.msg);
                                }
                            });
                        }
                    }
                ]
            }
        },
        components:{
            btnSelect,
            vueTable
        },
    }
    
</script>

<style >
    #phone_bill .groupBtn{
        width:60px;
    }
    #phone_bill table td button{
        max-width: 4rem !important;
        width: 150px;
    }
    #phone_bill .table tbody tr td audio{
        width: 24px;
        height: 24px;
        opacity: 0;
    }
    #phone_bill .btn-group .btn + .groupBtnx .caret{
        margin-top: 0
    }
    
</style>