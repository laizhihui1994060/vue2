<template>
    <div id='job_pictures'>
        <div class="modal-body">
            <breadcrumb
                :arr="[{path:'/LoginFinish/financialManagement/accounting_order',text:'核算订单'},{path:'auto',text:orderCode},{path:'',text:jobCode + '的照片详情'}]"/>
            <div>
                <div class="details">
					<div v-for='obj of picContent' class="setImg" :key='obj'>
	                    <div class="setIMG">
	                        <img :src="showImg + obj.photoId" class="imgArray images"  @click='prePic($event,showImg + obj.photoId,obj)' data-toggle="modal" data-target="#dowmImg">
	                    </div>
	                    <p v-text="obj.templateNotes"></p>
	                    <span  v-text="getLocalTime(obj.photoTime)"></span>
						
					</div>
					<div style='display:inline-block' class='setImg' @click="addPhoto">
		                <a href="javascript:;" class="add_photo">
		                    <img src="../../../../../../assets/add_photo.png" alt="">
		                </a>
		            </div>
				</div>
                
            </div>
        </div>
        <add-photo ref="add_photo" :towDriverActionId="towDriverActionId"/>

        <div id='dowmImg' class="modal fade">
		    
		    <div id="theImage">
		        
		        <div class="rotate">
			        <!-- 前后切换照片 -->
			        <div class="imgPrev" v-if="currPicIndex > 0" @click="swapPic(-1)"></div>
			        <div class="imgNext" v-if="currPicIndex < picContent.length-1" @click="swapPic(1)"></div>
			            <img class='image' :src="currSrc"/>
			            <a :href="currSrc" download="" style="display:none"></a>
			        </div>
			        <div class="btns">
			            <p class="imgName">{{currImgName}}</p>
			            <button class="remake_btn" @click="down">下载照片</button>
			            <button class="remake_btn"  data-dismiss="modal">关闭窗口</button>
			        </div>
			  	</div>
		    </div>
		</div>

    </div>
</template>

<script>
	import breadcrumb  from "../../../../../../common_component/breadcrumb.vue";
    import  addPhoto from "./add_Photo.vue";

    export default {
    	components:{
    		breadcrumb,
    		addPhoto
    	},
       	data(){
			return {
				showImg: config.img_path,
				currImgName:"",
				currPicIndex:0,
				currSrc:this.props,
				btnEnable:true,
				picContent:[],
				towDriverActionId:'',
				arr:[],
				jobCode:''
			}
		},
        methods: {
			prePic(event,src,photInfo,_index){
			    console.log(photInfo);

			    const that = this;
			    let ev = window.event || event;
			    //一手点击一手切换
			    this.currPicIndex = $(ev.currentTarget).index('.images') !==-1 ? $(ev.currentTarget).index('.images') : _index;
			   
			    let preview_picture = $(that.$el).find('#dowmImg');
			    let oImg = preview_picture.find('img');

			    oImg.animate({opacity:0},50,function(){
			        that.currImgName = util.getLocalTime(photInfo.photoTime) + " " + photInfo.templateNotes
			        that.currSrc = src;
			        that.btnEnable = true;
			    }).animate({opacity:1},50);
			    
			    // oImg.attr('src', src)
			    
			   preview_picture.find('a').attr({
			        'download':photInfo.photoId + '.jpg'
			    });

			    	setTimeout(function() {
			    	    preview_picture.find('#theImage').css({
			    	        width:oImg[0].clientWidth + 'px'
			    	    });
			    	}, 300);

			},
			getLocalTime(ns){
                return util.getLocalTime(ns);
            },
			swapPic(num){
			    if(!this.btnEnable){
			        return;
			    }
			    this.btnEnable = false;
			    let len = this.picContent.length-1;
			    let _index = this.currPicIndex;
			    if(num === -1 && _index>0){
			        _index--;
			    } else if(num === 1 && _index<len){
			        _index++;
			    }
			    // 切换页面
			    this.prePic(undefined,this.showImg + this.picContent[_index].photoId,this.picContent[_index],_index);
			},
			down(){
			    $('#dowmImg a')[0].click()
			},
			addPhoto(){
				$('#addPhoto').modal('show');
                this.$refs.add_photo.clear();
			},
			parentFn(){
				const self = this;
				send({
				    type:'post',
				    url:'control:/tow/driver/photo/list',
				    param: this.arr
				},function(err,res){
				    if(err)return alert('服务器出错，请联系管理员');
				    console.warn(res)
				    if(res.status == 200){
			        	self.picContent = res.content;
				     }
				});
			}
		},
		created(){
			this.arr = this.$route.params.param.split("_");
			this.jobCode = this.$route.params.jobCode;
			this.orderCode = this.$route.params.orderCode;
			if(this.arr){
				this.towDriverActionId = this.arr[this.arr.length-1]
				this.parentFn();
			}
		}
    }
</script>

<style scoped>
	#job_pictures{
		margin-top: 20px
	}
   /* 
	#job_pictures .images{
		padding: 10px;
		width: 100%;
		cursor: pointer;
	} */
	.details{
		background-color: #fff;
		padding: 20px;
	}
	.setImg{
        display: inline-block;
        text-align: center;
        margin: 5px 10px 0;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
        width: 195px;
        height: 200px;
        overflow: hidden;
        padding: 8px;

    }
    .setIMG[data-v-cece8578] {
	    height: 150px;
	    overflow: hidden;
	}
	 .setImg img{
        height: 150px;
    }
    .setImg p {
        margin: 0;
        line-height: 12px;
        margin-top: 4px;
    }
	#dowmImg img{
	     border-bottom: 1px solid #ccc;
	     margin: 0 auto;
	     max-height:  560px;
	}

	#dowmImg{
	    max-height: 100%;
	}
	#dowmImg .rotate{
	    position: relative;
	    margin: 0 auto;
	}
	#dowmImg .imgPrev,#dowmImg .imgNext{        
	    width: 80px;
	    height: 80px;
	    position: absolute;
	    top: 50%;
	    /*margin-top: -25px;    */
	    border: 3px solid transparent;
	    border-radius: 50%;
	    color:#fff;
	    font-size: 2em;
	}
	#dowmImg .imgPrev{
	    background: url("../../../../../../assets/swpImgArrL.png") 10px 13px no-repeat;
	    -webkit-background-size: 50px;
	    background-size: 50px;
	    background-color: rgba(0,0,0,0.2);
	    left:-30%;
	}
	#dowmImg .imgNext{
	    background: url("../../../../../../assets/swpImgArrR.png") 15px 13px no-repeat;
	    -webkit-background-size: 50px;
	    background-size: 50px;
	    background-color: rgba(0,0,0,0.2);
	    right:-30%;
	}
	#dowmImg .imgPrev:hover, #dowmImg .imgNext:hover{
	    cursor: pointer;
	    border: 3px solid #fff;
	    /*box-shadow: 0 0 2px 1px #333;*/
	}
	#dowmImg #theImage{
	    margin:auto;
	    min-width:200px;
	    
	    max-width: 80%;
	    padding-top: 50px;
	    text-align: center;
	}
	#dowmImg .remake_btn{
	    margin: 0 20px;
	    padding:6px 12px;
	}
	#dowmImg .imgName{
	    line-height: 30px
	}
	#dowmImg .btns{
	    line-height: 50px;
	    background: #fff;
	    border-top: 1px solid #ccc;
	    margin: 0 auto;
	}
</style>