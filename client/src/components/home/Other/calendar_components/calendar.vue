<template>
<div>

 	<div id="header">
	 	<div id="header_title">日历管理</div>
	</div>
	<maincalendar></maincalendar>
	<new-event :elemCalendar='elCalen' >
	</new-event>
<!-- 	<div v-show='pannelShow' id="event-hover-pannel"
		:style="{
			backgroundColor:'#ccc',
			minWidth:'200px',
			minHeight:'40px',
			position:'absolute',
			zIndex:'1000'
		}" 

	>
			<span v-text='pannelText'></span>
		</div> -->
</div>	

</template>
<script>

	import maincalendar from './main_calendar.vue'    
	import newEvent from './newEvent.vue'
	import  '../../../../../static/js/fullcalendar.js'    

	export default{
		data () {
		    return {
		    	elCalen:{},
		        li_active:"0",	
		    }
		},
		methods:{

		},
		mounted(){
			var self=this;
		    this.elCalen = $("#calendar");
		
		},
		components:{
			maincalendar,
			newEvent,
		}
	
}

</script>
<style scoped>

	 #header{
	    	width:100%;
	    	height:40px;
	    	margin:10px auto;
	    	margin-top: 0;
	    	background-color:#DFF5FD;
	 }
	 #header_event{
	 	position:relative;
	 	float:left;
	 	top:25%;
	 	left:9%;
	 	width:48px;
	 	height:22px;
	 	line-height:22px;	
		font-size: 12px;
		letter-spacing: 0px;
		text-align:center;
		color: #39B6E5;
		background:white;	 	
	 }
	 #header_event:hover{
	 	cursor:pointer;
	 }
	 #header_title{
	 	position:relative;
	 	top:25%;
	 	left:40%;
	 	height:22px;
	 	line-height:22px;
		opacity: 0.5;
		font-size: 20px;
		font-weight:bold;
		/*color: #39B6E5;*/
		color: #337ab7;
		letter-spacing: 0px;
		float:left;
	 }
    
	#calendar{
		position:relative;
		left:2.5%;
		width: 95%;
		margin: 0 auto;
	}
   .event .tag{
		color: #999;
		margin:10px;
	}
    .choose > div{
		margin-bottom:15px;
	}
    .onTop{
    	position:absolute;
    	top:0;
    	right:0;
    }
    select {
	  width: 120px;
	  border: none;
	  appearance:none;
	  -moz-appearance:none;
	  -webkit-appearance:none;
	  border-radius: 0;
	  padding: 2px 0 2px 10px;
	  padding-right: 20px;
	  background-color: #DFF5FD;
	  cursor: pointer;
	  font-size: 12px;
	}
    .cancel{
    	background:white;
    	border:1px solid #DFF5FD;
    }
    .btn{
    	margin-top:5px;
    	margin-left:25px;
    }
    .triangle{
    	position:absolute;
        left:-12px;
        top:5px;
    	width: 0;
	    height: 0;
	    border-top: 10px solid transparent;
	    border-right: 14px solid white;
	    border-bottom: 10px solid transparent;
        z-index:inherit;
    }
    .newEvent{
    	position:absolute;
    	/*display:none;*/
    	left:30px;
    	width:250px;
    	
    	padding:10px;
    	background:white;
    	z-index:100;
    	border-radius: 10px;
    }
    .newEvent > div{
        
    	width:90%;
    	margin:0 auto;
    }

    .newEvent button{
    	    color: #FFFFFF !important;
		    background-color: #39B6E5 !important;
		    border: 1px solid #39B6E5 !important;
    }
    .newEvent input[type="textarea"],textarea{
    	width:170px;
    	line-height:25px;
    	overflow-y: hidden;
    	word-wrap: break-word;
    	resize: none;
    }
    .event_title{
    	border:0;
    	height:25px;
    	border-bottom:1px solid #39B6E5;
    }
    .rotate{
		transform: rotate(180deg);
		-ms-transform: rotate(180deg);		/* IE 9 */
		-webkit-transform: rotate(180deg);	/* Safari and Chrome */
		-o-transform: rotate(180deg);		/* Opera */
		-moz-transform: rotate(180deg);		/* Firefox */
	}

 </style>

