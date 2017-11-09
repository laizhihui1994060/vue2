<template>
	<common-report 
		:iframeId="iframeId"
		:report_title="report_title"
		:reportType="reportType"
		:rangeConfig="rangeConfig"
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
				report_title: "技师月报表",
				reportType: "TECHNICIAN_MONTHLY_REPORT",
				iframeId: "technicianMonthlyReport",
				rangeConfig:[
				    {text:'过去一周',param:'PREWEEK'},
	                {text:'近一月',param:'MONTH'},
	                {text:'近三月',param:'TRIPLEMON'},
	                {text:'近一年',param:'YEAR'}
	            ]
			}
		}
	}
</script>