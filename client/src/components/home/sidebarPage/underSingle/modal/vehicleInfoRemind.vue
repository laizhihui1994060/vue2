<template>
	<div id="remind-modal" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h3 class="modal-title">事件提醒</h3>
				</div>
				<div class="modal-body">
					<div class="eventListTable table_box table-responsive">
						<table class="table table-bordered centerAlignTable" :class="">
							<thead>
								<tr>
									<th></th>
									<th>事件名称</th>
									<th>执行时间</th>
									<th>剩余时间</th>
									<th>车牌</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(i,index) in remindArr">
									<td>
										<span 
											data-toggle="tooltip" 
											data-placement="top" 
											title="不再提醒" 
											class='cancel-remind' 
											@click="cancelRemind(index)">&times;</span>
									</td>
									<!-- <td>
										<span class="glyphicon glyphicon-remove" 
												aria-hidden="true"></span>
									</td> -->
									<td v-text="covertString(i.calendarType, 'type')"></td>
									<td v-text="covertString(i.endTime, 'date')"></td>
									<td v-text="covertString(i.restTime, 'oneday')"></td>
									<td v-text="i.plateNo"></td>
<!-- 									<td>
										<div class="plate-block" v-text="i.plateNo"></div>
										<div class="dropdown-wrap">
											<a class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">O</a>
											<ul class="dropdown-menu">
												<li><a @click="remindDelay(index,60)">延迟1小时提醒</a></li>
												<li><a @click="remindDelay(index,180)">延迟3小时提醒</a></li>
												<li><a @click="remindDelay(index,300)">延迟5小时提醒</a></li>
											</ul>
										</div>

									</td> -->
								</tr>
							</tbody>
						</table>
						<h3 class="no-data text-center" v-if='!remindArr.length'>暂无数据</h3>
					</div>
					
				</div>
				<div class="modal-footer">
<!-- 					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Save changes</button> -->
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
</template>
<script>
	export default {
		props:{
			fromLogin:{
				default:true
			}
		},
		data () {
			return {
				// remindDelayIcon:require('./')
				modalPopped: false,
				remindArr:[],
				foo:"bar"
			}
		},
		methods:{
			cancelRemind(index){
				console.log(this.remindArr[index])
				var params = {
					id:this.remindArr[index]['id'],
					calendarId:this.remindArr[index]['calendarId']
				}
				var delConfirm = confirm("确定要取消这条提醒吗？", sure => {
					if(sure){
						send({
							type:'put',
							url: 'client:/calendar/event_type/cancel?id=' + params.id + '&calendarId=' + params.calendarId,
						}, (err,res)=>{
							if(err) return console.log(err)
							if(res.status === 200 ){
								console.log(res)
								this.remindArr.splice(index,1)
							} else {
								console.log(res)
								console.log("取消失败")
							}
						})
					}
				})
				

				
			},
			
			requestRemindInfo(){
				this.modalPopped = true;
				console.log('总线',bus.enableRemind)
				if (!bus.enableRemind) {
					console.log("不再t")
					return;
				}
				send({
					type: 'post',
					url: 'client:/calendar/event_type/notices',
					param:{
						"pageSize"	: 5,
						"pageIndex"	: 1
					}
				}, (err,res) => {
					if(err) return alert(err)
					if(res.status === 200){
						console.log("查询提醒记录成功",res)
						this.remindArr = res.content.filter(it=>{
							if(true || it.remind){
								return true;
							} else {
								return false;
							}			
						}).map(it=>{
							console.log("结束时间",new Date(it.endTime).Format("yyyy-MM-dd"))
							return {
								id 			 : it.id,
								restTime 	 : ( it.endTime - new Date().setHours(0,0,0,0) ),
								endTime 	 : it.endTime,
								plateNo 	 : it.plateNo,
								remindTime 	 : it.remindTime,
								calendarId   : it.calendarId,
								calendarType : it.calendarType,
							}
						})
						if(this.$route.path === "/LoginFinish/UnderSingle"){
							$('#remind-modal').modal("show");
						}
						bus.enableRemind = false;
						
					} else {
						console.log("查询提醒记录失败",res)	
					}
				})
			},
			remindDelay(index,delay){
				console.log("提醒对象", this.remindArr[index]);
				console.log("延迟时间", delay)
			},
			covertString(col,type){
				if(type === "oneday"){
					return parseInt(col/24/3600/1000) + "天"
				} else if (type === "date"){
					return new Date(col).Format('yyyy-MM-dd')
				} else if (type === "type"){
					switch(col){
						case "VERIFICATION"	: return "年审";
						case "INSURANCE"	: return "保险";
						case "PASS_CHECK"	: return "通行证";
						case "MAINTAIN"		: return "保养";
						case "REPAIR" 		: return "保养";
						default 			: return col;
					}
				}
			},
			serverURL(url){
               return ConfigPage.isExist(url);
            }
		},
		created () {
			
		},
		
		mounted () {
			console.log("提醒路由",this.$route)
			// bus.$on("login_enter_mainPage", func=>{
			// 	console.log("event trap")
			// 	this.requestRemindInfo()
			// })
			if(!this.modalPopped){
				this.requestRemindInfo()
			}
			$('#remind-modal').on("hidden.bs.modal", func=>{			
				this.modalPopped = false
			})
		}
	}
</script>

<style scoped>
	#remind-modal .modal-dialog{
		margin-top: 160px;
	}
	#remind-modal .modal-content{
		border-radius: 5px;
	}
	#remind-modal .modal-header{
		padding: 8px;
		text-align: center;
		/*background: #333;*/
		color: #333;
		line-height: 30px;
	}
	.eventListTable{
		margin-top: 12px;
	}
	.centerAlignTable, .centerAlignTable th{
		text-align: center;
	}
	.modal-header .close span{
		color:#333 ;
		/*opacity: 0.5;*/
		font-size: 30px;
		line-height: 30px;
		font-weight: normal;
	}
	.modal-header .close{
		opacity:0.7;
	}
	.eventListTable table thead th{
		background: #f3f7f9;
		border-bottom: 0;
		color: #333;
		font-size: 14px;
		font-weight: bold;
	}
	.cancel-remind{
		font-size: 20px;
		color: #999;
		cursor: pointer;
	}
	.eventListTable table tbody tr:nth-child(2n){
		background: #f3f7f9;
	}
	.modal-footer,.modal-body{
		padding-bottom: 0px;
	}
	.dropdown-wrap{
		display: inline-block;
		position: relative;
		left: 20px;
		padding:0px;
	}
	.dropdown-wrap ul.dropdown-menu{
		width: 157px;
		left: -127px;
	}
</style>