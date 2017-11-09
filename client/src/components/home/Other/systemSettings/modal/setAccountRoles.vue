<template>
    <div id='setAccountRoles' class="modal fade" data-backdrop="static">
            <div class="modal-dialog"> 
                <div class="modal-content">
                    <div class="modal-header">
                        <span  v-if="serverURL(['systemSettings','grant_role'])">设置角色</span>
                        <button type="button" class="close" data-dismiss="modal"  @click='esc'><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    </div>
                    <div class="modal-body">

                        <div class="row"  v-if="serverURL(['systemSettings','grant_role'])">
	                        <div class="col-sm-12 text-center">
	                        	<btn-select 
	                        	    label='角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色' 
	                        	    url='control:/role/drop'
	                        	    filter="name"
	                        	    name="roles"
	                        	    labelRight='8px'
                                    :noBorder='true'
	                        	    width='140px'
	                        	    @updata="integrationDate" />
	                        </div>
                        </div>
                        <h3 class="text-center" v-else style="color:#FF6B0E">你暂无授予角色权限</h3>
                        <div class='row' style="margin-top:15px;"  v-if="serverURL(['systemSettings','grant_role'])">
                        	<div class="col-sm-12  text-center">
                        		<span class="inline-close"  v-for="(it,index) in roles">{{it.name ? it.name : it.roleName}}<i @click="removeRoles(index)"></i></span>
                        	</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btns">
                            <button type="button" class="btn radius-btn" inputWidth='150px' @click='setRoles'  v-if="serverURL(['systemSettings','grant_role'])">保存</button>
                            <button type="button" data-dismiss="modal" class="btn radius-btn" @click='esc' inputWidth='150px'  >取消</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
</template>

<script>
import btnSelect from '../../../../../common_component/btn_select.vue';
import formLabelInput from '../../../../../common_component/form-label-input.vue'
import getData from '../../../../../../static/js/getData.js'
import "../../../../../../static/js/md5.js";
    export default {
        props:{
            account: {

            },
            random:{},
            orgId: {}
        },
        components:{
            formLabelInput,
            btnSelect
        },
        data () {
            return {
                res: [
                	{
                        orgId: this.orgId,
                		grantor: '',
                		roles: []
                	}

                ],
                roles: [],
                index:0,
                nowRoles: []
            }
        },
        watch: { 
        	random(newObj){
                console.log(this.account)
        	if(this.account.role){
                    this.roles = JSON.parse( JSON.stringify(this.account.role) );

                    var roles = this.account.role.map((obj, index) => {
                        return obj.sysRoleId
                    });
                }else{
                    var roles = [];
                }

        		this.res = [
                	{
                        orgId: this.orgId,
                		grantor: this.account.sysUserId,
                		roles: roles
                	}
                ]
        	}
        },

        methods:{
            integrationDate(name,item){
            	const bool = this.res[0].roles.indexOf(item.sysRoleId);

                if(bool == -1){
                    this.res[0].roles.push(item.sysRoleId);
                    this.roles.push(item);
                }else{
                    alert('已有该角色！')
                }
            },
            serverURL(url){
                return ConfigPage.isExist(url);
            },
            // 取消,清除
            esc(){
            	$('#setAccountRoles .setWidth').html('');
            },
            setRoles(){
            	const _this = this;
                $('#setAccountRoles .setWidth').html('');
                send({
                	url: 'control:/role/grant',
                	type: 'post',
                	param: _this.res
                }, function(err, res){
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200){
                        _this.$emit('updateList');

                        alert(res.msg, 'success');
                        $('#setAccountRoles').modal('hide');
                    }else{
                        alert(res.msg);
                        console.log(res);
                    }
                	
                })
            },
            removeRoles(index){
                this.res[0].roles.splice(index, 1);
                this.roles.splice(index, 1);
            }
        }
    }



</script>
<style scoped>

    .modal .modal-dialog{
        width: 450px;
    } 
  	#setAccountRoles .inline-close{
  	    background-color: #f6f6f6;
  	    margin: 10px 10px 10px 0px;
    	min-width:100px;
  	}
    #setAccountRoles .modal-content{
        overflow-y: visible ;
    }
</style>