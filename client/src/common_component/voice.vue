<template>
    <div class="clearfix" id='voice'>
        <div class="pull-left" v-if="text">
            <label class="switchBtn_text" v-html="text" :style="{marginRight:labelRight}"></label>
        </div>
        <div class="pull-left bg_con">  
            <a href="javascript:;" @click="toggle"><img src="../assets/voice.png" alt=""></a>
        </div>  
        <audio id="music">
            <source :src="img_path + src" type="audio/mp3"/>
            <source :src="img_path + src" type="audio/ogg"/>
        </audio>   
    </div>
</template>

<script>
export default{
    props:{
        text:{},
        src:{},
    },
    data () {
        return {
            img_path:config.img_path
        }  
    },
    methods:{
        toggle(ev){
            const eve = ev || event;
            const audio = $(eve.target).parent().parent().next()[0];
            if(audio.paused){
                audio.play();
            }else{
                audio.pause();
            }
        }
    },
    created(){

    }
}
 
</script>
<style scoped>
    #voice{
        display: inline-block;
    }
    .switchBtn_text{
        line-height: 24px;
        margin-bottom: 0;
        margin-right: 16px;
    }
    #switchBtn label{
        /* margin: 0; */
    }
    #music{
        height: 0;
        overflow: hidden;
        opacity: 1;
    }
      
   
</style>
