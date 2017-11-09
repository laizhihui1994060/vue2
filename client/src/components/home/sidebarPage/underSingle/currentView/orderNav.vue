<template>
   <div class="btn-group-vertical btn_list">
        <button type="button" class="btn" :class="[btn,{active:active == 'trailer'}]" @click="rescueType('trailer','01')">
            <span class="jobType">
                <img src="../../../../../assets/tuoche.png" height="18" width="23">
            </span>
            <span>拖车</span>
        </button>
        <button type="button" :class="[btn,{active:active == 'fastRepai'}]" class="btn"  @click="rescueType('fastRepai')">
            <span class="jobType">
                <img src="../../../../../assets/kuaixiu.png" height="23" width="22">
            </span>
            <span>快修</span>
        </button>
        <button type="button" :class="[btn,{active:active == 'TractionBase' }]" class="btn"  @click="rescueType('TractionBase','05')">
            <span class="jobType">
                <img src="../../../../../assets/qianyin.png" height="14" width="24">
            </span>
            <span>地库</span>
            <span>牵引</span>
        </button>
        <button type="button" :class="[btn,{active:active == 'predicamentRescue'}]" class="btn"    @click="rescueType('predicamentRescue','04')">
            <span class="jobType">
                <img src="../../../../../assets/kunjin.png" height="18" width="16">
            </span>
            <span>困境</span>
            <span>救援</span>
        </button>
        <button type="button" :class="[btn,{active:active == 'commercialVehicle' }]" class="btn"  @click="rescueType('commercialVehicle','03')">
            <span class="jobType">
                <img src="../../../../../assets/tuoyun.png" height="15" width="28">
            </span>
            <span>新车</span>
            <span>托运</span>
        </button>
    </div>
</template>

<script>




export default{
    props:['active'],
    mounted(){
    },
    components:{
    },
    data(){
        return {
        }
    },
    methods:{
        rescueType(type,code){
            this.$emit('rescueType',type,code);
        }
    },
    watch:{
        active(bewv){
            console.log(bewv)
        }
    }

}
</script>
<style scoped>
    .btn-group-vertical > .btn + .btn{
        margin: 0;
    }
   
    .btn_list{
        height: 100%  !important;
    }
   
    .active{
        outline-width: 0 !important;
        background-color: rgb(231, 242, 254) !important;
        color: #1683F3 !important;
    }
   
    .btn_list button:active{
        background-color: rgb(231, 242, 254) !important;
        color: red ;
        outline: none;

    }
    .btn_list button:hover{
        background-color: rgb(231, 242, 254);
        color: #39B6E5 ;
    }
    .btn_list button:hover .jobType{
        background: #1683F3;
    }
    .btn_list .jobType{
        background: #E0E5E8;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin:0 auto;
        margin-bottom: 10px;
    }
    .btn_list button{
        border-radius: 0 !important;
        padding:0;
        border: 1px solid rgba(22, 131, 243, 0.27);
        border-top: 0;
        font-size: 14px;
        color: #333333;
        line-height: 12px; 
        background: #fff;
        width: 64px;
        height: 20%;
        border-left: 0;
        border-right: 0;
    }
    .btn_list button:last-child{
        border-bottom-width: 0; 
    }
    .btn_list .active .jobType{
        background: #1683F3;
    }
    .btn_list .active {
        background: #1683F3;
    }
    .btn_list span{
        display: block
    }
    .btn_list span:last-child{
        margin-top: 4px;
    }
 
</style>
