<template>
	<common-report 
		:iframeId="iframeId"
		:report_title="report_title"
		:reportType="reportType"
	/>
</template>

<script>
	import commonReport from './commonReport.vue'
	export default{
		components:{
			commonReport
		},
		data(){
			return {
				report_title: "单车日报表",
				reportType:"TRUCK_BUSINESS_DAILY_REPORT",
				iframeId:"truckBusinessDailyReport"
			}
		}
	}
</script>