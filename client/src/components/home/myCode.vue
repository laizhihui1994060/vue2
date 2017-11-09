<template>

<!-- Modal -->
    <div class="modal fade" id="myCode" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">我的平台编码</h4>
                </div>
                <div class="modal-body">
                    <p>此编码用于本平台内其他救援公司将本公司为其服务商</p>
                    <p>1. 复制本编码给其他救援公司</p>
                    <p>2. 其他救援公司在服务商管理中根据编码进行邀请</p>
                    <p>3. 通过其邀请，便成为其服务商</p>
                    <p v-text="myCode" class="text-center url" style="color:#d00707"></p>
                </div>
                <div class="modal-footer">
                    <div class="btns">
                        <button type="button" class="btn" @click='updateCode'>更新平台编码</button>
                        <button type="button" class="btn" data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        data () {
            return {
               myCode: ''
            }
        },
        created(){
            const self = this;
            send({
            	url: 'client:/partnerinvitation',
            	type: 'get'
            }, function(err, res){
            	if(res.status == 200){
            		self.myCode = res.content[0].code;
            	}else if(res.status == 404){
            		send({
            			url: 'client:/partnerinvitation',
            			type: 'post'
            		}, function(err, res){
            			if(res.status == 200){
            				self.myCode = res.content[0].id;
            			}
            		})
            	}
            })
        },
        methods:{
        	updateCode(){
        		const self = this;
        		send({
        			url: 'client:/partnerinvitation/regenerate',
        			type: 'put'
        		}, function(err, res){
        			if(res.status == 200){
        				self.myCode = res.content[0].id;
        			}
        		})
        	}
        }
    }
 

</script>
<style scoped>
    .modal-body{
        padding-bottom: 0
    }
    .modal.in .modal-dialog{
        width: 400px;
    }
   .modal-header h4{
        color: #FF6B0E;
   }
   .btns button:nth-child(2){
        margin-left: 50px;
   }
</style>