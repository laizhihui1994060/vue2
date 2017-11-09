<template>
    <div class="photos">
        <div style='display:inline-block' class='setImg' @click="addPhoto"  v-if="!obj.nodes || !obj.nodes.length || num == 1">
            <a href="javascript:;" class="add_photo">
                <img src="../../../../../assets/add_photo.png" alt="">
            </a>
        </div>
        <div v-else class="setWidth" :style="{width:(num + 1) * 140 + 'px'}">
            <div v-for="(photo,index1) in obj.nodes" v-if="photo.photo && photo.photo.length" style="display:inline-block">
                <div v-for="(phot,index2) in photo.photo" class="setImg">
                    <div class="setIMG">
                        <img :src="showImg + phot.photoId" class="imgArray" @click='prePic($event,showImg + phot.photoId,phot)' data-toggle="modal" data-target="#dowmImg">
                    </div>
                    <p v-text="phot.templateDesc"></p>
                    <span  v-text="getLocalTime(phot.photoTime)"></span>
                </div>
               <!--  <div v-if="index1 == obj.nodes.length-1">
                   ss
                </div> -->
            </div>
            <div style='display:inline-block' class='setImg' @click="addPhoto">
                <a href="javascript:;" class="add_photo">
                    <img src="../../../../../assets/add_photo.png" alt="">
                </a>
            </div>
        </div>
        
        <div id='dowmImg' class="modal fade">
            
            <div id="theImage">
                
                <div class="rotate">
                <!-- 前后切换照片 -->
                <div class="imgPrev" v-if="currPicIndex>0" @click="swapPic(-1)"></div>
                <div class="imgNext" v-if="currPicIndex<imgSrcList.length-1" @click="swapPic(1)"></div>
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
        <add-photo ref="add_photo" :towDriverActionId="obj.nodes && obj.nodes.length ? obj.nodes[obj.nodes.length-1]['towDriverActionId']: '' "/>
    </div>
</template>
<script>
    import  addPhoto from "../modal/add_Photo.vue";
    export default{
        props:['obj','num'],
        watch:{
            obj(newVal,oldVal){
                console.log(newVal)
                this.pushPicSrc();
            }
        },
        components:{
            addPhoto
        },
        data () {
            return {
                showImg:config.img_path,
                imgSrcList:[],
                currImgName:"",
                currPicIndex:0,
                currSrc:this.props,
                btnEnable:true
               
            }
        },
        mounted(){
            let self = this;

            console.log(this.$route.params);

            this.$nextTick(function(){
                console.log(  $(window).width() - 400  )
                $('.photos').width( $(window).width() - 420 );

               
            });
            this.pushPicSrc();
            
        },
        methods: {
            swapPic(num){
                if(!this.btnEnable){
                    return;
                }
                this.btnEnable = false;
                let len = this.imgSrcList.length-1;
                let _index = this.currPicIndex;
                if(num === -1 && _index>0){
                    _index--;
                } else if(num === 1 && _index<len){
                    _index++;
                }
                // 切换页面
                this.prePic(undefined,this.showImg + this.imgSrcList[_index].photoId,this.imgSrcList[_index],_index);
            },
            pushPicSrc(){
                this.imgSrcList = [];
                
                for(let key in this.obj.nodes){

                    for(let key2 in this.obj.nodes[key].photo){
                        if(typeof this.obj.nodes[key].photo[key2].photoId === "string"){
                            let _id = this.obj.nodes[key].photo[key2].photoId;
                            let _name = this.obj.nodes[key].photo[key2].templateDesc;
                            let _time = this.obj.nodes[key].photo[key2].photoTime;
                            this.imgSrcList.push({photoId:_id,templateDesc:_name,photoTime:_time});
                        } else {
                            continue;
                        }
                    }
                }
                
            },
            getLocalTime(ns){
                return moment(ns).format('YYYY-MM-DD HH:mm');
            },
            prePic(event,src,photInfo,_index){
                console.log("photInfo",photInfo)
                const self = this;
                let ev = window.event || event;
                //一手点击一手切换
                this.currPicIndex = $(ev.currentTarget).index('.imgArray') !==-1?$(ev.currentTarget).index('.imgArray') : _index;
               
                let preview_picture = $('#dowmImg');
                let oImg = preview_picture.find('img');

                oImg.animate({opacity:0},50,function(){
                    self.currImgName = moment(photInfo.photoTime).format('YYYY-MM-DD HH:mm') + " " + photInfo.templateDesc;
                    self.currSrc = src;
                    self.btnEnable = true;
                }).animate({opacity:1},50);
                
                // oImg.attr('src', src)
                
               preview_picture.find('a').attr({
                    'download':photInfo.photoId + '.jpg'
                });
               
                setTimeout(function() {
                    preview_picture.find('#theImage').css({
                        width:oImg.width() + 'px'
                    });
                }, 300);
            },
            
            match(status){
              return util.matchTackNode(status);
            },
            down(){
                $('#dowmImg a')[0].click();
            },
            addPhoto(){
                $('#addPhoto').modal('show');
                this.$refs.add_photo.clear();
            },
            parentFn(){
                this.$parent.parentFn();
            }
        },
       
    }
</script>
<style scoped>
     .setImg{
        display: inline-block;
        text-align: center;
        margin: 5px 10px 0;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
        width: 125px;
        height: 155px;
        overflow: hidden;
        padding: 8px;
        border-radius: 7px;
    }
    .setWidth{
        height: 165px;
    }
     .setIMG{
        height: 100px;
        overflow: hidden;
    }
    .setImg img{
        height: 100px;
    }
    .setImg p {
        margin: 0;
        line-height: 12px;
        margin-top: 4px;
    }
    .photos{
        overflow: auto;
    }
   .photos img{
        border-bottom: 1px solid #ccc;
        margin: 0 auto;
        max-height:  560px;
   }
   .photos p,.photos span{
    font-size: 12px;
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
        background: url("../../../../../assets/swpImgArrL.png") 10px 13px no-repeat;
        -webkit-background-size: 50px;
        background-size: 50px;
        background-color: rgba(0,0,0,0.2);
        left:-25%;
    }
    #dowmImg .imgNext{
        background: url("../../../../../assets/swpImgArrR.png") 15px 13px no-repeat;
        -webkit-background-size: 50px;
        background-size: 50px;
        background-color: rgba(0,0,0,0.2);
        right:-25%;
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
    .add_photo{
        width: 100%;
        height: 100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .add_photo img{
        width:128px;
        height:128px;
        border:none;
    }
</style>