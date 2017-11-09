<template>
	<div class="vehilceHistory">
		<vue-table
		   :item-url="'client:/config/bindingList/' + towTruckId"
		   :table-iteration-field="tableIterationField"
		   :linkBtn="linkBtn"
		   type='post'
		   ref='table'
		   :params='params'
		   :filtrationCondition="false"
		   />
	</div>
</template>
 
<script>
	import vueTable from '../../../../../../common_component/vue-table.vue'
	export default {
		components:{
		    vueTable
		},
		props: {
			towTruckId: {}
		},
		data(){
			return {
				params: {
				    "pageSize": 10,
				    "pageIndex": 1,
				},
				
				tableIterationField:[
				    {
				        tr:'时间',
				        field:'switchTime',
				        filter: 'date'
				    },
				    {
				        tr:'类型',
				        field:'switchType',
				        filter: 'switchType'
				    },
				    {
				        tr:'司机',
				        field:'driverName',
				    }
				],
				linkBtn:[
				]
			}
		}
	}
</script>