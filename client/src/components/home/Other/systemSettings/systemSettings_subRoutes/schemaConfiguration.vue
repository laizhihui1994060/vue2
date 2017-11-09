    <template>
    <div id="schemaConfiguration">
        <div class="input-append date form_datetime">
                <btn-select 
                    title='选择角色'
                    url="control:/role/drop" 
                    filter="name"
                    name="rolName" 
                    @updata="queryRol"   
                    bgColor='transparent'
                    padding='0'
                    width="140px"
                    :updata-key="key" />
            <div class="btn-group" >
                <input type="text" class="add_zhi"  placeholder="添加角色名称" v-model="role_text"  autofocus="autofocus"><input type="button" class="btn add add_weizhi"  style="padding:5px 10px;height:inherit" value='添加' @click="add_role"/>
            </div>
           <!--  <div class="btn-group edit" >
                <a href="javascript:;" class='img' @click='edit'></a>
            </div> -->
        </div>
        <div class='details'>
            <template v-for="(item,index) in charts">
                <div class="wrap text-center"  draggable="true" :descName="item.dsName" :index='index' :zindex="item.checked ? item.index : ''">
                    <h3 class="text-center title" v-text="item.desc"></h3>
                    <div style="margin-bottom: 10px;">
                        <img :src="item.templetImg" height="250" width="250" alt="">
                    </div>
                    <checkbox 
                        text="展示" 
                        labelLeft="0"
                        labelSize="16px"
                        :noSend="true"
                        :name="item.dsName" 
                        :checked="item.checked"
                        :disabled="disabled"
                        @updata="integrationDate"/>
                </div>
            </template>
        </div>
    </div>
</template>

<script>

    import btnSelect from '../../../../../common_component/btn_select.vue'
    import checkbox from '../../../../../common_component/checkbox.vue';
