
let orderOnlineStatus = {

	changDate(data){
		console.log(data)
		return {
		    
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:data.legend
		    },
		    toolbox: {
		    	left: 30,
		        feature: {
		        	saveAsImage: {},
		            magicType: {
                        type: ['line', 'bar']
                    }
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: data.xAxis
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: data.series
		};

	}

}


export default orderOnlineStatus;
