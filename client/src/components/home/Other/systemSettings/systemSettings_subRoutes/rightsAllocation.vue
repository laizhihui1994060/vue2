    <template>
    <div class="rights_allocation" style="margin-top:20px;">
        <div class="input-append date form_datetime">
            <div class="form-group" >
                <btn-select 
                    title='选择角色'
                    url="control:/role/drop" 
                    filter="name"
                    width='100px'
                    name="rolName" 
                    @updata="queryRol"   
                    padding='0'
                    bgColor='transparent'
                    :updata-key="key" />
            </div>
            <div class="btn-group" >
                <input type="text" class="add_zhi"  placeholder="添加角色名称" v-model="role_text"  autofocus="autofocus"><input type="button" class="add add_weizhi" value='添加' @click="add_role"/>
            </div>
            <div class="btn-group edit" >
                <a href="javascript:;" class='img' @click='edit'></a>
            </div>
        </div>
        <div class='details'>
            <div v-for="(modele,index) in modules">
                <p :mid="modele.mid" @click="add_modeleID"><checkbox :text='modele.name' :name='index' :value="modele.mid" top='0px'  /></p>
                <div>
                    <div style='display:inline-block' @click='add_codeID'>
                        <checkbox 
                            v-for="(operation,index) in modele.operations"
                            :text="operation.desc" 
                            :img-left="true" 
                            :name="operation.desc"
                            :value="operation.code" 
                            top='0px'
                            />
                    </div>
                </div>
            </div>
        </div>
        <div class='operate' style="margin-bottom:20px;padding:0;text-align:center">
            <div class="btns" >
                <input type="button" class="btn btn-primary radius-btn" value='完成编辑' @click='complete' />
                <input type="button" class="btn btn-primary radius-btn" value='删除角色' @click='removeRol' />
            </div>
        </div>
    </div>
</template>

<script>

    import btnSelect from '../../../../../common_component/btn_select.vue'
    import checkbox from '../../../../../common_component/checkbox.vue'

