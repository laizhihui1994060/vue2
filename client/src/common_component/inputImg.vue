<template>
    <div :style="{display:display}" ref="img">
        <template class='list'  v-for="(obj, index) in uselessArr" :data-index="index">
            <div class='input_img' :class="{set_input_img:setInputImg}" >
                <input type="file" :style='{zIndex: obj.inputZIndex}'  :width="width" :height="height" :name='name' :disabled='disabled'  accept="image/jpg,image/jpeg,image/png" v-on:change='change($event,index)'  />
                <div style="display:flex;justify-content:center;align-items:center;flex-direction:column">
                    <h2 :style="{marginTop:marginTop}">+</h2>
                    <p>添加照片</p>
                </div>
                <div class='img_show' :style='{zIndex: obj.imgZIndex}' :hover='obj.hover && !disabled'>
                    <i class="img delete hover delect" @click.stop.prevent="dele($event,index)"></i>
                    <img @click='prePic(index)' data-toggle="modal" data-target="#preview_picture" :src="obj.src" :name='name' class='mainImg' />
                </div>
            </div> 
        </template>

    </div>
</template>

<script>

    export default{
        props:{
            display:{
                default:'flex'
            },
            name:{}, 
            setInputImg:{
                default:false
            },
            arr:{
                type: Array,
                default: function(){
                    return []
                }
            },
            clear:{
            },
            disabled:{
                default: false
            },
            limit: {
                type: Number,
                default: 10
            },
            marginTop:{
                default:0
            }
            
        },
        computed: {
            width(){
                return this.setInputImg ? 36 : 116;
            },
            height(){
                return this.setInputImg ? 36 : 88;
            }
        },
        data(){
            return  {
                files:[],
                uselessArr: [{
                    src: "",
                    imgZIndex: '0',
                    inputZIndex: '99',
                    hover: false
                }],
                imageList: [],
                chosenImage: {
                    width: '',
                    height: '',
                    src: '',
                },
                index: 0
            }
        }, 
        methods:{ 
            prePic(index){
                const src = this.uselessArr[index].src;
                $('#preview_picture img').attr('src', src);
            },
            change(e, index){
                var fileObj = e.target;
                var $imgShow= $(fileObj).siblings(".img_show").find('img').eq(1);
                $(fileObj).next().addClass('hover')
                var self = this;
                if(fileObj.files && fileObj.files[0]){
                    var file = fileObj.files[0];
                    var name = file.type.split('/')[1];

                    var render = new FileReader();
                    console.log(fileObj.files)
                    render.readAsDataURL(fileObj.files[0]);
                    render.onload = function(e) {                      
                        if(name != 'jpg' && name != 'png'  && name != 'jpeg')return alert('请选择jpg或者png格式的图片');

                        self.files.push(fileObj);
                        self.uselessArr.splice(index, 0, { 
                            src: window.URL.createObjectURL(file),
                            imgZIndex: '20',
                            inputZIndex: '-99',
                            hover: true
                        });

                        if(self.files.length >= self.limit){
                            self.uselessArr.pop();
                        }

                        self.$emit('updata', self.name, self.files);
                    } 
                }

            },
            dele(ev, index){
                if(!this.disabled){
                    var event = window.event || e;
                    console.log(this.name, this.files, index)
                    console.info(this.uselessArr.length , index)
                    this.files.splice(this.uselessArr.length - index - 2, 1);
                    this.uselessArr.splice( index, 1);

                    if(this.files.length == this.limit - 1){
                        this.uselessArr.push({
                            src: ''
                        });
                    }
                    // console.log(this.name, this.files, index)
                    this.$emit('updata', this.name, this.files, index);
                }
            }
        },
        watch:{
            arr(newv){
                if(this.arr && this.arr.length > 0){
                    const self = this;

                    let arr = [{
                        src: ''
                    }];

                    self.files = [];

                    self.uselessArr = arr;
                    self.$nextTick( () => {
                        self.arr.forEach(function(ar,index){
                            self.files.push(ar);
                            self.uselessArr.unshift({
                                src: config.img_path + ar.imageId,
                                imgZIndex: '20',
                                inputZIndex: '-99',
                                hover: true
                            });
                        });
                        if(self.files.length >= self.limit){
                            self.uselessArr.pop();
                        }
                    });
                }else{
                    this.uselessArr = [{
                        src: ''
                    }];
                    self.files = [];
                }
            },
            clear(newv){
                if(newv){
                    this.uselessArr = [{
                        src: ''
                    }];
                    this.$nextTick(function(){
                        var el = $(this.$refs.img).find('.img_show');
                        el.find('img').eq(1).attr('src','');
                        el.css('zIndex', 0);
                    });
                    this.files = [];
                    if(this.limit == 1)$("input[type='file']").val('');
                }
            }
        }
    }
</script>

<style>
    .input_img .img_show{
        cursor: pointer;
    }
    .input_img,
    .input_img > input[type='file'],
    .input_img > div,
    .input_img .img_show .mainImg{
        width:116px;
        height:88px;
    }
    .set_input_img,
    .set_input_img > input[type='file'],
    .set_input_img > div,
    .set_input_img .img_show img{
        width:36px !important;
        height:36px !important;
    }
    .input_img input{

    }
    .input_img{
        position:relative;
        display: inline-block;
        margin-right: 10px;
    }
    .input_img > input[type='file']{
        opacity:0;
        position:absolute;
        left:0;
        top:0;
        z-index:10;
        cursor:pointer;
    }
    .img_show[hover=true]:hover .hover{
        display: block
    }
    .img_show[hover=false]:hover .hover{
        display: none
    }
    .input_img > div{
        position:absolute;
        left:0;
        top:0;
        text-align:center;
        background-color:#DBDFE3;
        color:#999;
        z-index: 1;
    }
    .input_img .img_show{
        z-index:0;
    }
    .set_input_img > div h2{
        justify-content: center;
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 24px;
        height: 100%;
        color: #1785F7
    }
   
  
    .set_input_img > div p{
        display: none
        
    }
    .input_img > div p{
    }  
    .img_show .delect,
    .set_input_img .img_show .delect{    
        position: absolute;
        top: 0;
        right: 0;
        margin: -3px;
        z-index: 130;
        display: none;
        width: 12px !important; 
        height: 12px !important;
        cursor: pointer;
    }
</style>