<template>
	<div id="no_permission_out">
		<div id="tip_words">您没有权限哟！</div>
        <div id="pic img out_bg" style="text-align: center;"><img src="../../../assets/out_bg.png"></div>
	

            <a  class="agotoHome iconfont-fanhui img" href="javascript:;" @click="returnHome"> 
            返回首页
            </a>
	</div>
</template>

<script>
	export default {
		methods:{
			returnHome(){
		        this.$router.push('/LoginFinish/' + ConfigPage.returnHome());
		    },
		}
	}
</script>
<style scoped>
	#tip_words{	
		width:448px;
		height:184px;
		text-align:center;
		line-height:184px;
		font-size: 36px;
		color: #B5E4F5;
		letter-spacing: 0px;
		margin:0 auto;
	}
	#pic{
		width:448px;
		height:430px;
		margin:0 auto;
		text-align: center;
	}
	#pic img{
		width:100%;
		height:100%;
		margin:0 auto;
	}
	#no_permission_out{
		width:100%;
	}
	.agotoHome{
        width:80px;
        font-size: 12px;
        color: #39B6E5;
        line-height: 12px;
        padding-left: 22px;
        margin-top: 24px;
        position: absolute;
        right: 17px;
        top: 60px;
    }
</style>