var el = null;
var operate = null;

    export default {
        data(){
            return {
                roles: [],
                result:[],
                role_text:'',
                currentRole:{},
                modules:[],
                key:0
            }
        },
        components:{
            btnSelect,
            checkbox
        },
        methods:{
            edit(event){
                if(!this.currentRole.sysRoleId) return alert('请先选择需要需要赋予权限的角色');

                // if(this.currentRole.name == '超级管理员') return alert('不能修改超级管理员权限!');

                el.attr('disabled', false);
                operate.css('display','block');
            },
            complete(event){                  //为角色赋予权限
                el.attr('disabled', true);
                operate.css('display','none');
                this.result = [];

                var parent = $('.rights_allocation .details').find('p'),
                    parent_oInput,
                    child_oInput,
                    code = [],
                    self = this;

                parent.each(function(index, el) {
                    code = [];
                    parent_oInput = $(el).find('input[type="checkbox"]');    
                    child_oInput = $(el).next().find('input[type="checkbox"]');  

                    child_oInput.each(function(index, el) {
                        if(el.checked)code.push(el.value);
                    }); 

                    if(code){
                        self.result.push({
                            "moduleId": parent_oInput.attr('value'),
                            "code": code,
                            "roleId": self.currentRole.sysRoleId
                        }); 
                    }
                });
                
                send({
                    type:'post',
                    url:'control:/role/grant/permission',
                    param: self.result
                },function(err, res){
                    if(res.status == 200){
                        alert('权限授予成功', 'success');
                    }else{
                        self.queryRol(null, self.currentRole);
                        alert(res.msg);
                    }
                });
            },
            removeRol(evnet){
                const self = this;
                console.log(this.currentRole)
                confirm("是否删除’" + this.currentRole.name +"‘角色", function(){
                    send({
                        type:'delete',
                        url:'control:/role/'+ self.currentRole.sysRoleId
                    },function(err, res){
                        console.log(res);
                        if(res.status == 200){
                            self.key ++
                            alert('删除角色成功', 'success');
                            el.attr('disabled', true);
                            operate.css('display','none');
                            self.currentRole = {};

                        }else{
                            alert(res.msg);
                        }
                    });
                }, true);
                    
                
            },
            queryRol(name, item){                    //查询角色权限
                console.log(item)

                this.currentRole = item;
                var is_checked = false,
                    oInput;

                send({
                    type:'post',
                    url:'control:/role/permission',
                    param:[item.sysRoleId]
                },function(err, res){
                    if(res.status == 200){
                       
                        var content = res.content;

                        oInput = $('.rights_allocation .details').find('input[type="checkbox"]');
                        oInput.each(function(index, el) {
                            el.checked = false;
                        });


                        if(!content.length)return;
                        content[0].operator.forEach(function(cont,index){
                            oInput = $("p[mid='" + cont.moduleId +"']").next().find('input[type="checkbox"]');
                            oInput.each(function(index, el) {
                                cont.code.forEach(function(val,inde){
                                    if(el.value === val){
                                        el.checked = true;
                                    }
                                })
                            });

                            oInput.each(function(index, el) {
                                if(el.checked){
                                    is_checked = true;
                                }else{
                                    is_checked = false ;
                                    return false;
                                };
                            });
                            $("p[mid='" + cont.moduleId +"']").find('input[type="checkbox"]')[0].checked = is_checked;
                        });
                        
                    }else{
                        
                    }
                });
            },
            add_modeleID(ev){

                var code = [];
                var tar = ev ? ev.target : null;
                if(tar){

                    var oInput = $(tar).parent().parent().next().find('input[type="checkbox"]');
                    oInput.each(function(index,el){
                        el.checked = tar.checked;
                    });
                }

               

            },
            add_codeID(ev){

                var is_checked = false;
                
                if(ev && ev.target){
                    var parent = $(ev.target).parent().parent().parent();
                    var parent_oInput = parent.prev().find('input[type="checkbox"]');
                    var child_oInput = parent.find('input[type="checkbox"]');

                    child_oInput.each(function(index, el) {
                        if(el.checked){
                            is_checked = true;
                        }else{
                            is_checked = false;
                            return false;
                        }
                    });

                    if(parent_oInput[0]) parent_oInput[0].checked = is_checked;
                    

                }
            },
            add_role(){
                const self = this;

                if(self.role_text.trim() == '超级管理员') return alert('不能添加“超级管理员”')

                if(this.role_text.trim()){
                    send({
                        type:'post',
                        url:'control:/role',
                        param:{roleName:self.role_text.trim()}
                    },function(err,res){
                            if(res.status == 200){
                                self.key ++
                                alert('添加角色成功', 'success');
                            }else{
                                alert(res.msg);
                                console.log(res)
                                $('.add_zhi')[0].focus();
                            }
                    });
                }else{
                    alert('请输入需要角色的名字');
                    $('.add_zhi')[0].focus();
                }
            }
        },
        created(){

        },
        mounted(){
            const self = this;

            send({
                type:'post',
                url:'control:/role/module'
            },function(err,res){
                if(res.status == 200){
                    console.log("权限",res)
                    self.modules = res.content;
                    self.$nextTick(function(){
                        el = $('.rights_allocation .details input[type="checkbox"]');
                        operate = $('.rights_allocation .operate');
                        el.attr('disabled', true);
                    });
                }else{
                   console.log(res);
                }
            })
        },
        watch:{
            modules(newv,oldv){

            }
        }
    }
</script>

<style>
    .rights_allocation button[name='rolName']{
        border: 1px solid #1786f7 !important;
    }
    .rights_allocation .operate{
        display: none;
    }
    .rights_allocation .my_checkbox input[type='checkbox']{
        top:-1px;
    }
    .rights_allocation .my_checkbox input[type='checkbox']:after{
        margin-left:5px;
    }
    .rights_allocation div.details{
        margin-top:20px;
    }
    .rights_allocation div.details > div {
        margin-bottom:40px;
    }
    .rights_allocation div.details > div > p{
        margin-bottom:10px;
    }
    .rights_allocation div.details > div > div{
        border-top: 1px solid #999;
        border-bottom: 1px solid #999;
        padding:15px 15px;
    }
    .rights_allocation div.details > div > div .my_checkbox{
        margin:0 40px 0 20px;
    }
    .rights_allocation .edit{
        float:right;
    }
    .rights_allocation .edit a{
        display:inline-block;
        width:12px;
        height:12px;    
        background-position:0 -146px;
    }
    .rights_allocation .add_zhi{
        background: #F6F6F6;
        border: 1px solid #1786f7;
        font-size: 12px;
        color: #999;
        padding: 4px 48px 4px 12px;
        line-height: 12px;
        border-radius: 3px;
    }
    .rights_allocation .btn-group .add_weizhi{
        position: absolute !important;
        right: -5px;
        height: 24px!important;
        border-radius: 0 3px 3px 0 !important;
    }

</style>