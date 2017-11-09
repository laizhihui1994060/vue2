<template>
<div class="modal fade" id="historyDetailModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h3 class="modal-title" id="myModalLabel">历史版本</h3>
		</div>
		<div class="modal-body">
			<div class="version-item" v-for="item in versions">
				<div v-html="item"></div>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		</div>
	</div>
	</div>
</div>
</template>
<script>
	export default{
		data(){
			return {
				versions:require('../../../config-version.js').version_introduce
			};
		}
	}
</script>
<style>

	#historyDetailModal>.modal-dialog{
		max-width: 50%;
		min-width: 480px;
		margin-top: 46px;
	}
	#historyDetailModal pre{
		padding: 0;
		background: #fff;
		border: none;
	}
	#historyDetailModal .modal-body,.modal-footer{
		border-top:1px solid #e5e5e5;
	}
	#historyDetailModal .modal-dialog{
		max-height: 90%;
		overflow: auto;
	}
	#historyDetailModal .modal-body{
		padding: 0;
	}
	#historyDetailModal .version-item{
		padding: 8px 15px;
		border-bottom: 1px solid #ccc
	}
	#historyDetailModal .version-item p{
		padding-left: 1.5em;
		margin-top: 5px;
	}
	.modal-content{
		border-width: 0;
	}
</style>