<template>
	<div class="liteTable table_box table-responsive">
		
		<table class="table table-bordered" :class="{centerAlignTable:centerText}">
			<thead>
				<tr>
					<!-- 填充有操作的表头 -->
					<th v-for="o in left_operation"
						v-show="left_operation.length && !!o" />					
					<th v-for="i in table_keys" v-text="i"></th>
				</tr>
			</thead>	
			<tbody v-if='table_vals.length'>
				<tr v-for="(items,row) in table_vals">
					<!-- operation -->
					<td v-show="left_operation.length && !!o" v-for="o in left_operation" >
						<a v-if="constraitArr[row]" href="javascript:void(0);">
							<img :src="editImg" width="16" alt="编辑" @click="processEvent(row,o)">
						</a>
					</td>
					<!-- column info -->
					<td v-for="(i,name) in items" v-text="convert(i,name)"></td>
				</tr>
			</tbody>
		</table>
		<!-- dividePage -->
		<h3 class="no-data text-center" v-if='!table_vals.length'>暂无数据</h3>
	</div>
</template>
<script>
	import editImgSrc from "../assets/new_edit.png";
	export default {
		props:{
			centerText:{
				type: Boolean,
				default: true
			},
			left_operation:{
				type: Array,
				default: function(){
					return []
				}
			},
			right_operation:{
				type: Array,
				default: function(){
					return []
				}
			},
			table_keys:{
				type: Array,
			},
			table_vals:{//显示值
				type: Array,
			},
			real_vals:{//包括隐藏的值
				type: Array,
			},
			convertDepencies:{
				type: Function,
				default: param=>param
			},
			last_edit_only:{
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				editImg: editImgSrc,
				constraitArr: []
			}
		},
		methods:{
			processEvent(index,name){
				console.log("点出发")
				this.$emit("emitedit", index, this.table_vals[index])
			},
			convert(param,name){
				return this.convertDepencies(param,name)
			}
		},
		mounted(){		
		},
		watch:{
			table_vals:function(newVal){
				this.constraitArr = new Array(this.table_vals.length).fill(true);
				if(this.last_edit_only){
					this.constraitArr = this.constraitArr.fill(false)
					this.constraitArr[this.constraitArr.length-1] = true;
				}
			}
		}

	}
</script>
<style scoped>
	.liteTable .no-data{

	}
	.liteTable thead{
		background:#f3f7f9;
	}
	.liteTable thead th{
		border-bottom-width: 1px;
		color:#999;
	}
	.liteTable tbody>tr:nth-child(even){
		background:#f3f7f9;
	}
	.liteTable tbody>tr:hover{
		background: #e7f2fe;
	}
	.liteTable tbody>tr>td{
		font-size: 14px;
	}
	.liteTable .centerAlignTable td,.liteTable .centerAlignTable th{
		text-align: center;
	}
</style>