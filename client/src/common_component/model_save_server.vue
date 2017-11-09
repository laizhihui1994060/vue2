<template>
	<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">取消</span></button>
                            <h4 class="modal-title" id="myModalLabel">新建常用条件</h4>
                        </div>
                        <div class="modal-body">
                            <form role="form">
                                <div class="form-group">       
                                    <input type="text" class="form-control" id="condition" placeholder="请输入条件的名字" v-model="condition_name">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="add_quick_search">保存</button>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
	export default {
		data(){
			return{
				condition_name:''
			}
		},
		methods:{
			add_quick_search(){
				this.$emit('add',this.condition_name)
			}
		}
	}
</script>
<style  scoped>
.modal.in .modal-dialog{
	margin-top: 250px !important;
}
</style>