<template>
    <div class='serialNumber'>
    	<div class="pull-right" style="margin-right:20px;">
                    <button v-if="serverURL(['systemSettings','addSeriaNumber'])" type="button" class="btn groupBtn" data-toggle="modal" data-target="#serialNumber_add" @click='create'>添加流水号</button>
    	</div>
        <vue-table
            style='float:left'
           item-url="control:/serial_number"
           :table-iteration-field="tableIterationField"
           :linkBtn="linkBtn"
           ref='table'
           :addBtns='addBtns'
           :isTime='false'
           :filtrationCondition="false"
           @changeChosen='changeChosen'
           />
        <serialNumberAdd @updata='updata' @clear='clear' :information='chosen' :isCreate='isCreate' :number="num" :updataKey='updataKey'></serialNumberAdd>
    </div> 
</template>

<script>
import vueTable from '../../../../../common_component/vue-table.vue'
import btnSelect from '../../../../../common_component/btn_select.vue'
import serialNumberAdd from '../modal/serialNumber_add.vue'
    export default{
        data(){
            return {
            	   information: [],
                res:{},
                chosen: {
                	scope: ''
                },
                isCreate: false,
                updataKey: 0,
                num:0,


                tableIterationField:[
                    {
                        tr:'使用地方',
                        field:'codeName',
                        filter: 'serialNumberCodeName'
                    },
                    {
                        tr:'使用范围',
                        field:'scope',
                        filter: 'serialNumberScope'
                    },
                    {
                        tr:'编码前缀',
                        field:'prefix',

                    },
                    {
                        tr:'基准',
                        field:'yearBased',
                        filter: 'serialNumberYearBased'
                    },
                    {
                        tr:'长度',
                        field:'seedLength',
                    },
                    {
                        tr:'初始值',
                        field:'defaultSeed',
                    },
                    {
                        tr:'当前值',
                        field:'currentSeed',
                    },
                ],
                linkBtn:[
                    {
                        text:'查看',

                        link_if: [['scope', 'PLATFORM', '!=']],
                        fn(self, key, value, item_index, item){
                            self.$emit('changeChosen', item);
                            $('#serialNumber_add').modal('show');
                        }
                    },
                    { 
                        text:'删除',
                        link_if: [['scope', 'PLATFORM', '!='], ['authority', [ 'systemSettings' ,'addSeriaNumber' ] ]],
                        fn:function(self, key, value, item_index,item){

                                confirm('确定删除?', function(){
                                    send({
                                        url: 'control:/serial_number/' + item.sysCodingRuleId,
                                        type: 'delete'
                                    }, function(err, res){
                                        console.log(err, res);
                                        if(res.status == 200){
                                            self.watchDataForm();
                                            alert('删除成功!', 'success');
                                        }
                                    })
                                }, true);
                        }
                    }
                ]
            }
        },
        created(){

        },
        methods: {
            serverURL(url){
                return ConfigPage.isExist(url);
            },
        	updata(){
        		this.$refs.table.watchDataForm();
        	},
            changeChosen(item){
                	this.chosen = item;
                	this.isCreate = false;
                   this.updataKey++;
            },
            create(){
              	this.chosen = {}; 
              	this.isCreate = true;
                  $('#serialNumber .setWidth').html('');
                  $('#serialNumber_add .setWidth').text('');
                  $('#serialNumber_add input').val('');
                  ++this.num
            },
            clear(){
                this.chosen = {};
            },
            //  删除 
            del(index){
            	
            }
        },
        components:{
            btnSelect,
            vueTable,
            serialNumberAdd
        },
    }
</script>

<style>
    .serialNumber table td button{
        width: 70px;
    }
</style>