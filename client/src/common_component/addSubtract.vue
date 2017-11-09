<template>
	<div class='add_subtract'>
		<button @click='subtract' class='subtract'>-</button>
		<input type="text" :value='value' :index='index'/>
		<button @click='add' class='add_num'>+</button>
	</div>
</template>

<script>
	export default {
		props: ['value', 'index'],
		methods: {
			add() {
				$(event.target).siblings('input[type="text"]').val(function(index, value){
					return parseInt(value) + 1;
				})
				var res = $(event.target).siblings('input[type="text"]').val();
				var index = $(event.target).siblings('input[type="text"]').attr("index");
				this.$emit('updata', index, res);
			},
			subtract() {
				$(event.target).siblings('input[type="text"]').val(function(index, value){
					const result = parseInt(value) - 1;
					return result < 0 ? 0 : result;
				});
				var res = $(event.target).siblings('input[type="text"]').val();
				var index = $(event.target).siblings('input[type="text"]').attr("index");
		        this.$emit('updata', index, res);
			}
		}
	}
</script>

<style scoped>
	.add_subtract{
		display: inline-block;
	}
	.add_subtract input[type='text']{
		width:46px;
		height: 22px;
		text-align: center;
		background: #DFF5FD;
		font-size:12px;

	}
	.add_subtract .subtract,
	.add_subtract .add_num{
		width: 20px;
		height: 22px;
		background: #39B6E5 ;
		color:#fff ;
	}
</style>