<template>
	<div  class="modal fade" id="res_selectShare">
        <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	                <h4 class="modal-title" id="myModalLabel" style='text-align: center;color:#FF6B0E;font-size:24px;'>选择投标人</h4>
	            </div>
	            <div class="modal-body">
	            	<table class="table table-bordered table-hover">
	            		<thead>
		            		<tr>
		            			<th></th>
		            			<th>公司</th>
		            			<th>技师姓名</th>
		            			<th>车牌</th>
		            			<th>技师电话</th>
		            			<th>车辆类型</th>
		            			<th>距离/时间</th>
		            			<th>投标价</th>
		            		</tr>
	            		</thead>
	            		<tbody>
		            		<tr v-for="(item,index) in shareMan"  @click="selectShareMan(index,item)">
		            			<th><radio 
										name='a'
										parent-margin-right="0"
										top="0"
										radio-margin-top="0"
										:value="item.driverId ? item.driverId : '' + ',' + item.truckId ? item.truckId : ''"/>
		            			</th>
		            			<td v-text="item.orgName"></td>
		            			<td v-text="item.driverName"></td>
		            			<td v-text="item.plateNo"></td>
		            			<td v-text="item.driverPhone"></td>
		            			<td v-text="item.carCategory"></td>
		            			<td v-text="item.distance + ' / ' + item.drivingTime"></td>
		            			<td v-text="item.bidPrice"></td>
		            		</tr>
	            		</tbody>
	            	</table>
            		<h3 v-if="!shareMan.length" class="text-center">暂无投标人</h3>

	            </div>
	            <div class="modal-footer" style='text-align: center;'>
	            	<div class="btns">
		                <button type="button" class="btn" @click="submit">确定选择</button>
		                <button type="button" class="btn" data-dismiss="modal">关闭窗口</button>
	            	</div>	                
	            </div>
	        </div>
        </div>
    </div>
</template>
<script>
	import radio from "../../../../../common_component/radio.vue";

	export default{
		data(){
			return {
				shareMan:[],
				el : null,
				res:{
				 	"shareActionId": "string",
				  	"bidId": "string",
				  	"responseComment": "",
				  	"dispatchEntity": {
					    "id": "string",
					    "driverId": "string",
					    "towTruckId": "string",
					    "dispatchMethod": "WEB",
					    "dispatchActionType": "string",
				  	}
				}
			}
		},
		components:{
			radio
		},
		methods:{
			selectShareMan(index,item){
				const el = $('#res_selectShare tbody').find('tr')[index];

				$('#res_selectShare tbody').find('tr').css({backgroundColor:'#fff'})

				el.style.backgroundColor="#dfe6ec";

				this.el = el.querySelector('input');
				this.el.checked = true;
				
				this.res.bidId = item.bidId;
				this.res.dispatchEntity.driverId = item.driverId;
				this.res.dispatchEntity.towTruckId = item.truckId;

				console.log(item)
			},
			getShareMan(id,obj){
				const self = this;

				this.el = null;
				this.shareMan = null;

				this.res.shareActionId = obj.shareActionId;
				this.res.dispatchEntity.dispatchActionType = obj.shareActionType;
				this.res.dispatchEntity.id = obj.orderId;
				console.log(this.res)

				send({
					type:'post',
					url:'order:/share/bid/drivers',
					param:{
						"id": id,
						"pageSize": 10000,
						"pageIndex": 1
					}
				},function(err,res){
					if(err)return alert('服务器出错，请联系管理员');
					if(res.status == 200 || res.status == 404 ){
						console.log(res.content)
						self.shareMan = res.content ? res.content : [];
					}else{
						alert(res.msg);
						console.log(res);
					}
				});
			},
			submit(){
				if(!this.el)return alert('请先选择一个投标人');

				const self = this;

				console.log(this.res);

				send({
					type:'post',
					url:'order:/share/choose',
					param:this.res
				},function(err,res){
					if(err)return alert('服务器出错，请联系管理员');
					if(res.status == 200){
                		$('#res_selectShare').modal('hide');
                		self.res = {
						 	"shareActionId": "",
						  	"bidId": "",
						  	"responseComment": "",
						  	"dispatchEntity": {
							    "id": "",
							    "driverId": "",
							    "towTruckId": "",
							    "dispatchMethod": "WEB",
							    "dispatchActionType": "",
						  	}
						}
						self.shareMan = [];
                        self.$emit('updatakey',++self.num);
						alert(res.msg,'success');
					}else if(res.status == 404){
						$('#res_selectShare tbody').find('tr').css({backgroundColor:'#fff'})
						self.el.checked = false;
						self.el = null;
						alert(res.msg);
					}else{
						alert(res.msg);
					}
						console.log(res);

				})



			}
		}
	}
</script>
<style scoped>
	body .modal-content{
		width: 700px;
	}
	tr:nth-child(1n+2):hover{
    	background: #dfe6ec !important
	}
	th{
	    border: 1px solid #d8d8d8;
	    color: #999999;
	    padding: 8px;
	}
	td{
	    padding: 8px;
	    line-height: 1.42857143;
	    vertical-align: top;
	    border-top: 1px solid #ddd;
	    border: 1px solid #ddd;
	    cursor: pointer;
	}
	#selectShare .btns button:nth-child(2){
		margin-left: 0;
		margin-right: 0;
	}
</style>