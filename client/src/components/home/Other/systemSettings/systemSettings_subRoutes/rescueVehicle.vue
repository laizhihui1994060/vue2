<template>
    <div id="rescuedCar">
        <vue-table
            item-url="control:/tow_truck_cat/list"
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
                  addBtns: [
                      {
                          text:'+添加救援车型',
                          link_name:'addCarStyle',   //路由名字
                          link_key:"id",
                          link_Field:'{}',
                          vIf: !ConfigPage.isExist(['isAdmin']),
                          isCreate: true,
                      },
                  ],
                  filterBtns:[
                      {
                          title: '选择车型',
                          hasAll: true,
                          name: 'model',
                          arr: [ { name: '折叠式平板', code: 'FOLD_FLAT' }, { name: '落地式平板', code: 'FLOOR_FLAT' }, { name: '随车吊平板', code: 'CRANE_FLAT' }, { name: '轻型托吊', code: 'LIGHT_CRANE' }, { name: '中型托吊', code: 'MIDDLE_CRANE' }, { name: '重型托吊', code: 'HEAVY_CRANE' }, { name: '旋转型', code: 'ROTARY_CRANE' }, { name: '斜板拖车', code: 'RAMP_TRAILER' }, { name: '快修小车', code: 'FAST_REPAIR' }, { name: '叉车', code: 'FORKLIFT' }, { name: '其他', code: 'OTHER' } ],
                          filter: 'name',
                          filterName: 'code',
                      },
                  ],
                  tableIterationField:[
                      {
                          tr:'车型编号',
                          field:'code',
                          link: {
                               link_name:'addCarStyle',   //路由名字
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
                          field:'model',
                      },
                      {
                          tr:'车重',
                          field:'weight',
                      },
                      {
                          tr:'载重',
                          field:'load',
                      },
                      {
                          tr:'车长',
                          field:'length',
                      },
                      {
                          tr:'车宽',
                          field:'width',
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