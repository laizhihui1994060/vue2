<template>
	<div id="saveHisModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<p class='close' data-dismiss="modal">
                        <span class="glyphicon glyphicon-remove close"></span>
                    </p>
					<h4>保存当前的过滤条件</h4>
				</div>
				<div class="modal-body">
						<!-- <div>
							<p>当前条件：<span>{{condition}}</span></p>
						</div> -->
						<div class="form-group">
							<label>名称：</label><input class="form-control" type="text" name="userDefineName" @keydown.enter="emitRecord" placeholder="请输入要保存的过滤器名称">
							<!-- <span class="clear_input">&times;</span> -->
						</div>
					<div class="row">
						<button type="button" id="clear_filter" class="btn default-btn col-md-offset-10" style="color:#000" @click="emitRecord">保存</button>
					</div>
				</div>
			</div>
				
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			condition:{
				type:Object
			}
		},
		data(){
			return{

			}
		},
		methods:{
			emitRecord(domObj){
				if($('[name="userDefineName"]').val() == ""){
					alert("请输入名称");
					return;
				}
				this.$emit('savetrigged',$('[name="userDefineName"]').val());
				
			},
			enterTrigger(ev){
				let e = ev || window.event;
				if(e.keyCode == 13){
					this.emitRecord(ev.currentTarget);
				}
			},
			covertName(item){
				let str = "";
				for(let i in item){
					if(i == "pageSize" || i == "pageIndex" || !item[i]){
						continue;
					}
					let _key = $(`[name=${i}]`).attr('title')
					let _val = $(`[name=${i}]`).val() ? $(`[name=${i}]`).val() : $(`[name=${i}]`).html();
					if(_val === '' || _val === '全部')continue;
					str += `${_key}-${_val} `
				}
				return str;
			}
		}
	}
</script>
<style scoped>
	.modal-content{
		border-radius: 10px;
	}
	#saveHisModal .form-control{
		display: inline-block;
		width: 90%;
	}
	.close{
		opacity:0.4;
	}
	.close:hover{
		opacity:0.6;
	}
</style>