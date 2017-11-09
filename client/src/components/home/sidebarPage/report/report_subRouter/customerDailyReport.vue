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
				report_title: "客户日报表",
				reportType: "CUSTOMER_DAILY_REPORT",
				iframeId: "customerDailyReport"
			}
		}
	}
</script>