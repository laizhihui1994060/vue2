<template>

	<div id="calendar">
		<!-- 仅供调整样式 -->
	</div>

</template>
<script>
	import checkbox from '../../../../common_component/checkbox.vue'
	import dateTimepicker from '../../../../common_component/datetimepicker.vue'
	import repeatedReminders from './repeated_reminders.vue'
	import endReminders from './end_reminders.vue'
	import reminder from './reminder.vue'
	// import '../../../../../static/js/lib/jquery-ui.min.js'
	// import '../../../../../static/js/lib/jquery.min.js'
	import '../../../../../static/js/lunar.js'
	import '../../../../../static/js/fullcalendar.min.js'
	import '../../../../../static/js/locale/zh-cn.js'

  	export default{
		components:{
	  		checkbox,dateTimepicker,repeatedReminders,endReminders,reminder
		},
		
		computed:{
			endReminders: function(){
				if(this.$refs.repeatedComp.selected == '无'){
					return false;
				}else{
					return true;
				}
			}
		}
  	}
</script>
<style>
@import '../../../../../static/css/fullcalendar.css';
	#calendar .fc-row .fc-content-skeleton td{
    	padding:3px !important;
		border-right: 1px solid #ddd;
		background: transparent;
	}
	/*事件的样式*/

    #calendar{
    	width:90%;
        margin:0 auto;
    	float:left;
    }
    .fc-toolbar{
    	margin-bottom:10px !important;
    }
    .fc-row .fc-content-skeleton td, .fc-row .fc-helper-skeleton td{
    	border-color:#ddd;
    }
	#calendar .fc-event, .fc-event-dot{
		/*background:none;*/
		/*background: #DFF5FD;*/
		/*background: #39B6E5;*/
		/*color:#fff;*/
		color:#333333;
	}
	#calendar .fc-event{
		border:none;
	}

	.fc-row.fc-rigid{
		overflow: visible;
	}
    #calendar .more{			
	font-size: 10px;
	color: #999999;
	/*color:#fff;*/
	letter-spacing: 0px;
	line-height: 12px;
	}

	#calendar .fc-more-cell{
		position: relative;
	}
	#calendar .fc-more{
		background: red;
		position: absolute;
		font-size: 0;
		left: 50%;
		display: inline-block;
		height: 0;
		width: 0;
	}
	#calendar .fc-more:after{
		content: ' ';
		display: block;
		width: 0px;
		height: 0px;
		border: 7px solid transparent;
		border-top-color: #888;
		position: absolute;
		left: -7px;
	}
	#calendar .fc-time{
	  font-size: 10px !important;	
	}
	#calendar .fc-day-grid-event .fc-time{
		display: none !important;/* 去掉12凌 */
		font-weight:normal;
		font-size: 12px !important;
		color: #999999;
		/*color:#fff;*/
		letter-spacing: 0px;
	    display:inline-block;
		vertical-align:top;	
		cursor:pointer;
	}
	#clendar td .fc-event-container .fc-time{
		font-size:10px !important;
		overflow:hidden;
	}

	#calendar .fc-title{
		display:inline-block;
		width:80%;
		font-size:12px;
		overflow:hidden;
		line-height:20px;
		vertical-align:top;
	}

    #calendar .fc-past{
    	background: #eee;
    }
    #calendar .fc-future{
    	background: #fefefe;
    }
	#calendar .event-decoration{
		display:inline-block;
		line-height:14px;
		vertical-align:middle; 
		width:4px;
		height:4px;
		border-radius:4px;
		background: #39B6E5;
		margin-right:3px;
	}
    #calendar .fc-left h2{
	font-size: 20px !important;
	/*color: #39B6E5;*/
	color: #337ab7;
	letter-spacing: 0px;
    }
	#calendar .fc-day-header .date-num{
	font-size: 16px;
	color: #333333;
	letter-spacing: 0px;
	line-height: 16px;
	}

	#calendar .fc-day-cnDate{
     font-size: 14px;
     color: #333333;
	 letter-spacing: 0px;
     line-height: 14px;	
     display:inline-block;
     vertical-align:middle;
	}
/*	#calendar .fc-widget-content.fc-today:after{
		content: "";
		display:block;
		float: right;
		border:17px solid blue;
		border-bottom-color: transparent;
		border-left-color: transparent;
		width: 0;
		height: 0;
	}*/

	#calendar .fc-current-selected-event{
		/*border:1px solid blue;*/
		box-shadow: 1px 1px 5px 0 #666;
	}
	#calendar .fc-current-selected-day{
		background: rgb(207, 228, 251);
	}
  #calendar .fc-today .fc-day-number .date-num{
 	background: #FF6B0E;
	color: #FFFFFF;
	letter-spacing: 0px;
	line-height: 14px;
	margin-right:3px;
	border-radius:9px;
	padding:2px;
	width:16px;
	height:16px;
	display:inline-block;
    vertical-align:middle;
 }
 .today-show{
 	color:#FF6B0E;
 }
  #calendar .fc-prev-button, .fc-today-button,.fc-next-button{
 	/*border:1px solid #39B6E5;*/
 	border:1px solid #337ab7;
 	/*color:#39B6E5;*/
 	color: #337ab7;
 	background:none;

 }
 #calendar .fc-today-button{
 	border-left:none;
 	border-right:none;
 }
  #calendar .fc button .fc-icon{
 	/*color:#39B6E5;*/
 	color: #337ab7;
 }
 

 #calendar .events-day{
  position:relative;
  left:0;
  top:0;
  height:100px;
  width:0;
}
 #calendar .day-number{
   position:relative;
  left:0;
  top:0;
  max-height:20px;
}


#alert{
    position:absolute;
    width:600px;
    height:500px;
}

.hide{
  display:none;
}
.modal .modal-content .modal-footer, .footer{
	position:relative;
}

</style>
