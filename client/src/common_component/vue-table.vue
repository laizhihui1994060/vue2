<template>
    <div id='vueTable' class="right_content">
        <div style="margin-bottom:10px;">
            <div class="toggleView clearfix" v-if="filtrationCondition">
                <div class="pull-left" style="display:flex;flex:1">
                 <!--    <a v-if="filterBtns && filterBtns.length" style='font-size:14px;' href="javascript:void(0);" :class="{active:serverView == 'condition_server'}" @click="toggleServerView('condition_server')">条件搜索</a> 
                    <span style="font-size:14px;margin:0 10px;" v-if="filterBtns && filterBtns.length">|</span>  -->
                    <div class="input-group" id="search">
                        <!-- 快速搜索栏 -->
                        <div class="inline quick"    v-for="(item,index) in filterInput" :key="index">
                            <!-- 分公司管理 -->
                            <template v-if=' nowBtns && nowBtns[0] &&  !nowBtns[0].vIf && nowBtns[0].isQuickSeach && item.url && index == 0'>
                                <btn-select
                                    v-show="nowBtns[0].show ? (PrimaryValue == nowBtns[0].show ? true:false ) : true"
                                    ref='quickBtn'
                                    :url="nowBtns[0].url" 
                                    :filter="nowBtns[0].filter" 
                                    :filterName='nowBtns[0].filterName'
                                    :name="nowBtns[0].name"
                                    :method="nowBtns[0].method"
                                    :params="nowBtns[0].params"
                                    :arr="nowBtns[0].arr"
                                    :width='nowBtns[0].width'
                                    
                                    :isSend="nowBtns[0].isSend"
                                    :hasAll='nowBtns[0].hasAll'
                                    @updata="quickSearrchIntegrationDate"
                                    :title="nowBtns[0].title"  
                                    :no="nowBtns[0].no"
                                    :noBorder="true"
                                    :value="nowBtns[0].default"
                                    :uuid="nowBtns[0].uuid"
                                    :field="nowBtns[0].field"
                                    bgColor = 'transparent'     
                                    :defaultCode='nowBtns[0].defaultCode'
                                    :defaultName='nowBtns[0].defaultName'
                                    :ourOrg='nowBtns[0].ourOrg'
                                    :isEmpty='nowBtns[0].isEmpty'
                                    :updataKey='nowBtns[0].updataKey'
                                    :list-width="nowBtns[0].listWidth"  v-if="nowBtns[0].type!='date' && nowBtns[0].type != 'input' "></btn-select>
                            </template>
                            <input :style="{ width: item.width ? item.width : '200px' }" type="text" :value='PAGEITEM && PAGEITEM.currentParams && PAGEITEM.currentParams.quickSearchForm ? PAGEITEM.currentParams.quickSearchForm.param : ""' :name='item.name' @change='quickSearrchIntegrationDate($event.target.name, $event.target.value.trim())' :placeholder="item.label" @keyup.enter='watchDataForm("", "", item.url,1)'>
                            <button class="search_btn" @click='watchDataForm("", "", item.url, 1)'>
                                <span class="glyphicon glyphicon-search"></span>
                            </button>
                        </div>
                        
                    </div>
                </div>

                <button class="btn" data-toggle="modal" data-target="#listDisplayOptions" v-if='listDisplayOptions'>列表显示配置</button>

                <div class="pull-right" style="text-align:right;"> 
                    <button 
                        v-for="(item,index) in rightBtn"
                        type="button" 
                        class="btn radius-btn" 
                        v-text="item['text']" 
                        data-toggle="modal"
                        :key='item'
                        @click="gotoPage(item['link_key'], item[link_Field],item['link_name'],item['isCreate'],item['isSalary'], item['fn'], item_index,item)"
                        :data-target="item.target" />
                    <button 
                        class="btn" 
                        v-if="checkbox" 
                        v-text="checkbox.text ? checkbox.text:'下载照片'" 
                        @click="checkboxClick(checkbox.click)"></button>
                    <!-- <a class='download' v-if="checkbox" @click="checkboxClick(checkbox.click)" title="checkbox.text ? checkbox.text:'下载照片'"></a> -->
                    <!-- addBtns -->
                    <template v-for="(item, index) in addBtns">
                        <!-- router -->
                        <div v-if='!item.model' style='position: relative; display: inline-block' :key='item'>
                            <button     
                                v-if='!item.vIf'
                                type="button" 
                                class="btn radius-btn" 
                                @click="gotoPage(item['link_key'],item['link_Field'],item['link_name'],item['isCreate'],item['isSalary'])">{{item.text}}</button>
                            <span class='red_dot' v-if='item.number'>{{item.number}}</span>
                        </div>
                        <!-- model -->
                        <div v-else style='position: relative; display: inline-block' :key='item'>
                                <button  class="btn radius-btn" data-toggle="modal" :data-target="item['id']" v-text="item.text"></button>
                                <span class='red_dot' v-if='item.number'>{{item.number}}</span>
                        </div> 
                    </template>
                    <div class="btn-group" v-if='dropdownToggle' id="dropdownToggle">
                        <button type="button" class="btn" data-toggle="dropdown">{{dropdownToggle.name}}</button>
                        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown"><span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu" >
                            <li v-for="(item, index) in dropdownToggle.ul" :key='item'>
                                <a  v-if="item.model"
                                    href="javascript:void(0);"
                                    data-toggle="modal"
                                    :data-target="item['id']" 
                                    v-text="item.text" ></a>
                                <a  v-else
                                    href="javascript:void(0);" 
                                    v-text="item['text']" 
                                    @click="gotoPage(item['link_key'], item['link_Field'],item['link_name'],item['isCreate'],item['isSalary'], item['fn'])"></a>
                                
                            </li>
                        </ul> 
                    </div> 

                    <button class="btn" @click='exportExcel' v-if='excelDate.url' >导出</button>
                    <!-- <a class='export'  v-if='excelDate.url' @click='exportExcel'></a> -->
                </div>
            </div>

            <!-- 搜索区 -->

            <div class="form-group resetPadding" v-if="filtrationCondition && condition_server_search"  style="display:inline-block">
            <!-- 条件搜索 -->
                <div class="inline search_vue_table" v-if="serverView == 'condition_server'">
                
                    <!-- 时间搜索框 -->
                    <start-end-time 
                        :enableTimeRange="enableTimeRange" 
                        @updata="integrationDate"
                        :startValue="startEndTime.start"
                        :endValue="startEndTime.end"
                        @timeRangeSearch="rangeSet"
                        :startName='startEndCalss.start'
                        :currentRange='currentRange'
                        :rangeConfig='rangeConfigP?rangeConfigP:rangeConfig' 
                        :endName='startEndCalss.end'
                        ref='startend'  
                        :label="false" 
                        v-if='isTime' />
                    <!-- 过滤搜索栏   -->
                    <div class="inline filter_search_blank">
                        <div class="inline filter_search_item"  v-for="(item,index) in nowBtns" :key="index">
                            <template v-if='!item.vIf'>
                            <!-- origin: width=item.width -->
                                <btn-select
                                    :ref = " 'btn_' + item.name"
                                    v-show="item.show ? PrimaryValue ==item.show ? true:false  : true"
                                    :url="item.url" 
                                    :filter="item.filter" 
                                    :filterName='item.filterName'
                                    :name="item.name"
                                    :method="item.method"
                                    :params="item.params"
                                    :arr="item.arr"
                                    :caretColor="'#1786f7'"
                                    :bgColor="'transparent'"
                                    :color="'#1786f7'"
                                    :padding="'0px'"
                                    :blockBorder='true'
                                    :noBorder="nowBtns.length === 1 ? true:false"
                                    :isCheckbox='item.isCheckbox'
                                    :isSend="item.isSend"
                                    :hasAll='item.hasAll'
                                    @updata="integrationDate" 
                                    :title="item.title"  
                                    :no="item.no"
                                    :value="item.default"
                                    :uuid="item.uuid"
                                    :field="item.field"
                                    :defaultCode='item.defaultCode'
                                    :defaultName='item.defaultName'
                                    :ourOrg='item.ourOrg'
                                    :isEmpty='item.isEmpty'
                                    :width='item.width'
                                    :updataKey='item.updataKey'
                                    :list-width="item.listWidth"  v-if="item.type!='date' && item.type != 'input' "></btn-select>
                            </template>
                            <range 
                                :url="item.url" 
                                :filter="item.filter" 
                                :name="item.name"
                                @updata="integrationDate"
                                :title="item.title" v-if="item.type=='number'"></range>
                            <!-- 详细搜索条目 -->
                            <date-filter-select 
                                :url="item.url" 
                                :filter="item.filter" 
                                :name="item.name"
                                @updata="integrationDate"
                                :title="item.title" v-if="item.type=='date'"></date-filter-select>
                            <!-- change pmarginRight from 24 to 0 --> 
                            <form-label-input 
                                :name="item.name" 
                                @updata="integrationDate" 
                                :placeholder='item.label'
                                :labelColor='labelColor'
                                :type='item.inputType' 
                                inputBackgroundColor='transparent'
                                :index="item.index"
                                input-width="120px" 
                                :labelLeft='labelLeft'
                                pmarginRight="0px" v-if="item.type=='input'" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="btn-group searchConditions " v-if="filterBtns && filterBtns.length && isSearch">

                <!-- 添加/删除搜索条件按钮 -->

                <!-- <button v-if="serverView == 'condition_server'" style='border:none !important;background-color:#eff2f3; color:#8991a1' class="multi-select" data-toggle="modal"  data-target="#multi-select"></button> -->
                <button id="server_filter" class="btn default-btn radius-btn" style='background-color:#1786f7;border-radius:4px;' @click="watchDataForm">搜索</button>
                <button id="clear_filter" class="btn default-btn radius-btn" style="float:inherit;background-color: white;color: #1786f7;border-radius:4px;" @click="clearFilter">重置</button>
                
                <template  v-if="location.hash.indexOf('rescueManagement') != -1 ">

                    <button 
                        type="button" 
                        id="clear_filter" 
                         style="float:inherit;background-color:#1786f7;border-radius: 4px; "
                        class="btn default-btn radius-btn" 
                        data-toggle="modal" 
                        data-target="#saveHisModal"
                        v-if="historySearchEnable">保存条件</button>
                </template>
                
                <save-his-modal @savetrigged="trigged"></save-his-modal>        
                <!-- <button type="button" class="btn default-btn save_condition" data-toggle="modal" data-target="#myModal" v-if="serverView=='condition_server'">保存搜索条件</button>                             -->
            </div> 
          
        </div>
        
        <!-- 数据显示表格 -->
        <div class="table_box table-responsive">
            <table class="table table-bordered" id='orderMen'>
                <!-- 表格头部 -->
                <thead>
                    <tr>
                        <th v-if="checkbox" class="checkbox checkboxHr" style='width:36px; display:table-cell;'>
                            <checkbox 
                                name="checkbox_all" 
                                marginTop="6px"
                                value="all"
                                :newStyle="true"
                                @updata="integrationDate('checkbox_all',items,checkbox.fn)"/>
                        </th>
                        <th  
                            v-for="(tableIteration,index) in tableIterationField"
                            :width='tableIteration.thWidth'
                            :colspan="tableIteration.colspan ?  2 : 1" 
                            :rowspan="tableIteration.rowspan ?  2 : 1" 
                            :key="index" 
                            :class="{'sort':tableIteration.sort && Paging.searchUrl.indexOf('/search') == -1 }"
                            v-text='tableIteration.tr'
                            @click="inSort(tableIteration.sort, tableIteration.fieName ? tableIteration.fieName : tableIteration.field,$event)"></th>
                        <th  v-show="linkBtn && linkBtn.length > 0"  :style="{width:linkBtn.length == 1 ? '100px': linkBtn.length* 100 + 'px', display:'table-cell'}"></th>
                    </tr>
                    <tr v-if='tableIterationField[0] && tableIterationField[0].rowspan'>
                        <template v-for="(tableIteration,index) in tableIterationField"  >
                            <template v-if='tableIteration.table'>
                                <th  
                                    v-for="(table, index) in tableIteration.table" 
                                    :key='table'
                                    :class="{sort:table.sort && Paging.searchUrl.indexOf('/search') == -1}"
                                    v-text='table.tr'
                                    @click="inSort(table.sort, table.fieName ? table.fieName : table.field,$event)"></th>
                            </template>
                            
                        </template>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="items && items.length">
                        <tr  v-for="(item, item_index) in items" :key='item_index'>
                            <td v-if="checkbox" class="checkbox" style='display: table-cell;'>
                                <checkbox 
                                    name="checkbox" 
                                    marginTop="6px"
                                    :newStyle="true"
                                    :value="item[checkbox.field]"
                                    @updata="integrationDate('checkbox',item,checkbox.fn)"/>
                            </td>
                            <!-- 渲染表格 -->
                            <template v-for="(tableIteration,key) in tableIterationField" >
                                <!-- link 跳转 -->
                                <template v-if='!tableIteration.table'>
                                    <td>
                                        <template  v-if='tableIteration.link'>
                                            <a href="javascript:void(0);" class='table_a' :id="'copy'+item_index" v-html="tableIteration.text ? tableIteration.text : tableIteration.filter ? transformation(tableIteration, item) : item[tableIteration.field] "
                                                @click="gotoPage(tableIteration.link['link_key'], item[tableIteration.link.link_Field],tableIteration.link['link_name'],tableIteration.link['isCreate'],tableIteration.link['isSalary'], tableIteration.link['fn'], item_index,item,$event, tableIteration) "></a>  
                                        </template>
                                        <template v-else>
                                            <p style='font-size:14px;margin:0;' v-html="tableIteration.filter ? transformation(tableIteration, item) : item[tableIteration.field] "></p>  
                                        </template>
                                    </td>
                                </template>
                                <template v-else>
                                    <template v-for="(table, index) in tableIteration.table" >
                                        <td :key='table'>
                                            <template  v-if='table.link'>
                                                <a href="javascript:void(0);" class='table_a' :id="'copy'+item_index" v-html="table.text ? table.text : table.filter ? transformation(table, item) : item[table.field] "
                                                    @click="gotoPage(table.link['link_key'], item[table.link.link_Field],table.link['link_name'],table.link['isCreate'],table.link['isSalary'], table.link['fn'], item_index,item,$event, table) "></a>  
                                            </template>
                                            <template v-else>
                                                <p style='font-size:14px;margin:0;' v-html="table.filter ? transformation(table, item) : item[table.field] "></p>  
                                            </template>
                                        </td>
                                    </template>
                                </template>
                            </template>
                            <!-- <td v-else>
                                <a href="javascript:;" 
                                    v-text=''
                                    @click="gotoPage(tableIteration.link['link_key'], item[tableIteration.link.link_Field],tableIteration.link['link_name'],tableIteration.link['isCreate'],tableIteration.link['isSalary'], tableIteration.link['fn'], item_index,item)"></a>
                            </td> -->
                            <td v-if="linkBtn && linkBtn.length > 0">
                                <div>
                                    <template v-for='(link, link_index) in linkBtn'>
                                        <template v-if="!link.link_if ||  linkIf(link, item)" >          <!-- 没有link_if 或者 符合条件-->
                                                <button 
                                                    v-if="!link.model"
                                                    type="button" 
                                                    style='max-width:100px; width: 70px; padding:4px'
                                                    class="btn" 
                                                    v-text="link.text"
                                                    @click="gotoPage(link['link_key'], item[link.link_Field],link['link_name'],link['isCreate'],link['isSalary'], link['fn'], item_index,item)">
                                                </button>   
                                                <button 
                                                    v-if='link.model === true'
                                                    type="button" 
                                                    style='max-width:100px; width: 70px; padding:4px'
                                                    class="btn" 
                                                    v-text="link.text" 
                                                    data-toggle="modal"
                                                    :data-target="link.target">
                                                </button>  
                                        </template>
                                    </template>  
                                </div>
                            </td>
                        </tr>
                    </template>
                    
                </tbody>
            </table>
            
            <h3 class="text-center waring" v-if="!items.length">暂无数据</h3>
        </div>    
        <!-- 保存条件  -->
        <div class="frequently_used" v-if="historySearch && historySearchEnable" >
            <p 
                class="frequently_used_title" 
                draggable="true" 
                @dragstart="verticalDragStart($event)"
                @drag="verticalDrag($event)">
                <b>保存的条件</b>
                <span class="hide_his_list" @click="toggleHisSide(-190)">隐藏</span>
                <p class="his_sidebar" @click="toggleHisSide(190)">&nbsp;&gt;展开记录</p>  
            </p>
           
            <ul class="list-group">
                <li class="list-group-item" 
                    v-for="(item,index) in history_search" 
                    :key='index'
                    @click="searchDirectly(index)"
                    @mousemove="emitSearchDetail(index)"
                    @mouseleave="showConditionPanel=-1">

                    <p class="his_list">{{item.name}}</p>

                    <div class="condition_detail_panel" v-show="showConditionPanel==index">
                        <b>创建时间：</b><span>{{new Date(history_search[index].created).Format("yyyy-MM-dd hh:mm")}}</span><br />
                        <b>查询页面：</b><span>{{covertPathToChinese(history_search[index].operationUrl)}}</span><br />
                        <b>搜索条件：</b>
                        <p v-html="his_detail_pool"></p>
                    </div>
                    <!-- <span class="list_operate list_operate_toTop" title="置顶该条件" @click="stickSearchDetail($event,index)">⊼</span> -->
                    <span class="list_operate" @click="delSearchDetail($event,index)">&times;</span>
                </li>
            </ul>
        </div>

        <!-- 导出 -->
        <export-excel-page :excelDate="excelDate" ref="excelParam"/>

        <!-- 列表配置 -->
        <listDisplayOptions v-if="listDisplayOptions" :listDisplayOptions="listDisplayOptions" :tableIterationField="tableIterationField"
                                             @update:tableIterationField="updateTableIterationField" />
        <!-- 分页 -->
        <paging-component v-if="all > 1" :recordSize="recordSize" :all="all" :cur="pageIndex" @upPage="upPage"></paging-component>  
        <multi-select 
            :filterBtns="filterBtns_2"  
            :nowBtns="nowBtns"  
            @deleteNowBtns='deleteNowBtns' 
            @addNowBtns='addNowBtns'
            @addAllBtns='addAllBtns' />
    </div>
