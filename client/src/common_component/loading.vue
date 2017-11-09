<template>
    <div id='main_loading' class='clearfix'>
       <div id="loading-center-absolute">
            <div class="loading" id="loading_one"></div>
            <div class="loading" id="loading_two"></div>
            <div class="loading" id="loading_three"></div>
            <div class="loading" id="loading_four"></div>
            <div class="loading" id="loading_five"></div>
            <div class="loading" id="loading_six"></div>
            <div class="loading" id="loading_seven"></div>
            <div class="loading" id="loading_eight"></div>
            <div class="loading" id="loading_big"></div>
        </div>
    </div>
</template>

<style scoped>
    /*loading*/
    #main_loading{
        position: fixed;
        margin:auto;
        left:0;
        top:0;
        right:0;
        bottom:0;
        background: rgba(0,0,0,0.5);
        z-index: 999999;
        display: none;
    }

   #loading-center-absolute {
        position: absolute;
        left: 50%;
        top: 50%;
        height: 150px;
        width: 150px;
        margin-top: -75px;
        margin-left: -75px; 
        -ms-transform: rotate(45deg); 
        transform: rotate(45deg); 
    }
    .loading{
        width: 20px;
        height: 20px;
        background-color:rgba(0,0,0,.7);
        position: absolute;
        left: 65px;
        top: 65px;
    }
    .loading:nth-child(2n+0) {
        margin-right: 0px;
    }
    #loading_one {
        animation: loading_one 2s infinite;
        animation-delay: 0.2s; 
        }
    #loading_two {
        animation: loading_two 2s infinite;
        animation-delay: 0.3s; 
        }
    #loading_three {
        animation: loading_three 2s infinite;
        animation-delay: 0.4s; 
        }
    #loading_four {
        animation: loading_four 2s infinite;
        animation-delay: 0.5s; 
    }
    #loading_five {
        animation: loading_five 2s infinite;
        animation-delay: 0.6s; 
    }
    #loading_six {
        animation: loading_six 2s infinite;
        animation-delay: 0.7s; 
    }
    #loading_seven {
        animation: loading_seven 2s infinite;
        animation-delay: 0.8s; 
    }
    #loading_eight {
        animation: loading_eight 2s infinite;
        animation-delay: 0.9s; 
    }
    #loading_big{
        position: absolute;
        width: 50px;
        height: 50px;
        left: 50px;
        top: 50px;
        animation: loading_big 2s infinite;
        animation-delay: 0.5s; 
    }   
    @keyframes loading_big {
     50% { 
        transform: scale(0.5);
      } 
    }
    @keyframes loading_one {
     50% { 
        transform: translate(-65px,-65px) ;
      } 
    }
    @keyframes loading_two {
     50% { 
        transform: translate(0,-65px) ; 
      } 
    }
    @keyframes loading_three {
     50% { 
        transform: translate(65px,-65px) ;
      } 
    }
      

    @keyframes loading_four {
      50% { 
        transform: translate(65px,0) ;
      } 
    }

    @keyframes loading_five {
      50% { 
        transform: translate(65px,65px) ;
      } 
    }


    @keyframes loading_six {
      50% { 
        transform:  translate(0,65px) ;
      } 
    }

    @keyframes loading_seven {
      50% { 
        transform: translate(-65px,65px) ;
      } 
    }
    
    @keyframes loading_eight {
      50% { 
        transform: translate(-65px,0) ;
      } 
    }
   


</style>