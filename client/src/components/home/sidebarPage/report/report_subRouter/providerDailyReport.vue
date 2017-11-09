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
				report_title: "服务商日报表",
				reportType: "PROVIDER_DAILY_REPORT",
				iframeId: "providerDailyReport"
			}
		}
	}
</script>