</template>
                      
<script>
import pagingComponent from "./paging_component.vue";
import btnSelect from "./btn_select.vue";
import exportExcelPage from "./exportExcelPage.vue";
import listDisplayOptions from "./list_display_options.vue";
import formLabelInput from "./form-label-input.vue";
import startEndTime from "./startEndTime.vue";
import checkbox from "./checkbox.vue";
import multiSelect from './multi_select.vue';
import dateFilterSelect from './date_filter_select.vue';
import range from './range.vue';
import saveHisModal from './saveHisModal.vue';
import Paging from '../../static/js/util/Paging.js'
import tableResize from '../../static/js/util/tableResize.js'


const data = { 
    props:{
        defaultTimeRange:{
            type: String,
            default: "PREWEEK"
        },
        listDisplayOptions: {
            // path:'',
        },
        tableIterationFieldFade: {},
        excelDate: {
            type:Object,
            default:function(){
                return {
                    url:'',
                    method:'get',
                    filename:'myfile',
                    displayField:[]
                }
            }
        },
        isSearch: {
            type: Boolean,
            default: true
        },
        isQuickSearch:{
            type: Boolean,
            default: true
        },
        filterBtns:{
            type:Array,
            },
        filterInput:{
            type:Array
        },
        rangeConfigP:{
            type:Array,
        },
        tableIterationField:{
            type:Array
        },
        itemUrl:{
            type:String
        },
        linkBtn:{
            type:Array
        },
        rightBtn:{
            type:Array
        },
        labelLeft:{
            type:String
        },
        checkbox:{
            type:Object
        },
        addBtns:{
            type:Array
        },
        dropdownToggle:{
            type: Object
        },
        isTime: {
            type: Boolean,
            default: true,
        },
        filtrationCondition:{
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            default: 'get'
        },
        startEndCalss:{
            type: Object,
            default:function(){
                return {
                    start:'startTime',
                    end:'endTime'
                }
            }
        },
        params: {
            type: Object,
            default: function(){
                return {}
            }
        },
        needArr: {},
        needArr_2: {},
        no:{
            type:Boolean,
            default: false
        },
        historySearch: {
            type: Boolean,
            default: true
        },
        condition: {
            type: Object,
        },
        enableTimeRange: {
            type: Boolean,
            default: false
        },
        labelColor: {
            type: String,
            default: 'black'
        },
        condition_server_search: {
            type: Boolean,
            default: true
        }
    },
    components:{
        pagingComponent,
        btnSelect,
        formLabelInput,
        startEndTime,
        checkbox,
        multiSelect,
        range,
        dateFilterSelect,
        saveHisModal,
        exportExcelPage,
        listDisplayOptions
    },
    data(){
        return {
            timeType: '',
            filterBtns_2:[],
            serverView:'condition_server',
            currentRange:'PREWEEK',
            items : [],
            pageIndex:1,
            location :location ,
            dataForm:{
                quick_search:{},
                condition_server:{},
                field:{
                    fieldName:'',
                    sort:''
                }
            },
            domParam:{
                condition:{},
                quick:{}
            },//重置DOM用

            table: [],
            condition_name:'',//中间变量
            condition_obj:{
                
            },
            all:0 ,
            inputWithId:["customerId","driverId","partnerId","hrEmployeeIdOwner","deptId","parkingLotId","orgId","towTruckCatId","positionId","deptId","sysOrgId","parkingLotId","delegate"],
            history_search:[
                
            ],//历史面板条目，该条目与detal_pool同时进行
            historySearchEnable:true,
            showConditionPanel:-1,
            PrimaryKey:'',
            PrimaryValue:'',
            bool: false,
            ctr_type:1,
            nowBtns: [],
            show_search_input:true,
            rangeConfig:[
                {text:'当日',param:'TODAY'},
                // {text:'未来一周',param:'NXWEEK'},
                {text:'过去一周',param:'PREWEEK'},
                {text:'近一月',param:'MONTH'},
                {text:'近三月',param:'TRIPLEMON'},
                {text:'近一年',param:'YEAR'}
            ],
            PAGEITEM : local.getItem('PAGEITEM'),
            startEndTime: {
                start: "",
                end: ""
            },
            Paging: new Paging()
        }
    },
    methods: {
        inSort(inSort,fieldName,event){ 
            if(inSort !== true || global.isResizeTable == true || this.Paging.searchUrl.indexOf('/search') != -1 )return;
            this.params.param ? this.Paging.setSort(fieldName,event,true) : this.Paging.setSort(fieldName,event) ;
            this.watchDataForm(undefined,true); //排序操作不计入搜索           
        },
        integrationDate(name,item,cb){
            console.log(name, item, cb);
            if(this.PrimaryKey == name){
                console.log( item)
                this.PrimaryValue = item;
                this.dataForm.quick_search['pageIndex'] = 1;
                this.dataForm.condition_server['pageIndex'] = 1;
                this.pageIndex = 1;
              
            } 
            if(name == this.startEndCalss.end){
                this.startEndTime.end = item; 
            }
            // if(name === this.startEndCalss.start){
            //     this.startEndTime.start = item;
            // }
            // 选择公司后，刷新部门下拉
            if(name == 'sysOrgId'){
                this.nowBtns[1].url = 'client:/org/' + item + '/dept';
                this.nowBtns[1].updataKey = Math.random();
            }
            if(arguments.length === 5 && arguments[4]){
                if(item == 'DELEGATE'){
                    this.ctr_type = 3;
                }else if(item == 'CUSTOMER'){
                    this.ctr_type = 1;
                }else if(item == 'PROVIDER'){
                    this.ctr_type = 2;
                }
            }
            if(name == 'checkbox_all'){
                this.checkbox_status = 'checkbox_all';
                return cb('checkbox_all',this.items, '', this.all, this);
            }
            if(name == 'checkbox'){
                if(this.checkboxItem && this.checkboxItem.length != this.recordSize){
                    this.checkbox_status = '';
                }
                
                return cb('checkbox',item, '', '', this);
            }
            if(this.params.param ){
                if(this.params.param.orgId || this.params.param.otherOrgId){
                    delete this.dataForm['condition_server']['param']['orgId'];
                    delete this.dataForm['condition_server']['param']['otherOrgId'];
                }
                if(cb == '%'){
                    this.dataForm['condition_server']['param'][name] = item == '全部' ? '' : ( cb + item + cb );
                }else{
                    this.dataForm['condition_server']['param'][name] = item == '全部' ? '' : item;
                }
                
                //空条件delete
                if(this.dataForm['condition_server']['param'][name] == ''){
                    delete this.dataForm['condition_server']['param'][name];
                }
            }else if(cb == '%'){
                 this.dataForm.condition_server[name] = cb + item + cb;
            }else{
                this.dataForm['condition_server'][name] = item;
            }
        },
        // 快速搜索的选项条件保存
        quickSearrchIntegrationDate(name, item){
            // 是否是行程任务列表
            const isTaskTrip = ($('.taskTrip').length > 0 && (name == 'orgId' || name == 'otherOrgId' ) );
            if($('.taskTrip').length > 0 && !name){
                this.dataForm["quick_search"]["conditions"] = {};
            }
            if(name == 'finReconType'  || isTaskTrip ) {
                if(!this.dataForm["quick_search"]["conditions"]) this.dataForm["quick_search"]["conditions"] = {};
                
                if(name == 'orgId' || name == 'otherOrgId' ){
                    delete this.dataForm["quick_search"]["conditions"]['orgId']
                    delete this.dataForm["quick_search"]["conditions"]['otherOrgId']
                }
    
                this.dataForm["quick_search"]["conditions"][name] = item;
            }else{
                this.dataForm["quick_search"][name] = item;
            }
            
            console.log(this.dataForm);

            this.localPage('quick_search');  //保存搜索的条件
        },
        // 搜索
        watchDataForm(item,byRecord, url, pageIndex){
            const self = this;
            // 快速搜素
            if(pageIndex){
                this.pageIndex = pageIndex;
                this.dataForm["quick_search"]['pageIndex'] = pageIndex;
            }

            if(item && item.target && item.target.tagName.toLowerCase() == 'button') {
                this.pageIndex = 1;
                this.dataForm.condition_server['pageIndex'] = 1;
            }

            if(item && item.orgId) self.dataForm.condition_server['orgId'] = item.orgId; 
            //传值

            //清除格式错误的条件，并记录之
            this.Paging.setDataForm(this.dataForm);
            
            if(this.excelDate.url)this.$refs.excelParam.setParam(this.dataForm);

            if(url){
                this.Paging.setSearchUrl(url, self.type);
                this.Paging.search('quick_search', function(err, res){
                    searchHandle(err, res, 'quick_search');
                });
            }else{
                this.Paging.setSearchUrl(this.itemUrl, self.type);
                this.Paging.search('condition_server', function(err, res){
                    searchHandle(err, res, 'condition_server');
                });
            }

            function searchHandle(err, res, type){

                if(err)return console.log("error",err);
                if(res.status == 200 || res.status == 404 || res.status == 412){
                    console.log(res);
                    self.items = res.content ? res.content : [];
                    self.all = res.pageCount;
                    self.recordSize = res.recordSize;

                    self.dataForm.quick_search['pageIndex'] = self.dataForm.condition_server['pageIndex'] = res.pageIndex;
                    self.localPage(type);

                    console.log(self.checkbox, self.checkbox_status);
                    if(self.checkbox && self.checkbox_status == 'checkbox_all'){
                        self.checkbox.fn(null,null,'checkbox_all');
                        // 全选
                        self.$nextTick( () => {
                            $('.table_box').find("input[name='checkbox_all']")[0].checked = true;
                            $('.table_box').find("input[name='checkbox']").each(function(index, el) {

                                el.checked = true;       
                            });
                        });
                    }else if(self.checkbox && !self.checkbox_status){
                        // 不是全选
                        self.$nextTick( () => {
                            console.log('不是全选')
                            $('.table_box').find("input[name='checkbox_all']")[0].checked = false;
                            // 遍历
                            console.log(self.checkboxItem)

                            if(self.checkboxItem && self.checkboxItem.length == self.recordSize){
                                $('input[name=checkbox_all]')[0].checked = true;
                                self.checkbox_status = 'checkbox_all';
                            }

                            $('tbody tr').each( function(index, el){
                                if(self.checkboxItem && self.checkboxItem.length){
                                    var bool = self.checkboxItem.some( (obj, index) => {    
                                        if( $(el).find('td').eq(1).find('p, a').text() == obj.orderCode ){
                                            console.log($(el).find('td').eq(1).find('p').text(), obj.orderCode);
                                            $(el).find('td input')[0].checked = true;
                                            return true;
                                        }
                                    });
                                    if(!bool) $(el).find('td input').checked = false;
                                }
                                
                                
                            })
                        });
                    }

                    // btn th 宽度
                    self.$nextTick( () => {
                        $('.right_content [data-toggle="tooltip"]').tooltip();
                        
                        if(self.linkBtn.length < 1) return;
                        let maxThWidth = 0;

                        $('.right_content table tr td:last-child').each( function(index, ele){
                            const width = $(ele).find('button').length * 100;
                            if( width > maxThWidth){
                                maxThWidth = width;
                            }
                        });
                        $('.right_content table th:last').css( 'width', maxThWidth + 'px' );
                    });

                }else{
                    alert(res.msg);
                }
            }
        },
        // 重置
        clearFilter(){
            if(this.params.param){
                this.dataForm.condition_server.param = {};
            } else {
                if(this.dataForm.condition_server['pageSize'] || this.dataForm.condition_server['pageIndex']){
                    this.dataForm.condition_server = {
                        pageSize:15,
                        pageIndex:1
                    }
                } else {
                    this.dataForm.condition_server = {}
                }
            }
            this.startEndTime = {
                start:"",
                end:""
            }
            if(this.$refs.btn_orderStatus){
                console.log(this.$refs.btn_orderStatus)
            } 
            this.updateAfterSearch({},"condition_server");

            this.watchDataForm() //点击重置，再触发一次搜索
        },
        upPage(page){
            console.log(page);
            this.dataForm.quick_search['pageIndex'] = page;
            this.dataForm.condition_server['pageIndex'] = page;
            
            if(this.PAGEITEM && this.PAGEITEM.currentParams.type && this.PAGEITEM.currentParams.type == 'quick_search'){
                this.watchDataForm(undefined,true, this.PAGEITEM.currentParams.url);
            }else{
                this.watchDataForm(undefined,true);
            }
            
            this.pageIndex = page;
            this.localPage();
        },
        gotoPage(key,value,name,isCreate,isSalary, fn, item_index,item,e, tableIteration){
            if(tableIteration && tableIteration.link && tableIteration.link.model){
                $(tableIteration.link.id).modal('show');
                return;
            }
            // 直接在父组件操作
            if(fn){
                fn(this, key, value, item_index,item,this.ctr_type,e);
                return ;
            }
            var params = {};
            //如果是添加创建
            if(isCreate || isCreate === false){
                params['isCreate'] = isCreate;
            }
            //奖励惩罚
            if(isSalary){
                params['isSalary'] = isSalary;
            }
            params[key] = value ? value : item;
            var obj = { name: name, params: params};

            if(!key)delete obj.params;
            console.log(obj)

            this.$router.push(obj);
        },
        send(params){
            if(this.bool) return;
            const self = this;
            const param = params ? params : this.params;
            let mRoute = this.$route.path.split("/")
            if(this.isTime && mRoute[mRoute.length-2] !== 'systemSettings'){

                var timeCon = this.rangeSet(false,this.startEndCalss.start,this.startEndCalss.end,this.defaultTimeRange);
                Object.assign(param.param?param.param:param,timeCon);
            }

            self.dataForm[self.serverView] = param;

            self.Paging.setSearchUrl(this.itemUrl, this.type, self.dataForm);

            if( this.PAGEITEM && (this.PAGEITEM.currentPage == window.location.hash.split('/')[window.location.hash.split('/').length-1]) )return ;
        
            // 第一次进入才执行
            
            self.Paging.search('condition_server',function(err,data){
                if(err)return console.log(err);

                if(data.status == 200 || data.status == 412 || data.status == 400){
                    //结果条目
                    console.log(data.content);
                    self.items = data.content? data.content:[];
                    self.all = data.pageCount;
                    self.recordSize = data.recordSize;
                    
                    self.$nextTick(function(){
                        if(sessionStorage['rescueManagement_toBeSearched']){
                            let param = JSON.parse(sessionStorage['rescueManagement_toBeSearched']);
                            this.searchDirectly(undefined,param);
                            sessionStorage.removeItem('rescueManagement_toBeSearched');
                        }

                        $('.right_content [data-toggle="tooltip"]').tooltip();
                        
                        if(self.linkBtn.length < 1) return;
                        let maxThWidth = 0;

                        $('.right_content table tr td:last-child').each( function(index, ele){
                            const width = $(ele).find('button').length * 85;
                            if( width > maxThWidth){
                                maxThWidth = width;
                            }
                        });
                        $('.right_content table th:last').css( 'width', maxThWidth + 'px' );
                       
                    });

                }else if(data.status != 404  ){
                    console.log(data);
                    alert(data.msg ? data.msg : '请刷新重试！');
                }
            });

        }, 
        checkboxClick(fn){
            fn&&fn(this);
        },
        exportExcel(fn){
            $('#exportExcelPage').find('[type="checkbox"]').each(function(index, el) {
                el.checked = false; 
            });
            if(this.excelDate.url)this.$refs.excelParam.setParam(this.dataForm);
            $('#exportExcelPage').modal('show');
        },
        localPage(type){
            const oldobj = this.dataForm.condition_server.param ? this.dataForm.condition_server.param : this.dataForm.condition_server;
            let newObj = {};

            for(let i in oldobj){
                const el  = $('[name=' + i +']');
                newObj[i] = i;
                newObj[i + '_chinese'] = el.text() ? el.text() : el.val();
            }

            if(this.timeType){
                newObj.timeType = this.timeType;
            }
            const obj = {
                currentPage:window.location.hash.split('/')[window.location.hash.split('/').length-1],
                currentPages:this.pageIndex,
                currentParams:{
                    type: type ? type : "condition_server",
                    quickSearchForm: this.dataForm['quick_search'],
                    dataForm:this.dataForm['condition_server'],
                    chinese : newObj,
                    url: type == "quick_search" ? this.filterInput[0].url : this.itemUrl
                }
            };
            this.PAGEITEM = obj;
            local.setItem('PAGEITEM', obj);
        },
        
        //按时间范围直接搜索
        rangeSet(event, startName, endName, range){
            let currTarget = event;
            // let endTime = new Date().getTime();
            let endTime = new Date().setHours(23,59,59,999),
                pastTime = new Date().setHours(0,0,0,0),
                pastObj = new Date(pastTime),
                now = new Date();
            this.currentRange = range;

            switch(range){
                case "TODAY":{
                  //ignore  
                };break;
                case "NXWEEK":{
                    endTime = new Date(endTime).setDate(new Date().getDate() + 7)
                };break;

                case "WEEK":pastTime = pastObj.setDate(pastObj.getDate() - 7)         ;break;             
                case "PREWEEK":pastTime = pastObj.setDate(pastObj.getDate() - 7)      ;break;
                case "MONTH":pastTime = pastObj.setMonth(pastObj.getMonth() - 1)      ;break;
                case "TRIPLEMON":pastTime = pastObj.setMonth(pastObj.getMonth() - 3)  ;break;
                case "YEAR":pastTime = pastObj.setFullYear(pastObj.getFullYear() - 1) ;break;
            }
    
            if(currTarget){
                this.integrationDate(startName,pastTime);
                this.integrationDate(endName,endTime);
                this.watchDataForm();

                this.timeType = range;
            }
            this.startEndTime.start = pastTime;
            this.startEndTime.end = endTime;
            return {
                [startName]:pastTime,
                [endName]:endTime
            }
        },
        // 列表显示反馈
        updateTableIterationField(tableIterationField, listOptionsArr, isCreated , listOptions){
            console.log( tableIterationField )
            this.$emit('update:tableIterationField', tableIterationField);

            // 肖总的订单管理才要
            if($('#rescueManagement').length){
                this.$emit('update:params', listOptionsArr);
                if(!this.dataForm['condition_server'].param){
                    this.dataForm['condition_server'].param = {};
                }
                this.dataForm['condition_server'].param.values = listOptionsArr;
            }

            // console.warn(JSON.parse(JSON.stringify(this.dataForm)), listOptionsArr);
            if(isCreated) this.send();
            else this.watchDataForm();

            this.$nextTick( () => {
                tableResize.init('orderMen',listOptions);
            })
        }
    },
  
    created(){
        this.dataForm["quick_search"] = {
            pageIndex: 1,
            pageSize: 15,
            flag: this.filterInput && this.filterInput[0] ? this.filterInput[0].flag : '',
        }
        if(this.filterBtns && this.filterBtns[0] && this.filterBtns[0].ourOrg){
            this.dataForm["quick_search"]['conditions'] = {
                orgId: global.ourOrgId
            };
        }

        if(this.PAGEITEM)this.PAGEITEM = JSON.parse(this.PAGEITEM);
        console.log(this.PAGEITEM);
        // 不需要列表显示配置
        if(!this.listDisplayOptions){
            this.send();
        }
        
        if(!this.filterBtns)return;
        const self = this;
        // 获取搜索条件
        self.nowBtns = JSON.parse( JSON.stringify(self.filterBtns) );   // 模拟，等待后台接口
        self.filterBtns_2 = self.filterBtns.filter( (filterBtn, index) => {   // 筛选出剩下的
            return !self.nowBtns.some( (nowBtn, index) => {
                if(nowBtn.name == filterBtn.name){
                    return true;
                }
            });
        });

        console.warn(JSON.parse(JSON.stringify(this.dataForm)))
        // 把当前页面输入框放入条件池中
        this.nowBtns.forEach(function(it,index){
            // 加入条件池中
            self.domParam.condition[it.name] = {
                name:it.name,
                cnname:it.title,
                value:"全部"
            }
            if(it.PrimaryKey)self.PrimaryKey = it.name;
        });


        if(this.filterInput){
            this.filterInput.forEach(function(it,index){
                self.domParam.quick[it.name] = {
                    name:it.name,
                    cnname:it.label,
                    value:""
                }
            });
        }
        
        if(this.isTime){
           
            this.domParam.condition[this.startEndCalss.start] = {
                name:this.startEndCalss.start,
                cnname:"开始时间",
                value:""
            }

            this.domParam.condition[this.startEndCalss.end] = {
                name:this.startEndCalss.end,
                cnname:"结束时间",
                value:""
            }
        }
         

    },
    mounted(){
        const self = this;
        // this.historyFetchApi(10,"push");

        this.fetchUnion(); //查询全部历史记录！！

        console.warn(JSON.parse(JSON.stringify(this.dataForm)))
        this.$nextTick(function(){

            if(self.checkbox){
                $(".checkboxHr input[type='checkbox']").click(function(event) {

                    var checkbox = $('.checkboxHr').parent().parent().parent().find("tbody input[type='checkbox']");

                    for(var i = 0 ; i<checkbox.length;i++ ){
                        checkbox[i].checked = $(".checkboxHr input[type='checkbox']").is(':checked')
                    }
                });
 
            }


            if( this.PAGEITEM ){
                if(this.PAGEITEM.currentPage == window.location.hash.split('/')[window.location.hash.split('/').length-1]  && this.PAGEITEM.currentPage != window.location.hash  ){
                    // for(let i = 0 ;i<PAGEITEM.childPage.length;i++){
                        // if(PAGEITEM.childPage[i] == local.getItem('CURRENT_PAGE')){
                            self.bool = true;
                            self.pageIndex = this.PAGEITEM.currentPages;
                            self.dataForm['condition_server'] = this.PAGEITEM.currentParams.dataForm ? this.PAGEITEM.currentParams.dataForm : this.PAGEITEM.currentParams;
                            self.dataForm['quick_search'] = this.PAGEITEM.currentParams.quickSearchForm ? this.PAGEITEM.currentParams.quickSearchForm : this.PAGEITEM.currentParams;
                            let chinese = this.PAGEITEM.currentParams.chinese;
                            for(let i in chinese){
                                if(i == "timeType"){
                                    this.currentRange = chinese[i]; 
                                    continue;
                                }
                                if($('[name=' +  i +']').length){
                                    console.log($('[name=' +  i +']')[0].nodeName == "INPUT");
                                    if($('[name=' +  i +']')[0].nodeName != 'INPUT' ){
                                        $('[name=' +  i +']').text(chinese[i + '_chinese']);
                                    }else{
                                        $('[name=' +  i +']').val(chinese[i + '_chinese']);
                                    }

                                    
                                }
                            }

                            if(self.PAGEITEM.currentPage === 'account_statement' && chinese['finReconType_chinese']){
                                setTimeout(()=>{
                                    switch(chinese['finReconType_chinese']){
                                        case "委派商":
                                            self.PrimaryValue = 'DELEGATE';
                                        break;
                                        case "客户":
                                            self.PrimaryValue = 'CUSTOMER';
                                        break;
                                        case "服务商":
                                            self.PrimaryValue = 'PROVIDER';
                                        break;
                                    }
                                    console.log(self.PrimaryValue);
                                    if($('[name="finReconType"]').length)$('[name="finReconType"]').text(chinese["finReconType_chinese"]);
                                },300)
                            }

                            self.upPage(self.pageIndex);

                        // }
                    // };
                }else{
                    local.removeItem('PAGEITEM');
                    self.PAGEITEM.currentParams.quickSearchForm.param = '';
                }
                console.log(self.PAGEITEM)
            }
        });

        tableResize.init('orderMen');
    }
}

// 筛选内容
import vueTableFilter from './vue-table/vue-table-filter.js'
// 权限设置button的显示
import linkIf from './vue-table/vue-table-linkIf.js'
// 历史搜索保存条件的相关方法
import storageConditions from './vue-table/vue-table-storageConditions.js'
// 多条件筛选选择
import multiSelector from './vue-table/vue-table-multiSelect.js'

Object.assign(data.methods, vueTableFilter, linkIf, storageConditions, multiSelector);

export default data

</script>

<style src="./vue-table/vue-table.css" scoped></style>