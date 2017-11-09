<template>
	<ol class="breadcrumb">
<!-- 		<li v-for="(item, index) in arr">
			<router-link :class="{'router-link-active':item.default}" :to="item.path" v-text="item.text">部门管理</router-link>
		</li> -->
		<li v-for="(item, index) in newArr">
			<a href="javascript:void(0);" onClick="javascript :history.back(-1);" v-if="item.path == 'auto'" v-text="item.text"></a>
			<router-link v-else :class="{'router-link-active':item.default}" :to="item.path" v-text="item.text"></router-link>
			
		</li>
	</ol>
</template>
 
<script>
	export default {
		props:['arr','text'],
		data(){
			return {
				newArr:[]
			}
		},
		created(){
			this.fn();
			
		},
		methods:{
			fn(){
				const from = JSON.parse( local.getItem('from') );

				this.newArr = this.arr.filter(function(it,index) {
					return index > 0;
				})
				this.newArr.unshift(from);
			}
		},
		watch:{
			arr(newv){
				this.fn();
			}	
		}
	}
</script>

<style scoped>
	.breadcrumb{
		padding: 0;
		margin-bottom:  24px;
		background: none;
	}
	.breadcrumb a{
		color: #999;
	}
	.breadcrumb a:hover{
		color: #39b6e5
	}
	.breadcrumb li:first-child a:hover{
		color: #39b6e5 !important;
	}
	.router-link-active{
		color: #1785F7 !important;
	}
	li:first-child > a {
		color:  #9a9696 !important;
	}
</style>