<template>
	<div id="jobRecording"> 
			<breadcrumb
			    :arr="[{path:'/LoginFinish/financialManagement/accounting_order',text:'核算订单'},{path:'auto',text:orderCode},{path:'',text:jobCode + '的任务录音'}]"/>
		        <div>
				<div>
					<table>
					    <thead> 
					        <tr>
					            <th>来源</th>
					            <th>方式</th>
					            <th>开始时间</th>
					            <th>结束时间</th>
					            <th>主叫号码</th>
					            <th>被叫号码</th>
					            <th> </th>
					        </tr>
					    </thead>
					    <tbody>
					        <template v-for='it in items'>
					            <div style="position: relative">
					                <span class='bar'></span>
					            </div>
					            <tr >   
					                <td v-text="metach(it.callSource)"></td>
					                <td>{{matchDirection(it.direction)}}</td>
					                <td v-text="getLocalTime(it.talkStartTime)"></td>
					                <td v-text="getLocalTime(it.hangupTime)"></td>
					                <td>{{it.callerNo}}</td>
					                <td>{{it.calleeNo}}</td>
					                <td>
										<audio >
											<source :src="showImg +　it.recordingFile" type="audio/ogg">
											<source :src="showImg +　it.recordingFile" type="audio/mpeg">
										</audio>
										<a  :href="showImg + it.recordingFile" class="img downup pull-left downloadFile"  download></a>
										<a href="javascript:;" @click="play" class='img Group pull-right play' style='transform: scale(0.5)'></a>
					                </td>
					                
					            </tr>
					            
					        </template>
					        
					        
					    </tbody>
					</table>
					<div v-if='!items || items.length < 1' >
					    <p style='text-align: center; width:100%;'>暂无录音文件</p>
					</div>
				</div>
		        </div>
	</div>
</template>


<script>
	import breadcrumb  from "../../../../../../common_component/breadcrumb.vue"

	export default {
		data () {
		    return {
		        items:[],
		        src: '',
		        jobCode: '',
		        orderCode: '',

		        jobId: '',
		        showImg: require('../../../../../../../config-version.js').img_path
		    }
		},
		components: {
			breadcrumb
		},
		created(){
			this.jobCode = this.$route.params.jobCode;
			this.orderCode = this.$route.params.orderCode;
			this.jobId = this.$route.params.jobId;

			this.update();
		},
		methods:{
		    update(){
		    	const self = this;
		    	console.log(this.jobId);

		    	if(!this.jobId) return;

		    	const data = {
		    	        "businessContext" :'JOB',
		    	        "businessId" : self.jobId,
		    	        "pageSize" : 100,
		    	        "pageIndex" : 1
		    	}

		    	send({
		    	    type:'post',
		    	    url: 'order:/call/technician/list',
		    	    param: data
		    	}, function(err,res){
		    	    if(err)return console.log(err);
		    	    if(res.status == 200){
		    	        self.items = res.content;
		    	        console.log( self.items )
		    	    }else{
		    	        console.log(res);
		    	    }
		    	});
		    },
		    matchDirection(status){
		        switch(status){
		            case'IN':
		                return '呼入'
		                break;
		            case 'OUT':
		                return '呼出'
		                break;
		            case 'TRANSFER':
		                return '转接'
		                break;
		            case 'INTERNAL':
		                return '内部接听'
		                break;  
		        }
		    },
		    metach(status){
		        switch(status){
		            case'CALLCENTER':
		                return '呼叫中心'
		                break;
		            case 'TECHAPP':
		                return '技师app'
		                break;
		            case 'INTERVIEW':
		                return '现场录音'
		                break;
		            default:
		                break;
		        }
		    },
		    getLocalTime(ns){
		        return  util.getLocalTime(ns);
		    },
		    play(ev){
		        var ev = ev || event;
		        
		        const $target = $(ev.target),
		                 $tr = $target.parent().parent(),
		                 $barParent = $tr.prev(),
		                 audio = $target.siblings('audio')[0];

		        console.log(audio)
		                 
		        if(audio.paused){

		            audio.play();
		            $target.attr('class', function(index, oldValue){
		                return oldValue.replace('Group', 'zant');
		            });

		            $target.addClass('stop');
		            $barParent.addClass('animation');


		            // 监听停止
		            audio.addEventListener('ended', function () {  
		                $target.attr('class', function(index, oldValue){
		                    return oldValue.replace('zant', 'Group');
		                });
		                $target.removeClass('stop');
		                $barParent.removeClass('animation');
		            }, false);

		            const width = $tr.css('width').replace('px', '');

		            audio.addEventListener('timeupdate',function(){
		                if (!isNaN(audio.duration)) {
		                    var progressValue = audio.currentTime / audio.duration; // 进度百分比
		                    if(progressValue == 1){
		                        progressValue = 0; 
		                    }
		                   $barParent.find('.bar').css('width', progressValue * width );
		                };
		            },false);
		        }else{
		            audio.pause();
		            $target.attr('class', function(index, oldValue){
		                return oldValue.replace('zant', 'Group');
		            });
		            $target.removeClass('stop');
		            $barParent.removeClass('animation');
		        }
		    }
		}
	}
</script>

<style>
#jobRecording{
	margin: 10px 20px;
}
#jobRecording .modal-dialog{
    overflow: auto;
    height: 400px;
} 
#jobRecording li{
    background-color: #f6f6f6;
    float: left;
    margin-right: 5px;
    margin-bottom: 8px;
} 

#jobRecording .bar{
    top: 0;
    left:  0;
    width: 0;
    transition: width linear; 
    position: absolute;
}
#jobRecording .animation .bar{
    border: 1px solid red;
    /* width:  100%; */
}

#jobRecording .br{
   display:block;
   margin-bottom: 12px; 
}
#jobRecording a{
    display: inline-block;
}
#jobRecording .recording_right{
    padding: 6px;
}
#jobRecording .play{
    top: -7px;
    right: 40px;
    position: absolute;
}
#jobRecording .downloadFile{
    top: 10px;
    position: absolute;
}
#jobRecording .stop{
    transform: scale(0.4) !important;
    position: absolute;
    top:  -17px;
    right: 30px;
}
#jobRecording  table{
    width:100%;
    border-collapse:separate;
    border-spacing:0px 4px;
}
#jobRecording  table th{
    border-top:1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding:5px 10px;
    padding-left: 15px;
    height:24px;
    font-size:12px;
    color:  #999;
}
#jobRecording  table th:first-child{
    border-left:1px solid #ccc;
}
#jobRecording  table th:last-child{
    border-right:1px solid #ccc;
}
#jobRecording  table thead tr{
    height:40px;
}
#jobRecording  table th,
#jobRecording  table td{
    width:109px;
}
#jobRecording  table tbody tr{
    background: #F6F6F6;
    font-size:12px;
}
#jobRecording  table tbody tr td{
    padding-left:15px;
    border-top:1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height:40px;
}
#jobRecording  table tbody tr td:first-child{
    padding-left:7px;
    border-left:1px solid #ccc;
}
#jobRecording  table tbody tr td:last-child{
    border-right:1px solid #ccc;
    position: relative;
}
#jobRecording  table tbody tr td input[type='text']:disabled{
    display:inline-block;
    padding:0px 15px 0px 0px;
    height:24px;
    background-color:transparent;
    width:90px;
}
#jobRecording  table tbody tr td input[type='text']{
    background-color: #DFF5FD;
}
</style>