<template>
	<div class="record">
		<div>
			<div class="flex" v-for='(item, index) of records' :key='item.id'>
				<p class='time' v-html="item.time"></p>
				<div style='overflow:hidden;padding-top:5px;'>
					<div class='circle' ></div>
					<div v-if='index != (records.length - 1)' style='height:100%;width:20px;border-right:1px solid #b9dafd; margin:3px 0;'></div>
				</div>
				<p class='content' v-html='item.content'></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			records: {
				
			}
		},
		data(){
			return {
				// records : [
				// 	{
				// 		time: '2017-02-03 01:01',
				// 		content: '调度员张三创建订单'
				// 	}, {
				// 		time: '2017-02-03 01:01',
				// 		content: '调度员张三将车车主电话18664694885修改为18664694884'
				// 	}, {
				// 		time: '2017-02-03 01:01',
				// 		content: '调度员张三派遣任务给技师王五'
				// 	}, {
				// 		time: '2017-02-03 01:01',
				// 		content: '技师王五将车牌号粤A50001修改为粤A50000'
				// 	}, {
				// 		time: '2017-02-03 01:01',
				// 		content: '技师王五完成任务'
				// 	}
				// ]
			}
		}
	}
</script>

<style scoped>
	.flex{
		display: flex;
	}
	.time{
		text-align:right;
		width: 80px;
	}
	.circle{
		width:10px;
		height:10px;
		border-radius:50%;
		border: 1px solid #b9dafd;
		background: #b9dafd;
		margin: 0 15px;
	}
	.content{
		flex: 1;
	}
</style>