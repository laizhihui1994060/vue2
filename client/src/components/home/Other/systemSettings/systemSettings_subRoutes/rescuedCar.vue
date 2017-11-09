<template>
    <div id="rescuedCar">
        <vue-table
            item-url="control:/vehicle_model/list"
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            type='post'
            ref='table'
            :params='params'
            :filter-btns='filterBtns'
            :addBtns='addBtns'
            :isExportExcel='false'
            :isQuickSearch='false'
            :isTime='false'
            :startEndCalss='startEndCalss'
            />
    </div>
</template>
<script>

import vueTable from '../../../../../common_component/vue-table.vue'

    export default {

       data(){
              return {
	   params:{
                    pageSize:10,
                    pageIndex:1
                },
                filterBtns:[
                    {
                        title: '选择车型',
                        hasAll: true,
                        name: 'category',
                        url: 'client:/helper/vehiclecat',
                        filter: 'name',
                        filterName: 'code',
                    },
                ],
                addBtns: [
                    {
                        text:'+添加被救车型',
                        link_name:'rescuedAddCarStyle',   //路由名字
                        link_key:"id",
                        link_Field:'{}',
                        vIf: !ConfigPage.isExist(['isAdmin']),
                        isCreate: true,
                    },
                ],
                tableIterationField:[
                    {
                        tr:'车型编号',
                        field:'code',
                        link: {
                             link_name:'rescuedAddCarStyle',   //路由名字
                             link_key:"id",
                             link_Field:'code',
                             isCreate:false,
                             model:false,
                         }
                    },
                    {
                        tr:'车型名称',
                        field:'name',
                    },
                    {
                        tr:'类型',
                        field:'vehicleCatName',
                    },
                    {
                        tr:'品牌',
                        field:'brandName',
                    }
                ],
                linkBtn:[
                ]
              }
        },
        components:{
            	vueTable
        }
    }
</script>

<style>



</style>