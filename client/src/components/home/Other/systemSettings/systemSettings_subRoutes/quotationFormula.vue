<template>
    <div class='quotation_formula'>
        <div class="input-append date form_datetime">
            <div class="btn-group">
<!--                   <button class="btn search">搜索</button> -->
                  <router-link :to="{ name: 'addFormula', params: { chosen: {}, isCreate: true  } }" tag='button' type="button" class="btn groupBtn pull-right" >添加公式</router-link>
            </div>
        </div>
        <vue-table
            item-url="control:/quota/quota/list/query"
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            type='post'
            ref='table'
            :params='params'
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
                quotas:[],
                res:{},
                page:{
                    allPage: 1,
                    pageIndex: 1
                },


                params:{
                    pageSize:10,
                    pageIndex:1
                },
                tableIterationField:[
                    {
                        tr:'公式名称',
                        field:'name',
                        link: {
                             text:'查看',
                             link_name:'addFormula',   //路由名字
                             link_key:"chosen",
                             link_Field:'',
                             isCreate:false,
                             model:false,
                         }
                    },
                    {
                        tr:'报价公司',
                        field:'pricingFormulaChinese',
                        filter:'tooltip'

                    },
                    {
                        tr:'描述',
                        field:'des',
                        filter:'tooltip'
                    }
                ],
                linkBtn:[
                    {
                        text:'删除',
                        fn:function(self, key, value, item_index,item){
                            confirm('确定删除该报价公式吗？',function(){
                                send({
                                    url: 'control:/quota/quota?sysQuotationId='+ item.sysQuotationId,
                                    type: 'delete'
                                }, function(err, res){
                                    console.log(err, res);
                                    if(res.status == 200){
                                        alert(res.msg, 'success');
                                        // 刷新
                                        self.watchDataForm();
                                    }else{
                                        alert(res.msg);
                                    }
                                })
                            }, true);
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

<style>
    .quotation_formula{
        margin-top: 20px;
    }
    .quotation_formula  td button{
        max-width: 5rem !important;
        width: 70px;
    }
    .quotation_formula .table tbody td .operates .btn i{
        display:inline-block;
        border-width:6px 6px;
        border-color:transparent;
        border-top-color:#39B6E5;
        border-style:solid;
        position:relative;
        top:4px;
        left:5px;
    }
    .quotation_formula .groupBtn{
        border-width: 1px
    }
    .quotation_formula .form_datetime{
        text-align: right;
        margin: 10px 0;
    }
    .quotation_formula  .form_datetime .btn-group{
        padding-right: 0;
    }
    .quotation_formula .btn-group .btn + .groupBtnx .caret{
        margin-top: 0;
    }
</style>