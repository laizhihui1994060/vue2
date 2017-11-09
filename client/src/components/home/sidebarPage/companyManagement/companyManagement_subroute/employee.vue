<template>
    <div id="customer" class="right_content" v-if='show'>
        <vue-table
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            item-url="client:/emp/list"
            type='post'
            :params='params'
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            :addBtns="addBtns" 
            :rightBtn="rightBtn"
            :needArr='needArr'
            :isTime='false' />
       
    </div>
</template>
<script>

import vueTable from "../../../../../common_component/vue-table.vue";
import pagingComponent from "../../../../../common_component/paging_component.vue";

 
    export default {
        mounted(){
            console.log(ConfigPage.isExist(['add_branch_company_emp']))
        },
        data () {
           return {
                show: false,
                deptUrl: '',
                needArr: [],
                params: {
                    "pageSize": 10,
                    "pageIndex": 1,
                },
                filterBtns:[
                    {
                        title: '公司',
                        isQuickSeach: true,
                        name: 'orgId',
                        url: 'client:/helper/org',
                        filter: 'name',
                        filterName: 'orgId',
                        defaultName:'orgId',
                        width:"120px",
                        uuid: true,
                        vIf: ''
                    },
                   
                    {
                        title:'职位',
                        hasAll: true,
                        name:'positionId',
                        url: 'control:/sys/param',
                        method: 'post',
                        params: [ "/sys/sys_position_option" ],
                        filter:"desc",
                        filterName: 'code'
                    },
                    {
                        title:'性别',
                        hasAll: true,
                        arr: [ { name: '男', code: 'M'}, { name: '女', code: 'F' }, { name: '其它', code: 'O' } ],
                        name:'gender',
                        filter:"name",
                        filterName: 'code'
                    } 
                ],  
                filterInput:[
                    {
                        url: "client:/search",
                        name:"param",
                        label:'员工姓名或工作电话',
                        flag: "EMPLOYEE"
                    }
                ],
            
                tableIterationField:[
                    {
                        tr:'员工姓名',
                        field:'empName',
                        link: {
                             text:'查看',
                             link_name:'employee_add',   //路由名字
                             link_key:"chosen",
                             link_Field:'empId',
                             isCreate:false,
                             model:false,
                         }
                    },
                    {
                        tr:'职位',
                        field:"positionId",
                        filter: 'needArr',
                        needName: 'desc',
                        filterName: 'code',
                    },
                    {
                        tr:'年龄',
                        field:'birthDate',
                        filter: 'age',
                    },
                    {
                        tr:'性别',
                        field:'gender',
                        filter: 'gender'
                    },
                    {
                        tr:'手机号码',
                        field:'personalMobile'
                    },
                    {
                        tr:'短号',
                        field:'shortPhone'
                    },
                    {
                        tr: '工作电话',
                        field:'workMobile'
                    },
                    {
                        tr:'入职日期',
                        field:'joinDate',
                        filter: 'date'
                    }
                    
                ],
                linkBtn:[
                   // {
                   //      text:'查看',
                   //      link_name:'employee_add',   //路由名字
                   //      link_key:"chosen",
                   //      link_Field:'empId',
                   //      isCreate:false,
                   //      model:false,
                   //  }
                ],
                addBtns:[
                    {
                        text:'注册管理员信息',
                        link_name:'employee_add',   //路由名字
                        link_key:"chosen",
                        vIf: true,
                        link_Field:'administrator',
                        isCreate: true,
                    },
                    {
                        text:'+添加新员工',
                        link_name:'employee_add',   //路由名字
                        link_key:"chosen",
                        vIf: '',
                        link_Field:{},
                        isCreate: true,
                    },
                ]
            }
        },
        components:{
            vueTable,
        },
        created(){
            const _this = this;

            if(global.user_info){
                updata();
            }else{
                var time = setInterval(function(){
                    if(global.user_info){
                        clearInterval(time);
                        updata();
                    }
                }, 500);
            }

            function updata(){
                var obj = _this.filterBtns.shift();
                _this.filterBtns.unshift({
                    title:'部门',
                    hasAll: true,
                    name:'deptId',
                    url: 'client:/org/' + global.ourOrgId + '/dept',
                    filter: 'name',
                    filterName:"hrDeptId"
                })
                _this.filterBtns.unshift(obj);

                send({
                    url: 'control:/sys/param',
                    type: 'post',
                    param: [ "/sys/sys_position_option" ]

                }, function(err, res){
                    if(res.status == 200){
                        _this.needArr = res.content[0].value.values;
                        
                        _this.addBtns[0].vIf = global.user_info.empId;

                        // 新增员工信息权限
                        console.info(ConfigPage.isExist(['systemSettings', 'ADD_EMP']))
                        _this.addBtns[1].vIf = !ConfigPage.isExist(['systemSettings', 'ADD_EMP']);  

                        // 分公司权限
                        _this.filterBtns[0].vIf = !global.isAdmin;
                        _this.filterBtns[0].defaultCode = global.ourOrgId;
                        console.log(global.ourOrgName);

                        _this.show = true;
                    }
                });
            }
        } 
    }
</script>

<style scoped>

</style>