    <template>
    <div class="account_configuration" style="margin-top: -40px;">
        <div class='btnSelect' style="position: relative;top:49px;z-index: 100;display: inline-block">
            <btn-select 
                label-right='12px'
                url='client:/helper/org'
                filter="name"
                filterName='orgId'
                field='orgId'
                width='150px'
                :noBorder="true"
                bgColor='transparent'
                listWidth='150px'
                :title="nowOrgName" 
                @updata = 'chooseOrg'
                :disabled='!isAdmin && !add_branch_company_emp'
                name="orgId"
                padding='0'/>
            </div>
         <vue-table
            item-url="client:/user/list"
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            type='post'
            ref='table'
            :isTime="false"
            :params='params'
            :filter-input="filterInput"
            :filter-btns="filterBtns"
            :condition_server_search='false'
            :isSearch='false'
            @updateItem='updateItem'
            @updateRole='updateRole'
            @updateList='updateList'
            />

        <setAccountRoles :account='chosen' :orgId='nowOrgId' :random='random' @updateList='updateList' @updateRole='updateRole'></setAccountRoles>


        <set-account :account='chosen' :orgId='nowOrgId' @updateList='updateList'></set-account>
        

    </div> 
</template>

<script>

import setAccount  from '../modal/setAccount.vue'
import setAccountRoles from '../modal/setAccountRoles.vue'
import btnSelect from '../../../../../common_component/btn_select.vue'
import vueTable from '../../../../../common_component/vue-table.vue'


    export default {
        components:{
            setAccount,
            setAccountRoles,
            btnSelect,
            vueTable
        },
        data(){
 
            return {
                STOP_EMP: '',
                all:0,
                pageIndex:1,
                accounts:[

                ],
                chosen:{
                    
                },
               
                random: '1',
                isAdmin: ConfigPage.isExist(['isAdmin']) ? true : false,
                add_branch_company_emp: ConfigPage.isExist(['add_branch_company_emp']) ? true :false,
                nowOrgId: '',
                nowOrgName: '',
                params:{
                    pageSize:10,
                    pageIndex:1,
                    orgId: global.ourOrgId
                },
                filterBtns: [
                ],
                filterInput:[
                    {
                        url: "client:/search",
                        flag: "USER",
                        name:"param",
                        label:'员工姓名、登录账号',
                    },
                ],
                tableIterationField:[
                    {
                        tr:'员工姓名',
                        field:'name',
                    },
                    {
                        tr:'角色',
                        field:'role',
                        filter:'arr.role'

                    },
                    {
                        tr:'登录状态',
                        field:'isActive',
                        filter:'status'

                    },
                    {
                        tr:'登录账号',
                        field:'loginId',
                    },
                ],
                linkBtn:[
                    {
                        text:'设置账号',

                        link_if:[["isActive", true], [ 'sysUserId', null, '==' ], [ 'isAdmin', false ]],
                        link_if_type: '||',
                        fn(self, key, value, item_index, item){
                            self.$emit('updateItem', item);
                            $('#account_modal').modal('show');
                        }
                    }, 
                    {
                        text:'设置角色',
                        link_if:[["isActive", true], [ 'sysUserId', null, '!=' ] ],
                        link_if_type: '&&',
                        fn:function(self, key, value, item_index,item){
                            self.$emit('updateRole', item);
                            $('#setAccountRoles').modal('show');
                        }
                    },
                    {
                        text: '启用',

                        link_if:[["isActive", false], [ 'sysUserId', null, '!=' ], [ 'isAdmin', false]],
                        link_if_type: '&&',

                        fn:function(self, key, value, item_index,item){

                            const STOP_EMP = ConfigPage.isExist(['systemSettings', 'STOP_EMP']); 

                            if(status && !STOP_EMP){
                                alert('没有停用权限');
                                return;
                            }
                            console.info(item)
                            send({
                                url: 'client:/user/' + (item.sysUserId ? item.sysUserId : item.hrEmployeeId),
                                type:  'put',
                            }, function(err, res){
                                if(err)return alert('服务器出错，请联系管理员');
                                if(res.status == 200){
                                    alert(res.msg,'success');
                                    self.watchDataForm();
                                }else{
                                    alert(res.msg);
                                }
                            });
                        }
                    },
                    {
                        text: '停用',

                        link_if:[["isActive", true], [ 'sysUserId', null, '!=' ], [ 'isAdmin', false ]],
                        link_if_type: '&&',

                        fn:function(self, key, value, item_index,item){

                            const STOP_EMP = ConfigPage.isExist(['systemSettings', 'STOP_EMP']); 

                            console.log(status);
                            if(status && !STOP_EMP){
                                alert('没有停用权限');
                                return;
                            }

                            send({
                                url: 'client:/user/' + item.sysUserId,
                                type: 'delete',
                            }, function(err, res){
                                if(err)return alert('服务器出错，请联系管理员');
                                if(res.status == 200){
                                    alert(res.msg,'success');
                                    self.watchDataForm();
                                }else{
                                    alert(res.msg);
                                }
                            });
                        }
                    }
                ]
            }
        },
        created(){
            const _this = this;
            let time = null;
            if(global.ourOrgId){
                _this.nowOrgId =  global.ourOrgId ;
                _this.nowOrgName =  global.ourOrgName ; 
            }else{
                setTimeout(function() {
                    _this.nowOrgId =  global.ourOrgId ;
                    _this.nowOrgName =  global.ourOrgName ; 
                }, 500);
            }
        },
        methods: {
            updateItem(item){
                this.chosen = item;
            },
            updateList(){
                this.$refs.table.watchDataForm();
            }, 
            updateRole(item){
                console.log(item)
                this.chosen = item;
                this.random = Math.random();
            },
            modifyStatus(id, status){
                const _this = this;

                if(status && !_this.STOP_EMP){
                    alert('没有停用权限');
                    return;
                }

                send({
                    url: 'client:/user/' + id,
                    type: status ? 'delete' : 'put',
                }, function(err, res){
                    _this.updateList(_this.pageIndex, _this.nowOrgId);
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200){
                        alert(res.msg,'success');
                    }else{
                        alert(res.msg);
                    }
                });
            },
            upPage(page){
                this.updateList(page, this.nowOrgId)
            },
            chooseOrg(name, item){
                this.nowOrgId = item;
                this.$refs.table.watchDataForm({orgId: item});
                this.$refs.table.dataForm["quick_search"].orgId = item;
            }        
        }
    }
</script>

<style>
.account_configuration table td button{
    width: 120px;
}
.account_configuration #search{
    margin-left:149px;
}
.account_configuration  button[name='orgId']{
    border: 1px solid #1786f7 !important;
}
</style>