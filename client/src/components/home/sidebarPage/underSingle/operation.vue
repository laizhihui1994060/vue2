<template>
    <div class="operation">
        <div class="operation-nav">
                <component :is="view" @rescueType="toggleView" @shrink="shrink" @completeOrder="completeOrder" :active="active"></component>
        </div>
        <div class="operationPage">
            <div class="operationPageAnime">
                <!-- <keep-alive>
                    <component :is="rescueType" :code="code" @shrink="shrink"></component>
                </keep-alive> -->
                <component :is="rescueType" @completeOrder="completeOrder" @toggleView="tagview" :items="items" @delectMsg="delectMsg"></component>
            </div>
        </div>
    </div>
</template>

<script>

import orderNav from "./currentView/orderNav.vue";
import sendCarNav from "./currentView/sendCarNav.vue";
import trailer from "./currentView/trailer.vue";
import fastRepai from "./currentView/fastRepai.vue";
import commercialVehicle from "./currentView/commercialVehicle.vue";
import predicamentRescue from "./currentView/predicamentRescue.vue";
import TractionBase from "./currentView/TractionBase.vue";

export default{
    props:['newOrder','shareActionId','jobType','messageType'],
    components:{
        orderNav,
        sendCarNav,
        trailer,
        fastRepai,
        commercialVehicle,
        predicamentRescue,
        TractionBase
    },
    data(){
        return {
            rescueType:'trailer',
            active:'trailer',
            view:'',
            items:{
                el:'',
                orderId:'',
                code:''
            },
        }
    },
    methods:{
        toggleNav(newNew,data){


            this.view = newNew;
            switch(newNew){
            case 'orderNav':
                $('.operationPage>div').css({'right':0});

                if(data){
                    if(data.el == this.active && data.code == this.items.code && data.orderId == this.items.orderId && data.messageType == this.items.messageType)return ;
                    this.items = data;
                    this.rescueType = data.el;
                    this.active = data.el;

                }else{
                    this.rescueType = 'trailer';
                    this.active = 'trailer';
                    this.items = {
                        el:'trailer',
                        orderId:'',
                        code:'01'
                    }
                }


                break;
            case 'sendCarNav':
                $('.operationPage>div').css({'right':'-482px'});
                $('.operationPage').css({'z-index':0});
                break;
            default:
                return;
            };
        },
        toggleView(type,code,orderId){
            console.log(type,code,orderId)
            this.active =type;
            


            $('.operationPageAnime').css({
                'right':0,
            });
            $('.operationPage').css({
                'z-index':100,
            });
            this.rescueType = type;

            const data = {
                el:type,
                orderId:orderId,
                code:code
            }

            this.items = data;

        },
        shrink(){
            if($('.operationPageAnime').css('right') == '0px'){
                $('.operationPageAnime').css({'right':'-482px','z-index':0})
                $('.operationPage').css({ 'z-index':0});
            }else{
                $('.operationPageAnime').css({'right':0,});
                $('.operationPage').css({'z-index':100,});
            }

        },
        completeOrder(res,orderId,orderCode,str){
            this.$emit('completeOrder',res,orderId,orderCode,str);
        },
        tagview(){
            this.$emit('toggleView');
        },
        delectMsg(type){
            this.$emit('delectMsg', type);
        }

    }

}

</script>
<style scoped>

   .operation,.operationPage,.operation-nav{
        float: left;
        position: relative;
        z-index: 99;
        height: 100%
    }
    #operationPageAnime{
        height:100%;
    }
    .operation-nav{
        top: 0;
    }
    .operationPage{
        width: 418px;
        position: absolute;
        z-index: 0;
        overflow-y: scroll;
        overflow-x: hidden;
         background: #fff; 
        margin-left:64px;
        height: 100%;
    }
    .operationPage>div{
        position: relative;
        width: 418px;
        height: 100%;
        transition: right 0.06s;
        border: 1px solid rgba(22, 131, 243, 0.27);
        border-bottom-width:0px; 
    }
</style>