var el = null;
var operate = null;

    export default {
        data(){
            return {
                charts: [],
                role_text:'',
                sysRoleId:'',
                modules:[],
                key:0,
                disabled:true
            }
        },
        components:{
            btnSelect,
            checkbox
        },
        methods:{
            edit(event){
            },
            addChart(name){  
                if(this.valid())return ;

                // this.charts.forEach((item,index)=>{
                //     if(item.dsName == name){
                //         this.charts[index].checked = true;
                //         this.charts.splice(index,1);

                //         for (var i = this.charts.length - 1; i >= 0; i--) {
                //             if(this.charts[i].checked){
                //                 this.charts.splice(i+1,0,item);
                //                 break;
                //             }else{
                //                 this.charts.unshift(item);
                //                 break;
                //             }
                //         }
                //     }
                // });

                const self = this;

                const param = {
                    "dsName": name,
                    "roleId": this.sysRoleId,
                    "tenantId": global.tenantId
                };

                send({
                    type:'post',
                    url:'control:/chart/tenant/role',
                    param: [param]
                },function(err, res){
                    if(err)return alert(err);
                    if(res.status == 200){
                        console.log('图表权限授予成功', 'success');
                        self.queryRol();

                        send({
                            type:'get',
                            url:'control:/chart/tenant/user'
                        },function(err,res){
                            res.content.length ? ConfigPage.updateChart(true) : ConfigPage.updateChart(false) ;
                        });


                    }else{
                        alert(res.msg);
                    }
                });
            },
            removeChart(name){
                if(this.valid())return ;

                // this.charts.forEach((item,index)=>{
                //     if(item.dsName == name){
                //         item.checked = false;
                //         this.charts.splice(index,1);
                //         this.charts.push(item);
                //     }
                // });

                const self = this;

                const param = {
                    "dsName": name,
                    "roleId": this.sysRoleId,
                    "tenantId": global.tenantId
                };
                console.log(param);

                send({
                    type:'delete',
                    url:'control:/chart/tenant/role',
                    param: param
                },function(err, res){
                    console.log(err,res)
                    if(res.status == 200){
                        console.log('删除图表权限成功', 'success');
                        self.queryRol();

                        send({
                            type:'get',
                            url:'control:/chart/tenant/user'
                        },function(err,res){
                            res.content.length ? ConfigPage.updateChart(true) : ConfigPage.updateChart(false) ;
                        });
                        
                    }else{
                        alert(res.msg);
                    }
                });
                    
                
            },
            queryRol(name, item){                    //查询角色权限
                this.disabled = false;                
                if(name)this.sysRoleId = item.sysRoleId;
                const self = this;

                self.charts.forEach((item,index)=>{
                    item.checked = false;
                });

                send({
                    type:'get',
                    url:'control:/chart/tenant/role/' + this.sysRoleId 
                },function(err, res){
                    if(err)return alert(err);
                    if(res.status == 200){

                        console.log(res);
                       
                        res.content.forEach((item,index)=>{

                            for(let j = 0 ; j < self.charts.length;j++){

                                if(item.dsName === self.charts[j].dsName){
                                    item.desc = self.charts[j].desc;
                                    item.templetImg =  self.charts[j].templetImg;
                                    item.checked = true;
                                    self.charts.splice(j,1);
                                }
                            }

                        });
                        self.charts = res.content.concat(self.charts);
                        console.log( self.charts )
                    }else{
                        console.log(err,res)
                    }
                });
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
            },
            integrationDate(name,item){
                item ? this.addChart(name) : this.removeChart(name);
            },
            valid(){
                const btn = $('#schemaConfiguration').find('[name="rolName"]');
                if(!this.sysRoleId){
                    btn.css({border:'1px solid #FF6B0E'})
                    alert('请先选择需要需要赋予权限的角色');
                    return true; 
                };
                if(!global.tenantId){
                    alert('获取个人信息失败,请刷新重试'); 
                    return true;
                }
                    btn.css({border:'0'})

            }
        },
        mounted(){
            const self = this;

            send({
                type:'post',
                url:'control:/sys/param/org',
                param:['/sys/chart/list']
            },function(err,res){
                console.log(res)
                if(err)return alert('系统出错，请联系管理员');
                if(res.status == 200){
                    self.charts = res.content[0].value.values;

                    self.$nextTick(function(){
                        let wraps = document.querySelectorAll('#schemaConfiguration .wrap');
                        let target = null;
                        [...wraps].forEach((item,index)=>{

                            item.addEventListener('dragstart',function(ev){
                                const evt = ev || event;
                                target = this;
                            });

                            item.addEventListener('drag',()=>{});
                            item.addEventListener('dragend',()=>{});

                            item.addEventListener('dragenter',function(){
                            });

                            item.addEventListener('dragleave',function(){
                            });

                            item.addEventListener('dragover',function(ev){
                                const evt = ev || event
                                evt.preventDefault();  //阻止默认行为，使得drop可以触发  
                            });

                            item.addEventListener('drop',function(ev){
                                let target_zindex = target.getAttribute('zindex');

                                if(!target_zindex)return;
                                if(self.valid())return ;

                                const evt  = ev || event;
                                const source = $(evt.target).parents('.wrap')[0];


                                let source_index = Number(source.getAttribute('index'));
                                let source_zindex = Number(source.getAttribute('zindex'));

                                let target_index = Number(target.getAttribute('index'));
                                let target_name = target.getAttribute('descName');

                                console.log( source_index,source_zindex)
                                console.log( target_index,target_name)
                                    source.className = 'wrap text-center';
                                    source.style.marginLeft =  0;

                                    


                                    if( source_index > target_index ){
                                        self.charts.splice(source_index + 1 ,0,self.charts[target_index]);
                                        self.charts.splice(target_index,1);

                                    }else{

                                        self.charts.splice(source_index  ,0,self.charts[target_index]);
                                        self.charts.splice(target_index + 1,1);
                                    };



                              

                                const param = {
                                    "dsName": target_name,
                                    "index": source_zindex,
                                    "roleId": self.sysRoleId,
                                    "tenantId": global.tenantId
                                };

                                send({
                                    type:'put',
                                    url:'control:/chart/tenant/role',
                                    param:param
                                },function(err,res){
                                    if(err)return alert('服务器出错，请联系管理员');
                                    console.log(res);
                                    self.queryRol();

                                })
                            });
                        })
                    });
                    console.log(self.charts)
                }else{
                    alert('获取图表配置失败');
                }
            });


        }
    }
</script>

<style>
    #schemaConfiguration .operate{
        display: none;
    }
    #schemaConfiguration .my_checkbox input[type='checkbox']{
        top:-1px;
    }
    #schemaConfiguration .my_checkbox input[type='checkbox']:after{
        margin-left:5px;
    }
    #schemaConfiguration div.details{
        margin-top:20px;
        position: relative;

    }
    #schemaConfiguration div.details .wrap{
        width: 300px;
        padding: 20px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        float: left;
        margin-left: 0;
        perspective:200px;
    }
    #schemaConfiguration .edit{
        float:right;
    }
    #schemaConfiguration .edit a{
        display:inline-block;
        width:12px;
        height:12px;    
        background-position:0 -146px;
        margin-top:20px;
    }
    #schemaConfiguration  .add_zhi {
        background: #F6F6F6;
        border: 1px solid #1786f7 !important;
        font-size: 12px;
        color: #999;
        padding: 4px 48px 4px 12px;
        line-height: 12px;
        float: left;
        width: 180px;
        border-radius: 3px 0 0 4px;
    }
    #schemaConfiguration .add_weizhi{
        margin-left: -60px;
    }
    .title{
        margin-bottom: 10px;
    }
    #schemaConfiguration button[name='rolName'] {
        border: 1px solid #1786f7 !important;
    }
   
</style>