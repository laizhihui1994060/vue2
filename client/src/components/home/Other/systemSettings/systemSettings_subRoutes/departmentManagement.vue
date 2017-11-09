<template>
    <div class='departmentManagement' v-if='isShow'>
        <div class="input-append date form_datetime clearfix">
            <template v-if='isAdmin || add_branch_company_dept'>
                <div class="btn-group" >
                    <btn-select 
                        title='公司名称'
                        url='client:/helper/org'
                        filter="name"
                        filterName='orgId'
                        width='150px'
                        listWidth='150px'
                        name="orgId" 
                        :noBorder="true"
                        bgColor='transparent'
                        :title='nowOrgName'
                        @updata="chooseDept"   
                        padding='0' />

                </div>
            </template>
            <div class="btn-group pull-right" style="margin-right:20px;padding-right: 0;">

                  <router-link style='margin-right:0;' tag='button' class='btn groupBtn' :to = "{ name: 'addDepartment', params: { nowOrgId : nowOrgId, info: {}, isCreate: true } }">添加部门</router-link>
            </div>
        </div>
        <template v-if='tableShow'>
            <vue-table
                :item-url="'client:/org/' + nowOrgId + '/dept'"
                :table-iteration-field="tableIterationField"
                :linkBtn="linkBtn"
                ref='table'
                :params='params'
                :isTime='false'
                :filtrationCondition="false"
                @gotoPage='gotoPage'
                />
        </template>

    </div>
</template>

<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import vueTable from '../../../../../common_component/vue-table.vue'

import setDepartment from './../modal/setDepartment.vue'

    export default {
        data() {
            return {
                isShow: false,

                tableShow: true,

                UPD_DEPT: '',
                STOP_DEPT: '',
                departments: [
                    {
                        chargePersonInfo: {
                            empName: ''
                        }
                    }
                ],
                empParams: {
                    sysOrgId: global.ourOrgId
                },
                isAdmin: global.isAdmin,
                res: {},
                nowOrgName: '',
                nowOrgId: '',
                updataKey: 1,
                add_branch_company_dept: ConfigPage.isExist(['add_branch_company_dept']) ? true :false,

                tableIterationField:[
                    {
                        tr:'部门代码',
                        field:'code',
                        link: {
                            text:'编辑',
                            fn(self, key, value, item_index, item){

                                self.$emit('gotoPage', item);

                            }
                        },
                    },
                    {
                        tr:'部门名称',
                        field:'name',

                    },
                    {
                        tr:'负责人',

                        field:'chargePersonInfo.empName',
                        filter: 'obj'
                    },
                    {
                        tr:'联系电话',
                        field:'chargePersonPhone',

                    },
                ],
                linkBtn:[
                    {
                        text:'删除',
                        fn:function(self, key, value, item_index,item){

                            confirm('确定删除该部门吗？', function(){
                                send({
                                    url: 'client:/dept/' + item.hrDeptId,
                                    type: 'delete'
                                }, function(err, res){
                                    console.log(res);
                                    if(res.status == 200){
                                        self.watchDataForm();
                                    }
                                    alert(res.msg, res.status == 200 ? 'success' : 'error');
                                });
                            }, true);
                        }
                    }

                ]
            }
        },
        created(){
            var timer = null;
            const _this = this;
            if(global.ourOrgId){
                _this.nowOrgId = global.ourOrgId;
                _this.nowOrgName = global.ourOrgName;
                _this.isShow = true;
                _this.UPD_DEPT = ConfigPage.isExist(['systemSettings', 'UPD_DEPT']); 
                _this.STOP_DEPT = ConfigPage.isExist(['systemSettings', 'STOP_DEPT']);
            }else{
                timer = setInterval(function(){
                    if(global.ourOrgId){
                        clearInterval(timer);
                        _this.nowOrgId = global.ourOrgId;
                        _this.nowOrgName = global.ourOrgName;
                        _this.isShow = true;
                        _this.UPD_DEPT = ConfigPage.isExist(['systemSettings', 'UPD_DEPT']); 
                        _this.STOP_DEPT = ConfigPage.isExist(['systemSettings', 'STOP_DEPT']);
                    }
                }, 500);
            }   
        },
        methods: {
            chooseDept(name, item){
                this.tableShow = false;
                this.nowOrgId = item;

                console.log(this.nowOrgId)
                this.$nextTick(()=> {
                    this.tableShow = true;
                })
            },
            gotoPage(item){
                this.$router.push( { name: 'addDepartment', params: { nowOrgId : this.nowOrgId, info: item, isCreate: false  } })

            }
        },
        components:{
            btnSelect,
            vueTable
        },
    }    
</script>

<style>
    .departmentManagement table td button{
        width: 70px;
    }
    .departmentManagement button[name='orgId']{
        border: 1px solid #1786f7 !important;
    }
</style>