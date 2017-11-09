
let userOnline_page = {

	changDate(data){

		let option = {
		    
		    tooltip: {
		        trigger: 'axis',
		    },
		    legend: {
		        data:['web','app'],
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
		   
		    xAxis : [
		        {
		            type : 'category',
		            name:"公司名称",
		            data: data.orgNames
		        },
		       
		    ],
		    yAxis : [
		        {
		            // name : "公司用户在线人数",
		            type : 'value',
		        },
		       
		    ],
		    series : [
		        {
		            name:'web',
		            type:'bar',
		            label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{a}: {c}',
                            textStyle: {
                                    fontSize: 14
                            }
                        },
                    },
		            data:data.WEB
		        },
		        {
		            name:'app',
		            type:'bar',
		            label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{a}: {c}',
                            textStyle: {
                                    fontSize: 14
                            }
                        },
                    },
		            data: data.APP
		        }
		    ]
		}

		return option;
	}
}


export default userOnline_page;
