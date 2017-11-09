<template>

    <div id="history_version" data-toggle="modal" data-target="#historyDetailModal" style="background:rgba(0,0,0,0.4);color:#fff">
    <!--  -->
            <div class="page_swap_button swap_left" v-if="pageIndex>1" @click="swiper(event,'left')">
                <img :src="arrLeft" alt="》">
            </div>
            
            <div class="frame_content" ref="downFadeIn">
                <div class="history_header">
                    <h4 class="history_title">版本公告</h4>
                </div>

                <!-- 动态内容 -->
                <div class="history_content">
                    <div class="content_width" :style="{width:ct_width}" ref="beswiped">
                        <div class="content_items" v-for="item in content">
                            <div class="inline" v-html="item"></div>
                        </div>
                    </div>
                </div>
                <div class="history_footer">
                    <!-- <a href="javascript:void(0);" data-toggle="modal" data-target=".bs-example-modal-lg">查看历史版本&gt;&gt;</a> -->
                </div>
            </div>
            <div class="page_swap_button swap_right" ref="rightFadeIn" v-if="pageIndex<content.length" @click="swiper(event,'right')" >
                <img :src="arrRight" alt="《">
            </div>
            <!-- <div class="hoverMsg" v-show="showMsg" refs="hvmsg">
                <p class="hoverMsgText">点击查看历史版本</p>
                <span class="caret"></span>
            </div> -->
        
    </div>



</template>
<script>
    import arrLeftUrl from "../../assets/history_version_arr_l.png";
    import arrRightUrl from "../../assets/history_version_arr_r.png";
	export default{
        props:{
            src:{
                type:String
            },
            
        },
		data(){
			return {
                content : require('../../../config-version.js').version_introduce,
                showMsg : false,
                pageIndex : 1,
                arrLeft:arrLeftUrl,
                ct_width:'1200px',
                arrRight:arrRightUrl
            };
		},
        methods:{
            dynamicWidth(){
                this.ct_width = this.content.length*220 + "px";
            },

            swiper(event,direction){
                var event = event || window.event;
                event.stopPropagation();
                if(direction==="left"){
                    this.pageIndex--;
                } else if(direction==="right"){
                    this.pageIndex++;
                }
                // this.$refs.beswiped.style.right = (this.pageIndex-1)*220 + 'px';
                $(this.$refs.beswiped).animate({
                    "right":(this.pageIndex-1)*220 + 'px'
                },"fast");
            }

        },
        mounted(){
            console.log("mounted");
            this.dynamicWidth();

            let beswipedWidth = this.$refs.beswiped.style.width,
                rightFI = this.$refs.rightFadeIn,
                downFO = this.$refs.downFadeIn
            beswipedWidth = (this.content.length*220) + "px";
            $(downFO).css({
                "opacity":0,
            }).delay(1000).animate({
                "opacity":1,
            },"slow")
            $(rightFI).css({
                "right":"-50%",
                opacity:0
            }).delay(1200).animate({
                "right":"-26%",
                "opacity":1
            })

        }
	}
</script>
<style scoped>
	.history_header{
		padding:5px;
		/*background: #ddd;*/
		border-bottom: 2px solid #ddd;
	}
	.history_title{
		text-align: center;
    }
    .content_items{
        width: 200px;
        height:350px;
        display: inline-block;
    	margin:0 10px;
        vertical-align: top;
    }
    .content_items h5{
    	font-weight: bold;
    }
    
    #history_version{
        position: absolute;
        max-height: 470px;
		color: #111;
    	/*padding-bottom: 10px;*/
        width: 220px;
        background: rgba(0,0,0,0.0);
        border-radius: 2px;
        margin-left: 80px;
        /*box-shadow: 1px 1px 15px 0px gray;*/

        /*text-shadow: 0px 0px 1px #fff;*/
    }
    .frame_content{
        background: rgba(0,0,0,0.02);
    }
    .history_content{
        margin-top: 15px;
        width: 100%;
        overflow: hidden;
    }
    .content_width{
        position: relative;
        width: 1000px;
        height:400px;
    }

    #history_version:hover{
    	cursor: pointer;
    }
    .page_swap_button{
        width: 48px;
        height: 48px;
        position: absolute;
        margin-top: -24px;
        top:50%;
    }
    .swap_left{
        left:-28%;
    }
    .swap_right{
        right:-28%;
    }
    .hoverMsg{
        width: 20px;
        top: 50px;
        right: -25px;
        position: absolute;
    }
    .hoverMsg .caret{
        position: absolute;
        margin-top: -8px;
        top: 50%;
        left: -8px;
        color:#000;
        transform: rotate(90deg);
    }
    #history_version .hoverMsgText{
        padding:3px;
        background: #000;
        opacity: 1;
        line-height: 16px;
        text-align: center;

    }
    
    #history_version .panel-heading{
    	background: #39B6E5 !important;
    	color:#fff;
    }

    #history_version .history_footer{
		margin-top: 5px;
		padding: 10px;
    	width: inherit;
    	position: absolute;
    	bottom: 0;
    }
    #history_version .history_footer>a{
    	color:inherit;
    }
    #history_version .history_footer>a:visited{
    	color:inherit;
    }

</style>