<template>
	<div id='history_search' v-if='historySearch.isShow'>
		<p class="title">历史搜索</p>
		<div class='history'>
			<div v-for='( searchItem, index ) of historySearch.searchItems'>
				<span class='close' @click='del(index)'>x</span>
				<button @click='search(index)'><span v-for='item of searchItem'>{{item}}、</span></button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{

		props: {
			historySearch: {
				isShow: true,
				searchItems: [
					{
						x: '111',
						xx: '2222',
						xxx: '3333'
					},
					{
						x: '4444',
						y: '7777'
					}
				],
			}
		},
		data(){
			return {
				domParam:{
	                condition:{},
	                quick:{}
	            },//重置DOM用
	            inputWithId:["customerId","driverId","partnerId","hrEmployeeIdOwner","deptId","parkingLotId","orgId","towTruckCatId","positionId","deptId","sysOrgId","parkingLotId"],
	            history_search:[
	                
	            ],//历史面板条目，该条目与detal_pool同时进行
	            historySearchEnable:true,

			}
		},
		methods:{
			del(index){
				this.historySearch.searchItems.splice(index,1);
			},
			//历史搜索
			search(index){
				bus.$emit('historySearch', this.historySearch.searchItems[index])
			}
		},
		mounted(){
			console.log(this.historySearch)
		}
	}
</script>

<style>
	#history_search{
		color:#999;
		font-size:12px;
		width:190px;
		margin:0px auto;
		padding-top:100px;
	}
	#history_search .title{
		margin-left:30px;
	}
	#history_search .history{
		border-top:1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
		padding:10px 0;
		margin-left:30px
	}
	#history_search .history div{
		background:transparent;
		
		width:100%;
		height: 22px;
		padding:3px;
		margin:5px 0;
		position: relative;
		display: flex;
	}
	#history_search .history div button{
		flex:1;
		background: transparent;
		border:1px solid #e0e0e0;
		padding:0 5px;
		/*省略*/
		white-space:nowrap; 
		overflow:hidden; 
		text-overflow:ellipsis;
	}
	#history_search .history div:hover button{
		border-radius:10px !important;
		border-color:#999;
		
	}
	#history_search .history div:hover .close{
		display: inline-block;
		color:red;
		font-weight:bold;

	}
	#history_search .history .close{
		font-size:18px;
		margin-right:10px;
		font-weight:bold;
		position: relative;
		top:-1px;
		display: none;
	}
		
		
</style>