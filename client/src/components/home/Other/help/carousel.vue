<template>
	<div id='carousel'>
		<div class="pic_container">				
			<ul class="picList clearfix">
				<li class="pic " v-for='(src,index) of choose' :key="index">
					<img :src='src'>
				</li>
			</ul>
		</div>

		<div class="fix_toolbar">
			<div class="last rewinddown_gray img" @click='last'></div>
			<div class="refresh img refresh_gray"></div>
			<div class="next img fastforward_gray" @click='next'></div>
		</div>
	</div>
</template>

<script>
	var width = $(document.body).width();
	var len = $(".pic").length;

	import a from './../../../../assets/jietu/45113976200807221409442551773309416_008.jpg'
	import b from './../../../../assets/jietu/466261103.jpg'
	import c from './../../../../assets/jietu/p03027bj.jpg'
	import d from './../../../../assets/jietu/timg.jpeg'

	export default {
		data(){
			return {
				images: {
					1: [
						a,
						b,
						c,
						d
					],
					2: [
						d,
						c,
						b,
						a
					],
					3: [
						a,
						b,
						c,
						d
					],
					4: [
						a,
						b,
						c,
						d
					]
				},
				choose: []
			}
		},
		methods: {
			last(){	            
            	var left = $("#carousel .picList").offset().left;	
            	if(left <= (-1) * width){							            	
            		$("#carousel .picList").css("left",left + width + "px");
            	}	  	   	 
           	},
           	next(){
           		var left = $("#carousel .picList").offset().left;	
           		if(left > (-1) * width * (len-1)){
           			$("#carousel .picList").css("left",left - width + "px");
           		}
           	}
		},
		mounted(){
			console.log(this.$route.params);
			
			this.$nextTick(function(){
				

				this.choose = this.images[this.$route.params.id];

				var width = $(document.body).width(),
				    height = $(document.body).height(),
				    navHeight = $('.container-fluid .row').height();

				len = this.choose.length;
				$("#carousel .picList").css("width",len * width + "px");
				$('#carousel ul li').css('width', width);
				$('#carousel .pic_container').css('height', height - navHeight + 'px');
				console.log(height, navHeight);

				window.onresize = function(){
					var width = $(document.body).width(),
					    height = $(document.body).height(),
					    navHeight = $('.container-fluid .row').height();

					$("#carousel .picList").css("width",len * width + "px");
					$('#carousel ul li').css('width', width);
					console.log(height, navHeight)
					$('#carousel .pic_container').css('height', height - navHeight);
				}
				
				//渲染之后
				this.$nextTick(function(){
					$('#carousel ul li').css('width', width)
				})
			})	
		}
	}
</script>

<style scoped>
.pic_container{
	position:relative;
	width:100%;
	overflow: hidden;
}
.pic_container ul{
	position: absolute;
}
.pic_container ul li{
	float:left;
}
.pic img{
	width:100%;
	height:100%;
}
.pic_container{
	transition:left 0.2s;
}
.fix_toolbar{
	position:fixed;
	right:50px;
	bottom:50px;
	width:155px;
	height:50px;
}
.fix_toolbar div{
	float:left;
	width:48px;
	height:48px;
}
.fix_toolbar .last{
	cursor: pointer;
	/*background-image:url('../../../../assets/rewinddown_gray.png')*/
}
.fix_toolbar .refresh{
	cursor: pointer;
}
.fix_toolbar .next{
	cursor: pointer;
	/*background-image:url('../../../../assets/fastforward_gray.png')*/
}
.fix_toolbar .last:hover{
	height:48px;
	width:48px;
	background-position:0 -2689px;
}
.fix_toolbar .refresh:hover{
	height:48px;
	width:48px;
	background-position:0 -2545px;
}
.fix_toolbar .next:hover{
	height:48px;
	width:48px;
	background-position:0 -2449px;
}
</style>